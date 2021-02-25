import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SortEvent } from 'primeng/api';
import {IrritantService} from 'src/services/irritant.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories:any
  cols: any[]
  nouveauMotfif:any
  selectedCat:any
  actionButtonIsVisible:boolean
  formCat:FormGroup;

  constructor(private irritantService: IrritantService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  this.getAllCategories()
  this.initForm()
  this.cols = [
    { field: 'nomCat', header: 'Motif Irritant' }];
  }
  
getAllCategories(){
  this.irritantService.getCategories().subscribe((data)=>{
    this.categories = data
  })
}

initForm() {
  this.formCat = this.formBuilder.group({
    idCat:'',
    nomCat:''
  })
}

getSelectedCat(cat:any){
  this.selectedCat=cat
}

saisie(val:any){
   
  if(val!=="" && val.replace(/\s/g, '').length>0){
    this.nouveauMotfif=val
    this.formCat.get('nomCat').setValue(val)
    this.actionButtonIsVisible=true
  }else{
    this.actionButtonIsVisible=false
  }
}

ajouter(){
  this.irritantService.addCategorie(this.formCat.value).subscribe(()=>{
    this.formCat.reset()
    this.nouveauMotfif=""
    document.location.reload()
  })
}

modifier(){
  this.formCat.get('idCat').setValue(this.selectedCat.idCat)
  //this.formCat.get('nomCat').setValue(this.selectedCat.nomCat)
  this.ajouter()
}

fermer(){
  this.formCat.reset()
  this.nouveauMotfif=""
}

deleteCat(){
  this.irritantService.deleteCat(this.selectedCat.idCat).subscribe(()=>{
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
