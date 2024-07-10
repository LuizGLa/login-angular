export interface Ocorrencia {
  id?: number;
  titulo: string;
  descricao: string;
  localizacao: string;
  latitude: string;
  longitude: string;
  dataHora: Date;
  tipoOcorrencia: {
    id: number;
    descricao: string;
  };
  rua: {
    id: number;
    nome: string;
  };
  usuario: {
    id: number;
    name: string;
  }
}

export interface Ocorrencias extends Array<Ocorrencia> { }
