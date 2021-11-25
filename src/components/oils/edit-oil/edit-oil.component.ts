import { SimptomsService } from '../../../services/simptoms.service';
import { OilServiceService } from '../../../services/oil-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Oil } from '../../../models/Oil';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-edit-oil',
  templateUrl: './edit-oil.component.html',
  styleUrls: ['./edit-oil.component.css']
})
export class EditOilComponent implements OnInit {
  Negative$!: Observable<any[]>;
  Positive$!: Observable<any[]>;
  Oils$!: Observable<Oil | null>;
  ////////////////
  nlist!: string[];
  flist!: string[];
  ooo!: string;
  //////////////
  flag!: string;

  initObj = {
    HeName: 'string',
    EnName: 'oil',
    goodFor: [],
    takeCare: [],
    description: 'string',
    warning: 'string',

    food: 'string',
    external: 'string',
    aroma: 'string',

    imgUrl: 'string',
  };

  formGroup: FormGroup = new FormGroup({
    HeName: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
    ]),
    EnName: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
    ]),
    warning: new FormControl(null),
    imgUrl: new FormControl(null),
    id: new FormControl(null),

    food: new FormControl(null),
    external: new FormControl(null),
    aroma: new FormControl(null),
    takeCare: new FormControl(null),
    goodFor: new FormControl(null),
    description: new FormControl(null),
  });
  constructor(
    private activatedRoute: ActivatedRoute,
    private oilsService: OilServiceService,
    private router: Router,
    private simSer: SimptomsService
  ) {
    //  this.formGroup.setValue(this.initObj);
  }

  ngOnInit(): void {
    this.Negative$ = this.simSer.negative$;
    this.Positive$ = this.simSer.positive$;
    this.Negative$.pipe(
      map((x: any) => {
        const rtn = x.map((n: any) => {
          return { id: n.id, negativeSign: n.negativeSign };
        });
        return rtn;
      })
    ).subscribe((x) => {
      this.nlist = x;
    });
    const id = this.activatedRoute.snapshot.params['id'];
    this.Oils$ = this.oilsService.getOil(id);

    this.Oils$.subscribe((cust) => {
      if (cust === null) {
        return;
      } else {
        this.formGroup.get('id')?.setValue(cust.id);
        this.formGroup.get('HeName')?.setValue(cust.HeName);
        this.formGroup.get('EnName')?.setValue(cust.EnName);
        this.formGroup.get('aroma')?.setValue(cust.aroma);
        this.formGroup.get('description')?.setValue(cust.description);
        this.formGroup.get('external')?.setValue(cust.external);
        this.formGroup.get('food')?.setValue(cust.food);
        this.formGroup.get('imgUrl')?.setValue(cust.imgUrl);
        this.formGroup.get('warning')?.setValue(cust.warning);
        this.formGroup.get('goodFor')?.setValue(cust.goodFor);
        this.formGroup.get('takeCare')?.setValue(cust.takeCare);
      }
    });
  }

  ngSubmit() {
    const value: Oil = this.formGroup.value;
    console.log(value);
    this.oilsService.updateOil(value).then((_) => {
      this.router.navigate(['/oils']);
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
