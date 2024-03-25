import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SphereDialogFormComponent } from './sphere-dialog-form.component';

describe('SphereDialogFormComponent', () => {
  let component: SphereDialogFormComponent;
  let fixture: ComponentFixture<SphereDialogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SphereDialogFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SphereDialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
