import { Component, OnInit } from '@angular/core';

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
    {text: 'Strings', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Arrays', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Stacks', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Queues', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  constructor() { }

  ngOnInit(): void {
    
  }

}
