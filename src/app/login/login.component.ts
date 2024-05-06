import { Component, OnInit } from '@angular/core';
import firebase from "firebase/compat/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';


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
  

  constructor(private router: Router, private authService: AuthServiceService, private afAuth : AngularFireAuth) { }

  ngOnInit(): void {
    this.auth = getAuth(this.app);
  }

  login(){
    console.log(this.email+ " " +this.password);
    
    this.afAuth.signInWithEmailAndPassword(this.email, this.password)
    .then((userCredential: any) => {
      this.user = userCredential;
      this.authService.setAuthenticatedUser(this.user.user);
      this.router.navigate(['/dsselection'])
    })
    .catch((error: string) => window.alert("Invalid Credentials")
    )

    this.auth.onAuthStateChanged((user: string) => {
      console.log("Auth changed "+user)
    })
  }

}
