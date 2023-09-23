/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SurferComponent } from './surfer.component';

describe('SurferComponent', () => {
  let component: SurferComponent;
  let fixture: ComponentFixture<SurferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
