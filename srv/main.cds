using {desafio.bridge as bridge } from  '../db/schema';

service MainService {
    entity EmpresasSet as projection on bridge.Empresas;
    entity InstituicoesSet as projection on bridge.Instituicoes;
    entity ParticipantesSet as projection on bridge.Participantes;
    entity VagasSet as projection on bridge.Vagas;
}