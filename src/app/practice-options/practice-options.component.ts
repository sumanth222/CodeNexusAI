import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-practice-options',
  templateUrl: './practice-options.component.html',
  styleUrl: './practice-options.component.css'
})
export class PracticeOptionsComponent {

  constructor(private router: Router){

  }

  navigateToProgramming(){
    this.router.navigate(['dashboard'])

  }

}
