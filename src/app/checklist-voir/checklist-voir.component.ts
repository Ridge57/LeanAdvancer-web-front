import { Component, OnInit } from '@angular/core';
import { ZoneService } from 'src/services/zone.service';
import { ChecklistService } from 'src/services/checklist.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
declare let $: any;

@Component({
  selector: 'app-checklist-voir',
  templateUrl: './checklist-voir.component.html',
  styleUrls: ['./checklist-voir.component.css'],
  providers: [MessageService]
})
export class ChecklistVoirComponent implements OnInit {
  isVisible: boolean
  selectedTache: any = undefined
  selectedTacheID: any
  selectedZoneID: any
  selectedZone: any
  newTitleForSelectedTache = ""
  newDescriptionForSelectedTache = ""
  tachesForSelectedZone: any
  filteredTaches: any = []
  imgChangedMap: Map<number, string> = new Map<number, string>(); //id tache, base64 img
  base64File: any = ""
  zones: any
  editMode: boolean = false
  selectedPeriods: string[] = [];
  filteredPeriod = ""
  periods = []
  numberTaskByPeriod = new Map<string, number>()
  formTache: FormGroup;
  chargeTableView: boolean = false;
  defaultImg = "../../assets/img/no-image.png"
  initialValueOfChangePeriodModal: any
  typeTache = ""
  imageTacheName = null
  imageTache: any
  constructor(private zoneService: ZoneService, private checklistService: ChecklistService,
    private formBuilder: FormBuilder, private changeDetectorRef: ChangeDetectorRef,
    private messageService: MessageService, private router: Router, private sanitizer: DomSanitizer) {
    if (localStorage.getItem("accessToken") == null) {
      this.router.navigate(['/home'])
    }
  }

  ngOnInit(): void {
    this.defaultImg = "../../assets/img/no-image.png"
    this.isVisible = false;
    this.selectedZone = null
    this.getAllZones()
    this.initForm()
    this.initPeriods()

  }

