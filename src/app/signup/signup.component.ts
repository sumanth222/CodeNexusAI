import { Component, OnInit } from '@angular/core';
import { firebaseConfig } from '../environment';
import firebase from "firebase/compat/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  ui : any;
  app: any;
  analytics: any;
  email: any = "";
  password: any = "";
  user: any;
  auth: any;

  constructor(private router: Router) { 
  }

  ngOnInit(): void {
    this.app = firebase.initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
  }

  createAccount(){
    console.log(this.email+ " " +this.password);
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
    .then((userCredential: any) => {this.user = userCredential})
    .catch((error: string) => console.log("Error while creating account: "+error))
  }

  navigate2Login(){
    console.log("Navigating to Login page")
    this.router.navigate(['/login'])
  }

}
