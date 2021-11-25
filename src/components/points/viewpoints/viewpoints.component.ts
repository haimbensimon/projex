import { PointService } from '../../../services/point.service';
import { Point } from '../../../models/Point';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';

import * as _ from 'lodash';
import {
  debounceTime,
  filter,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { slice } from 'lodash';
import { AuthService } from '../../../services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataPoints } from 'src/app/data-table/data-table-points';

@Component({
  selector: 'app-viewpoints',
  templateUrl: './viewpoints.component.html',
  styleUrls: ['./viewpoints.component.css']
})
export class ViewpointsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Point>;
  dataSource!: DataTableDataPoints;

  displayedColumns = ['action','mainMrd','id', 'name'];

  EXAMPLE_DATA!:Point[];
  term = '';

  @ViewChild('searchTerm', { static: true }) searchTerm!: ElementRef<any>;
  fromEventObs!: Observable<any>;

  debounceFunc: Function = _.debounce(this.filter, 1000);

  headers: string[] = ['שם', 'שם לועזי'];
  keys: any[] = ['action', 'imgUrl', 'description', 'Name', 'point']; //['HeName', 'EnName', 'imgUrl', 'action']
  oilsArr: Point[] = [];
  oilsArrFiltered: Point[] = [];
  oilsArrFiltered$!: Observable<Point[]>;
  flag: Subject<boolean> = new Subject<boolean>();
  mrole!: boolean;
  showSpinner = false;
  getCust(cust: any, key: string) {
    return cust[key];
  }
  constructor(
    private oilService: PointService,
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

this.showSpinner = true;
    // setTimeout(() => {
    //   this.showSpinner = false;
    // },1000)
   this.mrole = this.auth.myRole;
    this.oilService.points$.subscribe((oils) => {
      this.oilsArr = oils;
      this.oilsArrFiltered = oils;
      this.EXAMPLE_DATA =this.oilsArr;
      this.dataSource = new DataTableDataPoints(oils);
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
      c.sort((a: Point, b: Point) => {
        if (a.point < b.point) {
          return -1;
        }
        if (a.point > b.point) {
          return 1;
        }
        return 0;
      });
    });
  }

  onDeleteOil(point: Point) {
    this.oilService.deletepoint(point).then((_) => {
      // alert(`${oil.HeName} deleted successfully`);
    });
  }

  onInputTerm() {
    this.debounceFunc();
  }

  filter() {
    console.log(this.term);
    const term = this.term.trim();
    this.oilsArrFiltered = this.oilsArr.filter((point) =>
      _.includes(point.point, term)
    );
  }

  filterAdv(term: string) {
    return this.oilsArr.filter((point) => _.includes(point.point, term.trim()));
  }

}
