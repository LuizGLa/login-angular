export interface Rua {
  id?: number;
  nome: string;
  data_criacao: Date;
  data_atualizacao: Date;
}

export interface Ruas extends Array<Rua> { }
