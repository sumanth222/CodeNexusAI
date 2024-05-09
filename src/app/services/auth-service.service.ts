import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { firebaseConfig } from '../environment';
import 'firebase/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

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
          if( user?.email != null && user?.email != ""){
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
