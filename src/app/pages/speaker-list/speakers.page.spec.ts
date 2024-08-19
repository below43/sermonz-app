import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpeakersPage } from './speakers.page';

describe('SpeakersPage', () => {
  let component: SpeakersPage;
  let fixture: ComponentFixture<SpeakersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
