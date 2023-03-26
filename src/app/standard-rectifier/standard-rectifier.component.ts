import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-standard-rectifier',
  templateUrl: './standard-rectifier.component.html',
  styleUrls: ['./standard-rectifier.component.css']
})
export class StandardRectifierComponent implements OnInit {

  constructor(private router: Router) {
    if (localStorage.getItem("accessToken") == null) {
      this.router.navigate(['/home'])
    }
  }

  ngOnInit(): void {
  }

}
