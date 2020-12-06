import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  constructor(
    public router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    let pagePath = window.location.pathname;

    // Get the container element
    var btnContainer = document.getElementById("desktop-nav");

    // Get all buttons with class="btn" inside the container
    var btns = btnContainer.getElementsByClassName("nav-link");

    // Loop through the buttons and add the active class to the current/clicked button
    for (var i = 0; i < btns.length; i++) {
      console.log(typeof btns[i]);
      console.log(btns[i].getAttribute('href'));
      if (btns[i].getAttribute('href') === pagePath) {
        btns[i].className += ' active';
      }
    }
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

}
