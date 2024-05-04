import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DSSelectionComponent } from './dsselection.component';

describe('DSSelectionComponent', () => {
  let component: DSSelectionComponent;
  let fixture: ComponentFixture<DSSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DSSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DSSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
