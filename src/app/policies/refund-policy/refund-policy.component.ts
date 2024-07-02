import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-refund-policy',
  templateUrl: './refund-policy.component.html',
  styleUrl: './refund-policy.component.css'
})
export class RefundPolicyComponent {

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

  goToSupport(){
    this.router.navigate(['/support'])
  }
}
