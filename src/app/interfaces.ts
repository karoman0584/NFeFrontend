export interface ApiResponse {
  message: string,
  status: number
}

export interface Nfe {
  id:           number;
  number:       number;
  registerAt:   Date;
  emitterName:  string;
  receiverName: string;
  total:        number;
  status:       string;
  duplicatas:   Duplicata[];
}

export interface Duplicata {
  id:          number;
  installment: number;
  total:       number;
  expireDate:  Date;
}
