import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Firestore, addDoc, collection, getDocs, getFirestore, query } from 'firebase/firestore';
import { firebaseConfig } from '../environment';
import "firebase/compat/firestore";

@Injectable()
export class DataService{

    app = firebase.initializeApp(firebaseConfig);
    firestore = getFirestore(this.app)

    constructor() {
    }

    ngOnInit(){
    }

    async createUserInfo(name: string | null, email: string | null, phoneNumber : string | null) {
        console.log(this.firestore)
        console.log(email);
        this.registerUser(name, email, phoneNumber);
    }

    async createUserInfoWithPhone(name: string | null, email: string | null, phoneNumber : string | null) {
        console.log(this.firestore)
        console.log(email);
        this.registerUserWithPhone(name, email, phoneNumber);
    }

    async getUserInfo(){
        const db = firebase.firestore();
        return db.collection("user-info").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
            });
        });
    }

    async registerUser(name: string | null, email: string | null, phoneNumber : string | null) : Promise<any>{
        const db = firebase.firestore();
        let docId : string | undefined;
        let userExists : boolean = false;
        let userList: any = await db.collection("user-info").where("email", "==", email).get().then((querySnapshot) => {
            if(querySnapshot.size == 0){
                console.log("New user, registering..");
                    addDoc(collection(this.firestore, 'user-info'), {
                    name: name,
                    email: email,
                    phoneNumber:  phoneNumber,
                    prgQuestions: 0,
                    prgStreak : 0,
                    sqlQuestion: 0,
                    sqlStreak: 0,
                    rank: 1,
                    premium: false,
                    dateCreated: new Date().toISOString(),
                    lastLogin: new Date().toISOString()
                });
            }
            else{
                console.log("User already exists in DB");
            }
        });

        await db.collection("user-info").where("email", "==", email).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {docId = doc.id})
        });

        db.collection("user-info").doc(docId).update({
            lastLogin: new Date().toISOString()
        }).then(() => {
            console.log("Updated last login time")
        }).catch((err) => {
            console.log("Error while updating last login: "+err)
        })
    }

    async registerUserWithPhone(name: string | null, email: string | null, phoneNumber : string | null) : Promise<any>{
        const db = firebase.firestore();
        let userExists: boolean = false;
        let docId : string | undefined;
        await db.collection("user-info").where("phoneNumber", "==", phoneNumber).get().then((querySnapshot) => {
            if(querySnapshot.size == 0){
                console.log("New user, registering..");
                    addDoc(collection(this.firestore, 'user-info'), {
                    name: name,
                    email: email,
                    phoneNumber:  phoneNumber,
                    prgQuestions: 0,
                    prgStreak : 0,
                    sqlQuestion: 0,
                    sqlStreak: 0,
                    rank: 1,
                    premium: false,
                    dateCreated: new Date().toISOString(),
                    lastLogin: new Date().toISOString()
                });
            }
            else{
                console.log("User already exists in DB");
                userExists = true;
            }
        });

        await db.collection("user-info").where("phoneNumber", "==", phoneNumber).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {docId = doc.id})
        });

        db.collection("user-info").doc(docId).update({
            lastLogin: Date.now()
        }).then(() => {
            console.log("Updated last login time")
        }).catch((err) => {
            console.log("Error while updating last login: "+err)
        })

    }
}