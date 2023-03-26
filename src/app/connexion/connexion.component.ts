import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  falseKEY: boolean = false
  authRequest: any
  constructor(private userService: UserService, private router: Router,
    private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.authRequest = this.formBuilder.group({
      username: this.formBuilder.control(""),
      privateKey: this.formBuilder.control(""),
    })
  }

  connexion() {
    this.userService.authenticate(this.authRequest.value).subscribe((data: any) => {
      if (data != null) {
        localStorage.setItem('accessToken', data.jwtAccessToken);
        localStorage.setItem('organisation', data.organisation);
        this.router.navigate(['/dashboard'])
      } else {
        this.falseKEY = true
      }

    })
  }

}
