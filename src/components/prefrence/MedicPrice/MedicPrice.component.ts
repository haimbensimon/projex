import { User, Role } from './../../../models/User';
import { PricesService } from './../../../services/prices.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Price } from 'src/models/User';
import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'app-MedicPrice',
  templateUrl: './MedicPrice.component.html',
  styleUrls: ['./MedicPrice.component.css']
})
export class MedicPriceComponent implements OnInit {

oilp:number | any =0;
pointp:number |any=0;
doublep:number|any=0;
mid!:string | any;
cu='';
myPrice: Price={
  oilp:0,
  pointp:0,
  doublep:0,
  curUsr:'',
};
prc!:Price[];
pc!:Price[];
usr!:User;
  constructor(private auth: AuthService,private pser:PricesService) { }




  ngOnInit() {
    this.usr = this.auth.thisUser;

    console.log(this.usr)



  }
  onPrice(){
    this.usr = this.auth.thisUser;
   console.log(this.usr)
   this.usr.oilp = this.oilp;
   this.usr.pointp=this.pointp;
   this.usr.doublep=this.doublep;
   console.log(this.usr)
   this.auth.updateUser(this.usr);


}
onUpdate(){
  this.usr = this.auth.thisUser;
  alert(` טיפול שמנים :${this.usr.oilp} טיפול בדיקור:${this.usr.pointp} טיפול משולב: ${this.usr.doublep}`)
}

onDelete(p:Price){

}
}
