import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { UserContextService } from '../userContext/user-context.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  companiesList : String[] = ['Google', 'Meta', 'Adobe', 'Apple', 'Netflix']

  constructor(private router: Router, private activatedRoute : ActivatedRoute, private authService: AuthServiceService,
    private userContext : UserContextService
  ) { }

  username : string | undefined = ""

  ngOnInit(): void {
    this.username = this.userContext.getUserDetails().username
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
}
