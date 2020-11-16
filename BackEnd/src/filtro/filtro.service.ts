
import { Injectable } from "@nestjs/common";
import { Knex } from "src/config/knex";
import { EscolaOrigem, Etnia , Idade, RendaFamiliar, Sexo } from "./types";

@Injectable()
export class FiltroService{

    getEtnia(): Promise<Etnia[]>{
        return Knex('alunos')
        .select('etnia')
        .groupBy('etnia')    
    }
    
    getSexo(): Promise<Sexo[]>{
        return Knex('alunos')
        .select('sexo')
        .groupBy('sexo')    
    }

    getEscolaOrigem(): Promise<EscolaOrigem[]>{
        return Knex('alunos')
        .select('escola_origem')
        .groupBy('escola_origem')    
    }

    getRendaFamiliar(): Promise<RendaFamiliar[]>{
        return Knex('alunos')
        .select('renda_familiar')
        .groupBy('renda_familiar')    
    }

    //SELECT cpf, EXTRACT(YEAR FROM age(cast(data_nascimento as date ))) as idade from alunos order by idade desc; 

    getIdade(): Promise<Idade[]> {
        return Knex('alunos')
            .select(Knex.raw('EXTRACT (YEAR FROM AGE( cast (data_nascimento as date))) as idade'))
            .orderByRaw('idade desc');
    }
    

}