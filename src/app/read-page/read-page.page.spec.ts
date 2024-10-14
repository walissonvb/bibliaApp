import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadPagePage } from './read-page.page';

describe('ReadPagePage', () => {
  let component: ReadPagePage;
  let fixture: ComponentFixture<ReadPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
