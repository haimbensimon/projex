import { Observable } from 'rxjs';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/User';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'projex';
  role: boolean = false;
  isLogin: boolean = false;
  userEmail!: string;
  currentUser!: User;
  users$!: User[];

  // oilp:0,
  // pointp:0,
  // doublep:0,

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.auth.getAuth().subscribe((user) => {
      this.isLogin = !!user;
      this.userEmail = user?.email as string;
    });

    this.auth.users$.subscribe((users) => {
      this.users$ = users;
      if (this.users$.length > 0) {
        for (let i = 0; i < this.users$.length; i++) {
          if (this.users$[i].email == this.userEmail) {
            console.log(this.users$[i].roles.admin);
            this.role = this.users$[i].roles.admin;
            this.auth.myRole = this.role;
            this.auth.curUser = this.users$[i].email;
            this.auth.oilp =this.users$[i].oilp;
            this.auth.pointp=this.users$[i].pointp;
            this.auth.doublep=this.users$[i].doublep;
            this.auth.id = this.users$[i].id;
            this.auth.thisUser = this.users$[i];
          }
        }
      }
    });




  }
}
