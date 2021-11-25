/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PositiveComponent } from './positive.component';

describe('PositiveComponent', () => {
  let component: PositiveComponent;
  let fixture: ComponentFixture<PositiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
