import { Controller, Get } from '@nestjs/common';
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

    @Get('escolaorigem')
    getEscolaOrigem(): Promise<EscolaOrigem[]>{
        return this.filtroService.getEscolaOrigem()
    }

    @Get('rendafamiliar')
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

    @Get('customizado')
    getDados():

}
