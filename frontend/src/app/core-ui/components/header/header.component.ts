import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  constructor(private router: Router) { }

  ngOnInit(): void {
   
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('login');
  }
  
 
}
