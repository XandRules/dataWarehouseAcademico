import { Injectable } from "@nestjs/common";
import { Knex } from "src/config/knex";
import { EscolaTotal, EtniaTotal, MatriculaTotal, RendaTotal } from "./types";

@Injectable()
export class AlunoService{

    //todos os dados da tabela alunos, não utilizada pelo sistema front end
    findAll(){
        return Knex('alunos')    
    }

    //dados agrupados por etnia retornando o tatal de cada etnia da tabela alunos
    findEtnia(): Promise<EtniaTotal[]>{
        return Knex('alunos')
        .select('etnia')
        .count('* as total')
        .groupBy('etnia')    
    }

    //dados agrupados por escola origem retornando o tatal de cada escola origem da tabela alunos
    escolaTotal(): Promise<EscolaTotal[]> {
        return Knex('alunos')
            .select('escola_origem')
            .count('* as total')
            .groupBy('escola_origem');
    }

    //dados agrupados por renda Familiar retornando o tatal de cada faixa de renda das familias da tabela alunos
    rendaFamiliarTotal(): Promise<RendaTotal[]> {
        return Knex('alunos')
            .select('renda_familiar')
            .count('* as total')
            .groupBy('renda_familiar');
    }

     //dados agrupados por situação da matricula do aluno retornando o tatal da  tabela alunos
    matriculaSituacao(): Promise<MatriculaTotal[]> {
        return Knex('alunos')
            .select('matr_situacao')
            .count('* as total')
            .groupBy('matr_situacao');
    }


}