import { CustomersService } from './../../../services/customers.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from 'src/models/Customer';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customer$!: Observable<Customer | null>;
  curUser!: string;
  formGroup: FormGroup = new FormGroup({
    id: new FormControl(null),
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
    //address: new FormControl(null),
    notes: new FormControl(null),
    city: new FormControl(''),
    street: new FormControl(''),
    curUser: new FormControl(''),
  });
  constructor(private customers:CustomersService,private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.customer$ = this.customers.getCustomer(id);

    this.customer$.subscribe((cust) => {
      if (cust === null) {
        return;
      } else {
        console.log(cust);
        this.formGroup.get('id')?.setValue(cust.id);
        this.formGroup.get('firstName')?.setValue(cust.firstName);
        this.formGroup.get('lastName')?.setValue(cust.lastName);
        this.formGroup.get('email')?.setValue(cust.email);
        this.formGroup.get('phone')?.setValue(cust.phone);
        this.formGroup.get('street')?.setValue(cust.street);
        this.formGroup.get('notes')?.setValue(cust.notes);
        this.formGroup.get('city')?.setValue(cust.city);
       // this.formGroup.get('curUser')?.setValue(this.curUser);

        cust.medical.forEach((x) => {
          (<FormArray>this.formGroup.get('medical')).push(
            new FormGroup({
              description: new FormControl(x.description),
              hoursPerWeek: new FormControl(x.hoursPerWeek),
              name: new FormControl(x.name),
            })
          );
        });
      }
    });
  }
  ngSubmit() {
    const value: Customer = this.formGroup.value;
    this.customers.updateCustomer(value);

    this.router.navigate(['/patient']);
  }

  onClear() {
    this.formGroup.reset();
  }

  addHobbie() {
    const FGControls: { [key: string]: AbstractControl } = {
      name: new FormControl(null),
      hoursPerWeek: new FormControl(null),
      description: new FormControl(null),
    };

    (<FormArray>this.formGroup.get('medical')).push(new FormGroup(FGControls));
  }
  deleteHobbie(i: number) {
    (<FormArray>this.formGroup.get('medical')).removeAt(i);
  }

  public get hobbiesArr(): AbstractControl[] {
    const rtn = this.formGroup.get('medical') as FormArray;
    return rtn.controls;
  }

  getObjData(obj: any) {
    return JSON.stringify(obj);
  }
}
