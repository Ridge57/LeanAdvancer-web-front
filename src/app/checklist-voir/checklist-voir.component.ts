import { Component, OnInit } from '@angular/core';
import { ZoneService } from 'src/services/zone.service';
import { ChecklistService } from 'src/services/checklist.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checklist-voir',
  templateUrl: './checklist-voir.component.html',
  styleUrls: ['./checklist-voir.component.css']
})
export class ChecklistVoirComponent implements OnInit {
  isVisible: boolean
  selectedTache: any = ""
  selectedTacheID: any
  selectedZoneID: any
  selectedZone: any
  newTitleForSelectedTache = ""
  newDescriptionForSelectedTache = ""
  tachesForSelectedZone: any
  filteredTaches: any
  imgChangedMap: Map<number, string> = new Map<number, string>(); //id tache, base64 img
  base64File: any = ""
  zones: any
  editMode: boolean = false
  selectedPeriods: string[] = [];
  jours = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
  isFilteredByDays = false
  equipes = ['matin', 'soir', 'nuit']
  numberTaskByPeriod = new Map<string, number>()
  formTache: FormGroup;
  chargeTableView: boolean = false;
  defaultImg = "src\assets\img\no-image.png"
  constructor(private zoneService: ZoneService, private checklistService: ChecklistService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.defaultImg = "src\assets\img\no-image.png"
    this.isVisible = false;
    this.selectedZone = null
    this.getAllZones()
    this.initForm()
  }
  setVisible(id: any) {
    this.selectedZoneID = id
    var i = 0
    this.selectedZone = null
    while (this.selectedZone == null || i < this.zones.length) {
      if (this.selectedZoneID == this.zones[i].idZone) {
        this.selectedZone = this.zones[i]
      }
      i++
    }
    this.isVisible = true
    //this.formTache.controls['zone']['idZone'].setValue(this.selectedZoneID)
    this.formTache.get('zone.idZone').setValue(this.selectedZoneID)
    this.getTachesByZone(this.selectedZone)
  }

  handleChange(e: any) {
    if (e.target.checked) {
      this.selectedPeriods.push(e.target.defaultValue)
    } else {
      const index = this.selectedPeriods.indexOf(e.target.defaultValue);
      const x = this.selectedPeriods.splice(index, 1);
    }
  }

  switchTableView(e: any) {
    this.chargeTableView = e.checked
  }

  initForm() {
    this.formTache = this.formBuilder.group({
      titre: '',
      description: '',
      photo: '',
      zone: this.formBuilder.group({
        idZone: '',
      }),
      periods: []
    });
  }

  filtrerTachesEquipes(e: any) {
    console.log(e);


  }

  filtrerTachesJours(e: any) {
    console.log(e);
    for (const tache of this.tachesForSelectedZone) {
      for (const period of tache.periods) {

      }
    }
    this.isFilteredByDays = true

  }

  async setNewImageForNewTache(event: any) {
    this.base64File = await this.toBase64(event.target.files[0])
    this.formTache.controls['photo'].setValue(this.base64File)
  }

  addNewTask() {
    this.formTache.get('periods').setValue(this.selectedPeriods)
    this.checklistService.addNewTask(this.formTache.value).subscribe(() => {
      this.getTachesByZone(this.selectedZone)
    })
  }
  getAllZones() {
    this.zoneService.getAllZones().subscribe((data) => {
      this.zones = data
    })
  }

  getTachesByZone(zone: any) {
    this.checklistService.getTachesByZone(zone).subscribe((data) => {
      this.tachesForSelectedZone = data
      this.filteredTaches = data
      this.setNumberOfTakPeriod(this.tachesForSelectedZone)
    })
  }

  setNumberOfTakPeriod(taches: any) {
    this.numberTaskByPeriod.set('lundi-M', 0)
    this.numberTaskByPeriod.set('lundi-S', 0)
    this.numberTaskByPeriod.set('lundi-N', 0)

    this.numberTaskByPeriod.set('mardi-M', 0)
    this.numberTaskByPeriod.set('mardi-S', 0)
    this.numberTaskByPeriod.set('mardi-N', 0)

    this.numberTaskByPeriod.set('mercredi-M', 0)
    this.numberTaskByPeriod.set('mercredi-S', 0)
    this.numberTaskByPeriod.set('mercredi-N', 0)

    this.numberTaskByPeriod.set('jeudi-M', 0)
    this.numberTaskByPeriod.set('jeudi-S', 0)
    this.numberTaskByPeriod.set('jeudi-N', 0)

    this.numberTaskByPeriod.set('vendredi-M', 0)
    this.numberTaskByPeriod.set('vendredi-S', 0)
    this.numberTaskByPeriod.set('vendredi-N', 0)

    this.numberTaskByPeriod.set('samedi-M', 0)
    this.numberTaskByPeriod.set('samedi-S', 0)
    this.numberTaskByPeriod.set('samedi-N', 0)

    this.numberTaskByPeriod.set('dimanche-M', 0)
    this.numberTaskByPeriod.set('dimanche-N', 0)
    this.numberTaskByPeriod.set('dimanche-S', 0)
    for (const tache of taches) {
      for (const period of tache.periods) {
        this.numberTaskByPeriod.set(period, this.numberTaskByPeriod.get(period) + 1)
      }

    }
  }

  setEditMode(tache: any) {
    this.editMode = true
    //this.editModeGlobal=true
    this.selectedTache = tache
    this.selectedTacheID = tache.idTache
    this.newTitleForSelectedTache = tache.titre
    this.newDescriptionForSelectedTache = tache.description
  }

  launchDeleteModal(tache: any) {
    this.selectedTache = tache
  }

  deleteTask() {
    this.checklistService.deleteTache(this.selectedTache.idTache).subscribe(() => {
      this.getTachesByZone(this.selectedZone)
    })
  }
  resetEditMode(tache: any) {
    this.editMode = false
    this.selectedTacheID = ""
    this.newTitleForSelectedTache = ""
    this.newDescriptionForSelectedTache = ""
  }

  setNewDescription(val: any) {
    this.newDescriptionForSelectedTache = val.srcElement.value
  }

  setNewTitle(val: any) {
    this.newTitleForSelectedTache = val.srcElement.value
  }

  async setNewImage(event: any) {
    this.base64File = await this.toBase64(event.target.files[0])
    this.imgChangedMap.set(this.selectedTacheID, this.base64File)

  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  saveTaskChange() {

    /*enregistrement des changements dans les titres et les descriptions*/

    this.selectedTache.titre = this.newTitleForSelectedTache
    this.selectedTache.description = this.newDescriptionForSelectedTache
    this.checklistService.saveTache(this.selectedTache).subscribe(() => {
      this.getTachesByZone(this.selectedZone)
    })

    /*enregistrement de la nouvelle image*/
    const convMap = {};
    this.imgChangedMap.forEach((val: string, key: number) => {
      convMap[key] = val;
    });
    this.checklistService.updateImageForTask(convMap).subscribe(() => {
      this.imgChangedMap.clear()
      this.getTachesByZone(this.selectedZone)
    })
    this.editMode = false
  }

}
