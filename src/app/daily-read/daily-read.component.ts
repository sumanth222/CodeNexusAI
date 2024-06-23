import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-daily-read',
  templateUrl: './daily-read.component.html',
  styleUrl: './daily-read.component.css'
})
export class DailyReadComponent {

  constructor(private router: Router, private authService: AuthServiceService){

  }

  goToHome(){
    this.router.navigate(['/practiceOptions'])
  }

  getPremium(){
    this.router.navigate(['/premiumInformation'])
  }

  logout(){
    this.authService.signoutUser();
  }

  goToProfile(){
    this.router.navigate(['/profilePage'])
  }

  goToSectionScreen(){
    this.router.navigate(['/practiceOptions'])
  }
}
