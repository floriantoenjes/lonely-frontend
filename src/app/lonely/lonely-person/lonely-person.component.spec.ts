import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LonelyPersonComponent } from './lonely-person.component';

describe('LonelyPersonComponent', () => {
  let component: LonelyPersonComponent;
  let fixture: ComponentFixture<LonelyPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LonelyPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LonelyPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
