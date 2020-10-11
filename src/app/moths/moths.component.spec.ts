import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MothsComponent } from './moths.component';

describe('MothsComponent', () => {
  let component: MothsComponent;
  let fixture: ComponentFixture<MothsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MothsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MothsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
