import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarRuaComponent } from './adicionar-rua.component';

describe('AdicionarRuaComponent', () => {
  let component: AdicionarRuaComponent;
  let fixture: ComponentFixture<AdicionarRuaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarRuaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdicionarRuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
