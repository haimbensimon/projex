import { PointProblemService } from '../../../services/point-problem.service';
import { Point } from './../../../models/Point';
import { PointService } from '../../../services/point.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-edit-point',
  templateUrl: './edit-point.component.html',
  styleUrls: ['./edit-point.component.css']
})
export class EditPointComponent implements OnInit {
  headList$!: any[];
  neckList$!: any[];
  armsList$!: any[];
  bodyList$!: any[];
  sexsualList$!: any[];
  legsList$!:any[];
  internalList$!: any[];
  backList$!: any[];
  globalList$!: any[];
  spiritList$!: any[];

  points$!: Observable<Point | null>;
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
    id: new FormControl(null),
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
    private simSer: PointProblemService,
    private activatedRoute: ActivatedRoute
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

    const id = this.activatedRoute.snapshot.params['id'];
    this.points$ = this.oilsService.getpoint(id);

    this.points$.subscribe((cust) => {
      if (cust === null) {
        return;
      } else {
        this.formGroup.get('id')?.setValue(cust.id);
        this.formGroup.get('point')?.setValue(cust.point);
        this.formGroup.get('Name')?.setValue(cust.Name);
        this.formGroup.get('mirror1')?.setValue(cust.mirror1);
        this.formGroup.get('description')?.setValue(cust.description);
        this.formGroup.get('mirror2')?.setValue(cust.mirror2);
        this.formGroup.get('mirror3')?.setValue(cust.mirror3);
        this.formGroup.get('mirror4')?.setValue(cust.mirror4);
        this.formGroup.get('mirror5')?.setValue(cust.mirror5);
        this.formGroup.get('imgUrl')?.setValue(cust.imgUrl);
        this.formGroup.get('location')?.setValue(cust.location);
        this.formGroup.get('mainMrd')?.setValue(cust.mainMrd);
        this.formGroup.get('secMrd')?.setValue(cust.secMrd);
        this.formGroup.get('headList')?.setValue(cust.headList);
        this.formGroup.get('neckList')?.setValue(cust.neckList);
        this.formGroup.get('armsList')?.setValue(cust.armsList);
        this.formGroup.get('backList')?.setValue(cust.backList);
        this.formGroup.get('bodyList')?.setValue(cust.bodyList);
        this.formGroup.get('legsList')?.setValue(cust.legsList);
        this.formGroup.get('sexsualList')?.setValue(cust.sexsualList);
        this.formGroup.get('internalList')?.setValue(cust.internalList);
        this.formGroup.get('globalList')?.setValue(cust.globalList);
        this.formGroup.get('spiritList')?.setValue(cust.spiritList);
      }
    });
  }

  ngSubmit() {
    const value: Point = this.formGroup.value;
    console.log(value);
    this.oilsService.updatepoint(value).then((_) => {
      this.router.navigate(['/points']);
    });
    // console.log(value);
  }

  onClear() {
    // this.formGroup.reset(this.initObj);
  }

  onSetValue() {
    //this.formGroup.setValue(this.initObj);
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
