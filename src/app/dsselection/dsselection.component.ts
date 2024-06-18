import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatDialog
} from '@angular/material/dialog';
import { VerdictResponseDialogExampleComponent } from '../verdict-response-dialog-example/verdict-response-dialog-example.component';
import { AuthServiceService } from '../services/auth-service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { UserContextService } from '../userContext/user-context.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-dsselection',
  templateUrl: './dsselection.component.html',
  styleUrls: ['./dsselection.component.css'],
})
export class DSSelectionComponent implements OnInit {

  tiles: Tile[] = [
    {text: 'Strings', cols: 3, rows: 1, color: '#CA8787'},
    {text: 'Arrays', cols: 1, rows: 2, color: '#E1ACAC'},
    {text: 'Stacks', cols: 1, rows: 1, color: '#E1AFD1'},
    {text: 'Queues', cols: 2, rows: 1, color: '#FFE6E6'},
    {text: 'Hash Maps', cols: 2, rows: 1, color: '#E1ACAC'},
    {text: 'Linked Lists', cols: 2, rows: 1, color: '#CA8787'},
  ];

  difficulties= [
    "Easy",
    "Medium",
    "Hard",
    "Auto Adapt"
  ];


  diffLevel: string = "";
  user!: firebase.User | null;
  company: any = "";
  username : string | undefined = "";
  checked: boolean = false;
  disabled: boolean = true;
  timedMode = false;


  constructor(private router : Router, private dialog : MatDialog, 
    private afAuth: AngularFireAuth, private userContextService: UserContextService,
    private activatedRoute : ActivatedRoute, private authService: AuthServiceService
  ) { 
  
    this.afAuth.onAuthStateChanged((user) =>{
      console.log("User is "+user?.displayName);
      this.user = user;
    })
    this.username = this.userContextService.getUserDetails().username;
  }



  ngOnInit(): void {
    this.company = this.activatedRoute.snapshot.paramMap.get('company');
  }

  onTileSelect(title: string){
    console.log("Clicked on: "+title)
    console.log("Diff level selected: "+this.diffLevel);
    console.log("Timedmode: "+this.timedMode)
    if(this.diffLevel != ""){
      this.router.navigate(['/companySpecificQuestion', title, this.diffLevel, this.company, this.timedMode])
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

  goBackToCompSelection(){
    this.router.navigate(['dashboard']);
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
