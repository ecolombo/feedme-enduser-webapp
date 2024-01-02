import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishbrowserComponent } from './dishbrowser.component';

describe('DishbrowserComponent', () => {
  let component: DishbrowserComponent;
  let fixture: ComponentFixture<DishbrowserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DishbrowserComponent]
    });
    fixture = TestBed.createComponent(DishbrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
