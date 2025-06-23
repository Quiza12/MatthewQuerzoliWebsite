export class LocationForecast {
  

  constructor(
    public locationName: string,
    public date: string,
    public precis: string,
    public boganisedPrecis: string,
    public pop: string,
    public boganisedPop: string,
    public airTempMin: string,
    public boganisedAirTempMin: string,
    public airTempMax: string,
    public boganisedAirTempMax: string,
    public precipRange: string,
    public boganisedPrecipRange: string
  )
    {
      
  }
}
