import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { User, Chemicals } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage {

  image: String;
  user: User;

  constructor(
    private authService: AuthenticationService,
    public http: HttpClient,
    public apiService: ApiService,
  ) {
    this.getUserList();

    let systemDark = window.matchMedia("(prefers-color-scheme: dark)");

    if (systemDark.matches) {
      this.image = '/assets/logo_dark.png';
    }
    else {
      this.image = '/assets/logo.png';
    }

  }
  ngOnInit() {
  }

  getUserList() {
    console.log(this.authService.token);
    this.apiService
      .getUser(this.authService.token)
      .subscribe((data: any) => {
        this.user = data;
        console.log(this.user);
      })
  }
}
