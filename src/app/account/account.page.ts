import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { User, Chemicals } from '../models/user';



@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage {

  image: String;
  user: User[];
  chemicals: Chemicals[];

  constructor(
    public http: HttpClient,
    public apiService: ApiService,
  ) {

    let systemDark = window.matchMedia("(prefers-color-scheme: dark)");

    if (systemDark.matches) {
      this.image = '/assets/logo_dark.png';
    }
    else {
      this.image = '/assets/logo.png';
    }

  }
  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.apiService
      .getUserList()
      .subscribe((data: any) => {
        console.log(data);
        this.user = data;
        this.chemicals = data[0].chemicals;
        console.log(this.chemicals);
      })
  }
}
