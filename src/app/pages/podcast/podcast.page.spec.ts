import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PodcastPage } from './podcast.page';

describe('PodcastPage', () => {
  let component: PodcastPage;
  let fixture: ComponentFixture<PodcastPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
