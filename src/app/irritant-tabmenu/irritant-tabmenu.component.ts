import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-irritant-tabmenu',
  templateUrl: './irritant-tabmenu.component.html',
  styleUrls: ['./irritant-tabmenu.component.css']
})
export class IrritantTabmenuComponent implements OnInit {
  items2: MenuItem[];
  activeItem: MenuItem;
  constructor() { }

  ngOnInit(): void {
    this.items2 = [
      {label: 'à traiter', icon: 'pi pi-fw pi-home',routerLink:'/irritantATraiter'},
      {label: 'en cours', icon: 'pi pi-fw pi-calendar',routerLink:'/irritantEnCours'},
      {label: 'soldés', icon: 'pi pi-fw pi-file',routerLink:'/irritantSoldes'},
      {label: 'statistiques', icon: 'pi pi-fw pi-cog'}
  ];
  }

}
