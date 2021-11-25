import { Customer } from './../../../models/Customer';
import { CustomersService } from './../../../services/customers.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subject, switchMap,filter, map, startWith, debounceTime } from 'rxjs';
import * as _ from 'lodash';
import { AuthService } from 'src/services/auth.service';
@Component({
  selector: 'app-view-component',
  templateUrl: './view-component.component.html',
  styleUrls: ['./view-component.component.css']
})
export class ViewCustomer implements OnInit {
  term = '';
  curUser!: string;
  showSpinner = false;
  @ViewChild('searchTerm', { static: true }) searchTerm!: ElementRef<any>;
  fromEventObs!: Observable<any>;

  debounceFunc: Function = _.debounce(this.filter, 1000);
 // customers$!:Observable<Customer[]>;
  customersArr!:Customer[];
  customersArrFiltered: Customer[] = [];
  customersArrFiltered$!: Observable<Customer[]>;
  flag: Subject<boolean> = new Subject<boolean>();


headerKeys = ["טלפון",'דוא"ל','שם משפחה',"שם"]     //["שם","שם משפחה","דוא'ל","טלפון"]
  constructor(private usersService:CustomersService,private auth: AuthService) { }

  ngOnInit() {
    this.showSpinner = true;
    // setTimeout(() => {

    // },1000)

      // this.customers$ = this.usersService.users$;
      this.curUser = this.auth.curUser;
       this.usersService.users$.subscribe((custs) => {
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
        this.showSpinner = false;
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
  checkUser(name: string) {
    return name == this.curUser;
  }
  getCust(cust: any, key: string) {
    return cust[key];
  }

  onDeleteCustomer(cus:Customer){
    this.usersService.deleteCustomer(cus).then((_) => {
      //this.dialog.open(ActiondialogComponent);
      //alert(`${cus.firstName} deleted successfully`);
    });
  }
  onInputTerm(){
    this.debounceFunc();
    //const term = this.term.trim();
   // this.customersArrFiltered = this.customersArr.filter(c => _.includes(c.firstName,term))
  }

  filter() {
  // console.log(this.term);
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
