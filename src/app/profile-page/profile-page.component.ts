import { Component } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { FirebaseServiceService } from '../services/firebase-service.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {

  username: string = ""
  email: string | null | undefined = ""
  phoneNumber: string | null | undefined = ""
  sqlQuestionsSolved : number = 0;
  sqlHighestStreak : number = 0;
  pgmQuestionsSolved : number = 0;
  pgmHighestStreak : number = 0;
  rank : string = "";
  rankTitle : string = "";

  constructor(private router: Router, private authService: AuthServiceService, private firebaseService: FirebaseServiceService){
  }

  async ngOnInit(){
    const fuser = firebase.auth().currentUser;
    this.email = fuser?.email;
    this.phoneNumber = fuser?.phoneNumber;
    await this.populateData();
    console.log(this.rank)
  }

  async populateData() {
    if(this.email != undefined && this.email != ""){
        await this.firebaseService.getUserInfo(this.email).then((userInfo) => {
        this.pgmHighestStreak = userInfo.prgStreak;
        this.pgmQuestionsSolved = userInfo.prgQuestions;
        this.sqlQuestionsSolved = userInfo.sqlQuestion;
        this.sqlHighestStreak = userInfo.sqlStreak;
        this.phoneNumber = userInfo.phoneNumber
        this.rank = userInfo.rank;
        this.username = userInfo.name;
      });
    }
    else{
      await this.firebaseService.getUserInfoByPhone(this.phoneNumber).then((userInfo) => {
        this.pgmHighestStreak = userInfo.prgStreak;
        this.pgmQuestionsSolved = userInfo.prgQuestions;
        this.sqlQuestionsSolved = userInfo.sqlQuestion;
        this.sqlHighestStreak = userInfo.sqlStreak;
        this.phoneNumber = userInfo.phoneNumber
        this.rank = userInfo.rank
      });
    }
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
}
