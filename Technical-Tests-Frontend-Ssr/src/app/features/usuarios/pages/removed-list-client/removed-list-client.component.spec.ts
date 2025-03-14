import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovedListClientComponent } from './removed-list-client.component';

describe('ListaclientComponent', () => {
  let component: RemovedListClientComponent;
  let fixture: ComponentFixture<RemovedListClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemovedListClientComponent]
    });
    fixture = TestBed.createComponent(RemovedListClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
