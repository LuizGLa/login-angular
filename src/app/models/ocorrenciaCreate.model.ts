export interface OcorrenciaCreate {
  id?: number;
  titulo: string;
  descricao: string;
  localizacao: string;
  latitude: string;
  longitude: string;
  dataHora: Date;
  tipoOcorrencia: Number;
  rua: Number;
  usuario: Number;
}
