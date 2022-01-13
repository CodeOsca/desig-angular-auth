import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-key-page',
  templateUrl: './key-page.component.html',
  styleUrls: ['./key-page.component.css']
})
export class KeyPageComponent implements AfterViewInit {
  @Output() classBackground: EventEmitter<boolean> = new EventEmitter()
  constructor() { }

  ngAfterViewInit(): void {
    this.classBackground.emit(false)
  }
}
