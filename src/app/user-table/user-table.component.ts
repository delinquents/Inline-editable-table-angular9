import { CityService } from './../../shared/city.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

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
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  cities: City[] = [];
  countries: any;

  userTable: FormGroup;
  control: FormArray;
  mode: boolean;
  touchedRows: any;


  keyword = 'country';

  constructor(private fb: FormBuilder, private cityService: CityService) {


  }

  ngOnInit(): void {

    this.cityService.getCities().subscribe(
      (data: City[]) => {
        this.cities = data;
        // console.log('test', this.cities);
        this.initAllRows();
        if (this.cities.length === 0 ) {
          this.addRow();
        }
      }
    );
    this.cityService.getCountries().subscribe(
      (data: any) => {
        this.countries = data;
        console.log('countries', data);
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
      city: [city ? city.city : '', [Validators.email, Validators.required]],
      country_id: [city ? city.country.country : '', [Validators.required]],
      last_update: [city ? city.last_update : ''],
      // mobNumber: ['', [Validators.required, Validators.maxLength(10)]],
      isEditable: [true]
    });
  }

  addRow() {
    const control =  this.userTable.get('tableRows') as FormArray;
    control.push(this.initiateForm());
  }

  initAllRows() {
    this.cities.forEach(city => {
      const control =  this.userTable.get('tableRows') as FormArray;
      // control.push(this.initiateForm());
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
    console.log(this.touchedRows);
  }

  toggleTheme() {
    this.mode = !this.mode;
  }

  selectEvent(event) {}
}
