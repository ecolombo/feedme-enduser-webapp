import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestbrowserComponent } from './restbrowser.component';

describe('RestbrowserComponent', () => {
  let component: RestbrowserComponent;
  let fixture: ComponentFixture<RestbrowserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestbrowserComponent]
    });
    fixture = TestBed.createComponent(RestbrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
