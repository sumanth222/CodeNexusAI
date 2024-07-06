import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FirebaseServiceService } from '../services/firebase-service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { premiumToolTip } from '../constants/app.constant';
import { DeviceDetectorService } from 'ngx-device-detector';

export interface CodeModel {
  language: string;
  value: string;
  uri: string;

  dependencies?: Array<string>;
  schemas?: Array<{
    uri: string;
    schema: Object;
  }>;
}

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {

  editorOptions: any;
  code: string = "";
  @Output() finalCode = new EventEmitter();
  @Input() showNextQuestion : boolean = false;
  @Input() codeTemplate : string = "";
  @Input() showSubmitButton : boolean = false;
  @Input() showOptimizeButton : boolean = false;
  @Input() showSolutionButton : boolean = false;
  @Input() showHintButton : boolean = false;
  disabled: boolean = true
  user!: firebase.User | null;
  isPremium: boolean = false;
  premiumTooltip : string = "";


  theme = 'vs-dark';

  model: CodeModel = {
    language: 'java',
    uri: 'main.json',
    value: this.codeTemplate
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: true
    }
  };
  isMobileOrTablet: boolean = false;
  ;
  constructor(private firebaseService: FirebaseServiceService, private afAuth: AngularFireAuth,  private deviceService: DeviceDetectorService) {
    this.afAuth.onAuthStateChanged((user) =>{
      this.user = user;
    })
    this.premiumTooltip = premiumToolTip
   }

  ngOnInit(): void {
    this.user = firebase.auth().currentUser;
    this.isMobileOrTablet = this.deviceService.isMobile() || this.deviceService.isTablet();

    this.editorOptions = {theme: 'vs-dark', language: 'java'};
    this.code = this.codeTemplate;
    this.model = {
        language: 'java',
        uri: 'main.json',
        value: this.codeTemplate
    }
    console.log("userdeets: "+this.user?.email + " "+ this.user?.phoneNumber)
    if(this.user?.email != undefined && this.user.email != ""){
      this.firebaseService.getUserInfo(this.user?.email).then((user) => {
          this.isPremium = user.isPremium;
          if(user.isPremium == null){
            this.isPremium = false;
          }
      })
    }
    else{
      this.firebaseService.getUserInfoByPhone(this.user?.phoneNumber).then((user) => {
        this.isPremium = user.isPremium;
        if(user.isPremium == null){
          this.isPremium = false;
        }
      })
    }
  }

  submitCode(){
    this.finalCode.emit(this.code);
  }

  askForHint(){
    this.finalCode.emit("hint");
  }

  showSolution(){
    this.finalCode.emit("solution");
  }  

  optimizeCode(){
    this.finalCode.emit("op6"+this.code);
  }

  onCodeChanged(code: any){
    console.log("Updated code: "+code)
    this.code = code;
  }

  nextQuestion(){
    this.finalCode.emit("next");
  }
}
