import { PointProblemService } from '../../../services/point-problem.service';
import { Point } from './../../../models/Point';
import { PointService } from '../../../services/point.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-new-point',
  templateUrl: './new-point.component.html',
  styleUrls: ['./new-point.component.css']
})
export class NewPointComponent implements OnInit {
  headList$!: any[];
  neckList$!: any[];
  armsList$!: any[];
  bodyList$!: any[];
  sexsualList$!:any[];
  legsList$!: any[];
  internalList$!: any[];
  backList$!: any[];
  globalList$!: any[];
  spiritList$!: any[];
  ////////////////
  // nlist!: string[];
  // flist!: string[];
  // ooo!: string;
  //////////////
  flag!: string;

  initObj = {
    id: 'string',
    point: 'string',
    Name: 'string',
    description: 'string',
    mainMrd: 'string',
    imgUrl: 'string',
    secMrd: 'string',
    mirror1: 'string',
    mirror2: 'string',
    mirror3: 'string',
    mirror4: 'string',
    mirror5: 'string',
    location: 'string',
    headList: 'string[]',
    neckList: 'string[]',
    armsList: 'string[]',
    bodyList: 'string[]',
    sexsualList: 'string[]',
    legsList: 'string[]',
    internalList: 'string[]',
    backList: 'string[]',
    globalList: 'string[]',
    spiritList: 'string[]',
  };

  formGroup: FormGroup = new FormGroup({
    point: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
    ]),
    Name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    description: new FormControl(null),
    imgUrl: new FormControl(null),
    mainMrd: new FormControl(null),
    secMrd: new FormControl(null),
    mirror1: new FormControl(null),
    mirror2: new FormControl(null),
    mirror3: new FormControl(null),
    mirror4: new FormControl(null),
    mirror5: new FormControl(null),
    location: new FormControl(null),
    headList: new FormControl(null),
    neckList: new FormControl(null),
    armsList: new FormControl(null),
    bodyList: new FormControl(null),
    sexsualList: new FormControl(null),
    legsList: new FormControl(null),
    internalList: new FormControl(null),
    backList: new FormControl(null),
    globalList: new FormControl(null),
    spiritList: new FormControl(null),
  });
  constructor(
    private oilsService: PointService,
    private router: Router,
    private simSer: PointProblemService
  ) {}

  ngOnInit(): void {
    this.headList$ = this.simSer.headP;
    this.neckList$ = this.simSer.neckP;
    this.armsList$ = this.simSer.armsP;
    this.bodyList$ = this.simSer.bodyP;
    this.sexsualList$ = this.simSer.sexsualP;
    this.legsList$ = this.simSer.legsP;
    this.internalList$ = this.simSer.internalP;
    this.backList$ = this.simSer.backP;
    this.globalList$ = this.simSer.glb$;
    this.spiritList$ = this.simSer.spiritP;

    // this.headList$.pipe(
    //   map((x: any) => {
    //     const rtn = x.map((n: any) => {
    //       return { id: n.id, negativeSign: n.negativeSign };
    //     });
    //     return rtn;
    //   })
    // ).subscribe((x) => {
    //    x;
    // });
  }

  ngSubmit() {
    const value: Point = this.formGroup.value;
    this.oilsService.addpoint(value).then((_) => {
      this.router.navigate(['/points']);
    });
  }

  onClear() {}

  onSetValue() {}

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

}
