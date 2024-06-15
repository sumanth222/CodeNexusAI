import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlTopicScreenComponent } from './sql-topic-screen.component';

describe('SqlTopicScreenComponent', () => {
  let component: SqlTopicScreenComponent;
  let fixture: ComponentFixture<SqlTopicScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SqlTopicScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SqlTopicScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
