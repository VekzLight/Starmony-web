import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  activeForm: boolean;

  constructor() {
    this.activeForm = false;
   }

  ngOnInit(): void {
  }

  changeActive () {
    this.activeForm = !this.activeForm;
  }
}
