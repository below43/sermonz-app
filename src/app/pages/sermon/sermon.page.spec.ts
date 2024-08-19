import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SermonPage } from './sermon.page';

describe('SermonPage', () => {
  let component: SermonPage;
  let fixture: ComponentFixture<SermonPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SermonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
