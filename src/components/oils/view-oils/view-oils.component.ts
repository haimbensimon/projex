import { AuthService } from '../../../services/auth.service';
import { OilServiceService } from './../../../services/oil-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subject} from 'rxjs';
import * as _ from 'lodash';
import {
  debounceTime,
  filter,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { slice } from 'lodash';
import { Oil } from 'src/models/Oil';
import { MatTable } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { AfterViewInit} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { DataTableDataSource } from 'src/app/data-table/data-table-datasource';

@Component({
  selector: 'app-view-oils',
  templateUrl: './view-oils.component.html',
  styleUrls: ['./view-oils.component.css']
})
export class ViewOilsComponent implements OnInit ,AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Oil>;
  dataSource!: DataTableDataSource;

  displayedColumns = ['action','id', 'name'];

  EXAMPLE_DATA!:Oil[];

  term = '';

  mrole!: boolean;
  mid!:string | any;
  @ViewChild('searchTerm', { static: true }) searchTerm!: ElementRef<any>;
  fromEventObs!: Observable<any>;

  debounceFunc: Function = _.debounce(this.filter, 1000);
  columnsToDisplay = ['שם לועזי', 'שם'];
  headers: string[] = ['שם', 'שם לועזי'];
  keys: any[] = ['action', 'EnName', 'HeName']; //['HeName', 'EnName', 'imgUrl', 'action']
  oilsArr: Oil[] = [];
  oilsArrFiltered: Oil[] = [];
  oilsArrFiltered$!: Observable<Oil[]>;
  flag: Subject<boolean> = new Subject<boolean>();
  showSpinner = false;
  getCust(cust: any, key: string) {
    return cust[key];
  }
  constructor(
    private oilService: OilServiceService,
    private router: Router,
    private rot: ActivatedRoute,
    private auth: AuthService
  ) {}
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }


  ngOnInit(): void {
   // setTimeout(() => this.dataSource.paginator = this.paginator);

    this.showSpinner = true;
        // setTimeout(() => {
        //   this.showSpinner = false;
        // },1000)

    this.mrole = this.auth.myRole;
    this.mid = this.auth.id
    console.log(this.mid)
    this.oilService.oils$.subscribe((oils: Oil[]) => {
      this.oilsArr = oils;
      this.oilsArrFiltered = oils;
      this.EXAMPLE_DATA =this.oilsArr;
      this.dataSource = new DataTableDataSource(oils);
      this.showSpinner = false;
      this.flag.next(true);

    });

    this.fromEventObs = fromEvent(this.searchTerm.nativeElement, 'input');

    this.oilsArrFiltered$ = this.flag.pipe(
      filter(Boolean),
      switchMap((_) => {
        return this.fromEventObs.pipe(
          startWith(null),
          debounceTime(1000),
          map((x: any) => {
            if (!x) {
              return this.oilsArr;
            }
            const target = x.target as any;
            return this.filterAdv(target.value);
          })
        );
      })
    );

    this.oilsArrFiltered$.subscribe((c) => {
      this.showSpinner = false;
      c.sort((a: Oil, b: Oil) => {
        if (a.HeName < b.HeName) {
          return -1;
        }
        if (a.HeName > b.HeName) {
          return 1;
        }
        return 0;
      });
    });

  }



  onDeleteOil(oil: Oil) {
    this.oilService.deleteOil(oil).then((_) => {
      // alert(`${oil.HeName} deleted successfully`);
    });
  }
  onAddOoil(){
    this.router.navigate(['oils/new'])
  }

  onInputTerm() {
    this.debounceFunc();
  }

  filter() {
    console.log(this.term);
    const term = this.term.trim();
    this.dataSource.data = this.oilsArr.filter((oil) =>
      _.includes(oil.HeName, term)
    );
  }

  filterAdv(term: string) {
    return this.oilsArr.filter((oil) => _.includes(oil.HeName, term.trim()));
  }

}
