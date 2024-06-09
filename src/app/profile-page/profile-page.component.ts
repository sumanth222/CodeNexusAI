import { Component } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {

  username: string = ""
  email: string = ""
  phoneNumber: string = ""
  sqlQuestionsSolved : number = 0;
  sqlHighestStreak : number = 0;
  pgmQuestionsSolved : number = 0;
  pgmHighestStreak : number = 0;

  constructor(private router: Router, private authService: AuthServiceService){

  }

  ngOnInit(){
    const fuser = firebase.auth().currentUser;
    console.log("Email is" +fuser?.email)
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
