import { Injectable } from "@nestjs/common";
import { Knex } from "src/config/knex";
import { EscolaTotal, EtniaTotal, MatriculaTotal, RendaTotal, SituacaoMatriculaEscolaOrigem, SituacaoMatriculaEstado, SituacaoMatriculaPorRenda } from "./types";

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
            .select('matricula_situacao')
            .count('* as total')
            .groupBy('matricula_situacao');
    }

    //dados agrupados por renda Familiar retornando o tatal de cada faixa de renda das familias da tabela alunos
    situacaoMatriculaPorRendaFamiliar(status: string): Promise<SituacaoMatriculaPorRenda[]> {
        return Knex('alunos')
        .select('matricula_situacao','renda_familiar')
        .count('* as total').where('matricula_situacao', status)
        .groupBy('matricula_situacao','renda_familiar');
    }

    situacaoMatriculaEscolaOrigem(): Promise<SituacaoMatriculaEscolaOrigem[]> {
        return Knex('alunos')
        .select('matricula_situacao','escola_origem')
        .count('* as total')
        .groupBy('matricula_situacao','escola_origem');
    }


    //dados agrupados por renda Familiar retornando o tatal de cada faixa de renda das familias da tabela alunos
    situacaoMatriculaPorEscolaOrigem(status): Promise<SituacaoMatriculaEscolaOrigem[]> {
        return Knex('alunos')
        .select('matricula_situacao','escola_origem')
        .count('* as total').where('escola_origem',status)
        .groupBy('matricula_situacao','escola_origem');
    }

      
    situacaoMatriculaPorStatus(): Promise<SituacaoMatriculaEstado[]> {
        return Knex('alunos')
        .select('estado')
        .count('* as total').where('matricula_situacao','Matriculado')
        .groupBy('estado');
    }


}