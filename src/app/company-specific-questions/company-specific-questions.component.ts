import { Component, OnInit } from '@angular/core';
import { geminiApiKey } from '../environment';
import { geminiResponse } from 'src/objects/gemini-response';
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});
import {
  MatDialog,
} from '@angular/material/dialog';
import { VerdictResponseDialogExampleComponent } from '../verdict-response-dialog-example/verdict-response-dialog-example.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthServiceService } from '../services/auth-service.service';
import { UserContextService } from '../userContext/user-context.service';
import { autoAdaptInfo } from '../constants/app.constant';
import { FirebaseServiceService } from '../services/firebase-service.service';

const autoAdapt = "Auto Adapt";

const difficultyMap = {
  0: 'beginner',
  1: 'easy',
  2: 'moderate',
  3: 'hard',
  4: 'very difficult'
}

@Component({
  selector: 'app-company-specific-questions',
  templateUrl: './company-specific-questions.component.html',
  styleUrls: ['./company-specific-questions.component.css']
})

export class CompanySpecificQuestionsComponent implements OnInit {

  response : any =  ""
  stars: number = 0;
  starFound: boolean = false;
  subtract : boolean = false;
  headings: string[] = ["Question", "Example test case", "Time Complexity"];
  contents: string[] = [];
  difficultyLevels: string[] = ["easy","moderate","hard","very hard"];
  headingsIndex : number = 0;
  askedForHint : boolean = false;
  askedForSolution : boolean = false;
  askedToOptimize : boolean = false;
  showLoaderWheel : boolean = false;
  dsTopic: any = "";
  diffLevel : any = "";
  user : any;
  company: any = "";
  username : string | undefined = "";
  questionsSolved : number = 0;
  solvedStreak : number = 0;
  showNextQuestion : boolean = false;
  codeTemplate : string = 'public <Return Type> func(<Arguments if any>){\n\tSystem.out.println("Hello World");\n}'
  endTime = 300;
  difficultyIndex = 0;
  streak = 0;
  highestStreak = 0;
  timedMode : string | null = "";

  constructor(public dialog: MatDialog, private route : ActivatedRoute, private router: Router,
    private afAuth : AngularFireAuth, private userContextService: UserContextService, private authService: AuthServiceService,
  private firebaseService: FirebaseServiceService) {
      this.afAuth.onAuthStateChanged((user) => {
        this.user = user?.email;
        console.log("Logged inuser is "+this.user)
      })
   }

  ngOnInit(): void {
    console.log("Logged inuser is "+this.user)
    this.dsTopic = this.route.snapshot.paramMap.get('title');
    this.diffLevel = this.route.snapshot.paramMap.get("diffLevel");
    this.company = this.route.snapshot.paramMap.get("company");
    this.username = this.userContextService.getUserDetails().username
    this.timedMode = this.route.snapshot.paramMap.get("timedMode");
    if(this.timedMode == 'false'){
      this.endTime = 0;
    }
    if(autoAdapt == this.diffLevel){
      this.diffLevel = this.difficultyLevels[this.difficultyIndex];
    }
    this.generateQuestion();
  }

  async generateQuestion(){
    if(this.streak == 2 && this.difficultyIndex < 3){
      this.difficultyIndex++;
      this.streak = 0
    }
    var companySuffix = "";
    if(this.company != "na"){
      companySuffix = " at "+this.company;
    }
    var result = null;
    if(autoAdapt == this.diffLevel){
      result = await model.generateContent("Generate a "+this.difficultyLevels[this.difficultyIndex]+" programming question in java on "+this.dsTopic+" topic for a software engineer position"+companySuffix+" in valid parseable JSON format in a single line"+
    " which follows this structure  "+JSON.stringify(geminiResponse) + " and does not have any HTML markup");
    }
    else{
      result = await model.generateContent("Generate a "+this.diffLevel+" programming question in java on "+this.dsTopic+" topic for a software engineer position"+companySuffix+" in valid parseable JSON format in a single line"+
        " which follows this structure  "+JSON.stringify(geminiResponse) + " and does not have any HTML markup");
    }
    var extractedResponse = "";
    console.log(JSON.stringify(geminiResponse))
    var response = await result.response;
    console.log(response.candidates[0].content.parts[0]);
    extractedResponse = response.candidates[0].content.parts[0].text.replace("```json","");
    extractedResponse = extractedResponse.replace(",}","}");
    extractedResponse = extractedResponse.replace("```","");
    extractedResponse = extractedResponse.replace("/\n","");
    console.log(extractedResponse)
    this.response = JSON.parse(extractedResponse)
    this.populateContent();
    if(autoAdapt == this.diffLevel){
      this.dialog.open(VerdictResponseDialogExampleComponent,{
      data: {
        response: new String(autoAdaptInfo),
      }
    })
  }
  }

