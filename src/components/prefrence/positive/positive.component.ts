
import { SimptomsService } from '../../../services/simptoms.service';
import { Positive } from '../../../models/Simptom';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import {
  Action,
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentChangeAction,
  DocumentReference,
  DocumentSnapshot,
} from '@angular/fire/compat/firestore';
import { fromEvent, Observable, Subject } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import * as _ from 'lodash';
import { slice } from 'lodash';
import { Router } from '@angular/router';
@Component({
  selector: 'app-positive',
  templateUrl: './positive.component.html',
  styleUrls: ['./positive.component.css']
})
export class PositiveComponent implements OnInit {

  positiveForm!: FormGroup;

  term = '';

  @ViewChild('searchTerm', { static: true }) searchTerm!: ElementRef<any>;
  fromEventObs!: Observable<any>;
  debounceFunc: Function = _.debounce(this.filter, 1000);
  positiveArr: Positive[] = [];
  posArr: Positive[] = [];
  positiveArrFiltered: Positive[] = [];
  positiveArrFiltered$!: Observable<Positive[]>;
  flag: Subject<boolean> = new Subject<boolean>();

  constructor(private posService: SimptomsService, private router: Router) {}

  ngOnInit(): void {
    // console.log(this.positiveArrFiltered);
    this.positiveForm = new FormGroup({
      positiveSign: new FormControl(null),
    });

    this.posService.positive$.subscribe((post) => {
      this.positiveArr = post;
      this.positiveArrFiltered = post;
      this.flag.next(true);
      console.log(post);
    });

    this.fromEventObs = fromEvent(this.searchTerm.nativeElement, 'input');

    this.positiveArrFiltered$ = this.flag.pipe(
      filter(Boolean),
      switchMap((_) => {
        return this.fromEventObs.pipe(
          startWith(null),
          map((x: any) => {
            if (!x) {
              return this.positiveArr;
            }
            const target = x.target as any;
            return this.filterAdv(target.value);
          })
        );
      })
    );

    this.positiveArrFiltered$.subscribe((p) => {
      p.sort((a: Positive, b: Positive) => {
        if (a.positiveSign < b.positiveSign) {
          return -1;
        }
        if (a.positiveSign > b.positiveSign) {
          return 1;
        }
        return 0;
      });
    });
  }

  onDeltePos(pos: Positive) {
    this.posService.deletePositive(pos).then((_) => {
      alert(`${pos.positiveSign} deleted successfuly`);
    });
  }

  onInputTerm() {
    this.debounceFunc();
  }

  filter() {
    const term = this.term.trim();
    this.positiveArrFiltered = this.positiveArr.filter((x) =>
      _.includes(x.positiveSign, term)
    );
  }

  filterAdv(term: string) {
    return this.positiveArr.filter((x) =>
      _.includes(x.positiveSign, term.trim())
    );
  }

  onSubmit() {
    const value: Positive = this.positiveForm.value;
    this.posService.addPositive(value).then((_) => {
      this.router.navigate(['/preferences/positive']);
    });
    this.positiveForm.reset();
  }

  getpos(id: string) {
    this.posService.getPositive(id);
  }

}
