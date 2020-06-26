import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-suggestion-encours',
  templateUrl: './suggestion-encours.component.html',
  styleUrls: ['./suggestion-encours.component.css']
})
export class SuggestionEncoursComponent implements OnInit {

  cars1: any[];
  cols: any[];
  constructor() { }

  ngOnInit(): void {
    this.cars1 =[
      {categorie:'na',zone:'22',date:'nkdss',emetteur:'Jean ERAS',responsable:'Fred BODIN'},
      {categorie:'xwa',zone:'221',date:'wqnks',emetteur:'Tomas VALDO',responsable:'Julien RAOULT'},
      {categorie:'ncsa',zone:'432',date:'aqnks',emetteur:'Richard BRUNO',responsable:'Maxime PERROT'}
     
  ]

    this.cols = [
      { field: 'categorie', header: 'catégorie' },
      { field: 'zone', header: 'zone' },
      { field: 'date', header: 'date de saisie' },
      { field: 'emetteur', header: 'emetteur' },
      { field: 'responsable', header: 'géré par' }
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
