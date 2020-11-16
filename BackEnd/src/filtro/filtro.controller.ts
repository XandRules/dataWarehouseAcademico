import { Controller, Get } from '@nestjs/common';
import { FiltroService } from './filtro.service';
import { Etnia, Sexo ,EscolaOrigem,Idade, RendaFamiliar } from './types';

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

}
