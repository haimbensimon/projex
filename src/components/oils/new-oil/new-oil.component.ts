import { SimptomsService } from '../../../services/simptoms.service';
import { OilServiceService } from '../../../services/oil-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Oil } from '../../../models/Oil';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-new-oil',
  templateUrl: './new-oil.component.html',
  styleUrls: ['./new-oil.component.css']
})
export class NewOilComponent implements OnInit {
  Negative$!: Observable<any[]>;
  Positive$!: Observable<any[]>;
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
    warning: new FormControl(null, [Validators.required]),
    imgUrl: new FormControl(null),

    food: new FormControl(null),
    external: new FormControl(null),
    aroma: new FormControl(null),
    takeCare: new FormControl(null),
    goodFor: new FormControl(null),
    description: new FormControl(null),
  });
  constructor(
    private oilsService: OilServiceService,
    private router: Router,
    private simSer: SimptomsService
  ) {}

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
  }

  ngSubmit() {
    const value: Oil = this.formGroup.value;
    this.oilsService.addOil(value).then((_) => {
      this.router.navigate(['/oils']);
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
