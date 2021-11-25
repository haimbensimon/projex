import { Observable } from 'rxjs';
import { MedicalService } from './../../../services/medical.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Medic } from 'src/models/Medic';

@Component({
  selector: 'app-view-one-medic',
  templateUrl: './view-one-medic.component.html',
  styleUrls: ['./view-one-medic.component.css']
})
export class ViewOneMedicComponent implements OnInit {
thisMedic!:Observable<Medic| null>;
Med:Medic = {
  custId: '',
  firstName: '',
  curUser: '',
  lastName: '',
  painList: [],
  goodList: [],
  oilArr: [],
  painPointList: [],
  pointsFA: [],
  head: [],
  neck: [],
  arms: [],
  body: [],
  back: [],
  legs: [],
  sexs: [],
  intr: [],
  sprt: [],
  glbl: [],
  theDate: new Date(),
}
  constructor(private activatedRoute: ActivatedRoute,private router: Router,private medSer:MedicalService) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.thisMedic = this.medSer.getMedic(id);
    this.thisMedic.subscribe((m) => {
      if(m != null){
        this.Med.firstName = m.firstName;
        this.Med.lastName  = m.lastName
        this.Med.arms = m.arms
        this.Med.back = m.back
        this.Med.body = m.body
        this.Med.glbl = m.glbl
        this.Med.goodList = m.goodList
        this.Med.head = m.head
        this.Med.intr = m.intr
        this.Med.legs = m.legs
        this.Med.neck = m.neck
        this.Med.oilArr = m.oilArr
        this.Med.painList = m.painList
        this.Med.painPointList = m.painPointList
        this.Med.pointsFA = m.pointsFA
        this.Med.sexs = m.sexs
        this.Med.sprt = m.sprt
        this.Med.theDate = m.theDate
        this.Med.totalPrice = m.totalPrice

      }

    })
    console.log(this.thisMedic)
  }

}
