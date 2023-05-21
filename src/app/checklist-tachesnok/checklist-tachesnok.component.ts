import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChecklistService } from 'src/services/checklist.service';

@Component({
  selector: 'app-checklist-tachesnok',
  templateUrl: './checklist-tachesnok.component.html',
  styleUrls: ['./checklist-tachesnok.component.css'],
})
export class ChecklistTachesnokComponent implements OnInit {
  noImgSource: String
  taches: any
  cols: any
  selectedTask: any
  statusTasks; any
  displaySaveButton: boolean = false
  traitementTemp: any

  constructor(private checklistService: ChecklistService, private router: Router) {
    this.noImgSource = "../../assets/img/no-image.png"
    if (localStorage.getItem("accessToken") == null) {
      this.router.navigate(['/home'])
    }
  }

  ngOnInit(): void {
    this.getTachesATraiter()
    this.getTraitementTachesStatusAtraiterEtSolde()
    this.cols = [
      { field: 'titre', header: 'Titre de la tâche' },
      { field: 'historiqChecklist', subfield: 'date', header: 'Date' },
      { field: 'status', header: 'Status' }]
  }

  getTachesATraiter() {
    this.checklistService.getTachesATraiter().subscribe((data) => {
      this.taches = data
    })
  }

  showTaskDetails(data: any) {
    this.selectedTask = data
    this.traitementTemp = this.selectedTask.traitement
    this.displaySaveButton = false
  }

  setResolution(res: any) {
    this.traitementTemp = res
    this.displaySaveButton = true
  }

  getTraitementTachesStatusAtraiterEtSolde() {
    this.checklistService.getTraitementTachesStatusAtraiterEtSolde().subscribe((data) => {
      this.statusTasks = data
    })
  }

  saveChanges() {
    this.selectedTask.traitement = this.traitementTemp
    this.checklistService.updateHistoriqTache(this.selectedTask).subscribe(() => {
      document.location.reload()
    })
  }
}
