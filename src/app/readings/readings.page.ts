import { Component } from '@angular/core';

@Component({
  selector: 'app-readings',
  templateUrl: 'readings.page.html',
  styleUrls: ['readings.page.scss']
})
export class ReadingsPage {

  image: String;

  constructor() {

    let systemDark = window.matchMedia("(prefers-color-scheme: dark)");

    if (systemDark.matches) {
      this.image = '/assets/logo_dark.png';
    }
    else {
      this.image = '/assets/logo.png';
    }
  }
}
