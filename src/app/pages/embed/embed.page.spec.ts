import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmbedPage } from './embed.page';

describe('EmbedPage', () => {
  let component: EmbedPage;
  let fixture: ComponentFixture<EmbedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
