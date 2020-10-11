import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { MothsComponent } from '../moths/moths.component';

@Component({
  selector: 'app-nesting',
  templateUrl: 'nesting.component.html'
})
export class NestingComponent {
  @Input() itemName;

  item;

  constructor(private db: MothsComponent) {

  }

  ngOnInit() {
    this.item = this.db.getItem(this.itemName);
  }
}