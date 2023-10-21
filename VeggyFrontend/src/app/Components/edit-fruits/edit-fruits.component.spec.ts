import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFruitsComponent } from './edit-fruits.component';

describe('EditFruitsComponent', () => {
  let component: EditFruitsComponent;
  let fixture: ComponentFixture<EditFruitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFruitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFruitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
