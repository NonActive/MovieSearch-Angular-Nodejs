import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmLibraryComponent } from './film-library.component';

describe('FilmLibraryComponent', () => {
  let component: FilmLibraryComponent;
  let fixture: ComponentFixture<FilmLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
