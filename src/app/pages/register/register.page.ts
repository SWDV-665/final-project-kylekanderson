import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from '../../services/authentication.service';
import { ApiService } from '../../services/api.service';
import { Chemicals, User } from '../../models/user';
import { Chemical } from '../../models/chemical';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  chemicalList: Chemical;

  constructor(
    private authService: AuthenticationService, 
    public http: HttpClient,
    private router: Router,
    public apiService: ApiService,
    ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getChemicals();
  }


  getChemicals() {
    this.http.get(this.apiService.chemicals_base_path).subscribe((response: any) => {
      this.chemicalList = response;
    })
  }

  register(form) {
    let chemicals = new Chemicals(form.value.chlorine, form.value.ph_up, form.value.ph_down, form.value.alkalinity_up, form.value.alkalinity_down, form.value.calcium_up, form.value.calcium_down);
    let user = new User(form.value.user_name, form.value.email, form.value.password, form.value.name, form.value.pool_gallons, form.value.pool_type, form.value.target_chlorine, form.value.target_ph, form.value.target_alkalinity, form.value.target_calcium, form.value.target_cyanuric_acid, chemicals);
    console.log(form);
    this.authService.register(user).subscribe((res) => {
      this.authService.token = res._id;
      this.authService.isAuthenticated.next(true);
      this.router.navigateByUrl('/tabs', { replaceUrl: true });
    });
  }

}
