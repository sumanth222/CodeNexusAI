import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  docId : string = "";

  constructor(private authService: AuthServiceService) { }

  async updateUserStreak(){
    let email = firebase.auth().currentUser;
    const db = firebase.firestore();

    let user: any = await db.collection("user-info").where("email", "==", email).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {this.docId = doc.id})
  });
  }
}
