import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpeakerListPage } from './speaker-list.page';

describe('SpeakerListPage', () => {
  let component: SpeakerListPage;
  let fixture: ComponentFixture<SpeakerListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
