import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQrCodeDialogComponent } from './edit-qr-code-dialog.component';

describe('EditQrCodeDialogComponent', () => {
  let component: EditQrCodeDialogComponent;
  let fixture: ComponentFixture<EditQrCodeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditQrCodeDialogComponent]
    });
    fixture = TestBed.createComponent(EditQrCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
