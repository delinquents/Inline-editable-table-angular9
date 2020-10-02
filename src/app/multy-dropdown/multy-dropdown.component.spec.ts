import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultyDropdownComponent } from './multy-dropdown.component';

describe('MultyDropdownComponent', () => {
  let component: MultyDropdownComponent;
  let fixture: ComponentFixture<MultyDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultyDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultyDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
