export type EtniaTotal = {
    etnia: string
    total: number
}

export class EscolaTotal {
    etnia?: string;
    total?: Number;
}

export class RendaTotal {
    rendaFamiliar?: string;
    total?: Number;
}

export class MatriculaTotal {
    matricula_situacao?: string;
    total?: Number;
}

export class SituacaoMatriculaEscolaOrigem {
    escola_origem?: string;
    matricula_situacao:string;
    total?: Number;
}

export class SituacaoIdadeSexo {
    idade?: string;
    masculino?:string;
    feminino?:string;    
}

export class SituacaoMatriculaPorRenda {
    rendaFamiliar?: string;
    matricula_situacao:string;
    total?: Number;
}

export class SituacaoMatriculaEstado {
    cidade?: string;
    estado:string;
    total?: Number;
}

export class SituacaoMatriculaSexo {
    sexo?:string;
    total?: Number;
}

export class Estatisticas {
    idade?:string;
    estado?:string;
    etnia?:string;
    renda_familiar?:string;
    escola_origem?:string;
    sexo?:string;
    matricula_situacao?:string;
    total?:string;
}