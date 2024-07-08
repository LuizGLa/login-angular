import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardModulesComponent } from './card-modules.component';

describe('CardModulesComponent', () => {
  let component: CardModulesComponent;
  let fixture: ComponentFixture<CardModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardModulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