  filtrerLesTaches(e: any) {
    this.filteredTaches = []
    for (const tache of this.tachesForSelectedZone) {
      for (const period of tache.periods) {
        if (period == e.value.code) {
          this.filteredTaches.push(tache)
        }
      }
    }

  }
  initPeriods() {
    this.periods = [
      {
        jour: 'lundi',
        equipe: [
          { cname: 'lundi matin', code: 'lundi-M' },
          { cname: 'lundi soir', code: 'lundi-S' },
          { cname: 'lundi nuit', code: 'lundi-N' }
        ]
      },
      {
        jour: 'mardi',
        equipe: [
          { cname: 'mardi matin', code: 'mardi-M' },
          { cname: 'mardi soir', code: 'mardi-S' },
          { cname: 'mardi nuit', code: 'mardi-N' }
        ]
      },
      {
        jour: 'mercredi',
        equipe: [
          { cname: 'mercredi matin', code: 'mercredi-M' },
          { cname: 'mercredi soir', code: 'mercredi-S' },
          { cname: 'mercredi nuit', code: 'mercredi-N' }
        ]
      },
      {
        jour: 'jeudi',
        equipe: [
          { cname: 'jeudi matin', code: 'jeudi-M' },
          { cname: 'jeudi soir', code: 'jeudi-S' },
          { cname: 'jeudi nuit', code: 'jeudi-N' }
        ]
      },
      {
        jour: 'vendredi',
        equipe: [
          { cname: 'vendredi matin', code: 'vendredi-M' },
          { cname: 'vendredi soir', code: 'vendredi-S' },
          { cname: 'vendredi nuit', code: 'vendredi-N' }
        ]
      },
      {
        jour: 'samedi',
        equipe: [
          { cname: 'samedi matin', code: 'samedi-M' },
          { cname: 'samedi soir', code: 'samedi-S' },
          { cname: 'samedi nuit', code: 'samedi-N' }
        ]
      },
      {
        jour: 'dimanche',
        equipe: [
          { cname: 'dimanche matin', code: 'dimanche-M' },
          { cname: 'dimanche soir', code: 'dimanche-S' },
          { cname: 'dimanche nuit', code: 'dimanche-N' }
        ]
      }
    ]
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

  openChangePeriodsTacheModal() {
    this.selectedPeriods = this.selectedTache.periods
    $('#changePeriodsTacheModal').modal('show');
  }

  resetSelectedPeriod() {
    this.selectedPeriods = []
    this.setInitialValue()
    $('#changePeriodsTacheModal').modal('hide');
  }

  setInitialValue() {
    this.chargeTableView = true
    this.changeDetectorRef.detectChanges();
    this.chargeTableView = false
  }

  changePeriods() {
    this.selectedTache.periods = this.selectedPeriods
    this.changeDetectorRef.detectChanges();
  }

  showAjoutModal() {
    this.selectedPeriods = []
    $('#ajoutTacheModal').modal('show');
  }

  resetAjoutIrrForm() {
    this.formTache.reset()
    this.initForm()
    this.formTache.get('zone.idZone').setValue(this.selectedZoneID)
    this.selectedPeriods = []
    this.base64File = ""
    this.typeTache = ""
    this.imageTache = null
    this.imageTacheName = null
    this.setInitialValue()
    $('#ajoutTacheModal').modal('hide');
  }

  setTypeTache(type: any) {
    this.typeTache = type
  }


  switchTableView(e: any) {
    this.chargeTableView = e.checked
  }

  initForm() {
    this.formTache = this.formBuilder.group({
      titre: '',
      description: '',
      photo: '',
      type: '',
      zone: this.formBuilder.group({
        idZone: '',
      }),
      periods: []
    });
  }



  async setNewImageForNewTache(event: any) {
    this.imageTache = event.target.files[0]
    this.imageTacheName = event.target.files[0].name
  }

  addNewTask() {
    if (!(this.formTache.get('titre').value.length > 0)) {
      this.messageService.add({ severity: 'warn', summary: 'saisie obligatoire : ', detail: "titre" });
    } else if (!(this.formTache.get('description').value.length > 0)) {
      this.messageService.add({ severity: 'warn', summary: 'saisie obligatoire : ', detail: "description" });
    } else if (!(this.typeTache.length > 0)) {
      this.messageService.add({ severity: 'warn', summary: 'saisie obligatoire : ', detail: "type" });
    } else if (!(this.selectedPeriods.length > 0)) {
      this.messageService.add({ severity: 'warn', summary: 'saisie obligatoire : ', detail: "periodicité" });
    } else {
      this.formTache.get('periods').setValue(this.selectedPeriods)
      this.formTache.get('type').setValue(this.typeTache)
      this.formTache.get('photo').setValue("")

      let data: FormData = new FormData()

      data.append('idTache', "-1")
      data.append('titre', this.newTitleForSelectedTache)
      data.append('description', this.newDescriptionForSelectedTache)
      data.append('idZone', this.selectedZoneID)
      data.append('periods', this.selectedPeriods.toString())
      data.append('type', this.typeTache)
      data.append('file', this.imageTache)

      this.checklistService.saveTask(data).subscribe(() => {
        this.getTachesByZone(this.selectedZone)
        this.messageService.add({ severity: 'success', summary: 'sauvegardé ' });
        this.resetAjoutIrrForm()
      })
    }

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
    this.selectedTache = tache
    this.selectedPeriods = tache.periods
    this.selectedTacheID = tache.idTache
    this.newTitleForSelectedTache = tache.titre
    this.newDescriptionForSelectedTache = tache.description
  }

  launchDeleteModal(tache: any) {
    this.selectedTache = tache
  }

  deleteTask() {
    var supprimerTaskReq = {
      "idTache": this.selectedTache.idTache,
      "keyName": this.selectedTache.keyName
    }
    this.checklistService.deleteTache(supprimerTaskReq).subscribe(() => {
      this.getTachesByZone(this.selectedZone)
    })
  }
  resetEditMode(tache: any) {
    this.editMode = false
    this.selectedTacheID = ""
    this.newTitleForSelectedTache = ""
    this.newDescriptionForSelectedTache = ""
    this.typeTache = ""
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

    /*enregistrement des changements dans 
    le titre, 
    la description, 
    le type de tache,
    les periodes (methode changePeriods() )
    */

    this.selectedTache.titre = this.newTitleForSelectedTache
    this.selectedTache.description = this.newDescriptionForSelectedTache
    if (this.typeTache.length > 0) {
      this.selectedTache.type = this.typeTache
    }
    // this.checklistService.saveTache(this.selectedTache).subscribe(() => {
    //   this.getTachesByZone(this.selectedZone)
    // })

    let data: FormData = new FormData()
    data.append('idTache', this.selectedTacheID)
    data.append('titre', this.selectedTache.titre)
    data.append('type', this.selectedTache.type)
    data.append('periods', this.selectedTache.periods)
    data.append('description', this.selectedTache.description)
    data.append('idZone', this.selectedZoneID)
    data.append('file', this.imageTache)

    this.checklistService.saveTask(data).subscribe(() => {
      this.getTachesByZone(this.selectedZone)
      this.messageService.add({ severity: 'success', summary: 'mise à jour ' });
    })

    /*enregistrement de la nouvelle image*/
    // const convMap = {};
    // this.imgChangedMap.forEach((val: string, key: number) => {
    //   convMap[key] = val;
    // });
    // this.checklistService.updateImageForTask(convMap).subscribe(() => {
    //   this.imgChangedMap.clear()
    //   this.getTachesByZone(this.selectedZone)
    // })
    this.editMode = false
  }

}
