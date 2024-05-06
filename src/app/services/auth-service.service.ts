import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { firebaseConfig } from '../environment';
import 'firebase/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  user: firebase.User | undefined;

  setAuthenticatedUser(user: any){
    this.user = user;
  }

  getAuthenticatedUser(){
    return this.user;
  }


  constructor() { }

  getCurrentUser() : string {
    var uid = "";
    firebase.initializeApp(firebaseConfig)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/v8/firebase.User
          uid = user.uid;
          return uid; 
      } else {
          return null;
      }
    });
    return uid;
  }

  // login(email: string, pwd: string){
  //   signInWithEmailAndPassword(this.auth, this.email, this.password)
  //   .then((userCredential: any) => {
  //     this.user = userCredential;
  //     this.authService.setAuthenticatedUser(this.user.user);
  //     this.router.navigate(['/dsselection'])
  //   })
  //   .catch((error: string) => window.alert("Invalid Credentials")
  //   )
  // }

}
