import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SortEvent } from 'primeng/api';
import { StandardService } from 'src/services/standard.service';
import { ZoneService } from 'src/services/zone.service';

@Component({
  selector: 'app-standard-voir',
  templateUrl: './standard-voir.component.html',
  styleUrls: ['./standard-voir.component.css']
})
export class StandardVoirComponent implements OnInit {
    cars1: any[];
  cols: any[]
  zones: any
  standards: any
  selectedStandardID: number
  selectedStandard: any
  formStd: FormGroup
  uploadedFile: any
  base64File: any
  constructor(private standardService: StandardService, private formBuilder: FormBuilder, private zoneService: ZoneService) { }

  ngOnInit(): void {
    this.getAllStandards()
    this.getZones()
    this.initForm()
    this.cols = [
      { field: 'zone', subfield: 'nomZone', header: 'Zone' },
      { field: 'titre', header: 'Titre' }]
  }

  getAllStandards() {
    this.standardService.getAllStandards().subscribe((data) => {
      this.standards = data
    })
  }

  getZones() {
    this.zoneService.getAllZones().subscribe((data) => {
      this.zones = data
    })
  }

  getSelectedStandard(standard: any) {
    this.selectedStandard = standard
    this.selectedStandardID = standard.idStandard
    this.uploadedFile = ""
    this.formStd.get('idStandard').setValue(standard.idStandard)
    this.formStd.get('titre').setValue(standard.titre)
    this.formStd.get('date').setValue(standard.date)
    this.formStd.get('lien').setValue(standard.lien)
    this.formStd.get('zone.idZone').setValue(standard.zone.idZone)
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

  sauvegarder() {
    //  this.standardService.saveStandard(this.formStd.value).subscribe(()=>{
    //     this.uploadedFile=""
    //     this.formStd.reset()
    //     document.location.reload()
    //   })
  }

  annuler() {
    this.uploadedFile = ""
    this.formStd.reset()
  }

  deleteStandard() {
    this.standardService.deleteStandard(this.selectedStandardID).subscribe(() => {
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
