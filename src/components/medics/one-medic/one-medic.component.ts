import { AuthService } from '../../../services/auth.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { Customer } from '../../../models/Customer';
import * as _ from 'lodash';
import {
  debounceTime,
  filter,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { slice } from 'lodash';
import { CustomersService } from '../../../services/customers.service';
@Component({
  selector: 'app-one-medic',
  templateUrl: './one-medic.component.html',
  styleUrls: ['./one-medic.component.css']
})
export class OneMedicComponent implements OnInit {

  term = '';

  @ViewChild('searchTerm', { static: true }) searchTerm!: ElementRef<any>;
  fromEventObs!: Observable<any>;

  debounceFunc: Function = _.debounce(this.filter, 1000);

  headers: string[] = ['פלאפון', 'דוא"ל', 'שם משפחה', 'שם פרטי']; //'שםפרטי', 'שםמשפחה', 'דוא"ל', 'פלאפון'
  keys: any[] = ['phone', 'email', 'lastName', 'firstName'];
  customersArr: Customer[] = [];
  customersArrFiltered: Customer[] = [];
  customersArrFiltered$!: Observable<Customer[]>;
  flag: Subject<boolean> = new Subject<boolean>();

  getCust(cust: any, key: string) {
    return cust[key];
  }

  constructor(private customers: CustomersService, private auth: AuthService) {}

  ngOnInit(): void {
    this.customers.users$.subscribe((custs) => {
      this.customersArr = custs.filter((cus) => {
        return cus.curUser == this.auth.curUser;
      });
      this.customersArrFiltered = custs;
      this.flag.next(true);
    });

    this.fromEventObs = fromEvent(this.searchTerm.nativeElement, 'input');

    this.customersArrFiltered$ = this.flag.pipe(
      filter(Boolean),
      switchMap((_) => {
        return this.fromEventObs.pipe(
          startWith(null),
          debounceTime(1000),
          map((x: any) => {
            if (!x) {
              return this.customersArr;
            }
            const target = x.target as any;
            return this.filterAdv(target.value);
          })
        );
      })
    );
    this.customersArrFiltered$.subscribe((c) => {
      c.sort((a: Customer, b: Customer) => {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      });
    });
  }
  onDeleteCustomer(cus: Customer) {
    this.customers.deleteCustomer(cus).then((_) => {
      alert(`${cus.firstName} deleted successfully`);
    });
  }

  onInputTerm() {
    this.debounceFunc();
  }

  filter() {
    console.log(this.term);
    const term = this.term.trim();
    this.customersArrFiltered = this.customersArr.filter((x) =>
      _.includes(x.firstName, term)
    );
  }

  filterAdv(term: string) {
    return this.customersArr.filter((x) =>
      _.includes(x.firstName, term.trim())
    );
  }
}
