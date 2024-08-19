import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SermonListPage } from './sermon-list.page';

describe('SermonListPage', () => {
  let component: SermonListPage;
  let fixture: ComponentFixture<SermonListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SermonListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
