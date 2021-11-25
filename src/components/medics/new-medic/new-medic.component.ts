
import { Point } from './../../../models/Point';
import { PointService } from '../../../services/point.service';
import { PointProblemService } from '../../../services/point-problem.service';
import { MedicalService } from '../../../services/medical.service';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Customer } from '../../../models/Customer';
import { CustomersService } from '../../../services/customers.service';
import { SimptomsService } from '../../../services/simptoms.service';
import { OilServiceService } from '../../../services/oil-service.service';
import { Medic } from '../../../models/Medic';
import { Oil } from '../../../models/Oil';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { takeWhile } from 'lodash';
import { AuthService } from '../../../services/auth.service';
import { MAT_PAGINATOR_INTL_PROVIDER_FACTORY } from '@angular/material/paginator';
import { ArmsNegative, backNegative, BodyNegative, globalNegative, headNegative, InternalNegative, LegsNegative, NeckNegative, Negative, Positive, SexsualNegative, SpiritNegative } from 'src/models/Simptom';
@Component({
  selector: 'app-new-medic',
  templateUrl: './new-medic.component.html',
  styleUrls: ['./new-medic.component.css']
})
export class NewMedicComponent implements OnInit {
  custID!: string;
  customer$!: Observable<Customer | null>;
  Negative$!: any[];
  Positive$!: any[];

  headList!: any[];
  neckList$!: any[];
  armsList$!:any[];
  bodyList$!: any[];
  sexsualList$!: any[];
  legsList$!: any[];
  internalList$!: any[];
  backList$!: any[];
 // globalList$!: Observable<any[]>;
  spiritList$!: any[];

  glob!:any[];

  Oils!: any[];
  Points!: any[];

  initMdc = {
    custId: '',
    firstName: '',
    lastName: '',
    painList: [],
    goodList: [],
    oilArr: [],
    points: [],
    theDate: '',
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
    totalPrice:0,
  };
  plist!: { goodFor: string; takeCare: string }[];

