import { Component } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { geminiApiKey } from '../environment';
import { sqlGeminiResponse } from 'src/objects/gemini-response';
import { MatDialog } from '@angular/material/dialog';
import { VerdictResponseDialogExampleComponent } from '../verdict-response-dialog-example/verdict-response-dialog-example.component';
import { FirebaseServiceService } from '../services/firebase-service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});
const autoAdapt = "Auto Adapt";

@Component({
  selector: 'app-sql-practice',
  templateUrl: './sql-practice.component.html',
  styleUrl: './sql-practice.component.css'
})
export class SqlPracticeComponent {
  sqlTopic: any;
  diffLevel: string | null | undefined;
  timedMode: string | null | undefined;
  streak: number = 0;
  user: string | null | undefined;

  constructor(private authService: AuthServiceService, private router: Router, private dialog: MatDialog,
    private route: ActivatedRoute, private firebaseService: FirebaseServiceService, private afAuth: AngularFireAuth
  ){}

  headings : string[] = ['Question']
  response : any = "";
  scenario: any;
  question: any;
  ptc: any;
  solution: any;
  tableSchema: any;
  codeTemplate : string = ""
  showLoaderWheel : boolean = false
  showNextQuestion: boolean = false;
  askedForSolution: boolean = false;
  difficultyLevels: string[] = ["easy","moderate","hard","very hard"];
  difficultyIndex : number = 0;
  highestStreak : number = 0;
  currentStreak : number = 0;


  ngOnInit(){
    
    this.sqlTopic = this.route.snapshot.paramMap.get('title');
    this.diffLevel = this.route.snapshot.paramMap.get("diffLevel");
    this.timedMode = this.route.snapshot.paramMap.get("timedMode");
    if(this.sqlTopic != "Random"){
      this.sqlTopic = " for the topic "+this.sqlTopic;
    }
    else{
      this.sqlTopic = "";
    }
    if(this.diffLevel == "Easy" || this.diffLevel == autoAdapt){
      this.difficultyIndex = 0;
    }
    else if("Moderate" == this.diffLevel){
      this.difficultyIndex = 1;
    }
    else if("Hard" == this.diffLevel){
      this.difficultyIndex = 2;
    }
    this.afAuth.onAuthStateChanged((user) => {
      this.user = user?.email;
      console.log("Logged inuser is "+this.user)
    })
    this.firebaseService.getUserInfo(this.user).then((userInfo) => {
      this.highestStreak = userInfo.sqlStreak;
    });
    this.generateQuestion();
  }

  logout(){
    this.authService.signoutUser();
  }

  goToSectionScreen(){
    this.router.navigate(['/practiceOptions'])
  }

  async generateQuestion(){
    if(this.streak == 2 && this.difficultyIndex < 3){
      this.difficultyIndex++;
      this.streak = 0
    }
    let result;
    try{
      result = await model.generateContent("Generate a "+this.difficultyLevels[this.difficultyIndex]+" SQL question for a software engineer position in valid parseable JSON format in a single line "+
        +this.sqlTopic+
      " which follows this structure  "+JSON.stringify(sqlGeminiResponse) + " and expects a SQL query as an answer and does not have any HTML markup");
    }catch(err){
      console.log("err")
      await this.resetQuestion();
    }
    var extractedResponse = "";
    console.log(JSON.stringify(sqlGeminiResponse))
    var response = await result.response;
    console.log(response.candidates[0].content.parts[0]);
    extractedResponse = response.candidates[0].content.parts[0].text.replace("```json","");
    extractedResponse = extractedResponse.replace(",}","}");
    extractedResponse = extractedResponse.replace("```","");
    extractedResponse = extractedResponse.replace("/\n","");
    console.log(extractedResponse)
    try{
    this.response = JSON.parse(extractedResponse)
    }catch(err){
      console.log("Error occurred")
      await this.resetQuestion();
    }
    this.question = this.response["question"]
    this.scenario = this.response["scenario"]
    this.solution = this.response["solution"]
    this.ptc = this.response["pointsToConsider"]
    this.tableSchema = this.response["columnsInTheTable"];
    if(this.tableSchema != undefined){
      this.tableSchema = this.tableSchema.replace("/\n","");
    }
    console.log(this.response)
  }

  async submitCode(code: any){
    if("solution" == code){
      this.askedForSolution = true;
      this.askForSolution();
    } 
    else if("next" == code){
      this.showNextQuestion = false
      this.resetQuestion();
    }
    else{
    var verdictResponse = "";
      var result = await model.generateContent("Go through the entire query and tell me if the query: " +code+" will give correct answer for the question: "+this.response['question']+
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
    verdictResponse = (isAIResponse ? verdictResponse.substring(1, verdictResponse.length - 1) : verdictResponse)
    verdictResponse = verdictResponse.replace("```", "");
    verdictResponse = verdictResponse.replace("\\n","  ");
    var arrs : any[]= verdictResponse.split("\\n");
    console.log(arrs.length);
    verdictResponse = arrs.join("<br />")
    verdictResponse = verdictResponse.replace("**:", "</b>:");
    verdictResponse = verdictResponse.replace("**",",<b>");
    console.log("Res was: "+new String(verdictResponse))
    if(new String(verdictResponse).charAt(0) == 'Y' || new String(verdictResponse).charAt(1) == 'Y'){
      valid = 'Y';
      this.streak++;
      this.currentStreak++;
      if(this.currentStreak > this.highestStreak){
        this.highestStreak = this.currentStreak;
        this.firebaseService.updateSQLUserStreakAndQuestions(this.highestStreak);
      }
      else{
        this.firebaseService.updateUserSQLQuestions();
      }
    }
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
    if('Y' == valid){
      this.showNextQuestion = true;
    }
  }

  skipQuestion(){
    console.log("Skipping question");
    this.response = "";
    this.generateQuestion();
  }

  askForSolution(){
   this.showLoaderWheel = true;
   this.askedForSolution = true;
   console.log(this.response["solution"]);
   var verdictResponse = this.response["solution"];
   this.dialog.open(VerdictResponseDialogExampleComponent,{
    data: {
      response: new String(verdictResponse),
      status: 'G'
    }
  })
   this.showLoaderWheel = false
  }

  async resetQuestion(){
    this.response = "";
    await this.generateQuestion();
  }

  goBack(){
    this.router.navigate(['/practiceOptions'])
  }

  goToProfile(){
    this.router.navigate(['/profilePage'])
  }

}
