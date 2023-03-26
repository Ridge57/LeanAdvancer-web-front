import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HostService } from 'src/services/host.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private hostServ: HostService) { }

  saveUser(user: any) {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.post(this.hostServ.host + "/saveUser", user, { headers })
  }

  getAllUsers(): any {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.get(this.hostServ.host + "/getAllUsers", { headers })
  }

  deleteUser(id: number) {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.delete(this.hostServ.host + "/deleteUser/" + id, { headers })
  }

  authenticate(authRequest: any) {
    return this.http.post(this.hostServ.host + "/authenticate", authRequest)
  }

}
