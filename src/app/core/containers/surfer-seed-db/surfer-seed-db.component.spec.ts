/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SurferSeedDbComponent } from './surfer-seed-db.component';

describe('SurferSeedDbComponent', () => {
  let component: SurferSeedDbComponent;
  let fixture: ComponentFixture<SurferSeedDbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurferSeedDbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurferSeedDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
