import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarTipoOcorrenciaComponent } from './adicionar-tipo-ocorrencia.component';

describe('AdicionarTipoOcorrenciaComponent', () => {
  let component: AdicionarTipoOcorrenciaComponent;
  let fixture: ComponentFixture<AdicionarTipoOcorrenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarTipoOcorrenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdicionarTipoOcorrenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
