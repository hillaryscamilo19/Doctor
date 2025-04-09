import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPatientComponent } from './assign-patient.component';

describe('AssignPatientComponent', () => {
  let component: AssignPatientComponent;
  let fixture: ComponentFixture<AssignPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignPatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
