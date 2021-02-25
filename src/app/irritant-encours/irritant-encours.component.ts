import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';
import {IrritantService} from 'src/services/irritant.service';

@Component({
  selector: 'app-irritant-encours',
  templateUrl: './irritant-encours.component.html',
  styleUrls: ['./irritant-encours.component.css']
})
export class IrritantEncoursComponent implements OnInit {
  cars1: any[];
  cols: any[];
  irritants:any;
  selectedIrritant:any
  selectedIrritantID:number
  statusList:any
  displaySaveButton=false
  constructor(private irritantService : IrritantService) { }

  ngOnInit(): void {
    this.initialization()

    this.cols = [
    { field: 'zone', subfield: 'nomZone', header: 'Zone' },
    { field: 'categorie', subfield: 'nomCat', header: 'Catégorie' },
    { field: 'date',header:'Date'},
    { field: 'user',subfield: 'userName', header:'User'}]

  }

  getIrritantsEnCoursDeTraitement(status:any){
    this.irritantService.findByStatus(status).subscribe((data)=>{
      this.irritants = data
    })

  }

  initialization(){
    this.irritantService.getStatusList().subscribe((data)=>{
      this.statusList = data
      this.getIrritantsEnCoursDeTraitement(this.statusList[1])
    })
  }

  setStatus(status:any){
      this.selectedIrritant.status=status
      this.displaySaveButton=true
  }

  getSelectedIrritant(irritant:any){
    this.selectedIrritant=irritant
    this.selectedIrritantID=irritant.idIrritant
    this.displaySaveButton=false
  }

  saveChanges(){
    this.irritantService.updateIrritantStatus(this.selectedIrritant).subscribe(()=>{
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
