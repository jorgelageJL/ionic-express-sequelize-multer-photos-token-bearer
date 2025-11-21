import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListBicyclesPage } from './list-bicycles.page';

describe('ListBicyclesPage', () => {
  let component: ListBicyclesPage;
  let fixture: ComponentFixture<ListBicyclesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBicyclesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
