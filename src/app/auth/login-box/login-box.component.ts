import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.scss']
})
export class LoginBoxComponent implements OnInit {
  currentTab: string = 'signin'
  constructor() { }

  ngOnInit(): void {

  }
  setCurrentTab(tab: string) {
    this.currentTab = tab;
  }
}
