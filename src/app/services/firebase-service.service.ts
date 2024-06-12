import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  docId : string = "";

  constructor(private authService: AuthServiceService) { }

  async updateUserStreak(streak: number){
    let user = firebase.auth().currentUser;
    const db = firebase.firestore();

    await db.collection("user-info").where("email", "==", user?.email).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {this.docId = doc.id})
    });

    db.collection("user-info").doc(this.docId).update({
      prgStreak: streak
    }).then(() => {
      console.log("Updated user streak, successfully");
    }).catch((error) => {
      console.log("Error while updating user streak: "+error)
    })
  }
}
