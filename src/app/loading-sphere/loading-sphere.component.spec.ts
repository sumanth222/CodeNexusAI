import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSphereComponent } from './loading-sphere.component';

describe('LoadingSphereComponent', () => {
  let component: LoadingSphereComponent;
  let fixture: ComponentFixture<LoadingSphereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSphereComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadingSphereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
