import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionSphereComponent } from './accordionsphere.component';

describe('AccordionSphereComponent', () => {
  let component: AccordionSphereComponent;
  let fixture: ComponentFixture<AccordionSphereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionSphereComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccordionSphereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
