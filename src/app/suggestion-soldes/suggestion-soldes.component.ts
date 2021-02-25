import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';
import {IdeeService} from 'src/services/idee.service';

@Component({
  selector: 'app-suggestion-soldes',
  templateUrl: './suggestion-soldes.component.html',
  styleUrls: ['./suggestion-soldes.component.css']
})
export class SuggestionSoldesComponent implements OnInit {
  cars1: any[];
  cols: any[];
  suggestions:any;
  selectedSuggestion:any
  selectedSuggestionID:number
  statusList:any
  displaySaveButton=false
  constructor(private ideeService : IdeeService) { }

  ngOnInit(): void {
    this.initialization()

    this.cols = [
    { field: 'zone', subfield: 'nomZone', header: 'Zone' },
    { field: 'user',subfield: 'userName', header:'User'},
    { field: 'date',header:'Date'},
    ]

  }

  getSuggestionsSoldes(){
    this.ideeService.getClosedIdeas().subscribe((data)=>{
      this.suggestions = data      
    })
  }

  initialization(){
    this.ideeService.getIdeaStatusList().subscribe((data)=>{
      this.statusList = data      
      this.getSuggestionsSoldes()
    })
  }

  setStatus(status:any){
      this.selectedSuggestion.status=status
      this.displaySaveButton=true
      console.log(this.statusList[0]);
  }

  getSelectedSuggestion(suggestion:any){
    this.selectedSuggestion=suggestion
    this.selectedSuggestionID=suggestion.idSuggestion
    this.displaySaveButton=false
  }

  saveChanges(){
    this.ideeService.updateIdeeStatus(this.selectedSuggestion).subscribe(()=>{
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
