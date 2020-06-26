import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personnaliser',
  templateUrl: './personnaliser.component.html',
  styleUrls: ['./personnaliser.component.css']
})
export class PersonnaliserComponent implements OnInit {
  uploadedFile: any;

  constructor() { }

  ngOnInit(): void {
  }

  fileChange(event:any){  
    this.uploadedFile=event.target.value 
  }

}
