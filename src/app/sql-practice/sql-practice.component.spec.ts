import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlPracticeComponent } from './sql-practice.component';

describe('SqlPracticeComponent', () => {
  let component: SqlPracticeComponent;
  let fixture: ComponentFixture<SqlPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SqlPracticeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SqlPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
