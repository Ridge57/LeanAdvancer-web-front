import { Component, OnInit } from '@angular/core';
import {ZoneService} from 'src/services/zone.service';
import {ChecklistService} from 'src/services/checklist.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checklist-voir',
  templateUrl: './checklist-voir.component.html',
  styleUrls: ['./checklist-voir.component.css']
})
export class ChecklistVoirComponent implements OnInit {
  isVisible:boolean
  selectedTache:any=""
  selectedTacheID:any
  selectedZoneID:any
  selectedZone:any
  newTitleForSelectedTache=""
  newDescriptionForSelectedTache=""
  tachesForSelectedZone:any
  tachesDeleted:any=[]
  tachesForSelectedZoneChanged:any
  imgChangedMap: Map<number, string> = new Map<number, string>(); //id tache, base64 img
  base64File:any=""
  imagesChangedAreSaved:boolean=true
  taskChangedAreSaved:boolean=true
  imagesToDeleteAreDeleted:boolean=true
  zones:any
  editMode:boolean=false
  editModeGlobal:boolean=false
  formTache:FormGroup;
  defaultImg="src\assets\img\no-image.png"
  constructor(private zoneService : ZoneService, private checklistService : ChecklistService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.defaultImg="src\assets\img\no-image.png"
    this.isVisible=false;
    this.selectedZone=null
    this.getAllZones()
    this.initForm()
  }
  setVisible(id:any){
    this.selectedZoneID=id
    var i=0
    this.selectedZone=null
    while(this.selectedZone==null || i<this.zones.length){
      if(this.selectedZoneID==this.zones[i].idZone){
        this.selectedZone = this.zones[i]
      }
      i++
    }
    this.isVisible=true
    //this.formTache.controls['zone']['idZone'].setValue(this.selectedZoneID)
    this.formTache.get('zone.idZone').setValue(this.selectedZoneID)
    this.getTachesByZone(this.selectedZone)
  }

  initForm() {
    this.formTache = this.formBuilder.group({
      titre:'',
      description:'',
      photo:'',
      zone:this.formBuilder.group({
       idZone:'',
     })
    });
  }

  async setNewImageForNewTache(event:any){
    this.base64File = await this.toBase64(event.target.files[0])
    this.formTache.controls['photo'].setValue(this.base64File)
  }

  addNewTask(){
    this.checklistService.addNewTask(this.formTache.value).subscribe()
  }
  getAllZones(){
    this.zoneService.getAllZones().subscribe((data)=>{
      this.zones=data 
    })
  }

  getTachesByZone(zone:any){
    this.checklistService.getTachesByZone(zone).subscribe((data)=>{
      this.tachesForSelectedZone=data
      this.tachesForSelectedZoneChanged=data      
    })
  }

  setEditMode(tache:any){
    this.editMode=true
    this.editModeGlobal=true
    this.selectedTacheID=tache.idTache
    this.newTitleForSelectedTache=tache.titre
    this.newDescriptionForSelectedTache=tache.description
  }

  launchDeleteModal(tache:any){
    this.newTitleForSelectedTache=""
    this.newDescriptionForSelectedTache=""
    this.selectedTache=tache
  }

  deleteTask(){
    var indice = this.tachesForSelectedZoneChanged.indexOf(this.selectedTache)
    this.tachesForSelectedZoneChanged.splice(indice,1,)
    this.tachesDeleted.push(this.selectedTache)
    this.editModeGlobal=true
    //this.setVisible(this.selectedZoneID)
  }
  resetEditMode(tache:any){
    this.editMode=false
    this.selectedTacheID=""
    this.newTitleForSelectedTache=""
    this.newDescriptionForSelectedTache=""
  }

  setNewDescription(val:any){
    this.newDescriptionForSelectedTache=val.srcElement.value
  }

  setNewTitle(val:any){
    this.newTitleForSelectedTache=val.srcElement.value
  }

  async setNewImage(event:any){    
    this.base64File = await this.toBase64(event.target.files[0])
    this.imgChangedMap.set(this.selectedTacheID,this.base64File)    
     
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

  saveTaskChange(){
    var i = 0
    var find = false
    while(!find || i<this.tachesForSelectedZoneChanged.length){
      if(this.selectedTacheID==this.tachesForSelectedZoneChanged[i].idTache){
        find=true
        this.tachesForSelectedZoneChanged[i].titre=this.newTitleForSelectedTache
        this.tachesForSelectedZoneChanged[i].description=this.newDescriptionForSelectedTache
        this.editMode=false
      }
      i++
    }
  }

  annuler(){
    this.editModeGlobal=false
    this.tachesForSelectedZoneChanged=this.tachesForSelectedZone
    this.setVisible(this.selectedZoneID)
    this.imgChangedMap.clear()
  }

  sauvegarder(){
    this.imagesChangedAreSaved=false
    this.taskChangedAreSaved=false
    this.imagesToDeleteAreDeleted=false


    /*enregistrement des changements dans les titres et les descriptions*/
    for(var i = 0;i<this.tachesForSelectedZoneChanged.length;i++){
      this.checklistService.saveTache(this.tachesForSelectedZoneChanged[i]).subscribe(()=>{
        this.taskChangedAreSaved=true
      })
    }

    /*enregistrement des nouvelles images*/
     const convMap = {};
        this.imgChangedMap.forEach((val: string, key: number) => {
        convMap[key] = val;
      });
      this.checklistService.updateImageForTask(convMap).subscribe(()=>{
          this.imagesChangedAreSaved=true
      })
      this.editModeGlobal=false
      this.editMode=false

    /*suppression des taches*/
    if(this.tachesDeleted.length>0){
      this.checklistService.manyTachesToDelete(this.tachesDeleted).subscribe(()=>{
        this.imagesToDeleteAreDeleted=true
      })
    }
  }



}
