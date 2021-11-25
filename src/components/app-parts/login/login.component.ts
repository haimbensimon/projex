import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}
  email: string = '';
  password: string = '';

  ngOnInit(): void {
    this.auth.getAuth().subscribe((auth) => {
      if (auth) this.router.navigate(['/']);
    });
  }

  onSubmit({ value, valid }: NgForm) {
    if (valid) {
      const { email, password } = value;
      this.auth
        .login(email, password)
        .then((_) => console.log('success'))
        .then((_) => this.router.navigate(['/']))
        .catch((_) => alert('failed'));
    }
  }

}
