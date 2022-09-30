import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTimeSheetComponent } from './user-time-sheet.component';

describe('UserTimeSheetComponent', () => {
  let component: UserTimeSheetComponent;
  let fixture: ComponentFixture<UserTimeSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTimeSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTimeSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
