import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MinisteriosPagePage } from './ministerios-page.page';

describe('MinisteriosPagePage', () => {
  let component: MinisteriosPagePage;
  let fixture: ComponentFixture<MinisteriosPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MinisteriosPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
