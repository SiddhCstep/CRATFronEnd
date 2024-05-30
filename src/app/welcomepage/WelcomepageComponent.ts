import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcomepage',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './welcomepage.component.html',
  styleUrl: './welcomepage.component.css'
})
export class WelcomepageComponent {

  expandedBox: string = '';
  loginform: boolean = true;

  constructor() { }


  expandBox(boxName: string) {
    this.expandedBox = boxName;
  }

  shrinkBox() {
    this.expandedBox = '';
  }

  toggleLoginForm() {
    this.loginform = !this.loginform;
    console.log('loginform value:', this.loginform); 
  }
}
