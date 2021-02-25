import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ZoneService } from 'src/services/zone.service';
import { StandardService } from 'src/services/standard.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-standard-ajouter',
  templateUrl: './standard-ajouter.component.html',
  styleUrls: ['./standard-ajouter.component.css'],
  providers: [MessageService]
})
export class StandardAjouterComponent implements OnInit {
    zones:any
    step:number=0
    formStd:FormGroup;
    uploadedFile:any
    base64File:any

    constructor(private zoneService:ZoneService, private standardService : StandardService,private formBuilder: FormBuilder) {}
    ngOnInit(): void {
      this.getZones()
      this.initForm()
    }
   
    getZones(){
      this.zoneService.getAllZones().subscribe((data)=>{
        this.zones=data       
      })
    }

    initForm() {
      this.formStd = this.formBuilder.group({
        titre:'',
        date:'',
        lien:'',
        zone:this.formBuilder.group({
        idZone:'',
      })
      });
    }

    async fileChange(event:any){
        this.uploadedFile=event.target.value
        this.base64File = await this.toBase64(event.target.files[0])
        this.formStd.get('lien').setValue(this.base64File)
        this.step+=1
    }

    toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    })

    sauvegarder(){
      this.standardService.saveStandard(this.formStd.value).subscribe(()=>{
        this.step=0
        this.uploadedFile=""
        this.formStd.reset()
      })
    }

    annuler(){
      this.step=0
      this.uploadedFile=""
      this.formStd.reset()
    }

    ajouter(){
      this.step=1
    }

    titleChange(val:any){
      this.formStd.get('titre').setValue(val)
    }

    zoneChange(val:any){
      this.formStd.get('zone.idZone').setValue(val)
      this.step=2
    }

}
