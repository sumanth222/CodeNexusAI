import { Component, OnInit } from '@angular/core';
import firebase from "firebase/compat/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {firebaseConfig} from '../environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  ui : any;
  app: any;
  analytics: any;
  email: any = "";
  password: any = "";
  user: any;
  auth: any;
  

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.app = firebase.initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
  }

  login(){
    console.log(this.email+ " " +this.password);
    signInWithEmailAndPassword(this.auth, this.email, this.password)
    .then((userCredential: any) => {
      this.user = userCredential;
      this.router.navigate(['/dsselection'])
    })
    .catch((error: string) => window.alert("Invalid Credentials")
    )
  }

}