  populateContent(){
    this.contents.push(this.response["question"]);
    if(this.isJSONObject(this.response["exampleTestcase"])){
      this.contents.push(JSON.parse(this.response["exampleTestcase"]));
    }
    else{
      this.contents.push(this.response["exampleTestcase"]);
    }
    this.contents.push(this.response["timeComplexity"]);
    this.contents.push(this.response["solution"]);
  }

  async resetQuestion(){
    this.response = "";
    this.contents = [];
    await this.generateQuestion();
  }

  isJSONObject(obj: any) {
    return obj !== null
        &&
        typeof obj === 'object'
        &&
        obj.constructor === Object;
  }

  async submitCode(code: string){
    console.log("Received code is:"+code)
    if("next" == code){
      this.showNextQuestion = false
      this.resetQuestion();
    }
    else if("hint" == code){
      this.askedForHint = true;
      this.askForHint();
    }
    else if("solution" == code){
      this.askedForSolution = true;
      this.askForSolution();
    } 
    else if("op6" == code.substring(0,3)){
      this.askedToOptimize = true;
      this.optimizeCode(code.substring(3, code.length-1));
    }
    else{
      this.showLoaderWheel = true;
      this.askedForHint = false;
      console.log("The code is"+code)
      var verdictResponse = "";
      var result = await model.generateContent("Will the code " +code+" work for the question "+this.response['question']+
      "? answer me by saying Yes/No as the first word then the explanation"
      );
      var response = await result.response;
      console.log(response.candidates[0].content.parts[0]);
      verdictResponse = response.candidates[0].content.parts[0]
      this.openDialog(verdictResponse, true);
      this.showLoaderWheel = false;
    }
  }

  openDialog(text: any, isAIResponse: boolean){
    console.log("Opening dialog with string "+text)
    var valid : String = 'N';
    var verdictResponse : string =  (isAIResponse ? JSON.stringify(text.text) : text)
    if(new String(verdictResponse).charAt(1) == 'Y'){
      valid = 'Y';
      this.showNextQuestion = true;
      this.questionsSolved++;
      this.solvedStreak++;
      this.streak++;
      this.highestStreak = (this.solvedStreak > this.highestStreak ? this.solvedStreak : this.highestStreak)
      this.firebaseService.updateUserStreak(this.highestStreak);
    }
    else if(new String(verdictResponse).charAt(1) == 'N'){
      valid = 'N';
      this.streak = 0;
    }
    else if(this.askedForHint){
      valid = 'H' //Hint usecase
    }
    else if(this.askedForSolution){
      valid = 'S';
    }
    else if(this.askedToOptimize){
      valid = 'O';
    }
    verdictResponse = (isAIResponse ? verdictResponse.substring(1, verdictResponse.length - 1) : verdictResponse)
    verdictResponse = verdictResponse.replace("```", "");
    verdictResponse = verdictResponse.replace("\\n","  ");
    var arrs : any[]= verdictResponse.split("\\n");
    console.log(arrs.length);
    verdictResponse = arrs.join("<br />")
    verdictResponse = verdictResponse.replace("**:", "</b>:");
    verdictResponse = verdictResponse.replace("**",",<b>");
    var dialogHandle = this.dialog.open(VerdictResponseDialogExampleComponent,{
      data: {
        response: new String(verdictResponse),
        status: valid
      }
    })
    dialogHandle.afterClosed().subscribe(result => {
      console.log("Dialog closed");
      // if(!this.askedForHint && !this.askedForSolution && !this.askedToOptimize && valid ){
      //   this.resetQuestion();
      // }
    });
  }

  async askForHint(){
   this.showLoaderWheel = true;
   var result = await model.generateContent("Can you give me a hint on how to approach the following programming question "+this.response['question']+"?");
   var response = await result.response;
   console.log(response.candidates[0].content.parts[0]);
   var verdictResponse = response.candidates[0].content.parts[0]
   this.openDialog(verdictResponse, true);
   this.showLoaderWheel = false
  }

  askForSolution(){
   this.showLoaderWheel = true;
   this.askedForSolution = true;
   console.log(this.response["solution"]);
   var verdictResponse = this.response["solution"];
   this.openDialog(verdictResponse, false);
   this.showLoaderWheel = false
  }

  async optimizeCode(code : string){
    this.askedToOptimize = true;
    this.showLoaderWheel = true;
    var result = await model.generateContent("Optimize my code "+code+" for following programming question "+this.response['question']+"?");
    var response = await result.response;
    console.log(response.candidates[0].content.parts[0]);
    var verdictResponse = response.candidates[0].content.parts[0]
    this.openDialog(verdictResponse, true);
    this.showLoaderWheel = false
  }

  goBackToSelection(){
    this.router.navigate(["/dsselection", this.company])
  }

  logout(){
    this.authService.signoutUser();
  }

  goToSectionScreen(){
    this.router.navigate(['/practiceOptions'])
  }

  goToProfile(){
    this.router.navigate(['/profilePage'])
  }

  timeOut(){
    console.log("Timer completed")
    this.resetQuestion();
  }
}

