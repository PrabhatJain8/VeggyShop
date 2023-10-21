import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVegetablesComponent } from './add-vegetables.component';

describe('AddVegetablesComponent', () => {
  let component: AddVegetablesComponent;
  let fixture: ComponentFixture<AddVegetablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVegetablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVegetablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
