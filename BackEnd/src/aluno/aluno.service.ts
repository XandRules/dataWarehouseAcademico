import { Injectable } from "@nestjs/common";
import { Knex } from "src/config/knex";
import { EscolaTotal, Estatisticas, EtniaTotal, MatriculaTotal, RendaTotal, SituacaoIdadeSexo, SituacaoMatriculaEscolaOrigem, SituacaoMatriculaEstado, SituacaoMatriculaPorRenda, SituacaoMatriculaSexo } from "./types";

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

    //dados agrupados por renda Familiar retornando o tatal de cada faixa de renda das familias da tabela alunos
    situacaoMatriculaPorEscolaOrigem(status): Promise<SituacaoMatriculaEscolaOrigem[]> {
        return Knex('alunos')
        .select('matricula_situacao','escola_origem')
        .count('* as total').where('escola_origem',status)
        .groupBy('matricula_situacao','escola_origem');
    }

    situacaoMatriculaEscolaOrigem(): Promise<SituacaoMatriculaEscolaOrigem[]> {
        return Knex('alunos')
        .select('matricula_situacao','escola_origem')
        .count('* as total')
        .groupBy('matricula_situacao','escola_origem');
    }

    //dados agrupados por renda Familiar retornando o tatal de cada faixa de renda das familias da tabela alunos
    situacaoSexoIdade(): Promise<SituacaoIdadeSexo[]> {
        return Knex('alunos')
            .select('sexo', Knex.raw('EXTRACT (YEAR FROM AGE(cast(data_nascimento as date))) as idade'))
            .count('* as total')
            .groupBy('sexo','idade');
    }
      
    situacaoEstado(): Promise<SituacaoMatriculaEstado[]> {
        return Knex('alunos')
        .select('estado')
        .count('* as total')
        .groupBy('estado');
    }


    situacaoSexo(): Promise<SituacaoMatriculaSexo[]> {
        return Knex('alunos')
        .select('sexo')
        .count('* as total')
        .groupBy('sexo');
    }


    customizado(etnia , sexo, renda_familiar, estado , matricula_situacao,escola_origem): Promise<Estatisticas[]> {

        if(etnia != 'null' && sexo != 'null' && renda_familiar != 'null' && estado != 'null' && matricula_situacao != 'null' && escola_origem != 'null'){
            return Knex('alunos')
            .select('matricula_situacao')
            .count('* as total')
            .groupBy('matricula_situacao');
        }else{

            if(etnia == 'null'){
                etnia = 'etnia is not null'
            }else{
                etnia = `etnia = '${etnia}'`;
            }

            if(sexo == 'null'){
                sexo = 'sexo is not null'
            }else{
                sexo = `sexo = '${sexo}'`;
            }

            if(renda_familiar == 'null'){
                renda_familiar = 'renda_familiar is not null'
            }else{
                renda_familiar = `renda_familiar = '${renda_familiar}'`;
            }

            if(estado == 'null'){
                estado = 'estado is not null'
            }else{
                estado = `estado = '${estado}'`;
            }

            if(matricula_situacao == 'null'){
                matricula_situacao = 'matricula_situacao is not null'
            }else{
                matricula_situacao = `matricula_situacao = '${matricula_situacao}'`;
            }

            if(escola_origem == 'null'){
                escola_origem = 'escola_origem is not null'
            }else{
                escola_origem = `escola_origem = '${escola_origem}'`;
            }

            return Knex('alunos')
            .select('matricula_situacao')
            .count('* as total').whereRaw(`${etnia} and ${sexo} and ${renda_familiar} and ${estado} and ${matricula_situacao} and ${escola_origem}`)
            .groupBy('matricula_situacao');


        }
       
    }
}