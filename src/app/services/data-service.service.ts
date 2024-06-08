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

    async createUserInfo(name: string | null, email: string | null, rank: string, questionsSolved: number) {
        console.log(this.firestore)
        let userListWithEmail = await this.userWithEmailFilter(email);
        if(userListWithEmail > 0){
            console.log("New user, registering..");
            const docRef = await addDoc(collection(this.firestore, 'user-info'), {
                name: name,
                rank: rank,
                email: email,
                questionsSolved: questionsSolved
            });
        }
        else{
            console.log("User already exists. Logging in")
        }
    }

    async getUserInfo(){
        const db = firebase.firestore();
        return db.collection("user-info").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
            });
        });
    }

    async userWithEmailFilter(email: string | null) : Promise<any>{
        const db = firebase.firestore();
        let userList: any = await db.collection("user-info").where("email", "==", email).get().then((querySnapshot) => {
            return querySnapshot.size;
        });
    }
}