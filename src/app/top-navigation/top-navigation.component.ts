import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from 'src/services/globalvar.service';
import {Router} from "@angular/router"
import { Location } from '@angular/common';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.css']
})
export class TopNavigationComponent implements OnInit {

  constructor(public globalvarService : GlobalVariablesService,private router: Router,
    private location: Location) { }

  ngOnInit(): void {
  }

  logOut(){
    this.globalvarService.setCompany(null)
    this.location.replaceState('/')
    this.router.navigate(['/connexion'])
  }
}
