
import { FormControl, FormGroup } from '@angular/forms';
import { BodyNegative } from '../../../models/Simptom';
import { PointProblemService } from '../../../services/point-problem.service';
import { fromEvent, Observable, Subject } from 'rxjs';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { map, startWith, switchMap, filter } from 'rxjs/operators';
import * as _ from 'lodash';
import { Router } from '@angular/router';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  armsForm!: FormGroup;

  term = '';

  @ViewChild('searchTerm', { static: true }) searchTerm!: ElementRef<any>;
  fromEventObsb!: Observable<any>;
  debounceFunc: Function = _.debounce(this.filterArms, 1000);
  armsArr: BodyNegative[] = [];

  armsArrFiltered: BodyNegative[] = [];
  armsArrFiltered$!: Observable<BodyNegative[]>;
  flag: Subject<boolean> = new Subject<boolean>();

  constructor(
    private posService: PointProblemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.armsForm = new FormGroup({
      negativeSign: new FormControl(null),
    });

    this.posService.bodyP$.subscribe((post) => {
      this.armsArr = post;
      this.armsArrFiltered = post;
      this.flag.next(true);
      console.log(post);
    });

    this.fromEventObsb = fromEvent(this.searchTerm.nativeElement, 'input');

    this.armsArrFiltered$ = this.flag.pipe(
      filter(Boolean),
      switchMap((_) => {
        return this.fromEventObsb.pipe(
          startWith(null),
          map((x: any) => {
            if (!x) {
              return this.armsArr;
            }
            const target = x.target as any;
            return this.filterAdvArms(target.value);
          })
        );
      })
    );

    this.armsArrFiltered$.subscribe((p) => {
      p.sort((a: BodyNegative, b: BodyNegative) => {
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

  onDelteArms(pos: BodyNegative) {
    this.posService.deletebody(pos).then((_) => {});
  }

  onInputTerm() {
    this.debounceFunc();
  }

  filterArms() {
    const term = this.term.trim();
    this.armsArrFiltered = this.armsArr.filter((x) =>
      _.includes(x.negativeSign, term)
    );
  }

  filterAdvArms(term: string) {
    return this.armsArr.filter((x) => _.includes(x.negativeSign, term.trim()));
  }

  onSubmit() {
    const value: BodyNegative = this.armsForm.value;
    this.posService.addbody(value).then((_) => {
      this.router.navigate(['/preferences/body']);
    });
    this.armsForm.reset();
  }

  getpos(id: string) {
    this.posService.getbody(id);
  }

}
