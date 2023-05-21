import { Component, OnInit, ViewChild } from '@angular/core';
import { SortEvent, MessageService } from 'primeng/api';
import { IrritantService } from 'src/services/irritant.service';
import { UserService } from 'src/services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-irritants',
  templateUrl: './irritants.component.html',
  styleUrls: ['./irritants.component.css'],
  providers: [MessageService]
})
export class IrritantsComponent implements OnInit {
  @ViewChild('inputSearchUserFilterIrritant') inputSearchUserFilterIrritant;
  @ViewChild('inputSearchUserAddIrritant') inputSearchUserAddIrritant;
  @ViewChild('rangeDatesFilter') rangeDatesFilter;

  cars1: any[];
  cols: any[];
  irritants: any;
  selectedIrritant: any
  selectedIrritantID: number

  typeIrritantList: any
  zoneList: any
  statusList: any
  usersList: any
  usersTmp: any

  displaySaveButton = false
  isFilterActive = false

  irritantForm: FormGroup
  irritantFilterForm: FormGroup
  base64Image = undefined
  selectedUser: any
  selectedUserName: any

  constructor(private irritantService: IrritantService,
    private userService: UserService, private formBuilder: FormBuilder,
    private messageService: MessageService, private router: Router) {
    if (localStorage.getItem("accessToken") == null) {
      this.router.navigate(['/home'])
    }
  }

  ngOnInit(): void {
    this.initialization()
    this.initForm()
    this.initFilterForm()
    this.selectedUser = null
    this.selectedUserName = null

    this.cols = [
      { field: 'zone', subfield: 'nomZone', header: 'Zone', sort: false },
      { field: 'categorie', subfield: 'nomCat', header: 'Type', sort: false },
      { field: 'date', header: 'Date', sort: true },
      { field: 'status', header: 'Statut', sort: false },
      { field: 'user', subfield: 'userName', header: 'Déclarant', sort: false }]

  }



  initialization() {
    this.irritantService.getStatusList().subscribe((data) => {
      this.statusList = data
    })

    this.irritantService.getCategories().subscribe((data) => {
      this.typeIrritantList = data
    })

    this.irritantService.getZones().subscribe((data) => {
      this.zoneList = data
    })

    this.irritantService.getAll().subscribe((data) => {
      this.irritants = data
    })

    this.userService.getAllUsers().subscribe((data) => {
      this.usersList = data
      this.usersTmp = data
    })

  }

  showWarn(qqoqcp: string, message: string) {
    this.messageService.add({ severity: 'warn', summary: 'erreur de saisie : ' + qqoqcp, detail: message });
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'enregistré', detail: '' });
  }


  initForm() {
    this.irritantForm = this.formBuilder.group({
      description: '',
      photo: this.base64Image,
      zone: this.formBuilder.group({
        idZone: '',
      }),
      categorie: this.formBuilder.group({
        idCat: '',
      }),
      user: this.formBuilder.group({
        idUser: '',
      })
    })
  }

  initFilterForm() {
    this.irritantFilterForm = this.formBuilder.group({
      idZone: '',
      idCat: '',
      idUser: '',
      status: '',
      dateDebut: '',
      dateFin: ''
    })
  }



  selectDeclarant(user: any) {
    this.selectedUser = user
    this.selectedUserName = user.userName
  }

  selectResponsableDeAction(user: any) {
    this.selectedUser = user
    this.selectedUserName = user.userName
    this.displaySaveButton = true
  }
  resetModalDetails() {
    this.selectedUser = null
    this.selectedUserName = null
  }



  ajouterIrritant() {
    if (this.irritantForm.value.categorie.idCat == 0) {
      this.showWarn("Quoi", "le type de l'irritant est manquant")
    }
    else if (this.irritantForm.value.zone.idZone == 0) {
      this.showWarn("Où", "la zone est manquante")
    }
    else if (this.irritantForm.value.description.length == 0) {
      this.showWarn("Comment", "la description est manquante")
    }
    else if (this.selectedUser == null) {
      this.showWarn("Qui", "saisir le déclarant")
    }
    else {
      this.irritantForm.get('user.idUser').setValue(this.selectedUser.idUser)
      this.irritantService.addIrritant(this.irritantForm.value).subscribe(() => {
        this.resetForm()
      })
      window.location.reload();
      this.showSuccess()
    }
  }

  filtrerIrritant() {
    this.irritantFilterForm.get('idUser').setValue(this.selectedUser.idUser)
    this.irritantFilterForm.get('dateDebut').setValue(this.rangeDatesFilter.value[0])
    this.irritantFilterForm.get('dateFin').setValue(this.rangeDatesFilter.value[1])
    this.irritantService.filtrerIrritants(this.irritantFilterForm.value).subscribe((data) => {
      this.irritants = data
      $("#filtrerModal").modal("hide");
      this.isFilterActive = true
    })
  }

  resetForm() {
    this.irritantForm.reset()
    this.selectedUser = null
    this.selectedUserName = null
    this.usersTmp = this.usersList
    this.inputSearchUserAddIrritant.nativeElement.value = null;
  }

  resetFilterForm() {
    this.irritantFilterForm.reset()
    this.selectedUser = null
    this.selectedUserName = null
    this.usersTmp = this.usersList
    this.inputSearchUserFilterIrritant.nativeElement.value = null;
    this.rangeDatesFilter.inputFieldValue = null;
    this.rangeDatesFilter.value = null;
    this.isFilterActive = false
    this.irritantService.getAll().subscribe((data) => {
      this.irritants = data
    })
  }

  async filtrerUserList(evt) {
    const searchTerm = evt.srcElement.value;
    this.usersTmp = this.usersList

    if (!searchTerm) {
      return;
    }

    this.usersTmp = this.usersTmp.filter(user => {
      if (user.userName && searchTerm) {
        return (user.userName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }


  getSelectedIrritant(irritant: any) {
    this.selectedIrritant = irritant
    this.selectedIrritantID = irritant.idIrritant
    this.displaySaveButton = false
  }

  saveChanges() {
    this.selectedIrritant.responsable = this.selectedUserName
    this.irritantService.updateIrritantStatus(this.selectedIrritant).subscribe(() => {
      document.location.reload()
    })
  }

  supprimerIrritant() {
    var deleteReq = {
      "idIrritant": this.selectedIrritantID,
      "keyName": this.selectedIrritant.keyName
    }
    this.irritantService.deleteIrritant(deleteReq).subscribe(() => {
      document.location.reload()
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
