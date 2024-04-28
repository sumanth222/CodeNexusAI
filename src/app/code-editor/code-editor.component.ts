import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {

  editorOptions: any;
  code: string = "";
  constructor() { }

  ngOnInit(): void {
    this.editorOptions = {theme: 'vs-dark', language: 'javascript'};
    this.code = 'function x() {\nconsole.log("Hello world!");\n}';
  }

}
