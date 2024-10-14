import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BibliaPagePage } from './biblia-page.page';

describe('BibliaPagePage', () => {
  let component: BibliaPagePage;
  let fixture: ComponentFixture<BibliaPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BibliaPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
