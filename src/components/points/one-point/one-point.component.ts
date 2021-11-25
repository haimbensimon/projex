
import { PointProblemService } from '../../../services/point-problem.service';
import { Point } from '../../../models/Point';
import { PointService } from '../../../services/point.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { Observable } from 'rxjs';
@Component({
  selector: 'app-one-point',
  templateUrl: './one-point.component.html',
  styleUrls: ['./one-point.component.css']
})
export class OnePointComponent implements OnInit {
  headList$!: Observable<any[]>;
  neckList$!: Observable<any[]>;
  armsList$!: Observable<any[]>;
  bodyList$!: Observable<any[]>;
  sexsualList$!: Observable<any[]>;
  legsList$!: Observable<any[]>;
  internalList$!: Observable<any[]>;
  backList$!: Observable<any[]>;
  globalList$!: Observable<any[]>;
  spiritList$!: Observable<any[]>;

  points$!: Observable<Point | null>;
  myPoint:Point={
  id: 'string',
  point: 'string',
  Name: '',
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
  headList: [],
  neckList:[],
  armsList: [],
  bodyList: [],
  sexsualList: [],
  legsList: [],
  internalList: [],
  backList: [],
  globalList:[],
  spiritList: [],
};
  flag!: string;


  constructor(
    private oilsService: PointService,
    private router: Router,
    private simSer: PointProblemService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.headList$ = this.simSer.headP$;
    this.neckList$ = this.simSer.neckP$;
    this.armsList$ = this.simSer.armsP$;
    this.bodyList$ = this.simSer.bodyP$;
    this.sexsualList$ = this.simSer.sexsualP$;
    this.legsList$ = this.simSer.legsP$;
    this.internalList$ = this.simSer.internalP$;
    this.backList$ = this.simSer.backP$;
    this.globalList$ = this.simSer.globalP$;
    this.spiritList$ = this.simSer.spiritP$;


    const id = this.activatedRoute.snapshot.params['id'];
    this.points$ = this.oilsService.getpoint(id);

    this.points$.subscribe((cust) => {
      if (cust === null) {
        return;
      } else {
        this.myPoint = cust;


      }
    });


  }

}
