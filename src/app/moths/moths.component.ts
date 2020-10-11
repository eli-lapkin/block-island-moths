import { Component, OnInit } from '@angular/core';
import { Moth } from '../moth';
import { Observable } from 'rxjs';

import { multi } from "./data";

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Superfamily } from '../superfamily';

@Component({
  selector: 'app-moths',
  templateUrl: './moths.component.html',
  styleUrls: ['./moths.component.scss']
})
export class MothsComponent implements OnInit {

  selectedMoth: Moth;
  uniqueId: any;
  mothId: any;
  ref: any;
  multi: any[];

  /* Top Graph Settings */
  topView: Array<number> = [500, 500];
  topShowXAxis: boolean = false;
  topShowYAxis: boolean = true;
  topGradient: boolean = false;
  topShowLegend: boolean = true;
  topShowXAxisLabel: boolean = true;
  topXAxisLabel: string = 'Date of Sightings';
  topShowYAxisLabel: boolean = true;
  topYAxisLabel: string = 'Number of Sightings';
  topLegendTitle: string = 'Table';
  topColorScheme = {
    domain: ["#345173", "#84C0DF"]
  };

  /* Bottom Graph Settings */
  bottomView: Array<number> = [450, 100];
  bottomShowXAxis: boolean = true;
  bottomShowYAxis: boolean = false;
  bottomGradient: boolean = false;
  bottomShowLegend: boolean = false;
  bottomShowXAxisLabel: boolean = true;
  bottomXAxisLabel: string = 'Date of Sightings';
  bottomShowYAxisLabel: boolean = true;
  bottomYAxisLabel: string = 'Number of Sightings';
  bottomLegendTitle: string = 'Table';
  bottomColorScheme = {
    domain: ["#345173", "#84C0DF"]
  };

  public mothCollection: AngularFirestoreCollection<Moth>;
  public superfamilyCollection: AngularFirestoreCollection<String>;

  public moths: Observable<any[]>;
  public superfamilies: Observable<any[]>;
  public families: Observable<any[]>;

  public images;

  public newDataTop = [ ];
  public newDataBottom = [ ];

  displayGraph: boolean = false;

  public familyCollections: AngularFirestoreCollection<any>[] = [];

  public mothCollections: AngularFirestoreCollection<Moth>[] = [];
  public mothLists: Observable<any[]>[] = [];
  public familyLists: Observable<any[]>[] = [];

  public showSuperfamilyInfo: boolean = false;

  // TESTING NEW FORMAT
  public itemsCollection: AngularFirestoreCollection<any>;
  public items: Observable<any[]>;

  constructor(private db: AngularFirestore) {

    // NEW SETUP
    this.itemsCollection = this.db.collection<any>('root', ref => {
      return ref.orderBy('order', 'asc').where('parent', '==', '')
    });
    this.items = this.itemsCollection.valueChanges();

    // FIXME: this all needs to be scalable; "loop" through superfamilies and
    //        families to repeat this. Right now, two superfamilies are hardcoded in.
    //        That needs to change.

    // sets up superfamily collection and list
    this.superfamilyCollection = this.db.collection<String>('superfamilies', ref => {
      return ref.orderBy('id', 'asc')
    });
    this.superfamilies = this.superfamilyCollection.valueChanges();

    // sets up family collection and list
    this.familyCollections.push(this.db.collection<String>('families', ref => {
      return ref.where('superfamily', '==', 'Nepticuloidea')
    }));

    this.familyCollections.push(this.db.collection<String>('families', ref => {
      return ref.where('superfamily', '==', 'Tischerioidea')
    }));

    this.familyCollections.push(this.db.collection<String>('families', ref => {
      return ref.where('superfamily', '==', 'Adeloidea')
    }));

    this.familyCollections.push(this.db.collection<String>('families', ref => {
      return ref.where('superfamily', '==', 'Tineoidea')
    }));

    //this.families = this.familyCollection.valueChanges();
    for (var i = 0; i < this.familyCollections.length; ++i) {
      this.familyLists.push(this.familyCollections[i].valueChanges());
    }

    /* creates references to each moth collection (by superfamily) and orders the data
       by ascending Hodges number */

    this.mothCollections.push(this.db.collection<Moth>('moths', ref => {
      return ref.where('superfamily', '==', 'Nepticuloidea').orderBy('hodges', 'asc')
    }));

    this.mothCollections.push(this.db.collection<Moth>('moths', ref => {
      return ref.where('superfamily', '==', 'Tischerioidea').orderBy('hodges', 'asc')
    }));

    this.mothCollections.push(this.db.collection<Moth>('moths', ref => {
      return ref.where('superfamily', '==', 'Adeloidea').orderBy('hodges', 'asc')
    }));

    this.mothCollections.push(this.db.collection<Moth>('moths', ref => {
      return ref.where('superfamily', '==', 'Tineoidea').orderBy('hodges', 'asc')
    }));

    // updates mothLists when database values change
    for (var i = 0; i < this.mothCollections.length; ++i) {
      this.mothLists.push(this.mothCollections[i].valueChanges());
    }
  }

  ngOnInit() {
  }

  onSelect(moth: Moth): void {
    this.selectedMoth = moth;
    this.newDataTop = [ ]; // clear data array
    this.newDataTop = this.selectedMoth.dataTop; // populate data array

    this.newDataBottom = [ ]; // clear data array
    this.newDataBottom = this.selectedMoth.dataBottom; // populate data array
    
    this.images = this.selectedMoth.images;

    if (typeof this.newDataTop == 'undefined') {
      this.displayGraph = false;
    } else {
      this.displayGraph = true;
    }
  }

  arrowListSuperfamily: Array<boolean> = [false, false]; // FIXME: need to change dynamicly based on length of superfamilies collection
  currentSuperfamily: any;
  changeSuperfamilyArrowOnClick(arrowToChange) {
    this.arrowListSuperfamily[arrowToChange] = !this.arrowListSuperfamily[arrowToChange]
    // this.arrowDown = !this.arrowDown;
  }

  arrowListFamily: Array<boolean> = [false, false]; // FIXME: need to change dynamicly based on length of superfamilies collection
  changeFamilyArrowOnClick(arrowToChange) {
    this.arrowListFamily[arrowToChange] = !this.arrowListFamily[arrowToChange]
    // this.arrowDown = !this.arrowDown;
  }

  selectedSuperfamily: Superfamily;
  selectSuperfamily(superfamily: Superfamily): void {
    this.selectedSuperfamily = superfamily;
  }

  graphOnSelect(data): void {}
  onActivate(data): void {}
  onDeactivate(data): void {}

  getItem(id) {
    return this.db.doc(`root/${id}`).valueChanges();
  }
}
