import { Controller, Get } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { EscolaTotal, EtniaTotal, MatriculaTotal, RendaTotal } from './types';

@Controller('aluno')
export class AlunoController {
    constructor(
        private readonly alunoService: AlunoService
    ){}

    @Get('findall')
    findAll(){
        return this.alunoService.findAll()
    }

    @Get('etniatotal')
    getEtnia(): Promise<EtniaTotal[]>{
        return this.alunoService.findEtnia()
    }

    @Get('escolatotal')
    getEscolaTotal(): Promise<EscolaTotal[]>{
        return this.alunoService.escolaTotal()
    }

    @Get('rendatotal')
    getRendaFamiliarTotal(): Promise<RendaTotal[]>{
        return this.alunoService.rendaFamiliarTotal()
    }

    @Get('matriculasituacao')
    getMatriculaSituacaoTotal(): Promise<MatriculaTotal[]>{
        return this.alunoService.matriculaSituacao()
    }
    
}
