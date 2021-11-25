import { AuthService } from '../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.css']
})
export class PreferenceComponent implements OnInit {
  mrole!: boolean;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.mrole = this.auth.myRole;
  }
}
