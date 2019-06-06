import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LonelyComponent } from './lonely.component';

describe('LonelyComponent', () => {
  let component: LonelyComponent;
  let fixture: ComponentFixture<LonelyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LonelyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LonelyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
