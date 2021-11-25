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
import { MedicalService } from '../../../services/medical.service';
import { Medic } from '../../../models/Medic';
import { OilServiceService } from '../../../services/oil-service.service';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-viewmedics',
  templateUrl: './viewmedics.component.html',
  styleUrls: ['./viewmedics.component.css']
})
export class ViewmedicsComponent implements OnInit {
  term = '';

  @ViewChild('searchTerm', { static: true }) searchTerm!: ElementRef<any>;
  @ViewChild('inVal', { static: true }) inVal!: ElementRef<any>;
  fromEventObs!: Observable<any>;

  debounceFunc: Function = _.debounce(this.filter, 1000);
  customersArr: Customer[] = [];
  customersArrFiltered: Customer[] = [];
  customersArrFiltered$!: Observable<Customer[]>;

  headers: string[] = ['שם משפחה', 'שם פרטי'];
  keys: any[] = ['lastName', 'firstName'];
  keys2: any[] = [
    'action',
    'theDate',
    'oilArr',
    'painList',
    'pointsFA',
    'painPointList',
    'lastName',
    'firstName',
  ];

  medArr: Medic[] = [];
  oilArrFiltered: Medic[] = [];
  oilArrFiltered$!: Observable<Medic[]>;
  flag: Subject<boolean> = new Subject<boolean>();
  mArr!: string[];
  ol: any;
  showSpinner = false;
  getCust(cust: any, key: string) {
    return cust[key];
  }

  constructor(
    private customers: CustomersService,
    private medService: MedicalService,
    private oilSer: OilServiceService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.showSpinner = true;
   

    this.customers.users$.subscribe((custs) => {
      this.customersArr = custs.filter((cus) => {
       return cus.curUser == this.auth.curUser;
      });
      this.customersArrFiltered = custs;
    });

    this.medService.medicals$.subscribe((custs) => {
      this.medArr = custs.filter((cus) => {
        return cus.curUser == this.auth.curUser;
      });
      this.oilArrFiltered = custs;
      this.flag.next(true);
    });

    this.ol = this.oilSer;

    this.oilArrFiltered.map((n) => {
      this.mArr = n.oilArr;
    });

    this.fromEventObs = fromEvent(this.searchTerm.nativeElement, 'input');

    this.oilArrFiltered$ = this.flag.pipe(
      filter(Boolean),
      switchMap((_) => {
        return this.fromEventObs.pipe(
          startWith(null),
          debounceTime(1000),
          map((x: any) => {
            if (!x) {
              return this.medArr;
            }
            const target = x.target as any;
            return this.filterAdv(target.value);
          })
        );
      })
    );

    this.oilArrFiltered$.subscribe((c) => {
      this.showSpinner = false;
      c.sort((a: Medic, b: Medic) => {
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
  onDeleteCustomer(cus: Medic) {
    this.medService.deleteMedic(cus).then((_) => {
      // alert(`${cus.firstName} deleted successfully`);
    });
  }

  onInputTerm() {
    this.debounceFunc();
  }

  filter() {
    console.log(this.term);
    const term = this.term.trim();
    this.oilArrFiltered = this.medArr.filter((x) =>
      _.includes(x.firstName, term)
    );
  }

  filterAdv(term: string) {
    return this.medArr.filter((x) => _.includes(x.firstName, term.trim()));
  }

}
