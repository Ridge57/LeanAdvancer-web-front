import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostService } from 'src/services/host.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private hostServ:HostService) { }

  saveUser(user:any){
    return this.http.post("http://"+this.hostServ.host+":8080/saveUser",user)
  }

  getAllUsers():any{
    return this.http.get("http://"+this.hostServ.host+":8080/getAllUsers")
  }

  deleteUser(id:number){
    return this.http.delete("http://"+this.hostServ.host+":8080//deleteUser/"+id)
  }
  
}
