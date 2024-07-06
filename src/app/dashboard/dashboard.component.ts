import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { UserContextService } from '../userContext/user-context.service';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../services/data-service.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  companiesList : String[] = ['Google', 'Meta', 'Adobe', 'Apple', 'Netflix']
  isMobileOrTablet : boolean = false;

  constructor(private router: Router, private activatedRoute : ActivatedRoute, private authService: AuthServiceService,
    private userContext : UserContextService, private dialog: MatDialog, private dataService: DataService,  private deviceService: DeviceDetectorService
  ) { }

  username : string | undefined = ""

  ngOnInit(): void {
    this.username = this.userContext.getUserDetails().username
    console.log(this.dataService.getUserInfo())
    this.isMobileOrTablet = this.deviceService.isMobile() || this.deviceService.isTablet();
  }

  navigate(index: number){
    if(index != -1){
      this.router.navigate(['/dsselection/companiesList[index]'])
    }
    else{
      this.router.navigate(['/dsselection/na'])
    }
  }

  logout(){
    this.authService.signoutUser();
  }

  goToSectionScreen(){
    this.router.navigate(['/practiceOptions'])
  }

  goToProfile(){
    this.router.navigate(['/profilePage'])
  }

  getPremium(){
    this.router.navigate(['/premiumInformation'])
  }

  goToAbout(){
    this.router.navigate(['/about-us'])
  }

  goToSupport(){
    this.router.navigate(['/support'])
  }
}