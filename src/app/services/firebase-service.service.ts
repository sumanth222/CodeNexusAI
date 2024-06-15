import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  docId : string = "";

  constructor(private authService: AuthServiceService) { }

  async updateUserProgQuestions(){
    let user = firebase.auth().currentUser;
    const db = firebase.firestore();
    let currentSolved : number = 0;

    await db.collection("user-info").where("email", "==", user?.email).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {this.docId = doc.id; currentSolved = doc.data().prgQuestions})
    });

    db.collection("user-info").doc(this.docId).update({
      prgQuestions: currentSolved + 1
    }).then(() => {
      console.log("Updated user questions solved, successfully");
    }).catch((error) => {
      console.log("Error while updating user questions solved: "+error)
    })
  }

  async updateProgUserStreakAndQuestions(streak: number){
    let user = firebase.auth().currentUser;
    const db = firebase.firestore();
    let currentSolved : number = 0;

    await db.collection("user-info").where("email", "==", user?.email).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {this.docId = doc.id; currentSolved = doc.data().prgQuestions})
    });

    db.collection("user-info").doc(this.docId).update({
      prgStreak: streak,
      prgQuestions: currentSolved + 1
    }).then(() => {
      console.log("Updated user streak and questions, successfully");
    }).catch((error) => {
      console.log("Error while updating user streak and questions: "+error)
    })
  }

  async updateSQLUserStreakAndQuestions(streak: number){
    let user = firebase.auth().currentUser;
    const db = firebase.firestore();
    let currentSolved : number = 0;

    await db.collection("user-info").where("email", "==", user?.email).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {this.docId = doc.id; currentSolved = doc.data().sqlQuestion})
    });

    db.collection("user-info").doc(this.docId).update({
      sqlStreak: streak,
      sqlQuestion: currentSolved + 1
    }).then(() => {
      console.log("Updated Prog streak and questions, successfully");
    }).catch((error) => {
      console.log("Error while updating prog streak and questions: "+error)
    })
  }

  async updateUserSQLQuestions(){
    let user = firebase.auth().currentUser;
    const db = firebase.firestore();
    let currentSolved : number = 0;

    await db.collection("user-info").where("email", "==", user?.email).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {this.docId = doc.id; currentSolved = doc.data().sqlQuestion})
    });

    db.collection("user-info").doc(this.docId).update({
      sqlQuestion: currentSolved + 1
    }).then(() => {
      console.log("Updated SQL questions solved, successfully");
    }).catch((error) => {
      console.log("Error while updating SQL questions solved: "+error)
    })
  }

  async getUserInfo(email: string | undefined | null) : Promise<any>{
    let userInfo : any;

    const db = firebase.firestore();
    await db.collection("user-info").where("email", "==", email).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {userInfo = doc.data()})
    });
    return userInfo
  }
}
