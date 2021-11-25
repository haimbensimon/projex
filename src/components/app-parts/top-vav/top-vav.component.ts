import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-top-nav',
  templateUrl: './top-vav.component.html',
  styleUrls: ['./top-vav.component.css']
})
export class TopNav implements OnInit {
  @Input() isLogin: boolean = false;
  @Input() role: boolean = false;
  @Input() userEmail: string = 'user-email';
  opend =false;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }


  onExit() {
    this.auth.logout();
    this.router.navigate(['home']);
  }
}
