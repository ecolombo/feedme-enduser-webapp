import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddishComponent } from './adddish.component';

describe('AdddishComponent', () => {
  let component: AdddishComponent;
  let fixture: ComponentFixture<AdddishComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdddishComponent]
    });
    fixture = TestBed.createComponent(AdddishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
