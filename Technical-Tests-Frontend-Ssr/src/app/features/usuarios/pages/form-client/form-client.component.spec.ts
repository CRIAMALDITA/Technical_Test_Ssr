import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormClientComponent } from './form-client.component';

describe('FormclientComponent', () => {
  let component: FormClientComponent;
  let fixture: ComponentFixture<FormClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormClientComponent]
    });
    fixture = TestBed.createComponent(FormClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
