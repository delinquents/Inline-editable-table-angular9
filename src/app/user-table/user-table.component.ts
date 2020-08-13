import { HttpClient } from '@angular/common/http';
import { CityService } from './../../shared/city.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms'; 
import { rowTableAnimationFull } from '../shared/animation/template.animation';
export interface City {
  city_id: number;
  city: string;
  country: Country;
  last_update: Date;
}
export interface Country {
  country_id: number;
  country: string;
  last_update?: Date;
}


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  animations: [rowTableAnimationFull]
})
export class UserTableComponent implements OnInit {
  animation = true;
  cities: City[] = [];
  countries: any;
  data: any;
  userTable: FormGroup;
  control: FormArray;
  mode: boolean;
  touchedRows: any;

  isLoading: boolean = false;
  keyword = 'country';
 
 
  constructor(private fb: FormBuilder, private cityService: CityService, private http: HttpClient) {


  }

  ngOnInit(): void {

    this.cityService.getCities().subscribe(
      (data: City[]) => {
        this.cities = data;
        // console.log('test', this.cities);
        this.initlAllRows();
        if (this.cities.length === 0 ) {
          this.addRow();
        }
      }
    );
    this.cityService.getCountries().subscribe(
      (data: any) => {
        this.data = data;
      }
    );


    this.touchedRows = [];
    this.userTable = this.fb.group({
      tableRows: this.fb.array([])
    });


  }

  ngAfterOnInit() {
    this.control = this.userTable.get('tableRows') as FormArray;
  }

  initiateForm(city?: City): FormGroup {
    return this.fb.group({
      city_id: [city ? city.city_id : '', Validators.required],
      city: [city ? city.city : '', [ Validators.required]],
      country: [city ? city.country.country : '', [Validators.required]],
      last_update: [city ? city.last_update : ''],
      isEditable: [true]
    });
  }

  addRow() {
    const control =  this.userTable.get('tableRows') as FormArray;
    control.push(this.initiateForm());
  }

  initlAllRows() {
    this.cities.forEach(city => {
      const control =  this.userTable.get('tableRows') as FormArray;
      control.push(this.initiateForm(city));
    });
  }

  deleteRow(index: number) {
    const control =  this.userTable.get('tableRows') as FormArray;
    control.removeAt(index);
  }

  editRow(group: FormGroup) {
    group.get('isEditable').setValue(true);
  }

  doneRow(group: FormGroup) {
    console.log(group)
    group.get('isEditable').setValue(false);
  }

  saveUserDetails() {
    console.log(this.userTable.value);
  }

  get getFormControls() {
    const control = this.userTable.get('tableRows') as FormArray;
    return control;
  }

  submitForm() {
    const control = this.userTable.get('tableRows') as FormArray;
    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
    console.log(this.cities);
  }

  toggleTheme() {
    this.mode = !this.mode;
  }

  selectEvent(item) {
    const control =  this.userTable.get('tableRows') as FormArray;
    console.log(control);
    // console.log(item);
    // console.log(this.userTable.get('tableRows').value);
    // this.addRow();
  }


  getServerResponse(event) {
  this.cityService.getCountriesServerSide(event)
        .subscribe(data => {
          if (data['Search'] == undefined) {
            this.countries = [];
            // this.errorMsg = data['Error'];
          } else {
            this.countries = data['Search'];
          }
        });
  }
  onChangeSearch(val: string) {
    console.log('val', val);
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  

}
