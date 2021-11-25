import { SimptomsService } from '../../../services/simptoms.service';
import { OilServiceService } from '../../../services/oil-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Oil } from '../../../models/Oil';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-oil-details',
  templateUrl: './oil-details.component.html',
  styleUrls: ['./oil-details.component.css']
})
export class OilDetailsComponent implements OnInit {
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
  constructor(
    private activatedRoute: ActivatedRoute,
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
    const id = this.activatedRoute.snapshot.params['id'];
    this.Oils$ = this.oilsService.getOil(id);

    this.Oils$.subscribe((cust) => {
      if (cust === null) {
        return;
      } else {
        this.initObj.HeName = cust.HeName;
        this.initObj.EnName = cust.EnName;
        this.initObj.aroma = cust.aroma;
        this.initObj.description = cust.description;
        this.initObj.external = cust.external;
        this.initObj.food = cust.food;
        this.initObj.goodFor = cust.goodFor as any;
        this.initObj.imgUrl = cust.imgUrl;
        this.initObj.takeCare = cust.takeCare as any;
        this.initObj.warning = cust.warning;
      }
    });
  }

}
