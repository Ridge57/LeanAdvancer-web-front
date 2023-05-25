import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.css']
})
export class TopNavigationComponent implements OnInit {
  organisation: string
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.organisation = localStorage.getItem("organisation")
  }

  logOut() {
    localStorage.removeItem("accessToken")
    localStorage.removeItem('organisation')
    this.router.navigate(['/home'])
  }
}
