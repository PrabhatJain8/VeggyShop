import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFruitsComponent } from './add-fruits.component';

describe('AddFruitsComponent', () => {
  let component: AddFruitsComponent;
  let fixture: ComponentFixture<AddFruitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFruitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFruitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
