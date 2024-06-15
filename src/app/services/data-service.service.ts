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
                    rank: 1
                });
            }
            else{
                console.log("User already exists in DB");
            }
        });
    }
}