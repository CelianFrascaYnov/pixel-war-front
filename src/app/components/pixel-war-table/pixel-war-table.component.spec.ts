import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixelWarTableComponent } from './pixel-war-table.component';

describe('PixelWarTableComponent', () => {
  let component: PixelWarTableComponent;
  let fixture: ComponentFixture<PixelWarTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PixelWarTableComponent]
    });
    fixture = TestBed.createComponent(PixelWarTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
