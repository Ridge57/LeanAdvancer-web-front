import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostService } from 'src/services/host.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private hostServ:HostService) { }

  saveUser(user:any){
    return this.http.post(this.hostServ.host+"/saveUser",user)
  }

  getAllUsers():any{
    return this.http.get(this.hostServ.host+"/getAllUsers")
  }

  deleteUser(id:number){
    return this.http.delete(this.hostServ.host+"/deleteUser/"+id)
  }

  connexion(privateKey:any){
    return this.http.get(this.hostServ.host+"/connexion/"+privateKey)
  }
  
}
