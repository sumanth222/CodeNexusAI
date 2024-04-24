import { Component, OnInit } from '@angular/core';
// import * as firebase from "firebase/app";
import firebase from "firebase/compat/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  ui : any;
  app: any;
  analytics: any;
  email: any = "";
  password: any = "";
  user: any;
  auth: any;
  firebaseConfig = {
    apiKey: "AIzaSyDrrGE2AHasRIPJP6vYMoQ8s7vj2xoS8eU",
    authDomain: "codenexusai-5d054.firebaseapp.com",
    databaseURL: "https://codenexusai-5d054-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "codenexusai-5d054",
    storageBucket: "codenexusai-5d054.appspot.com",
    messagingSenderId: "559985915089",
    appId: "1:559985915089:web:8f8a1258380b3adc8381f0",
    measurementId: "G-9D8ZWFYWTL"
  };

  constructor() { }

  ngOnInit(): void {
    this.app = firebase.initializeApp(this.firebaseConfig);
    this.auth = getAuth(this.app);
  }

  createAccount(){
    console.log(this.email+ " " +this.password);
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
    .then((userCredential: any) => {this.user = userCredential})
    .catch((error: string) => console.log("Error while creating account: "+error))
  }

}
