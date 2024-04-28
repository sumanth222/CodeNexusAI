import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySpecificQuestionsComponent } from './company-specific-questions.component';

describe('CompanySpecificQuestionsComponent', () => {
  let component: CompanySpecificQuestionsComponent;
  let fixture: ComponentFixture<CompanySpecificQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanySpecificQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySpecificQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
