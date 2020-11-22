import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let pagePath = window.location.pathname;

    // Get the container element
    var btnContainer = document.getElementById("desktop-nav");

    // Get all buttons with class="btn" inside the container
    var btns = btnContainer.getElementsByClassName("nav-link");

    // Loop through the buttons and add the active class to the current/clicked button
    for (var i = 0; i < btns.length; i++) {
      console.log(btns[i].pathname);
      if (btns[i].pathname === pagePath) {
        btns[i].className += ' active';
      }
    }
  }
}
