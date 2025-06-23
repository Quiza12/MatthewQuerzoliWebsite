import { Injectable } from '@angular/core';
import { LocationForecast } from '../classes/location-forecast';
import { XMLParser } from 'fast-xml-parser';
import * as moment from 'moment';
import { BlobServiceClient } from "@azure/storage-blob";
import { Observable } from 'rxjs';

const blobServiceClient = new BlobServiceClient('https://mqbomstorageaccount.blob.core.windows.net/bom?');

const xmlParserOptions = {
  ignoreAttributes: false, // retain the XML attribute information
};

@Injectable({
  providedIn: 'root'
})
export class BomDataService {

  private bomDataPromise: Promise<any> | null = null;

  private nswExtension = "IDN11060.xml";
  private ntExtension = 'IDD10207.xml';
  private qldExtension = 'IDQ11295.xml';
  private saExtension = 'IDS10044.xml';
  private tasExtension = 'IDT16710.xml';
  private vicExtension = 'IDV10753.xml';
  private waExtension = 'IDW14199.xml';

  private nswXml: any;
  private ntXml: any;
  private qldXml: any;
  private saXml: any;
  private tasXml: any;
  private vicXml: any;
  private waXml: any;

  private nswResultsArray = [];
  private ntResultsArray = [];
  private qldResultsArray = [];
  private saResultsArray = [];
  private tasResultsArray = [];
  private vicResultsArray = [];
  private waResultsArray = [];

  resultsArray: LocationForecast[] = [];

  constructor() {}

  getNswResultsForDisplay() { return this.nswResultsArray; }
  getNtResultsForDisplay() { return this.ntResultsArray; }
  getQldResultsForDisplay() { return this.qldResultsArray; }
  getSaResultsForDisplay() { return this.saResultsArray; }
  getTasResultsForDisplay() { return this.tasResultsArray; }
  getVicResultsForDisplay() { return this.vicResultsArray; }
  getWaResultsForDisplay() { return this.waResultsArray; }

  getBomData() {
    if (!this.bomDataPromise) {
      this.bomDataPromise = Promise.all([
        this.retrieveDataFromAzure(this.nswExtension, this.nswXml, this.nswResultsArray),
        this.retrieveDataFromAzure(this.ntExtension, this.ntXml, this.ntResultsArray),
        this.retrieveDataFromAzure(this.qldExtension, this.qldXml, this.qldResultsArray),
        this.retrieveDataFromAzure(this.saExtension, this.saXml, this.saResultsArray),
        this.retrieveDataFromAzure(this.tasExtension, this.tasXml, this.tasResultsArray),
        this.retrieveDataFromAzure(this.vicExtension, this.vicXml, this.vicResultsArray),
        this.retrieveDataFromAzure(this.waExtension, this.waXml, this.waResultsArray)
      ]);
    }
    return this.bomDataPromise;
  }

  async retrieveDataFromAzure(url: any, xml: string, resultsArray: any) {
    let rawXmlString: any;

    const containerClient = blobServiceClient.getContainerClient("");
    const blobClient = containerClient.getBlobClient(url);

    // Get blob content from position 0 to the end
    // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
    const downloadBlockBlobResponse = await blobClient.download();
    await blobToString(await downloadBlockBlobResponse.blobBody);

    // [Browsers only] A helper method used to convert a browser Blob into string.
    async function blobToString(blob: any) {
      const fileReader = new FileReader();
      return new Promise((resolve, reject) => {
        fileReader.onloadend = (ev) => {
          const eventTarget = fileReader.result;
          resolve(eventTarget);
          rawXmlString = eventTarget;
        };
        fileReader.onerror = reject;
        rawXmlString = fileReader.readAsText(blob);
      });
    }

    const parser = new XMLParser(xmlParserOptions);
    const jsonObj = parser.parse(rawXmlString);
    this.loopResults(jsonObj, resultsArray)
  }

  loopResults(json: any, resultsArray: any) {
    var areaArray = json.product.forecast.area;
    for (var i = 2; i < areaArray.length; i++) {
      if (areaArray[i].type != '@_public-district') {
        this.getWeeksForecast(areaArray[i], resultsArray);
      }
    }
  }

