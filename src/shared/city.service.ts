import { Country } from './../app/user-table/user-table.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from 'src/app/user-table/user-table.component';

@Injectable({
  providedIn: 'root'
})
export class CityService {

constructor(private http: HttpClient) { }

baseUrl = 'http://192.168.67.245:3000/city?select=city_id,city,last_update,country(country_id,country)&limit=10&offset=3';
countryUrl = 'http://192.168.67.245:3000/country';

  getCities() {
    return this.http.get<City[]>(this.baseUrl);
  }

  getCountries() {
    return this.http.get<any>(this.countryUrl);
  }

}
