import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SortEvent } from 'primeng/api';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [MessageService]
})
export class UsersComponent implements OnInit {
  users:any
  cols: any[]
  nouveauUser:any
  selectedUser:any
  actionButtonIsVisible:boolean
  formUser:FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  this.getAllUsers()
  this.initForm()
  this.cols = [
    { field: 'userName', header: 'Utilisateur' }];
  }
  
getAllUsers(){
  this.userService.getAllUsers().subscribe((data)=>{
    this.users = data
  })
}

initForm() {
  this.formUser = this.formBuilder.group({
    idUser:'',
    userName:''
  })
}

getSelectedUser(user:any){
  this.selectedUser=user
}

saisie(val:any){
   
  if(val!=="" && val.replace(/\s/g, '').length>0){
    this.nouveauUser=val
    this.formUser.get('userName').setValue(val)
    this.actionButtonIsVisible=true
  }else{
    this.actionButtonIsVisible=false
  }
}

ajouter(){
  this.userService.saveUser(this.formUser.value).subscribe(()=>{
    this.formUser.reset()
    this.nouveauUser=""
    document.location.reload()
  })
}

modifier(){
  this.formUser.get('idUser').setValue(this.selectedUser.idUser)
  this.ajouter()
}

fermer(){
  this.formUser.reset()
  this.nouveauUser=""
}

deleteZone(){
  this.userService.deleteUser(this.selectedUser.idUser).subscribe(()=>{
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
