
import { FormControl, FormGroup } from '@angular/forms';
import { SpiritNegative } from '../../../models/Simptom';
import { PointProblemService } from '../../../services/point-problem.service';
import { fromEvent, Observable, Subject } from 'rxjs';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { map, startWith, switchMap, filter } from 'rxjs/operators';
import * as _ from 'lodash';
import { Router } from '@angular/router';
@Component({
  selector: 'app-spirit',
  templateUrl: './spirit.component.html',
  styleUrls: ['./spirit.component.css']
})
export class SpiritComponent implements OnInit {

  armsForm!: FormGroup;

  term = '';

  @ViewChild('searchTerm', { static: true }) searchTerm!: ElementRef<any>;
  fromEventObsb!: Observable<any>;
  debounceFunc: Function = _.debounce(this.filterArms, 1000);
  armsArr: SpiritNegative[] = [];

  armsArrFiltered: SpiritNegative[] = [];
  armsArrFiltered$!: Observable<SpiritNegative[]>;
  flag: Subject<boolean> = new Subject<boolean>();

  constructor(
    private posService: PointProblemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.armsForm = new FormGroup({
      negativeSign: new FormControl(null),
    });

    this.posService.spiritP$.subscribe((post) => {
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
      p.sort((a: SpiritNegative, b: SpiritNegative) => {
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

  onDelteArms(pos: SpiritNegative) {
    this.posService.deletespirit(pos).then((_) => {});
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
    const value: SpiritNegative = this.armsForm.value;
    this.posService.addspirit(value).then((_) => {
      this.router.navigate(['/preferences/spirit']);
    });
    this.armsForm.reset();
  }

  getpos(id: string) {
    this.posService.getspirit(id);
  }

}
