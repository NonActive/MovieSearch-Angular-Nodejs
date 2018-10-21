import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopActorsComponent } from './top-actors.component';

describe('TopActorsComponent', () => {
  let component: TopActorsComponent;
  let fixture: ComponentFixture<TopActorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopActorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopActorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
