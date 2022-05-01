import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { DataService } from './../../../core/services/data/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userFullName: string;

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getIsLoggedIn().subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.dataService.getLoggedUser().subscribe((user) => {
      this.userFullName = user ? `${user.firstName} ${user.lastName}` : '';
    });
  }

  onLogout() {
    localStorage.clear();
    this.dataService.setIsLoggedIn(false);
    this.router.navigate(['auth']);
  }
}
