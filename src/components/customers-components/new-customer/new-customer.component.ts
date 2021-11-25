import { AuthService } from '../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomersService } from 'src/services/customers.service';
import { Customer } from 'src/models/Customer';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import * as _ from 'lodash'
import { Observable } from 'rxjs';
import { filter } from 'lodash';
@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
  curUser!: string;
  initObj = {
    firstName: 'jogn',
    lastName: 'joe',
    email: 'jogn_dow@gmail.com',
    phone: '1233456778',
    address: 'space',
    notes: 'black notebook',
    medical: [],
    city: 'city',
    street: 'street',
    curUser: '',
  };
  formGroup: FormGroup = new FormGroup({
    firstName: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
    ]),
    lastName: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^0[2-9]\d{8}$/g),
    ]),
    medical: new FormArray([]),
    notes: new FormControl(null),
    city: new FormControl(''),
    street: new FormControl(''),
    oilArr: new FormArray([]),
    curUser: new FormControl(''),
  });
  constructor(private cust:CustomersService,private router:Router,private auth:AuthService) { }

  ngOnInit() {
    this.curUser = this.auth.curUser;
    this.formGroup.get('curUser')?.setValue(this.curUser);

    this.formGroup.get('firstName')?.valueChanges.subscribe((x) => {});
  }
  ngSubmit() {
    const value: Customer = this.formGroup.value;
    this.cust.addCustomer(value)
    this.router.navigate(['/patient']);


    //this.router.navigate(['/patient']);

    // console.log(value);
  }

  onClear() {
   // this.formGroup.reset();
  }

  onSetValue() {
   // this.formGroup.setValue(this.initObj);
  }

  public get medicalArr(): AbstractControl[] {
    const rtn = this.formGroup.get('medical') as FormArray;
    return rtn.controls;
  }

  addHobbie() {
    const FGControls: { [key: string]: AbstractControl } = {
      name: new FormControl(null),
      medicalID: new FormControl(null),
      description: new FormControl(null),
    };

    (<FormArray>this.formGroup.get('medical')).push(new FormGroup(FGControls));
  }

  deleteHobbie(i: number) {
    (<FormArray>this.formGroup.get('medical')).removeAt(i);
  }
  getObjData(obj: any) {
    return JSON.stringify(obj);
  }
}