  filterlist: string[] = [];
  pointFilter: string[] = [];
  pointsArr: string[] = [];
  pAr: [] = [];
  oilArr: string[] = [];
  customerCollection!: AngularFirestoreCollection<Customer>;
  formGroup: FormGroup = new FormGroup({
    custId: new FormControl(''),
    curUser: new FormControl(null),
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    theDate: new FormControl(''),
    painList: new FormArray([]),
    painPointList: new FormArray([]),
    oilArr: new FormArray([]),
    pointsFA: new FormArray([]),
    //pointsFAid: new FormArray([]),
    head: new FormControl(null),
    neck: new FormControl(null),
    arms: new FormControl(null),
    body: new FormControl(null),
    back: new FormControl(null),
    legs: new FormControl(null),
    sexs: new FormControl(null),
    intr: new FormControl(null),
    sprt: new FormControl(null),
    glbl: new FormControl(null),
    totalPrice:new FormControl(null),
  });
  constructor(
    private activatedRoute: ActivatedRoute,
    private customers: CustomersService,
    private router: Router,
    private simSer: SimptomsService,
    private oilsService: OilServiceService,
    private medicalService: MedicalService,
    private afs: AngularFirestore,
    private pntService: PointProblemService,
    private pointSer: PointService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.formGroup.get('curUser')?.setValue(this.auth.curUser);
    this.customerCollection = this.afs.collection('customers');
    const id = this.activatedRoute.snapshot.params['id'];
    this.custID = id;
    this.customer$ = this.customers.getCustomer(id);
    //this.Negative$ = this.simSer.negative$;
   // this.Positive$ = this.simSer.positive$;

    this.simSer.positive$.subscribe((list) => {
      list.sort((a:Positive,b:Positive) => {
        if (a.positiveSign < b.positiveSign) {
          return -1;
        }
        if (a.positiveSign > b.positiveSign) {
          return 1;
        }
        return 0;
      })
      this.Positive$ = list;
    })


    this.simSer.negative$.subscribe((list) => {
      list.sort((a:Negative,b:Negative) => {
        if (a.negativeSign < b.negativeSign) {
          return -1;
        }
        if (a.negativeSign > b.negativeSign) {
          return 1;
        }
        return 0;
      })
      this.Negative$ = list;
    })


   // this.headList$ = this.pntService.headP$;
   // this.neckList$ = this.pntService.neckP$;
   // this.armsList$ = this.pntService.armsP$;
   // this.bodyList$ = this.pntService.bodyP$;
   // this.sexsualList$ = this.pntService.sexsualP$;
   // this.legsList$ = this.pntService.legsP$;
   // this.internalList$ = this.pntService.internalP$;
   // this.backList$ = this.pntService.backP$;
   // this.globalList$ = this.pntService.globalP$;
   // this.spiritList$ = this.pntService.spiritP$;

   this.pntService.backP$.subscribe((list) => {
    list.sort((a:backNegative,b:backNegative) => {
      if (a.negativeSign < b.negativeSign) {
        return -1;
      }
      if (a.negativeSign > b.negativeSign) {
        return 1;
      }
      return 0;
    })
    this.backList$ = list;
  })

  this.pntService.spiritP$.subscribe((list) => {
    list.sort((a:SpiritNegative,b:SpiritNegative) => {
      if (a.negativeSign < b.negativeSign) {
        return -1;
      }
      if (a.negativeSign > b.negativeSign) {
        return 1;
      }
      return 0;
    })
    this.spiritList$ = list;
  })



///////////////////////
    this.pntService.internalP$.subscribe((list) => {
      list.sort((a:InternalNegative,b:InternalNegative) => {
        if (a.negativeSign < b.negativeSign) {
          return -1;
        }
        if (a.negativeSign > b.negativeSign) {
          return 1;
        }
        return 0;
      })
      this.internalList$ = list;
    })

    this.pntService.legsP$.subscribe((list) => {
      list.sort((a:LegsNegative,b:LegsNegative) => {
        if (a.negativeSign < b.negativeSign) {
          return -1;
        }
        if (a.negativeSign > b.negativeSign) {
          return 1;
        }
        return 0;
      })
      this.legsList$ = list;
    })

    this.pntService.sexsualP$.subscribe((list) => {
      list.sort((a:SexsualNegative,b:SexsualNegative) => {
        if (a.negativeSign < b.negativeSign) {
          return -1;
        }
        if (a.negativeSign > b.negativeSign) {
          return 1;
        }
        return 0;
      })
      this.sexsualList$ = list;

      console.log(this.glob);
    })

    this.pntService.bodyP$.subscribe((list) => {
      list.sort((a:BodyNegative,b:BodyNegative) => {
        if (a.negativeSign < b.negativeSign) {
          return -1;
        }
        if (a.negativeSign > b.negativeSign) {
          return 1;
        }
        return 0;
      })
      this.bodyList$ = list;

      console.log(this.glob);
    })

    this.pntService.armsP$.subscribe((list) => {
      list.sort((a:ArmsNegative,b:ArmsNegative) => {
        if (a.negativeSign < b.negativeSign) {
          return -1;
        }
        if (a.negativeSign > b.negativeSign) {
          return 1;
        }
        return 0;
      })
      this.armsList$ = list;

      console.log(this.glob);
    })

    this.pntService.neckP$.subscribe((list) => {
      list.sort((a:NeckNegative,b:NeckNegative) => {
        if (a.negativeSign < b.negativeSign) {
          return -1;
        }
        if (a.negativeSign > b.negativeSign) {
          return 1;
        }
        return 0;
      })
      this.neckList$ = list;

      console.log(this.glob);
    })

    this.pntService.headP$.subscribe((list) => {
      list.sort((a:headNegative,b:headNegative) => {
        if (a.negativeSign < b.negativeSign) {
          return -1;
        }
        if (a.negativeSign > b.negativeSign) {
          return 1;
        }
        return 0;
      })
      this.headList = list;

      console.log(this.glob);
    })



    this.oilsService.oils$.subscribe((oils) => {
      this.Oils = oils;
    });

    this.pointSer.points$.subscribe((points) => {
      this.Points = points;
    });

    this.pntService.globalP$.subscribe((list) => {
      list.sort((a:globalNegative,b:globalNegative) => {
        if (a.negativeSign < b.negativeSign) {
          return -1;
        }
        if (a.negativeSign > b.negativeSign) {
          return 1;
        }
        return 0;
      })
      this.glob = list;

      console.log(this.glob);
    })

    this.customer$.subscribe((cust) => {
      if (cust === null) {
        return;
      } else {
        this.initMdc.firstName = cust.firstName;
        this.initMdc.lastName = cust.lastName;
        this.initMdc.theDate = this.getDoday();
        this.formGroup.get('custId')?.setValue(cust.id);
        this.formGroup.get('firstName')?.setValue(cust.firstName);
        this.formGroup.get('lastName')?.setValue(cust.lastName);
        this.formGroup.get('theDate')?.setValue(this.getDoday());
      }
    });


  }

