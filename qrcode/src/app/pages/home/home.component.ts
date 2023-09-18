import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isNavbarCollapsed = true;
  isLoggedIn = false;
constructor(private authService  :AuthService, private route : Router){}
  ngOnInit(): void {
    this.authService.loggedIn$.subscribe(loggedIn=>{
      this.isLoggedIn=loggedIn
    })
  }
  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
}
logout() {
  // Call the logout function from AuthService

  this.authService.logout();
}

}
