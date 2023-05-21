import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Etape } from '../standard-ajouter/etape';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StandardService } from 'src/services/standard.service';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-standard-rectifier',
  templateUrl: './standard-rectifier.component.html',
  styleUrls: ['./standard-rectifier.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class StandardRectifierComponent implements OnInit {
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

  selectedStandardID: number
  formStd = this.formBuilder.group({
    idStd: 0,
    titre: '',
    idZone: 0,
    etapes: this.formBuilder.array([])
  })
  constructor(private formBuilder: FormBuilder, private sanitizer: DomSanitizer, private standardService: StandardService,
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private router: Router, private activatedRoute: ActivatedRoute) {
    if (localStorage.getItem("accessToken") == null) {
      this.router.navigate(['/home'])
    }
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.selectedStandardID = params.selectedStandardID
    });

    this.etapes = []
    this.mediaOptions = [
      { icon: 'pi pi-ban', value: 'none' },
      { icon: 'pi pi-image', value: 'img' },
      { icon: 'pi pi-video', value: 'vid' },
    ];

    this.standardService.getStandardById(this.selectedStandardID).subscribe((data: any) => {
      this.titre = data.titre
      this.idZone = data.zone.idZone
    })
    this.standardService.getAllStandardSteps(this.selectedStandardID).subscribe((datas: any) => {
      for (var i = 0; i < datas.length; i++) {
        var etape: Etape = {}
        etape.id = datas[i].id
        etape.description = datas[i].description
        etape.fileLink = datas[i].fileLink
        this.etapes.push(etape)
      }
    })
  }

  isIMG(fileLink: string): boolean {
    if (fileLink) {
      var s = fileLink.split("?")[0]
      var lastIndex = s.lastIndexOf(".")
      var sub = s.substring(lastIndex + 1, s.length)
      const img = ['jpg', 'jpeg', 'png'];
      return img.indexOf(sub.toLowerCase()) >= 0
    } else {
      return false
    }
  }

  isVID(fileLink: string): boolean {
    if (fileLink) {
      var s = fileLink.split("?")[0]
      var lastIndex = s.lastIndexOf(".")
      var sub = s.substring(lastIndex + 1, s.length)
      const vid = ['mp4', 'avi', 'flv', 'mpg', 'mpeg'];
      return vid.indexOf(sub.toLowerCase()) >= 0
    } else {
      return false
    }

  }


  showDisplayVideoDialog(etape: any) {
    this.etape = { ...etape };
    this.isDisplayVideoVisible = true
  }


  onUpload(event: any, typ: string) {
    this.etape.file = event.target.files[0]

    if (typ === "img") {
      this.etape.imgUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.etape.file))
      this.etape.vidUrl = null
    } else if (typ === "vid") {
      this.etape.vidUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.etape.file))
      this.etape.imgUrl = null
    }
  }

  selectionMediaChange() {
    this.etape.imgUrl = null
    this.etape.vidUrl = null
    this.etape.file = null
  }

  get steps() {
    return this.formStd.controls["etapes"] as FormArray;
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })

  async sauvegarder() {
    this.formStd.get('idStd').setValue(this.selectedStandardID)
    this.formStd.get('titre').setValue(this.titre)
    this.formStd.get('idZone').setValue(this.idZone)
    for (const etape of this.etapes) {
      var objForm = this.formBuilder.group({
        idEtape: etape.id,
        description: etape.description,
        fileType: etape.file ? etape.file.type : null,
        base64File: etape.file ? await this.toBase64(etape.file) : null
      });
      this.steps.push(objForm);
    }
    console.log(this.formStd.value);

    this.standardService.saveStandard(this.formStd.value).subscribe(() => {
      this.etapes = []
      this.annuler()
      this.messageService.add({ severity: 'success', detail: 'mode opértoire mis à jour', life: 3000 });

    })
  }

  annuler() {
    this.isStepListVisible = false
    this.etape = {}
    this.titre = ""
    this.router.navigate(['/standardVoir'])
  }

  titleChange(val: any) {
    this.titre = val
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
      this.etape.vidUrl = null
    } else if (this.etape.vidUrl) {
      this.selectedMedia = 'vid'
      this.etape.imgUrl = null
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
    } else if (this.etape.index) {
      this.etapes[this.findIndexByIndex(this.etape.index)] = this.etape;
    } else {
      this.etape.index = this.createIndex();
      this.etapes.push(this.etape);
    }
    this.etapes = [...this.etapes];
    this.etapeDialog = false;
    this.etape = {};
    this.selectedMedia = ""
  }

  findIndexByIndex(j: string): number {
    let index = -1;
    for (let i = 0; i < this.etapes.length; i++) {
      if (this.etapes[i].index === j) {
        index = i;
        break;
      }
    }
    return index;
  }

  findIndexById(j: string): number {
    let index = -1;
    for (let i = 0; i < this.etapes.length; i++) {
      if (this.etapes[i].id === j) {
        index = i;
        break;
      }
    }
    return index;
  }

  createIndex(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
