import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyReadComponent } from './daily-read.component';

describe('DailyReadComponent', () => {
  let component: DailyReadComponent;
  let fixture: ComponentFixture<DailyReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyReadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailyReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