  getWeeksForecast(areaArray: any, resultsArray: any) {
    let forecastArray = areaArray['forecast-period'];
    if (!Array.isArray(forecastArray)) {
      forecastArray = [forecastArray]; // normalize to array
    }

    for (var i = 0; i < forecastArray.length; i++) {
      let locationForecast = new LocationForecast(
        areaArray['@_description'],
        '', '', '', '', '', '', '', '', '', '', ''
      );

      if (forecastArray[i] != undefined) {
        this.getPrettyDate(forecastArray[i]['@_start-time-local'], locationForecast);
        this.getAirTempAndPrecipRange(forecastArray[i].element, locationForecast);
        this.getPrecisAndPoP(forecastArray[i].text, locationForecast);

        if (i != 0) { //First day is rest of day's forecast - it's an incomplete one.
          this.getPrettyDate(forecastArray[i]['@_start-time-local'], locationForecast);
          this.getAirTempAndPrecipRange(forecastArray[i].element, locationForecast);
          this.getPrecisAndPoP(forecastArray[i].text, locationForecast);
        } else {
          locationForecast.date = 'Forecast for rest of ' + this.getBoganisedDay(moment(forecastArray[i]['@_start-time-local']).format("dddd"));
          this.getAirTempAndPrecipRange(forecastArray[i].element, locationForecast);
          this.getPrecisAndPoP(forecastArray[i].text, locationForecast);
        }
      }

      // console.log(locationForecast);
      resultsArray.push(locationForecast);
    }
  }

  getPrettyDate(date: any, locationForecast: any) {
    let day = this.getBoganisedDay(moment(date).format("dddd"));
    locationForecast.date = day + ", " + moment(date).format("MMMM D ");
  }

  getBoganisedDay(day: string) {
    switch (day) {
      case "Monday": return "Mondee";
      case "Tuesday": return "Tuesdee";
      case "Wednesday": return "Wensdee";
      case "Thursday": return "Thursdee";
      case "Friday": return "Fridee";
      case "Saturday": return "Satdee";
      case "Sunday": return "Sundee";
      default: return day;
    }
  }

  getAirTempAndPrecipRange(elementsArray: any, locationForcast: any) {
    //Air temp min and max, as well as precipitation range
    for (var i = 0; i < elementsArray.length; i++) {
      if (elementsArray[i]['@_type'] != 'forecast_icon_code') {
        if (elementsArray[i]['@_type'] == 'precipitation_range') {
          locationForcast.precipRange = elementsArray[i]['#text'];
        } else if (elementsArray[i]['@_type'] == 'air_temperature_minimum') {
          locationForcast.airTempMin = elementsArray[i]['#text'];
        } else if (elementsArray[i]['@_type'] == 'air_temperature_maximum') {
          locationForcast.airTempMax = elementsArray[i]['#text'];
        }
      }
    }
  }

  getPrecisAndPoP(textArray: any, locationForcast: any) {
    //Precis (concise summary) and probability_of_precipitation
    for (var i = 0; i < textArray.length; i++) {
      if (textArray[i]['@_type'] == 'precis') {
        locationForcast.precis = textArray[i]['#text'];
      } else if (textArray[i]['@_type'] == 'probability_of_precipitation') {
        locationForcast.pop = textArray[i]['#text'];
      }
    }
  }

  getLocationList(stateArray: any) {
    let locationsArray = [];
    for (var i = 0; i < stateArray.length; i++) {
      locationsArray.push(stateArray[i].locationName);
    }

    let tempArray = [];
    tempArray = locationsArray.sort().filter(function (item, pos, ary) {
      return !pos || item != ary[pos - 1];
    });

    return tempArray;
  }

  getForecastForLocation(chosenLocation: any, stateArray: any) {
    this.resultsArray = [];
    for (var i = 0; i < stateArray.length; i++) {
      if (stateArray[i].locationName == chosenLocation.locationFormControl) {
        this.resultsArray.push(stateArray[i]);
      }
    }
    return this.resultsArray;
  }

}
