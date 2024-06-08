import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Firestore, addDoc, collection, getDocs, getFirestore, query } from 'firebase/firestore';
import { firebaseConfig } from '../environment';

@Injectable()
export class DataService{

    app = firebase.initializeApp(firebaseConfig);
    firestore = getFirestore(this.app)

    constructor() {
     }

    ngOnInit(){
    }

    async createUserInfo(name: string, email: string, rank: string, questionsSolved: number) {
        console.log(this.firestore)
        const docRef = await addDoc(collection(this.firestore, 'user-info'), {
            name: name,
            rank: rank,
            email: email,
            questionsSolved: questionsSolved
        });
    }
}