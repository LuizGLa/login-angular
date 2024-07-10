export interface TipoOcorrencia {
  id?: number;
  descricao: string;
}

export interface TipoOcorrencias extends Array<TipoOcorrencia> {
}
