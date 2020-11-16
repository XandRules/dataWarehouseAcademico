import { Module } from "@nestjs/common";
import { FiltroController } from "./filtro.controller";
import { FiltroService } from "./filtro.service";

@Module({
    controllers: [FiltroController],
    providers: [FiltroService]
})

export class FiltroModule{}