import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-standard-tabmenu',
  templateUrl: './standard-tabmenu.component.html',
  styleUrls: ['./standard-tabmenu.component.css']
})
export class StandardTabmenuComponent implements OnInit {

  items2: MenuItem[];
  activeItem: MenuItem;
  constructor() { }

  ngOnInit(): void {
    this.items2 = [
      { label: 'liste', icon: 'pi pi-fw pi-calendar', routerLink: '/standardVoir' },
      { label: 'ajouter', icon: 'pi pi-fw pi-home', routerLink: '/standardAjouter' },
      //{label: 'rectifications', icon: 'pi pi-fw pi-file',routerLink:'/standardRectifier'},
      //{label: 'statistiques', icon: 'pi pi-fw pi-cog'}
    ];
  }

}
