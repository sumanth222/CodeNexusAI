import { Component, OnInit } from '@angular/core';
import { firebaseConfig } from '../environment';
import firebase from "firebase/compat/app";
import { getAuth, signInWithCredential } from "@firebase/auth";
import { Router } from '@angular/router';
import { UserContextService } from '../userContext/user-context.service';
import { UserDetails } from 'src/objects/user-details';
import { RecaptchaVerifier, PhoneAuthProvider } from '@firebase/auth';
import { DataService } from '../services/data-service.service';
import anime from 'animejs/lib/anime.es.js';
import { DeviceDetectorService } from 'ngx-device-detector';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  ui : any;
  app: any;
  analytics: any;
  phoneNumber: string = "";
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
  signUpDisabled : boolean = true;
  usernameValid : boolean = false;
  phoneNumberValid: boolean = false;
  isMobileOrTablet : boolean = false;

  constructor(private router: Router, private userContextService: UserContextService,
    private dataService: DataService, private deviceService: DeviceDetectorService
  ) { 
  }

  ngOnInit(): void {
    this.app = firebase.initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
    this.isMobileOrTablet = this.deviceService.isMobile() || this.deviceService.isTablet();
  }

  ngAfterViewInit(): void{
    anime.timeline({loop: true})
  .add({
    targets: '.ml5 .line',
    opacity: [0.5,1],
    scaleX: [0, 1],
    easing: "easeInOutExpo",
    duration: 700
  }).add({
    targets: '.ml5 .line',
    duration: 600,
    easing: "easeOutExpo",
    translateY: () => (-0.625 + 0.625*2*2) + "em"
  }).add({
    targets: '.ml5 .ampersand',
    opacity: [0,1],
    scaleY: [0.5, 1],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=600'
  }).add({
    targets: '.ml5 .letters-left',
    opacity: [0,1],
    translateX: ["0.5em", 0],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=300'
  }).add({
    targets: '.ml5 .letters-right',
    opacity: [0,1],
    translateX: ["-0.5em", 0],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=600'
  }).add({
    targets: '.ml5',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });
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
        this.dataService.createUserInfoWithPhone(this.username, "", this.phoneNumber);
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
    if(this.usernameValid && this.phoneNumberValid){
        this.isLoading = true;
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
            firebase.auth()
            .signInWithPopup(provider).then((result) => {
              const fuser = firebase.auth().currentUser;
              fuser?.updateProfile({
                displayName: this.username
              }).then((user) => {
                this.userDetails.email = fuser.email;
                this.userDetails.username = this.username;
                this.userContextService.setUserDetails(this.userDetails);
                this.dataService.createUserInfo(this.username, fuser.email, this.phoneNumber);
                this.router.navigate(['/practiceOptions'])
              })})
            .catch((error)=>{
              console.log("Error"+error)
            })
        })
      this.isLoading = false;
    }
    else{
      alert("Kindly enter valid username and phone number")
    }
  }

  onChangeName(){
    console.log("checlong")
    this.username = this.username.replace(/[0-9]/g,'');
    if(this.username.length >= 5){
      this.usernameValid = true;
    }
    else{
      this.usernameValid = false;
    }
    if(this.usernameValid && this.phoneNumberValid){
      this.signUpDisabled = false;
    }
    else{
      this.signUpDisabled  =true;
    }
  }

  onChangePhone(){
    console.log("checlong")
    let firstPhoneDigit = this.phoneNumber.charAt(0);
    if(this.phoneNumber.length == 10 && 
      (firstPhoneDigit == '6' || firstPhoneDigit == '7' || firstPhoneDigit == '8' || firstPhoneDigit == '9')){
        this.phoneNumberValid = true;
      }
      else{
        this.phoneNumberValid = false;
      }
    if(this.usernameValid && this.phoneNumberValid){
      this.signUpDisabled = false;
    }
    else{
      this.signUpDisabled = true;
    }
  }
}
