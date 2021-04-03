import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {

  public Company : any
  constructor() { }

  getCompany() :any {
    return this.Company
  }

  setCompany(company :any) {
    this.Company = company
  }
  
}
