export type Etnia = {
    etnia: string
}

export type Sexo = {
    sexo: string
}

export type EscolaOrigem = {
    escola_origem: string
}

export type RendaFamiliar = {
    renda_familiar: string
}

export type Idade = {
    idade: string
}

export type Estado = {
    estado: string
}

export type Cidade = {
    cidade: string
}

export type Matricula = {
    matricula_situacao: string
}

export class Estatisticas {
    idade?: Idade[];
    estado?: Estado[];
    etnia?: Etnia[];
    renda_familiar?: RendaFamiliar[];
    escola_origem?: EscolaOrigem[];
    sexo?: Sexo[];
    matricula_situacao?: Matricula[];
    total?: Number;
}


