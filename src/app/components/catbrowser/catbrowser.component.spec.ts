import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatbrowserComponent } from './catbrowser.component';

describe('CatbrowserComponent', () => {
  let component: CatbrowserComponent;
  let fixture: ComponentFixture<CatbrowserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatbrowserComponent]
    });
    fixture = TestBed.createComponent(CatbrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
