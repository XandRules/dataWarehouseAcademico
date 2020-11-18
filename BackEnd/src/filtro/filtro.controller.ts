import { Controller, Get } from '@nestjs/common';
import { Estatisticas } from 'src/aluno/types';
import { FiltroService } from './filtro.service';
import { Etnia, Sexo ,EscolaOrigem,Idade, RendaFamiliar, Estado, Cidade, Matricula } from './types';

@Controller('filtro')
export class FiltroController {

    constructor(
        private readonly filtroService: FiltroService
    ){}


    @Get('etnia')
    getEtnia(): Promise<Etnia[]>{
        return this.filtroService.getEtnia()
    }

    @Get('sexo')
    getSexo(): Promise<Sexo[]>{
        return this.filtroService.getSexo()
    }

    @Get('escola')
    getEscolaOrigem(): Promise<EscolaOrigem[]>{
        return this.filtroService.getEscolaOrigem()
    }

    @Get('renda')
    getRendaFamiliar(): Promise<RendaFamiliar[]>{
        return this.filtroService.getRendaFamiliar()
    }

    @Get('idade')
    getIdade(): Promise<Idade[]>{
        return this.filtroService.getIdade()
    }

    @Get('estado')
    getEstado(): Promise<Estado[]>{
        return this.filtroService.getEstado()
    }

    @Get('cidade')
    getCidade(): Promise<Cidade[]>{
        return this.filtroService.getCidade()
    }

    @Get('matricula')
    getMatrocula(): Promise<Matricula[]>{
        return this.filtroService.getMatricula()
    }

}
