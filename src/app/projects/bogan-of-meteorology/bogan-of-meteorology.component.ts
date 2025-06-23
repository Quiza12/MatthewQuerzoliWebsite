import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BomDataService } from './services/bom-data.service';
import { BoganService } from './services/bogan.service';
import { LocationForecast } from './classes/location-forecast';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
 

@Component({
  selector: 'app-bogan-of-meteorology',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './bogan-of-meteorology.component.html',
  styleUrl: './bogan-of-meteorology.component.css'
})
export class BoganOfMeteorologyComponent implements OnInit {
  title = 'bogan-of-meterology';

  dropdownDefault = 'Where the bloody hell are ya? ⬇'

  nswLocationList: string[] = [];;
  ntLocationList: string[] = [];;
  qldLocationList: string[] = [];;
  saLocationList: string[] = [];;
  tasLocationList: string[] = [];;
  vicLocationList: string[] = [];;
  waLocationList: string[] = [];;

  chosenLocation: any;
  chosenLocationList: string[] = [];;

  loadingSpinner: boolean = true;

  displayStateSelection: boolean = false;
  displayLocationList: boolean = false;
  displayDailyForecast: boolean = false;

  stateOption: any;
  resultsArray: LocationForecast[] = [];

  locationSelectionForm: FormGroup;

  constructor(private bomDataService: BomDataService, private boganService: BoganService, private fb: FormBuilder) {
    this.locationSelectionForm = new FormGroup({
      location: new FormControl('')
    });
  }

  ngOnInit() {
    this.setFormToNull();
    this.bomDataService.getBomData().then(() => {
      this.subscribeToFormChanges();
      this.loadingSpinner = false;
      this.displayStateSelection = true;
    });
  }

  setFormToNull() {
    this.locationSelectionForm = this.fb.group({
      locationFormControl: [null]
    });
  }

  subscribeToFormChanges() {
    let locationFormControl = this.locationSelectionForm;
    if (locationFormControl != null) {
      locationFormControl.valueChanges.subscribe(f => {
        this.chosenLocation = f;
        this.loadSevenDayForecast();
      });
    }
  }

  stateOptionChange() {
    this.setFormToNull();

    this.displayLocationList = true;
    this.displayDailyForecast = false;

    this.getAllStateLocationLists();

    switch(this.stateOption) {
      case 'nsw': this.chosenLocationList = this.nswLocationList; break;
      case 'qld': this.chosenLocationList = this.qldLocationList; break;
      case 'nt': this.chosenLocationList = this.ntLocationList; break;
      case 'sa': this.chosenLocationList = this.saLocationList; break;
      case 'tas': this.chosenLocationList = this.tasLocationList; break;
      case 'wa': this.chosenLocationList = this.waLocationList; break;
      case 'vic': this.chosenLocationList = this.vicLocationList; break;
    }
    this.subscribeToFormChanges();
  }

  getAllStateLocationLists() {
    this.nswLocationList = this.bomDataService.getLocationList(this.bomDataService.getNswResultsForDisplay());
    this.qldLocationList = this.bomDataService.getLocationList(this.bomDataService.getQldResultsForDisplay());
    this.ntLocationList = this.bomDataService.getLocationList(this.bomDataService.getNtResultsForDisplay());
    this.saLocationList = this.bomDataService.getLocationList(this.bomDataService.getSaResultsForDisplay());
    this.tasLocationList = this.bomDataService.getLocationList(this.bomDataService.getTasResultsForDisplay());
    this.waLocationList = this.bomDataService.getLocationList(this.bomDataService.getWaResultsForDisplay());
    this.vicLocationList = this.bomDataService.getLocationList(this.bomDataService.getVicResultsForDisplay());
  }

  loadSevenDayForecast() {
    console.log('Retrieving information for ' + this.chosenLocation.locationFormControl);
    switch(this.stateOption) {
      case 'nsw': this.resultsArray = this.boganise(this.bomDataService.getForecastForLocation(this.chosenLocation, this.bomDataService.getNswResultsForDisplay())); break;
      case 'qld': this.resultsArray = this.boganise(this.bomDataService.getForecastForLocation(this.chosenLocation, this.bomDataService.getQldResultsForDisplay())); break;
      case 'nt': this.resultsArray = this.boganise(this.bomDataService.getForecastForLocation(this.chosenLocation, this.bomDataService.getNtResultsForDisplay())); break;
      case 'sa': this.resultsArray = this.boganise(this.bomDataService.getForecastForLocation(this.chosenLocation, this.bomDataService.getSaResultsForDisplay())); break;
      case 'tas': this.resultsArray = this.boganise(this.bomDataService.getForecastForLocation(this.chosenLocation, this.bomDataService.getTasResultsForDisplay())); break;
      case 'wa': this.resultsArray = this.boganise(this.bomDataService.getForecastForLocation(this.chosenLocation, this.bomDataService.getWaResultsForDisplay())); break;
      case 'vic': this.resultsArray = this.boganise(this.bomDataService.getForecastForLocation(this.chosenLocation, this.bomDataService.getVicResultsForDisplay())) ; break;
    }
    this.displayDailyForecast = true;
  }

  boganise(resultsArray: any) {
    return this.boganService.boganise(resultsArray);
  }

}
