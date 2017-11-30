import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAfterLoginComponent } from './menu-after-login.component';

describe('MenuAfterLoginComponent', () => {
  let component: MenuAfterLoginComponent;
  let fixture: ComponentFixture<MenuAfterLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuAfterLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAfterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
