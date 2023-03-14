import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ZoneService } from 'src/services/zone.service';
import { StandardService } from 'src/services/standard.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Etape } from './etape';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-standard-ajouter',
  templateUrl: './standard-ajouter.component.html',
  styleUrls: ['./standard-ajouter.component.scss'],
  styles: [`
  :host ::ng-deep .p-dialog .etape-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
  providers: [MessageService, ConfirmationService]
})
export class StandardAjouterComponent implements OnInit {
  zones: any
  isTitleVisible = false
  isStepListVisible = false
  titre: string = ""
  idZone: number
  etapeDialog: boolean;
  etapes: Etape[];
  etape: Etape;
  selectedEtapes: Etape[];
  mediaOptions: any[];
  selectedMedia = ""
  isDisplayVideoVisible: boolean

  submitted: boolean;
  constructor(private sanitizer: DomSanitizer, private zoneService: ZoneService, private standardService: StandardService,
    private confirmationService: ConfirmationService, private messageService: MessageService) { }


  ngOnInit(): void {
    this.getZones()
    this.etapes = []
    this.mediaOptions = [
      { icon: 'pi pi-ban', value: 'none' },
      { icon: 'pi pi-image', value: 'img' },
      { icon: 'pi pi-video', value: 'vid' },
    ];
  }

  showDisplayVideoDialog(etape: any) {
    this.etape = { ...etape };
    this.isDisplayVideoVisible = true
  }

  getZones() {
    this.zoneService.getAllZones().subscribe((data) => {
      this.zones = data
    })
  }


  onUpload(event: any, typ: string) {
    this.etape.file = event.target.files[0]
    if (typ === "img") {
      this.etape.imgUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.etape.file))
    } else if (typ === "vid") {
      this.etape.vidUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.etape.file))
    }
  }

  selectionMediaChange() {
    this.etape.imgUrl = null
    this.etape.vidUrl = null
    this.etape.file = null
  }


  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })



  readFile = file => new Promise((resolve, reject) => {
    // Create file reader
    let reader = new FileReader()

    // Register event listeners
    reader.addEventListener("loadend", e => resolve(e.target.result))
    reader.addEventListener("error", reject)

    // Read file
    reader.readAsArrayBuffer(file)
  })

  async getAsByteArray(file) {
    return new Uint8Array(<ArrayBuffer>await this.readFile(file))
  }



  async sauvegarder() {
    var data: FormData = new FormData()
    for (const etape of this.etapes) {
      if (etape.file) {
        data.append('descriptions/FileNames', etape.description + "-split-string-description-fileName-" + etape.file.name)
        data.append('files', etape.file)
      } else {
        data.append('descriptions/FileNames', etape.description)
      }
    }

    this.standardService.saveStandard(data, this.titre, this.idZone).subscribe(() => {
      this.etapes = []
      this.annuler()
      this.messageService.add({ severity: 'success', detail: 'mode opértoire crée', life: 3000 });

    })
  }

  annuler() {
    this.isTitleVisible = false
    this.isStepListVisible = false
    this.etape.file = null
    this.titre = ""
  }

  ajouter() {
    this.isTitleVisible = true
  }

  titleChange(val: any) {
    this.titre = val
  }

  zoneChange(val: any) {
    this.idZone = val
    this.isStepListVisible = true
  }



  openNew() {
    this.etape = {};
    this.submitted = false;
    this.etapeDialog = true;
  }

  deleteSelectedEtapes() {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cette étape ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.etapes = this.etapes.filter(val => !this.selectedEtapes.includes(val));
        this.selectedEtapes = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'etapes supprimées', life: 3000 });
      }
    });
  }

  editEtape(etape: any) {
    this.etape = { ...etape };
    if (this.etape.imgUrl) {
      this.selectedMedia = 'img'
    } else if (this.etape.vidUrl) {
      this.selectedMedia = 'vid'
    } else {
      this.selectedMedia = 'none'
    }
    this.etapeDialog = true;
  }


  deleteEtape(etape: any) {
    this.confirmationService.confirm({
      message: "Êtes-vous sûr de vouloir supprimer l'étape : " + etape.description + "?",
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.etapes = this.etapes.filter(val => val.id !== etape.id);
        this.etape = {};
        this.messageService.add({ severity: 'success', summary: 'supprimée', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.etape = {};
    this.selectedMedia = ""
    this.etapeDialog = false;
    this.submitted = false;
  }

  saveEtape() {
    this.submitted = true;
    if (!this.etape.description) {
      this.messageService.add({ severity: 'error', detail: 'la description est obligatoire', life: 3000 });
    } else if (this.selectedMedia.length === 0) {
      this.messageService.add({ severity: 'error', detail: 'Veuillez sélectionner le type de média (aucun, image, vidéo)', life: 3000 });
    } else if (this.selectedMedia === 'img' && !this.etape.imgUrl) {
      this.messageService.add({ severity: 'error', detail: "Veuillez insérer une image ou sélectionner l'option aucun média", life: 3000 });
    } else if (this.selectedMedia === 'vid' && !this.etape.vidUrl) {
      this.messageService.add({ severity: 'error', detail: "Veuillez insérer une vidéo ou sélectionner l'option aucun média", life: 3000 });
    } else if (this.selectedMedia === 'vid' && this.etape.file.size > 25000000) { //25MB
      this.messageService.add({ severity: 'error', detail: "La vidéo dépasse la limite de 25MB", life: 3000 });
    } else {
      this.save()
    }
  }

  save() {
    if (this.etape.id) {
      this.etapes[this.findIndexById(this.etape.id)] = this.etape;
    }
    else {
      this.etape.id = this.createId();
      this.etapes.push(this.etape);
    }
    this.etapes = [...this.etapes];
    this.etapeDialog = false;
    this.etape = {};
    this.selectedMedia = ""
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.etapes.length; i++) {
      if (this.etapes[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

}
