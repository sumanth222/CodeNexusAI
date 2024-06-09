import { Component, OnInit } from '@angular/core';
import { firebaseConfig } from '../environment';
import firebase from "firebase/compat/app";
import { getAuth, signInWithCredential } from "@firebase/auth";
import { Router } from '@angular/router';
import { UserContextService } from '../userContext/user-context.service';
import { UserDetails } from 'src/objects/user-details';
import { RecaptchaVerifier, PhoneAuthProvider } from '@firebase/auth';
import { DataService } from '../services/data-service.service';



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
  isLoading : boolean = false;
  otpDisabled : boolean = false;

  constructor(private router: Router, private userContextService: UserContextService,
    private dataService: DataService
  ) { 
  }

  ngOnInit(): void {
    this.app = firebase.initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
  }

  async createAccount(){
    this.isLoading = true;
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
    this.isLoading = false;
  }

  navigate2Login(){
    console.log("Navigating to Login page")
    this.router.navigate(['/login'])
  }

  async loginWithPhone(){
    this.isLoading = true;
    this.otpDisabled = true;
    const authCredential = PhoneAuthProvider.credential(this.verificationId, this.otp);
    const userCredential = await signInWithCredential(this.auth, authCredential).then((result) => {
      const user = firebase.auth().currentUser;
      user?.updateProfile({
        displayName: this.username
      }).then((user) => {
        console.log("Username set")
        this.userDetails.username = this.phoneNumber;
        this.userDetails.username = this.username;
        this.userContextService.setUserDetails(this.userDetails);
        //this.router.navigate(['/dashboard'])
        this.router.navigate(['/practiceOptions'])
      })}).catch((error: any) => {
      console.log("Error while logging in "+error);
      this.disabled = false;
      this.otpDisabled = false;
    });

    this.isLoading = false;
  }

  signupWithGoogle(){
    this.isLoading = true;

    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth()
  .signInWithPopup(provider).then((result) => {
    const fuser = firebase.auth().currentUser;
    fuser?.updateProfile({
      displayName: this.username
    }).then((user) => {
      this.userDetails.email = fuser.email;
      this.userDetails.username = this.username;
      this.userContextService.setUserDetails(this.userDetails);
      this.dataService.createUserInfo(fuser.displayName, fuser.email, "Starter", 0);
      this.router.navigate(['/dashboard'])
    })})
  .catch((error)=>{
    console.log("Error"+error)
  })
  this.isLoading = false;
  }
}
