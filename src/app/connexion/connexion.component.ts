import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
  providers: [MessageService]
})
export class ConnexionComponent implements OnInit {
  falseKEY: boolean = false
  disabled: boolean = false
  authRequest: any
  constructor(private userService: UserService, private router: Router, private messageService: MessageService,
    private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.authRequest = this.formBuilder.group({
      username: this.formBuilder.control(""),
      privateKey: this.formBuilder.control(""),
    })
  }

  connexion() {
    if (this.authRequest.get('username').value.length == 0) {
      this.messageService.add({ severity: 'warn', summary: 'saisie obligatoire : ', detail: "organisation" });
    } if (this.authRequest.get('privateKey').value.length == 0) {
      this.messageService.add({ severity: 'warn', summary: 'saisie obligatoire : ', detail: "clé de connexion" });
    } else {
      this.userService.authenticate(this.authRequest.value)
        .subscribe(
          async (data: any) => {
            if (data != null) {
              localStorage.setItem('accessToken', data.jwtAccessToken);
              localStorage.setItem('organisation', data.organisation);
              this.messageService.add({ severity: 'success', summary: 'connecté' });
              await this.delay(1000);
              this.router.navigate(['/dashboard'])
            } else {
              this.falseKEY = true
            }

          },
          (error: any) => {
            console.log(error);
            if (error.status == 401) {
              this.messageService.add({ severity: 'error', summary: 'erreur connexion', detail: error.error });
            }
          })
    }

  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
