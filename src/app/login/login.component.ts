import { Component, OnInit } from '@angular/core';
import firebase from "firebase/compat/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { UserDetails } from 'src/objects/user-details';
import { UserContextService } from '../userContext/user-context.service';


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
  userDetails: UserDetails = new UserDetails;

  constructor(private router: Router, private authService: AuthServiceService, private afAuth : AngularFireAuth,
   private userContextService: UserContextService ) {
    }

  ngOnInit(): void {
    this.auth = getAuth(this.app);
  }

  login(){
    console.log(this.email+ " " +this.password);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(()=> {
        this.afAuth.signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential: any) => {
          this.userDetails.email = this.email;
          this.userContextService.setUserDetails(this.userDetails);
          this.router.navigate(['/dashboard'])
        })
        .catch((error: string) => window.alert("Invalid Credentials")
        )
    })
  }
}
