import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerdictResponseDialogExampleComponent } from './verdict-response-dialog-example.component';

describe('VerdictResponseDialogExampleComponent', () => {
  let component: VerdictResponseDialogExampleComponent;
  let fixture: ComponentFixture<VerdictResponseDialogExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerdictResponseDialogExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerdictResponseDialogExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
