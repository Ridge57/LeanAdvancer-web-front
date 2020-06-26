import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-checklist-tabmenu',
  templateUrl: './checklist-tabmenu.component.html',
  styleUrls: ['./checklist-tabmenu.component.css']
})
export class ChecklistTabmenuComponent implements OnInit {
  items2: MenuItem[];
  activeItem: MenuItem;
  constructor() { }

  ngOnInit(): void {
    this.items2 = [
      {label: 'tâches nok', icon: 'pi pi-fw pi-home',routerLink:'/checklistTachesNok'},
      {label: 'historique', icon: 'pi pi-fw pi-calendar',routerLink:'/checklistHistorique'},
      {label: 'afficher/modifier', icon: 'pi pi-fw pi-file',routerLink:'/checklistVoir'},
      {label: 'statistiques', icon: 'pi pi-fw pi-cog'}
  ];
  
  }

}
