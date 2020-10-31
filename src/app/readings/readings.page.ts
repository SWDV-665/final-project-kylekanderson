import { Component, OnInit } from '@angular/core';
import { Reading } from '../models/reading';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

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
    public router: Router
  ) {

    this.data = new Reading();

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
    this.apiService.createItem(this.data).subscribe((response) => {
      this.router.navigate(['historical-data']);
    });
  }
}
