import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVegetablesComponent } from './edit-vegetables.component';

describe('EditVegetablesComponent', () => {
  let component: EditVegetablesComponent;
  let fixture: ComponentFixture<EditVegetablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVegetablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVegetablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
