import { Component, OnInit } from '@angular/core';
import { firebaseConfig } from '../environment';
import firebase from "firebase/compat/app";
import { getAuth, signInWithCredential } from "firebase/auth";
import { Router } from '@angular/router';
import { UserContextService } from '../userContext/user-context.service';
import { UserDetails } from 'src/objects/user-details';
import { RecaptchaVerifier, PhoneAuthProvider } from 'firebase/auth';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  ui : any;
  app: any;
  analytics: any;
  phoneNumber: any = "";
  email: string = ""
  password: any = "";
  user: any;
  auth: any;
  carouselText : string = ""
  carouselTexts : string[] = ["1","2","3"];
  index: number = 1;
  userDetails: UserDetails = new UserDetails;
  recaptchaVerifier : any
  disabled = false;
  showOTPInput = false;
  otp : string = "";
  verificationId : any;
  username : string = "";

  constructor(private router: Router, private userContextService: UserContextService) { 
  }

  ngOnInit(): void {
    this.app = firebase.initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
  }

  async createAccount(){

    const appVerifier = new RecaptchaVerifier(this.auth, 'recaptcha-container',{
      size: 'invisible',
      callback:(response : any) => {
        console.log("Captcha verified");  
      }
    })
    
    const provider = new PhoneAuthProvider(this.auth);
    this.verificationId = await provider.verifyPhoneNumber("+91" + this.phoneNumber, appVerifier);
    this.disabled = true;
    this.showOTPInput = true;
  }

  navigate2Login(){
    console.log("Navigating to Login page")
    this.router.navigate(['/login'])
  }

  async loginWithPhone(){
    const authCredential = PhoneAuthProvider.credential(this.verificationId, this.otp);
    const userCredential = await signInWithCredential(this.auth, authCredential).then((result) => {
      const user = firebase.auth().currentUser;
      user?.updateProfile({
        displayName: this.username
      }).then((user) => {
        console.log("Username set")
        this.router.navigate(['/dashboard'])
      })}).catch((error: any) => {
      console.log("Error while logging in "+error);
    });
  }

  signupWithGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
      console.log("Signedin")
      this.userDetails.email = this.email;
      this.userContextService.setUserDetails(this.userDetails);
      this.router.navigate(['/dashboard'])
  }).catch((error)=>{
    console.log("Error"+error)
  })
  }

}
