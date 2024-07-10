import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoOcorrenciasComponent } from './tipo-ocorrencias.component';

describe('TipoOcorrenciasComponent', () => {
  let component: TipoOcorrenciasComponent;
  let fixture: ComponentFixture<TipoOcorrenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoOcorrenciasComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TipoOcorrenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
