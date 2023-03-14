import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';


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
      { label: 'tâches NOK', icon: 'pi pi-fw pi-times-circle', routerLink: '/checklistTachesNok' },
      { label: 'historique des checklists', icon: 'pi pi-fw pi-copy', routerLink: '/checklistHistorique' },
      { label: 'afficher/ajouter/modifier ', icon: 'pi pi-fw pi-file', routerLink: '/checklistVoir' }
    ];

  }

}
