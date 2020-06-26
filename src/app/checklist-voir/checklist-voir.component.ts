import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checklist-voir',
  templateUrl: './checklist-voir.component.html',
  styleUrls: ['./checklist-voir.component.css']
})
export class ChecklistVoirComponent implements OnInit {
  isVisible:boolean
  zone:any
  constructor() { }

  ngOnInit(): void {
    this.isVisible=false;
  }
  setVisible(event:any){
    this.isVisible=true
    this.zone=event.target.value
  }
}
