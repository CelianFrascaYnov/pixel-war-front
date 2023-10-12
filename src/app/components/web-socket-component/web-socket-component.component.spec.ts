import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebSocketComponentComponent } from './web-socket-component.component';

describe('WebSocketComponentComponent', () => {
  let component: WebSocketComponentComponent;
  let fixture: ComponentFixture<WebSocketComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebSocketComponentComponent]
    });
    fixture = TestBed.createComponent(WebSocketComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
