import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
    this.editorOptions = {theme: 'vs-dark', language: 'java'};
    this.code = this.codeTemplate;
    this.model = {
        language: 'java',
        uri: 'main.json',
        value: this.codeTemplate
    }
  }

  submitCode(){
    this.finalCode.emit(this.code);
  }

  askForHint(){
    //this.finalCode.emit("hint");
  }

  showSolution(){
    this.finalCode.emit("solution");
  }  

  optimizeCode(){
    //this.finalCode.emit("op6"+this.code);
  }

  onCodeChanged(code: any){
    console.log("Updated code: "+code)
    this.code = code;
  }

  nextQuestion(){
    this.finalCode.emit("next");
  }
}
