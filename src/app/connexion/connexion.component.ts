import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { GlobalVariablesService } from 'src/services/globalvar.service';
import {Router} from "@angular/router"
import { Location } from '@angular/common';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  privateKey : any
  falseKEY : boolean =false
  constructor(private userService : UserService,private router: Router,
    private location: Location,private globalvarService : GlobalVariablesService) { }

  ngOnInit(): void {
  }

  connexion(){
    this.userService.connexion(this.privateKey).subscribe((data)=>{
     if(data != null) {
      this.globalvarService.setCompany(data)
      this.location.replaceState('/')
      this.router.navigate(['/dashboard'])
     } else {
       this.falseKEY=true
     }
     
    })
  }

  keyInput(e:any){
    this.privateKey = e.srcElement.value
  }

}
