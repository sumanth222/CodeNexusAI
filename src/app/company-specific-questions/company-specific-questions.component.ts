import { Component, OnInit } from '@angular/core';
import { geminiApiKey } from '../environment';
import { geminiResponse } from 'src/objects/gemini-response';
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});


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

  constructor() {
   }

  ngOnInit(): void {
    this.generateQuestion();
  }

  async generateQuestion(){
    var result = await model.generateContent("Generate a Programming question from Google for a software engineer position in valid parseable JSON format in a single line"+
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

}
