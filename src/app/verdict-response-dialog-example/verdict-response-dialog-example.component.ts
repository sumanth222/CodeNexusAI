import { Component, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-verdict-response-dialog-example',
  templateUrl: './verdict-response-dialog-example.component.html',
  styleUrls: ['./verdict-response-dialog-example.component.css'],
})
export class VerdictResponseDialogExampleComponent implements OnInit {

  @Output() nextQuestionEmitter = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {}

  nextQuestion(){
    this.nextQuestionEmitter.emit("next");
  }
}