import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-standard-ajouter',
  templateUrl: './standard-ajouter.component.html',
  styleUrls: ['./standard-ajouter.component.css'],
  providers: [MessageService]
})
export class StandardAjouterComponent implements OnInit {
    uploadedFile: any;
    uploadedFileName: any;

    constructor(private messageService: MessageService) {}
    ngOnInit(): void {
    }
    upload() {
      this.messageService.add({severity: 'success', summary: 'File Uploaded', detail: ''});
  }
  annuler() {
    
    this.messageService.add({severity: 'warn', summary: 'annulé', detail: ''});
}

fileChange(event:any){  
  this.uploadedFile=event.target.value 
}
   

}
