import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VerdictResponseDialogExampleComponent } from '../verdict-response-dialog-example/verdict-response-dialog-example.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthServiceService } from '../services/auth-service.service';
import firebase from 'firebase/compat/app';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-sql-topic-screen',
  templateUrl: './sql-topic-screen.component.html',
  styleUrl: './sql-topic-screen.component.css'
})
export class SqlTopicScreenComponent {

  tiles: Tile[] = [
    {text: 'Group By', cols: 3, rows: 1, color: '#FF6969'},
    {text: 'Aggregations', cols: 1, rows: 2, color: '#FFF6E9'},
    {text: 'Joins', cols: 1, rows: 1, color: '#80C4E9'},
    {text: 'SubQueries', cols: 2, rows: 1, color: '#604CC3'},
    {text: 'Random', cols: 4, rows: 1, color: '#AD88C4'},
  ];

  difficulties= [
    "Easy",
    "Medium",
    "Hard",
    "Auto Adapt"
  ];
  
  diffLevel: string = "";
  user!: firebase.User | null;
  username : string | undefined = "";
  checked: boolean = false;
  disabled: boolean = true;
  timedMode = false;

  constructor(private router : Router, private dialog : MatDialog, private authService: AuthServiceService){}

  onTileSelect(title: string){
    console.log("Clicked on: "+title)
    console.log("Diff level selected: "+this.diffLevel);
    console.log("Timedmode: "+this.timedMode)
    if(this.diffLevel != ""){
      this.router.navigate(['/sqlPractice', title, this.diffLevel, this.timedMode])
    }
    else{
      this.openDialog("Please choose a difficulty level and then select a topic")
    }
  }

  openDialog(text: any){
    console.log("Opening dialog with string "+text)

    var dialogHandle = this.dialog.open(VerdictResponseDialogExampleComponent,{
      data: {
        response: new String(text),
        status: 'G'
      }
    })
    dialogHandle.afterClosed().subscribe(result => {
      console.log("Dialog closed");
    });
  }

  goBack(){
    this.router.navigate(['/practiceOptions']);
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
}
