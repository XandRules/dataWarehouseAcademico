import { Module } from '@nestjs/common';
import { AlunoModule } from './aluno/aluno.module';
import { FiltroModule } from './filtro/filtro.module';

@Module({
  imports: [AlunoModule,FiltroModule],

})
export class AppModule {}
