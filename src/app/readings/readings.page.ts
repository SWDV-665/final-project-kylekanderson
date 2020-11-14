import { Component, OnInit } from '@angular/core';
import { Reading } from '../models/reading';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service';

@Component({
  selector: 'app-readings',
  templateUrl: 'readings.page.html',
  styleUrls: ['readings.page.scss']
})
export class ReadingsPage implements OnInit {

  data: Reading;

  image: String;

  constructor(
    public apiService: ApiService,
    public router: Router,
    private authService: AuthenticationService
  ) {

    this.data = new Reading();
    this.data.user_id = this.authService.token;

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

  submitForm() {
    console.log(this.data);
    this.apiService.createReading(this.data).subscribe((response) => {
      this.router.navigate(['/tabs/historicaldata']);
    });
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

}
