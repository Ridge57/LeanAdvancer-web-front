import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-checklist-historique',
  templateUrl: './checklist-historique.component.html',
  styleUrls: ['./checklist-historique.component.css']
})
export class ChecklistHistoriqueComponent implements OnInit {
  cars1: any[];
  cols: any[];

  constructor() { }

  ngOnInit(): void {
    this.cars1 =[
      {zone:'na',date:'22',auteur:'nks',resultat:'bcbc'},
      {zone:'np',date:'32',auteur:'bcn',resultat:'rre'},
      {zone:'ns',date:'12',auteur:'ops',resultat:'az'}
  ]

    this.cols = [
      { field: 'zone', header: 'Zone' },
      { field: 'date', header: 'Date' },
      { field: 'auteur', header: 'Fait par' },
      { field: 'resultat', header: 'Résultat' }
  ];
  }
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;

        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
            result = value1.localeCompare(value2);
        else
            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

        return (event.order * result);
    });
}
}
