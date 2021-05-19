namespace desafio.bridge;

using {cuid} from '@sap/cds/common';


entity Empresas : cuid {
    nome  : String(50);
    email : String(50);
    senha : String(50);
}

entity Instituicoes : cuid {
    nome        : String(50);
    email       : String(50);
    tipo_ensino : String enum {
        ensino_medio_publico;
        ensino_medio_particular;
        tecnico;
        ensino_medio_tecnico;
        superior;
    } default 'superior';
}

entity Vagas : cuid {
    descricao          : String(100);
    requisitos         : String(100);
    nivel_conhecimento : String(50);
    empresa            : Association to Empresas;
    participantes      : Association to many Vagas_Participantes
                             on participantes.vagas = $self;
}

entity Vagas_Participantes {
    vagas         : Association to Vagas;
    participantes : Association to Participantes;
}

entity Participantes : cuid {
    nome         : String(50);
    email        : String(50);
    cpf          : String(15);
    deficiencia  : Boolean;
    sexo         : String(50);
    conhecimento : String(50);
    senha        : String(50);
    telefone     : String(20);
    escolaridade : String(20);
    instituicao  : Association to Instituicoes;
    dt_inicio    : Date;
    dt_fim       : Date;
    curso        : String(50);
    vagas        : Association to many Vagas_Participantes
                       on vagas.participantes = $self;
}
