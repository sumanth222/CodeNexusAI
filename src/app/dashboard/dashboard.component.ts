import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  companiesList : String[] = ['Google', 'Meta', 'Adobe', 'Apple', 'Netflix']

  constructor(private router: Router, private activatedRoute : ActivatedRoute, private authService: AuthServiceService) { }

  ngOnInit(): void {
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
