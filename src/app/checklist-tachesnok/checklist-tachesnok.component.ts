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
    this.displaySaveButton = false
  }

  setResolution(res: any) {
    this.selectedTask.traitement = res
    this.displaySaveButton = true
  }

  getTraitementTachesStatusAtraiterEtSolde() {
    this.checklistService.getTraitementTachesStatusAtraiterEtSolde().subscribe((data) => {
      this.statusTasks = data
    })
  }

  saveChanges() {
    this.checklistService.updateHistoriqTache(this.selectedTask).subscribe(() => {
      document.location.reload()
    })
  }
}
