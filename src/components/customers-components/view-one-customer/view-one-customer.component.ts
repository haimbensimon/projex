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
import { CustomersService } from 'src/services/customers.service';
import {Customer} from '../../../models/Customer'

@Component({
  selector: 'app-view-one-customer',
  templateUrl: './view-one-customer.component.html',
  styleUrls: ['./view-one-customer.component.css']
})
export class ViewOneCustomerComponent implements OnInit {
  customer$!: Observable<Customer | null>;
  cusObj = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    notes: '',
    city: '',
    medical: [] as any,
  };
  constructor(private customers:CustomersService,private activatedRoute: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.customer$ = this.customers.getCustomer(id);

    this.customer$.subscribe((cust) => {
      if (cust === null) {
        return;
      } else {
        console.log(cust);

        this.cusObj.firstName = cust.firstName;
        this.cusObj.lastName = cust.lastName;
        this.cusObj.email = cust.email;
        this.cusObj.phone = cust.phone;
        this.cusObj.street = cust.street;
        this.cusObj.notes = cust.notes as any;
        this.cusObj.city = cust.city;
        this.cusObj.medical = cust.medical as any;
      }
    });
  }

}
