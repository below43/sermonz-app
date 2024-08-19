import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpeakerPage } from './speaker.page';

describe('SpeakerPage', () => {
  let component: SpeakerPage;
  let fixture: ComponentFixture<SpeakerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
