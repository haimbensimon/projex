
import { FormControl, FormGroup } from '@angular/forms';
import { headNegative } from '../../../models/Simptom';
import { PointProblemService } from '../../../services/point-problem.service';
import { fromEvent, Observable, Subject } from 'rxjs';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { map, startWith, switchMap, filter } from 'rxjs/operators';
import * as _ from 'lodash';
import { Router } from '@angular/router';
@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
  headForm!: FormGroup;

  term = '';

  @ViewChild('searchTerm', { static: true }) searchTerm!: ElementRef<any>;
  fromEventObs!: Observable<any>;
  debounceFunc: Function = _.debounce(this.filterHead, 1000);
  headArr: headNegative[] = [];

  headArrFiltered: headNegative[] = [];
  headArrFiltered$!: Observable<headNegative[]>;
  flag: Subject<boolean> = new Subject<boolean>();

  constructor(
    private posService: PointProblemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.headForm = new FormGroup({
      negativeSign: new FormControl(null),
    });

    this.posService.headP$.subscribe((post) => {
      this.headArr = post;
      this.headArrFiltered = post;
      this.flag.next(true);
      console.log(post);
    });

    this.fromEventObs = fromEvent(this.searchTerm.nativeElement, 'input');

    this.headArrFiltered$ = this.flag.pipe(
      filter(Boolean),
      switchMap((_) => {
        return this.fromEventObs.pipe(
          startWith(null),
          map((x: any) => {
            if (!x) {
              return this.headArr;
            }
            const target = x.target as any;
            return this.filterAdvHead(target.value);
          })
        );
      })
    );

    this.headArrFiltered$.subscribe((p) => {
      p.sort((a: headNegative, b: headNegative) => {
        if (a.negativeSign < b.negativeSign) {
          return -1;
        }
        if (a.negativeSign > b.negativeSign) {
          return 1;
        }
        return 0;
      });
    });
  }

  onDelteHead(pos: headNegative) {
    this.posService.deleteHead(pos).then((_) => {});
  }

  onInputTerm() {
    this.debounceFunc();
  }

  filterHead() {
    const term = this.term.trim();
    this.headArrFiltered = this.headArr.filter((x) =>
      _.includes(x.negativeSign, term)
    );
  }

  filterAdvHead(term: string) {
    return this.headArr.filter((x) => _.includes(x.negativeSign, term.trim()));
  }

  onSubmit() {
    const value: headNegative = this.headForm.value;
    this.posService.addHead(value).then((_) => {
      this.router.navigate(['/preferences/head']);
    });
    this.headForm.reset();
  }

  getpos(id: string) {
    this.posService.getHead(id);
  }
}
