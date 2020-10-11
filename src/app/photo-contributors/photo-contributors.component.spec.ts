import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoContributorsComponent } from './photo-contributors.component';

describe('PhotoContributorsComponent', () => {
  let component: PhotoContributorsComponent;
  let fixture: ComponentFixture<PhotoContributorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoContributorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoContributorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
