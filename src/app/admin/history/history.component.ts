import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  title = 'bbev';
  navSidebarClass: boolean = true;
  hamburgerClass: boolean = false;

    constructor() {
      
    }

  ngOnInit(): void {
  }

}
