import { Component } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-support-page',
  templateUrl: './support-page.component.html',
  styleUrl: './support-page.component.css'
})
export class SupportPageComponent {

  constructor(private authService: AuthServiceService, private router: Router){}

  logout(){
    this.authService.signoutUser();
  }

  goToProfile(){
    this.router.navigate(['/profilePage'])
  }

  goToHome(){
    this.router.navigate(['/practiceOptions'])
  }

  getPremium(){
    this.router.navigate(['/premiumInformation'])
  }

  goToSectionScreen(){
    this.router.navigate(['/practiceOptions'])
  }

}
