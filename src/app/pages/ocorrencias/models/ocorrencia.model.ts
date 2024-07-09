export interface Ocorrencia {
  id?: number;
  titulo: string;
  descricao: string;
  localizacao: string;
  latitude: string;
  longitude: string;
  dataHora: Date;
  rua: {
    id: number;
    nome: string;
  };
  usuario: {
    name: string;
  }
}

export interface Ocorrencias extends Array<Ocorrencia> { }
