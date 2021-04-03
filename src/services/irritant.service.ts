import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HostService } from 'src/services/host.service';

@Injectable({
  providedIn: 'root'
})
export class IrritantService {

  constructor(private http:HttpClient, private hostServ:HostService) { }

  addIrritant(irr:any):any{
    return this.http.post(this.hostServ.host+"/Irritant",irr)
  }

  getAll(){
    return this.http.get(this.hostServ.host+"/irritants")
  }

  findByStatus(status:any):any{
    return this.http.post(this.hostServ.host+"/findByStatus",status)
  }

  getIrritantsCurrentYear(year:number){
    return this.http.get(this.hostServ.host+"/getIrritantsCurrentYear/"+year)
  }

  findIrritant(SearchParam:any):any{
    return this.http.post(this.hostServ.host+"/findIrritant",SearchParam)
  }
  
  getZones():any{
    return this.http.get(this.hostServ.host+"/zones")
  }

  getLast():any{
    return this.http.get(this.hostServ.host+"/dernier")
  }

  getStatusList():any{
    return this.http.get(this.hostServ.host+"/getStatusList")
  }

  updateIrritantStatus(irritant:any):any{
    return this.http.post(this.hostServ.host+"/updateIrritantStatus",irritant)
  }

  getCategories():any{
    return this.http.get(this.hostServ.host+"/categories")
  }

  addCategorie(cat:any){
    return this.http.post(this.hostServ.host+"/Categorie",cat)
  }

  deleteCat(idCat:number){
    return this.http.delete(this.hostServ.host+"/deleteCat/"+idCat)
  }

  getTotalToday():any{
    return this.http.get(this.hostServ.host+"/getTotalToday")
  }

  getIrritantProcessingRate(){
    return this.http.get(this.hostServ.host+"/getIrrProcessingRate")
  }
  getNbreIrritantsParMois(year:number):any{
    return this.http.get(this.hostServ.host+"/getNbreIrritantsParMois/"+year)
  }
  
  getSortedCategoriesIrritant(year:number):any{
    return this.http.get(this.hostServ.host+"/getSortedCategoriesIrritant/"+year)
  }
}
