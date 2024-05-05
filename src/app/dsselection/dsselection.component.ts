import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    {text: 'Strings', cols: 3, rows: 1, color: '#7469B6'},
    {text: 'Arrays', cols: 1, rows: 2, color: '#AD88C6'},
    {text: 'Stacks', cols: 1, rows: 1, color: '#E1AFD1'},
    {text: 'Queues', cols: 2, rows: 1, color: '#FFE6E6'},
  ];

  difficulties= [
    "Easy",
    "Medium",
    "Hard",
    "Auto Adapt"
  ]

  constructor(private router : Router) { }

  diffLevel: string = "";

  ngOnInit(): void {
    
  }

  onTileSelect(title: string){
    console.log("Clicked on: "+title)
    console.log("Diff level selected: "+this.diffLevel);
    if(this.diffLevel != ""){
      this.router.navigate(['/companySpecificQuestion', title, this.diffLevel])
    }
  }

}
