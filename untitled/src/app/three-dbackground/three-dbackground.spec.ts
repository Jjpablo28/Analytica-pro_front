import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDBackground } from './three-dbackground';

describe('ThreeDBackground', () => {
  let component: ThreeDBackground;
  let fixture: ComponentFixture<ThreeDBackground>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThreeDBackground]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeDBackground);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
