import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personnaliser',
  templateUrl: './personnaliser.component.html',
  styleUrls: ['./personnaliser.component.css']
})
export class PersonnaliserComponent implements OnInit {
  uploadedFile: any;

  constructor(private router: Router) {
    if (localStorage.getItem("accessToken") == null) {
      this.router.navigate(['/home'])
    }
  }

  ngOnInit(): void {
  }

  fileChange(event: any) {
    this.uploadedFile = event.target.value
  }

}
