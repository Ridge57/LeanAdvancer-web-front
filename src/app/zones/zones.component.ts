import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SortEvent } from 'primeng/api';
import { ZoneService } from 'src/services/zone.service';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css'],
})
export class ZonesComponent implements OnInit {
  zones: any
  cols: any[]
  nouvelleZone: any
  selectedZone: any
  actionButtonIsVisible: boolean
  formZone: FormGroup;

  constructor(private zoneService: ZoneService, private formBuilder: FormBuilder, private router: Router) {
    if (localStorage.getItem("accessToken") == null) {
      this.router.navigate(['/home'])
    }
  }

  ngOnInit(): void {
    this.getAllZones()
    this.initForm()
    this.cols = [
      { field: 'nomZone', header: 'Zone' }];
  }

  getAllZones() {
    this.zoneService.getAllZones().subscribe((data) => {
      this.zones = data
    })
  }

  initForm() {
    this.formZone = this.formBuilder.group({
      idZone: '',
      nomZone: ''
    })
  }

  getSelectedZone(zone: any) {
    this.selectedZone = zone
  }

  saisie(val: any) {

    if (val !== "" && val.replace(/\s/g, '').length > 0) {
      this.nouvelleZone = val
      this.formZone.get('nomZone').setValue(val)
      this.actionButtonIsVisible = true
    } else {
      this.actionButtonIsVisible = false
    }
  }

  ajouter() {
    this.zoneService.saveZone(this.formZone.value).subscribe(() => {
      this.formZone.reset()
      this.nouvelleZone = ""
      document.location.reload()
    })
  }

  modifier() {
    this.formZone.get('idZone').setValue(this.selectedZone.idZone)
    this.ajouter()
  }

  fermer() {
    this.formZone.reset()
    this.nouvelleZone = ""
  }

  deleteZone() {
    this.zoneService.deleteZone(this.selectedZone.idZone).subscribe(() => {
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
