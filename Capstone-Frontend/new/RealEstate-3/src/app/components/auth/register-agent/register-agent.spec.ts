import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAgent } from './register-agent';

describe('RegisterAgent', () => {
  let component: RegisterAgent;
  let fixture: ComponentFixture<RegisterAgent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterAgent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAgent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
