import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitHomeworkDialogComponent } from './submit-homework-dialog.component';

describe('SubmitHomeworkDialogComponent', () => {
  let component: SubmitHomeworkDialogComponent;
  let fixture: ComponentFixture<SubmitHomeworkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitHomeworkDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitHomeworkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
