import { Component, OnInit } from '@angular/core';
import { geminiApiKey } from '../environment';
import { geminiResponse } from 'src/objects/gemini-response';
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { VerdictResponseDialogExampleComponent } from '../verdict-response-dialog-example/verdict-response-dialog-example.component';


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
  headingsIndex : number = 0;
  askedForHint : boolean = false;
  showLoaderWheel : boolean = false;

  constructor(public dialog: MatDialog) {
   }

  ngOnInit(): void {
    this.generateQuestion();
  }

  async generateQuestion(){
    var result = await model.generateContent("Generate a easy Programming question from Google for a software engineer position in valid parseable JSON format in a single line"+
    " which follows this structure  "+JSON.stringify(geminiResponse) + " and does not have any HTML markup");
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
    if("hint" == code){
      this.askedForHint = true;
      this.askForHint();
    }
    else{
      this.showLoaderWheel = true;
      this.askedForHint = false;
      console.log("The code is"+code)
      var verdictResponse = "";
      var result = await model.generateContent("Will the code " +code+" work for the question "+this.response['question']+
      "? answer me by saying Yes/No as the first word followed by comma then the explanation"
      );
      var response = await result.response;
      console.log(response.candidates[0].content.parts[0]);
      verdictResponse = response.candidates[0].content.parts[0]
      this.openDialog(verdictResponse);
      this.showLoaderWheel = false;
    }
  }

  openDialog(text: any){
    console.log("Opening dialog with string "+text)
    var valid : String = 'N';
    var verdictResponse =  JSON.stringify(text.text)

    if(new String(verdictResponse).charAt(1) == 'Y'){
      valid = 'Y';
    }
    if(this.askedForHint){
      valid = 'H' //Hint usecase
    }
    var dialogHandle = this.dialog.open(VerdictResponseDialogExampleComponent,{
      data: {
        response: new String(verdictResponse).substring(1, verdictResponse.length - 1),
        status: valid
      }
    })
    dialogHandle.afterClosed().subscribe(result => {
      console.log("Dialog closed");
      if(!this.askedForHint){
        this.resetQuestion();
      }
    });
  }

  async askForHint(){
    this.showLoaderWheel = true;
   var result = await model.generateContent("Can you give me a hint on how to approach the following programming question "+this.response['question']+"?");
   var response = await result.response;
   console.log(response.candidates[0].content.parts[0]);
   var verdictResponse = response.candidates[0].content.parts[0]
   this.openDialog(verdictResponse);
   this.showLoaderWheel = false
  }
}

