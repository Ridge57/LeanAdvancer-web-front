import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SortEvent } from 'primeng/api';
import { ChecklistService } from 'src/services/checklist.service';

@Component({
  selector: 'app-checklist-historique',
  templateUrl: './checklist-historique.component.html',
  styleUrls: ['./checklist-historique.component.css']
})
export class ChecklistHistoriqueComponent implements OnInit {
  cars1: any[];
  cols: any[];
  defaultImg = "src\assets\img\no-image.png"
  AllHistoriqChecklist: any
  selectedHistoriqChecklistID: number
  selectedHistoriqChecklist: any
  historiqTachesForHistoriqChecklist: any

  constructor(private checklistService: ChecklistService, private router: Router) {
    if (localStorage.getItem("accessToken") == null) {
      this.router.navigate(['/home'])
    }
  }

  ngOnInit(): void {
    this.getAllHistoriqChecklist()
    this.cols = [
      { field: 'zone', subfield: 'nomZone', header: 'Zone' },
      { field: 'date', header: 'Date' },
      { field: 'user', subfield: 'userName', header: 'Fait par' }
    ];
  }

  getAllHistoriqChecklist() {
    this.checklistService.getAllHistoriqCheckList().subscribe((data) => {
      this.AllHistoriqChecklist = data
    })
  }

  /*
  getAssociatedHistoriqTache()
  cette fonction réccupère toutes les taches éffectuées lors de cette checklist
  ainsi que le résultat (ok/nok) de chacune des taches
  */
  getAssociatedHistoriqTache(historiqChecklist: any) {
    this.selectedHistoriqChecklist = historiqChecklist
    this.selectedHistoriqChecklistID = historiqChecklist.idHistoriqChecklist
    this.checklistService.getHistoriqTachesByHistoriqChecklist(historiqChecklist).subscribe((data) => {
      this.historiqTachesForHistoriqChecklist = data
    })
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
