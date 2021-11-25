/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NegativeComponent } from './negative.component';

describe('NegativeComponent', () => {
  let component: NegativeComponent;
  let fixture: ComponentFixture<NegativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NegativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NegativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
