import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}
  email: string = '';
  password: string = '';

  ngOnInit(): void {}

  onSubmit({ value, valid }: NgForm) {
    if (valid) {
      const { email, password } = value;
      this.auth
        .signIn(email, password)
        .then((_) => console.log('success'))
        .then((_) => this.router.navigate(['../login']))
        .catch((_) => alert('failed'));
    }
  }

}
