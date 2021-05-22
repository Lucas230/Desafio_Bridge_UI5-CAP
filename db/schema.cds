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
    tipo_ensino : String(50);
}

entity Vagas : cuid {
    descricao          : String(100);
    requisitos         : String(100);
    nivel_conhecimento : String(50);
    empresa            : Association to Empresas;
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
    curso        : String(50);
}
