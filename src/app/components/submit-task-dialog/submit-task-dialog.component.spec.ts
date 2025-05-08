import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitTaskDialogComponent } from './submit-task-dialog.component';

describe('SubmitTaskDialogComponent', () => {
  let component: SubmitTaskDialogComponent;
  let fixture: ComponentFixture<SubmitTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitTaskDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
