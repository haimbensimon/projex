
import { SimptomsService } from '../../../services/simptoms.service';
import { Negative } from '../../../models/Simptom';
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
  selector: 'app-negative',
  templateUrl: './negative.component.html',
  styleUrls: ['./negative.component.css']
})
export class NegativeComponent implements OnInit {

  negativeForm!: FormGroup;

  term = '';

  @ViewChild('searchTerm', { static: true }) searchTerm!: ElementRef<any>;
  fromEventObsn!: Observable<any>;
  debounceFunc: Function = _.debounce(this.filter, 1000);
  negativeArr: Negative[] = [];
  negArr: Negative[] = [];
  negativeArrFiltered: Negative[] = [];
  negativeArrFiltered$!: Observable<Negative[]>;
  flagnegative: Subject<boolean> = new Subject<boolean>();

  constructor(private posService: SimptomsService, private router: Router) {}

  ngOnInit(): void {
    //console.log(this.negativeArrFiltered);
    this.negativeForm = new FormGroup({
      negativeSign: new FormControl(null),
    });

    this.posService.negative$.subscribe((post) => {
      this.negativeArr = post;
      this.negativeArrFiltered = post;
      this.flagnegative.next(true);
      // console.log(post);
    });

    this.fromEventObsn = fromEvent(this.searchTerm.nativeElement, 'input');

    this.negativeArrFiltered$ = this.flagnegative.pipe(
      filter(Boolean),
      switchMap((_) => {
        return this.fromEventObsn.pipe(
          startWith(null),
          map((x: any) => {
            if (!x) {
              return this.negativeArr;
            }
            const target = x.target as any;
            return this.filterAdv(target.value);
          })
        );
      })
    );

    this.negativeArrFiltered$.subscribe((p) => {
      p.sort((a: Negative, b: Negative) => {
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

  onDeltePos(pos: Negative) {
    this.posService.deleteNegative(pos).then((_) => {
      alert(`${pos.negativeSign} deleted successfuly`);
    });
  }

  onInputTerm() {
    this.debounceFunc();
  }

  filter() {
    const term = this.term.trim();
    this.negativeArrFiltered = this.negativeArr.filter((x) =>
      _.includes(x.negativeSign, term)
    );
  }

  filterAdv(term: string) {
    return this.negativeArr.filter((x) =>
      _.includes(x.negativeSign, term.trim())
    );
  }

  onSubmit() {
    const value: Negative = this.negativeForm.value;
    this.posService.addNegative(value).then((_) => {
      this.router.navigate(['/preferences/negative']);
    });
    this.negativeForm.reset();
  }

  getpos(id: string) {
    this.posService.getNegative(id);
  }
}
