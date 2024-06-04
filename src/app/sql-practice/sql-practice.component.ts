import { Component } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { geminiApiKey } from '../environment';
import { sqlGeminiResponse } from 'src/objects/gemini-response';
import { MatDialog } from '@angular/material/dialog';
import { VerdictResponseDialogExampleComponent } from '../verdict-response-dialog-example/verdict-response-dialog-example.component';
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

@Component({
  selector: 'app-sql-practice',
  templateUrl: './sql-practice.component.html',
  styleUrl: './sql-practice.component.css'
})
export class SqlPracticeComponent {

  constructor(private authService: AuthServiceService, private router: Router, private dialog: MatDialog){}

  headings : string[] = ['Question']
  response : any = "";
  scenario: any;
  question: any;
  ptc: any;
  solution: any;
  tableSchema: any;
  codeTemplate : string = ""
  showLoaderWheel : boolean = false

  ngOnInit(){
    this.generateQuestion();
  }

  logout(){
    this.authService.signoutUser();
  }

  goToSectionScreen(){
    this.router.navigate(['/practiceOptions'])
  }

  async generateQuestion(){
    let result;
    try{
      result = await model.generateContent("Generate a SQL question for a software engineer position in valid parseable JSON format in a single line"+
      " which follows this structure  "+JSON.stringify(sqlGeminiResponse) + " and expects a SQL query as an answer and does not have any HTML markup");
    }catch(err){
      console.log("err")
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
    this.response = JSON.parse(extractedResponse)
    this.question = this.response["question"]
    this.scenario = this.response["scenario"]
    this.solution = this.response["solution"]
    this.ptc = this.response["pointsToConsider"]
    this.tableSchema = this.response["columnsInTheTable"];
    this.tableSchema = this.tableSchema.replace("/\n","");
    console.log(this.response)
  }

  async submitCode(code: any){
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
  }

}
