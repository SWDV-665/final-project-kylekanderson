import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from '../../services/authentication.service';
import { User, Chemicals } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  register(form) {
    let chemicals = new Chemicals(form.value.chlorine, form.value.ph_up, form.value.ph_down, form.value.alkalinity_up, form.value.alkalinity_down, form.value.calcium_up, form.value.calcium_down);
    let user = new User(form.value.user_name, form.value.email, form.value.password, form.value.name, form.value.pool_gallons, form.value.pool_type, chemicals);
    console.log(form);
    this.authService.register(user).subscribe((res) => {
      this.authService.token = res._id;
      this.authService.isAuthenticated.next(true);
      this.router.navigateByUrl('/tabs', { replaceUrl: true });
    });
  }

}