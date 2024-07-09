import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarOcorrenciaComponent } from './adicionar-ocorrencia.component';

describe('AdicionarOcorrenciaComponent', () => {
  let component: AdicionarOcorrenciaComponent;
  let fixture: ComponentFixture<AdicionarOcorrenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarOcorrenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdicionarOcorrenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
