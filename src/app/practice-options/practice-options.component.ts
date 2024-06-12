import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-practice-options',
  templateUrl: './practice-options.component.html',
  styleUrl: './practice-options.component.css'
})
export class PracticeOptionsComponent {

  constructor(private router: Router, private authService : AuthServiceService){

  }

  navigateToProgramming(){
    this.router.navigate(['dashboard'])
  }

  navigateToSQL(){
    this.router.navigate(['sqlPractice'])
  }

  logout(){
    this.authService.signoutUser();
  }

  goToProfile(){
    this.router.navigate(['/profilePage'])
  }

  goToHome(){
    this.router.navigate(['/practiceOptions'])
  }
}
