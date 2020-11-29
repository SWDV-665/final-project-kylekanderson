import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Chemicals, User } from '../models/user';
import { Chemical } from '../models/chemical';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { flatMap, retry, catchError, map } from 'rxjs/operators';
import * as $ from 'jquery';


@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage {

  chemicalList: Chemical;
  data: User;
  image: String;
  user: User;

  constructor(
    private authService: AuthenticationService,
    public http: HttpClient,
    public apiService: ApiService,
    public router: Router
  ) {

    let systemDark = window.matchMedia("(prefers-color-scheme: dark)");

    if (systemDark.matches) {
      this.image = '/assets/logo_dark.png';
    }
    else {
      this.image = '/assets/logo.png';
    }
  }

  ionViewDidEnter() {
    $(':input').attr('data-lpignore', true);
    this.getUser();
    this.getChemicals();
  }


  getUser() {
    this.http.get(this.apiService.user_base_path + '/' + this.authService.token).subscribe((response: any) => {
      this.user = response;
      console.log(this.user);
    })
  }

  getChemicals() {
    this.http.get(this.apiService.chemicals_base_path).subscribe((response: any) => {
      this.chemicalList = response;
      console.log(this.chemicalList);
    })
  }

  submitForm(form) {
    console.log(form);
    let chemicals = new Chemicals(form.value.chlorine, form.value.ph_up, form.value.ph_down, form.value.alkalinity_up, form.value.alkalinity_down, form.value.calcium_up, form.value.calcium_down);
    let user = new User(form.value.user_name, form.value.email, 'password', form.value.name, form.value.pool_gallons, form.value.pool_type, form.value.target_chlorine, form.value.target_ph, form.value.target_alkalinity, form.value.target_calcium, form.value.target_cyanuric_acid, chemicals);
    console.log(chemicals);
    console.log(user);
    this.apiService.updateUser(this.authService.token, user).subscribe((response) => {
      console.log(response);
      this.router.navigate(['/tabs/readings']);
    });
  }


  // getUserList() {
  //   console.log(this.authService.token);
  //   this.apiService
  //     .getUser(this.authService.token)
  //     .subscribe((data: any) => {
  //       this.user = data;
  //       console.log(this.user);
  //     })
  // }

}

