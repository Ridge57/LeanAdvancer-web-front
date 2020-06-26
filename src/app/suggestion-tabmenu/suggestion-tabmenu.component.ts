import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-suggestion-tabmenu',
  templateUrl: './suggestion-tabmenu.component.html',
  styleUrls: ['./suggestion-tabmenu.component.css']
})
export class SuggestionTabmenuComponent implements OnInit {

  items2: MenuItem[];
  activeItem: MenuItem;
  constructor() { }

  ngOnInit(): void {
    this.items2 = [
      {label: 'à traiter', icon: 'pi pi-fw pi-home',routerLink:'/suggestionATraiter'},
      {label: 'en cours', icon: 'pi pi-fw pi-calendar',routerLink:'/suggestionEnCours'},
      {label: 'soldés', icon: 'pi pi-fw pi-file',routerLink:'/suggestionSoldes'},
      {label: 'statistiques', icon: 'pi pi-fw pi-cog'}
  ];
  }
}