  ngSubmit() {
    this.onMedic();
    const a = this.oilArr
    const b = this.pointsArr
    console.log(a.length);
    console.log(b.length);
    if(a.length ==0 && b.length  > 0){
      this.formGroup.get('totalPrice')?.setValue(this.auth.thisUser.pointp);
    }else if(a.length > 0 &&  b.length > 0){
      this.formGroup.get('totalPrice')?.setValue(this.auth.thisUser.doublep);
    }else if(a.length > 0 &&  b.length == 0){
      this.formGroup.get('totalPrice')?.setValue(this.auth.thisUser.oilp);
    }else{
      this.formGroup.get('totalPrice')?.setValue(0);
    }

    const value: Medic = this.formGroup.value;
    this.medicalService.addMedic(value).then((_) => {
      this.router.navigate(['/medical']);
    });

    // console.log(value);
  }

  ///

  onClear() {
    this.formGroup.reset(this.initMdc);
  }

  onSetValue() {
    this.formGroup.setValue(this.initMdc);
  }

  public get painList(): AbstractControl[] {
    const rtn = this.formGroup.get('painList') as FormArray;
    return rtn.controls;
  }

  addProblem() {
    const FGControls: { [key: string]: AbstractControl } = {
      takeCare: new FormControl(null),
      goodFor: new FormControl(null),
    };

    (<FormArray>this.formGroup.get('painList')).push(new FormGroup(FGControls));
  }
  addPointProblem(ps: string) {
    const FGControls: { [key: string]: AbstractControl } = {
      simptoms: new FormControl(ps),
    };

    (<FormArray>this.formGroup.get('painPointList')).push(
      new FormGroup(FGControls)
    );
  }

  addOiltolist(oil: string) {
    const FGControls: { [key: string]: AbstractControl } = {
      oil: new FormControl(oil),
    };

    (<FormArray>this.formGroup.get('oilArr')).push(new FormGroup(FGControls));
  }
  addPointTolist(po: string, id: string) {
    const FGControls: { [key: string]: AbstractControl } = {
      point: new FormControl(po),
      pointID: new FormControl(id),
    };

    (<FormArray>this.formGroup.get('pointsFA')).push(new FormGroup(FGControls));
  }
  addPointIdTolist(id: string) {
    const FGControls: { [key: string]: AbstractControl } = {
      pointID: new FormControl(id),
    };

    (<FormArray>this.formGroup.get('pointsFAid')).push(
      new FormGroup(FGControls)
    );
  }

  // deleteHobbie(i: number) {
  //   (<FormArray>this.formGroup.get('painList')).removeAt(i);
  // }
  getObjData(obj: any) {
    return JSON.stringify(obj);
  }

