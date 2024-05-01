import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {

  editorOptions: any;
  code: string = "";
  @Output() finalCode = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.editorOptions = {theme: 'vs-dark', language: 'java'};
    this.code = 'function x() {\nconsole.log("Hello world!");\n}';
  }

  submitCode(){
    this.finalCode.emit(this.code);
  }

  askForHint(){
    this.finalCode.emit("hint");
  }
}
