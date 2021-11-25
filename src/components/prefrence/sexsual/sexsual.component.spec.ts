/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SexsualComponent } from './sexsual.component';

describe('SexsualComponent', () => {
  let component: SexsualComponent;
  let fixture: ComponentFixture<SexsualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SexsualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SexsualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
