import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, SortEvent } from 'primeng/api';
import { StandardService } from 'src/services/standard.service';
import { ZoneService } from 'src/services/zone.service';

@Component({
  selector: 'app-standard-voir',
  templateUrl: './standard-voir.component.html',
  styleUrls: ['./standard-voir.component.css'],
  providers: [MessageService]
})
export class StandardVoirComponent implements OnInit {
  cols: any[]
  afficherStd: boolean = false
  etapes: any


  zones: any
  standards: any
  selectedStandardID: number
  selectedStandard: any
  formStd: FormGroup
  uploadedFile: any
  base64File: any
  videoFileLink: string
  videoDescription: string
  isDisplayVideoVisible: boolean = false
  constructor(private standardService: StandardService,
    private formBuilder: FormBuilder, private zoneService: ZoneService, private router: Router,
    private messageService: MessageService) {
    if (localStorage.getItem("accessToken") == null) {
      this.router.navigate(['/home'])
    }
  }

  ngOnInit(): void {
    this.getAllStandards()
    this.cols = [
      { field: 'zone', subfield: 'nomZone', header: 'Zone' },
      { field: 'titre', header: 'Titre' }]
  }

  getAllStandards() {
    this.standardService.getAllStandards().subscribe((data) => {
      this.standards = data
    })
  }

  afficherStandard(idStd: number) {
    this.standardService.getAllStandardSteps(idStd).subscribe((data) => {
      this.etapes = data;
      this.afficherStd = true
    })

  }

  fermerStandard() {
    this.afficherStd = false
  }

  getZones() {
    this.zoneService.getAllZones().subscribe((data) => {
      this.zones = data
    })
  }

  getSelectedStandard(standard: any) {
    this.selectedStandard = standard
    this.selectedStandardID = standard.idStandard
  }

  initForm() {
    this.formStd = this.formBuilder.group({
      idStandard: '',
      titre: '',
      date: '',
      lien: '',
      zone: this.formBuilder.group({
        idZone: '',
      })
    });
  }

  titleChange(val: any) {
    this.formStd.get('titre').setValue(val)
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

  showDisplayVideoDialog(fileLink: string, description: string) {
    this.videoFileLink = fileLink
    this.videoDescription = description
    this.isDisplayVideoVisible = true
  }

  zoneChange(val: any) {
    this.formStd.get('zone.idZone').setValue(val)
  }

  async fileChange(event: any) {
    this.uploadedFile = event.target.value
    this.base64File = await this.toBase64(event.target.files[0])
    this.formStd.get('lien').setValue(this.base64File)
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })


  annuler() {
    this.uploadedFile = ""
    this.formStd.reset()
  }

  deleteStandard() {
    this.standardService.deleteStandard(this.selectedStandardID).subscribe(() => {
      this.messageService.add({ severity: 'success', detail: 'mode opértoire supprimé', life: 1500 });
      setTimeout(() => {
        document.location.reload()
      }, 1500);

    })
  }

}