  onMedic() {
    this.plist = this.formGroup.get('painList')?.value;
    this.plist.forEach((p) => {
      this.filterlist.push(p.goodFor);
      this.filterlist.push(p.takeCare);
    });
    if (this.formGroup.get('head')?.value != null) {
      this.formGroup.get('head')?.value.forEach((element: string) => {
        this.pointFilter.push(element);
      });
    }

    if (this.formGroup.get('neck')?.value != null) {
      this.formGroup.get('neck')?.value.forEach((element: string) => {
        this.pointFilter.push(element);
      });
    }

    if (this.formGroup.get('arms')?.value != null) {
      this.formGroup.get('arms')?.value.forEach((element: string) => {
        this.pointFilter.push(element);
      });
    }
    if (this.formGroup.get('body')?.value != null) {
      this.formGroup.get('body')?.value.forEach((element: string) => {
        this.pointFilter.push(element);
      });
    }
    if (this.formGroup.get('back')?.value != null) {
      this.formGroup.get('back')?.value.forEach((element: string) => {
        this.pointFilter.push(element);
      });
    }
    if (this.formGroup.get('sexs')?.value != null) {
      this.formGroup.get('sexs')?.value.forEach((element: string) => {
        this.pointFilter.push(element);
      });
    }
    if (this.formGroup.get('legs')?.value != null) {
      this.formGroup.get('legs')?.value.forEach((element: string) => {
        this.pointFilter.push(element);
      });
    }
    if (this.formGroup.get('intr')?.value != null) {
      this.formGroup.get('intr')?.value.forEach((element: string) => {
        this.pointFilter.push(element);
      });
    }
    if (this.formGroup.get('glbl')?.value != null) {
      this.formGroup.get('glbl')?.value.forEach((element: string) => {
        this.pointFilter.push(element);
      });
    }
    if (this.formGroup.get('sprt')?.value != null) {
      this.formGroup.get('sprt')?.value.forEach((element: string) => {
        this.pointFilter.push(element);
      });
    }

    if (this.pointFilter.length > 0) {
      this.pointFilter.forEach((ps) => {
        this.addPointProblem(ps);
      });
    }

    // console.log(this.pointFilter);

    this.pointFilter.forEach((c) => {
      this.Points.forEach((point) => {
        //   console.log(point.point);
        if (point.headList != null) {
          for (let i = 0; i < point.headList.length; i++) {
            if (point.headList[i] == c) {
              if (this.pointsArr.indexOf(point.point) == -1) {
                this.pointsArr.push(point.point);
                this.addPointTolist(point.point, point.id);
                // this.addPointIdTolist(point.id);
              }
            }
          }
        }
      });
    });

    this.pointFilter.forEach((c) => {
      this.Points.forEach((point) => {
        //  console.log(point.point);
        if (point.neckList != null) {
          for (let i = 0; i < point.neckList.length; i++) {
            if (point.neckList[i] == c) {
              if (this.pointsArr.indexOf(point.point) == -1) {
                this.pointsArr.push(point.point);
                this.addPointTolist(point.point, point.id);
                //this.addPointIdTolist(point.id);
              }
            }
          }
        }
      });
    });

    this.pointFilter.forEach((c) => {
      this.Points.forEach((point) => {
        //  console.log(point.point);
        if (point.armsList != null) {
          for (let i = 0; i < point.armsList.length; i++) {
            if (point.armsList[i] == c) {
              if (this.pointsArr.indexOf(point.point) == -1) {
                this.pointsArr.push(point.point);
                this.addPointTolist(point.point, point.id);
                // this.addPointIdTolist(point.id);
              }
            }
          }
        }
      });
    });

    this.pointFilter.forEach((c) => {
      this.Points.forEach((point) => {
        //  console.log(point.point);
        if (point.bodyList != null) {
          for (let i = 0; i < point.bodyList.length; i++) {
            if (point.bodyList[i] == c) {
              if (this.pointsArr.indexOf(point.point) == -1) {
                this.pointsArr.push(point.point);
                this.addPointTolist(point.point, point.id);
                //  this.addPointIdTolist(point.id);
              }
            }
          }
        }
      });
    });
    this.pointFilter.forEach((c) => {
      this.Points.forEach((point) => {
        //  console.log(point.point);
        if (point.backList != null) {
          for (let i = 0; i < point.backList.length; i++) {
            if (point.backList[i] == c) {
              if (this.pointsArr.indexOf(point.point) == -1) {
                this.pointsArr.push(point.point);
                this.addPointTolist(point.point, point.id);
                //  this.addPointIdTolist(point.id);
              }
            }
          }
        }
      });
    });

    this.pointFilter.forEach((c) => {
      this.Points.forEach((point) => {
        //   console.log(point.point);
        if (point.legsList != null) {
          for (let i = 0; i < point.legsList.length; i++) {
            if (point.legsList[i] == c) {
              if (this.pointsArr.indexOf(point.point) == -1) {
                this.pointsArr.push(point.point);
                this.addPointTolist(point.point, point.id);
                //  this.addPointIdTolist(point.id);
              }
            }
          }
        }
      });
    });

    this.pointFilter.forEach((c) => {
      this.Points.forEach((point) => {
        // console.log(point.point);
        if (point.globalList != null) {
          for (let i = 0; i < point.globalList.length; i++) {
            if (point.globalList[i] == c) {
              if (this.pointsArr.indexOf(point.point) == -1) {
                this.pointsArr.push(point.point);
                this.addPointTolist(point.point, point.id);
                //this.addPointIdTolist(point.id);
              }
            }
          }
        }
      });
    });

    this.pointFilter.forEach((c) => {
      this.Points.forEach((point) => {
        //   console.log(point.point);
        if (point.internalList != null) {
          for (let i = 0; i < point.internalList.length; i++) {
            if (point.internalList[i] == c) {
              if (this.pointsArr.indexOf(point.point) == -1) {
                this.pointsArr.push(point.point);
                this.addPointTolist(point.point, point.id);
                // this.addPointIdTolist(point.id);
              }
            }
          }
        }
      });
    });

    this.pointFilter.forEach((c) => {
      this.Points.forEach((point) => {
        //  console.log(point.point);
        if (point.sexsualList != null) {
          for (let i = 0; i < point.sexsualList.length; i++) {
            if (point.sexsualList[i] == c) {
              if (this.pointsArr.indexOf(point.point) == -1) {
                this.pointsArr.push(point.point);
                this.addPointTolist(point.point, point.id);
                //this.addPointIdTolist(point.id);
              }
            }
          }
        }
      });
    });

    this.pointFilter.forEach((c) => {
      this.Points.forEach((point) => {
        // console.log(point.point);
        if (point.spiritList != null) {
          for (let i = 0; i < point.spiritList.length; i++) {
            if (point.spiritList[i] == c) {
              if (this.pointsArr.indexOf(point.point) == -1) {
                this.pointsArr.push(point.point);
                this.addPointTolist(point.point, point.id);
                // this.addPointIdTolist(point.id);
              }
            }
          }
        }
      });
    });

    this.filterlist.forEach((w) => {
      this.Oils.forEach((oil) => {
        for (let i = 0; i < oil.takeCare.length; i++) {
          if (oil.takeCare[i] == w) {
            console.log('find : ' + oil.EnName);
            console.log(this.oilArr.indexOf(oil.EnName));
            if (this.oilArr.indexOf(oil.EnName + ' - ' + oil.HeName) == -1) {
              this.oilArr.push(oil.EnName + ' - ' + oil.HeName);
              this.addOiltolist(oil.EnName + ' - ' + oil.HeName);
            }
          }
        }
      });
    });

    this.filterlist.forEach((w) => {
      this.Oils.forEach((oil) => {
        for (let i = 0; i < oil.goodFor.length; i++) {
          if (oil.goodFor[i] == w) {
            console.log('find : ' + oil.EnName);
            console.log(this.oilArr.indexOf(oil.EnName));
            if (this.oilArr.indexOf(oil.EnName + ' - ' + oil.HeName) == -1) {
              this.oilArr.push(oil.EnName + ' - ' + oil.HeName);
              this.addOiltolist(oil.EnName + ' - ' + oil.HeName);
            }
          }
        }
      });
    });

    // this.formGroup.get('points')?.setValue(this.pointsArr);
  }

  getDoday() {
    const d = new Date().getDate().toString();
    const m = (new Date().getMonth() + 1).toString();
    const y = new Date().getFullYear().toString();
    return d + '/' + m + '/' + y;
  }

}
