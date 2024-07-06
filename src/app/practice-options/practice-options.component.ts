import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { VerdictResponseDialogExampleComponent } from '../verdict-response-dialog-example/verdict-response-dialog-example.component';
import { about } from '../constants/app.constant';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-practice-options',
  templateUrl: './practice-options.component.html',
  styleUrl: './practice-options.component.css'
})
export class PracticeOptionsComponent {

  constructor(private router: Router, private authService : AuthServiceService, private dialog: MatDialog,
    private deviceService: DeviceDetectorService
  ){

  }

  isMobileOrTablet : boolean = false;


  ngOnInit(){
    this.dialog.open(VerdictResponseDialogExampleComponent,{
      data: {
        response: new String(about),
        status: 'JM'
      }
    })
    this.isMobileOrTablet = this.deviceService.isMobile() || this.deviceService.isTablet();
  }

  navigateToProgramming(){
    this.router.navigate(['dashboard'])
  }

  navigateToSQLTopics(){
    this.router.navigate(['sqlTopics'])
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

  getPremium(){
    this.router.navigate(['/premiumInformation'])
  }

  navigateToDailyRead(){
    this.router.navigate(['dailyRead'])
  }

  goToAbout(){
    this.router.navigate(['/about-us'])
  }

  goToSupport(){
    this.router.navigate(['/support'])
  }
}
