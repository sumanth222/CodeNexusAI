import { Component } from '@angular/core';
import { premiumSubscriptionDetails, premiumSubscriptionBody } from '../constants/app.constant';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VerdictResponseDialogExampleComponent } from '../verdict-response-dialog-example/verdict-response-dialog-example.component';

@Component({
  selector: 'app-premium-info',
  templateUrl: './premium-info.component.html',
  styleUrl: './premium-info.component.css'
})
export class PremiumInfoComponent {

  constructor(private authService: AuthServiceService, private router: Router, private dialog: MatDialog){}

  premiumText: string = "";
  premiumTextBody: string = "";

  ngOnInit(){
    this.premiumText = premiumSubscriptionDetails
    this.premiumTextBody = premiumSubscriptionBody
  }

  logout(){
    this.authService.signoutUser();
  }

  goToProfile(){
    this.router.navigate(['/profilePage'])
  }

  subscribe(){
    this.dialog.open(VerdictResponseDialogExampleComponent,{
      data: {
        response: new String("We are working with payment providers, hang tight!"),
        status: 'G'
      }
    })
  }

  goToSectionScreen(){
    this.router.navigate(['/practiceOptions'])
  }

  readTOS(){
    window.open("http://localhost:4200/tos")
  }

  goToAbout(){
    this.router.navigate(['/about-us'])
  }

}
