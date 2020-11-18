import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { EscolaTotal, Estatisticas, EtniaTotal, MatriculaTotal, RendaTotal, SituacaoIdadeSexo, SituacaoMatriculaEscolaOrigem, SituacaoMatriculaEstado, SituacaoMatriculaPorRenda, SituacaoMatriculaSexo } from './types';

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

    @Get('matriculasituacaoporrenda')
    getMatriculaSituacaoPorRenda(@Query() query: any): Promise<SituacaoMatriculaPorRenda[]>{ 
        return this.alunoService.situacaoMatriculaPorRendaFamiliar(query.status)
    }

    @Get('estadototal')
    getMatriculaSituacaoEstado(): Promise<SituacaoMatriculaEstado[]>{
        return this.alunoService.situacaoEstado()
    }

    @Get('sexototal')
    getSexo(): Promise<SituacaoMatriculaSexo[]>{
        return this.alunoService.situacaoSexo()
    }

    @Get('matriculasituacaoescolaorigem')
    getMatriculaSituacaoEscolaOrigem(): Promise<SituacaoMatriculaEscolaOrigem[]>{
        return this.alunoService.situacaoMatriculaEscolaOrigem()
    }

    @Get('matriculasituacaoporescolaorigem')
    getMatriculaSituacaoPorEscolaOrigem(@Query() query: any): Promise<SituacaoMatriculaEscolaOrigem[]>{
        return this.alunoService.situacaoMatriculaPorEscolaOrigem(query.status)
    }

    @Get('sexoidade')
    getIdadePorSexo(): Promise<SituacaoIdadeSexo[]>{        
        return this.alunoService.situacaoSexoIdade()
    }

    @Get('customizado')
    getDados(@Query() query: any): Promise<Estatisticas[]>{
        console.log(query);

        return this.alunoService.customizado(query.etnia, query.sexo, query.renda_familiar,query.estado,query.matricula_situacao, query.escola_origem);


    }

    
}
