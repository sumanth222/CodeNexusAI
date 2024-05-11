import { Injectable } from '@angular/core';
import 'firebase/compat/auth';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService implements CanActivate {

  constructor(private afAuth : AngularFireAuth, private router : Router){
  }

  async canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const wait = setInterval(() =>{
         this.afAuth.onAuthStateChanged((user) => {
          console.log(user?.email)
          if( (user?.email != null && user?.email != "") || user?.phoneNumber != undefined){
            clearInterval(wait);
            resolve(true);
          }
          else{
            clearInterval(wait);
            reject();
          }
        })
      }, 20)
    })
  }
}
