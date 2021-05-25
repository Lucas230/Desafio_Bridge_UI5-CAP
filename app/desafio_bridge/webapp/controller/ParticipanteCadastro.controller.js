sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],

    function (BaseController, JSONModel, MessageBox) {
        "use strict";

        return BaseController.extend("desafiobridge.desafiobridge.ParticipanteCadastro", {
            onInit: function () {
                var oModelLocal = {
                    nome: "",
                    instituicao_ID: ""
                };
                this.setModel(new JSONModel(oModelLocal), "Participante");

                this._getDadosInstituicao();
                
                
                // Rota de cadastro
                this.getRouter().getRoute("ParticipanteCadastro").attachPatternMatched(this.handleRouteMatched, this);
                // Rota de edição
                this.getRouter().getRoute("EditarParticipante").attachPatternMatched(this.handleRouteMatchedEditarParticipante, this);
            },

            handleRouteMatched: async function () {

            },

            _getCpf: async function (handleFunction) {
                var that = this;
                await
                    $.ajax({
                        "url": "/main/ParticipantesSet",
                        "method": "GET",
                        success(data) {
                            that.getView().setModel(new JSONModel(data.value), "ParticipantesList");
                            //console.log(data.value); // salva o retorno da API (data) em um Model chamado 'Instituição'
                            
                            var aCPF;

                            aCPF = data.value.map((element) => {
                                return element.cpf;
                            });

                            // Aqui vai existir a array CPF
                            
                            handleFunction(aCPF);


                        },
                        error() {
                            MessageBox.error("Não foi possível buscar os Participantes.") //Se der erro de API, exibe uma mensagem ao usuário
                        }
                    });
            },

            _getDadosInstituicao: async function () {
                var that = this;
                var ID = this.getRouter().getHashChanger().getHash().split("/")[1];
                await
                    $.ajax({
                        "url": "/main/InstituicoesSet",
                        "method": "GET",
                        success(data) {
                            that.getView().setModel(new JSONModel(data.value), "InstituicaoList"); // salva o retorno da API (data) em um Model chamado 'Instituição'
                        },
                        error() {
                            MessageBox.error("Não foi possível buscar os Participantes.") //Se der erro de API, exibe uma mensagem ao usuário
                        }
                    });
            },

            // Rota de edição
            handleRouteMatchedEditarParticipante: async function () {
                var that = this;
                var ID = this.getRouter().getHashChanger().getHash().split("/")[1];
                this.getView().setBusy(true);
                await
                    $.ajax({
                        "url": "/main/ParticipantesSet(" + ID + ")", // concatena a URL com o ID
                        "method": "GET",
                        success(data) {
                            that.getView().setModel(new JSONModel(data), "Participante"); // salva o retorno da API (data) em um Model chamado 'Vaga'
                        },
                        error() {
                            MessageBox.error("Não foi possível buscar os Participantes.") //Se der erro de API, exibe uma mensagem ao usuário
                        }
                    });
                this.getView().setBusy(false);
            },

            // Função do botão "Confirmar"
            onConfirmar: async function () {
                var oParticipante = this.getView().getModel("Participante").getData();
                var that = this;
                var def = oParticipante.deficiencia === "S" ? true : false;
                oParticipante.deficiencia = def;

                if(oParticipante.senha == null || 
                    oParticipante.confSenha == null ||
                    oParticipante.conhecimento == null ||
                    oParticipante.cpf == null ||
                    oParticipante.curso == null ||
                    oParticipante.deficiencia == null ||
                    oParticipante.email == null ||
                    oParticipante.escolaridade == null ||
                    oParticipante.instituicao_ID == null ||
                    oParticipante.nome == null ||
                    oParticipante.sexo == null ||
                    oParticipante.telefone == null){
                    MessageBox.error("Preencha todos os campos!!");
                }
                else{
                    if(oParticipante.senha === oParticipante.confSenha){
                    // Primeiro é validado se a rota que estamos é a rota de 'VagasEditar'
                    // Se for, o botão será responsável por atualizar (PUT) os dados
                    // Senão, irá criar (POST) um novo registro na tabela
                        if (this.getRouter().getHashChanger().getHash().search("EditarParticipante") === 0) {

                            await $.ajax("/main/ParticipantesSet("+ oParticipante.ID +")", { // Concatena o ID da vaga selecionado na url
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                // Cria a estrutura dos dados para enviar para API
                                data: JSON.stringify({
                                    "conhecimento": oParticipante.conhecimento,
                                    "cpf": oParticipante.cpf,
                                    "curso": oParticipante.curso,
                                    "deficiencia": oParticipante.deficiencia,
                                    "email": oParticipante.email,
                                    "escolaridade": oParticipante.escolaridade,
                                    "instituicao_ID": oParticipante.instituicao_ID,
                                    "nome": oParticipante.nome,
                                    "senha": oParticipante.senha,
                                    "sexo": oParticipante.sexo,
                                    "telefone": oParticipante.telefone
                                    
                                }),
                                success() {
                                    // Se a api retornar sucesso, exibe uma mensagem para o usuário e navega para a tela de "ParticipantesConsulta"
                                    MessageBox.success("Editado com sucesso!", {
                                        onClose: function () {
                                            that.getRouter().navTo("ParticipantesConsulta");
                                        }
                                    });
                                },
                                error() {
                                    //Se a api retornar erro, exibe uma mensagem ao usuário
                                    MessageBox.error("Não foi possível editar o Participante.");
                                }
                            });
                            this.getView().setModel(new JSONModel(), "Participante");
                        }
                        else {
                            console.log("testeRafinh")
                            this._getCpf (async(aCPF)  => {
                                // Aqui dentro vai existir aquela array cpf
                                for(var x=0; x<aCPF.length;x++){
                                    console.log(aCPF[x] +"----"+oParticipante.cpf);
                                    if(oParticipante.cpf == aCPF[x]){
                                        MessageBox.error("CPF já cadastrado", {
                                            onClose: function () {
                                                that.getRouter().navTo("LoginParticipante");
                                            }
                                        });
                                        return;
                                    }
                                    else if(x == aCPF.length-1){
                                        MessageBox.success("Certo");
                                        
                                        this.getView().setBusy(true);
                                        // Método POST para salvar os dados 
                                        await $.ajax("/main/ParticipantesSet", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            data: JSON.stringify({
                                                "conhecimento": oParticipante.conhecimento,
                                                "cpf": oParticipante.cpf,
                                                "curso": oParticipante.curso,
                                                "deficiencia": oParticipante.deficiencia,
                                                "email": oParticipante.email,
                                                "escolaridade": oParticipante.escolaridade,
                                                "instituicao_ID": oParticipante.instituicao_ID,
                                                "nome": oParticipante.nome,
                                                "senha": oParticipante.senha,
                                                "sexo": oParticipante.sexo,
                                                "telefone": oParticipante.telefone
                                                
                                            }),
                                            success() {
                                                MessageBox.success("Salvo com sucesso!");
                                            },
                                            error() {
                                                MessageBox.error("Não foi possível salvar o Participante!");
                                            }
                                        })

                                        this.getView().setBusy(false);
                                        return;
                                    }
                                }
                            });
                            

                        }
                        this.getView().setModel(new JSONModel(), "Participante");
                    }
                    else{
                        MessageBox.error("Senhas Divergentes");
                    }
                }
            },

            // Função do botão Cancelar
            onCancelar: function () {
                // Se a rota for a de "ParticipantesEditar", navega para a tela de Consuta
                // Senão, limpa o model 'Participante'
                if (this.getRouter().getHashChanger().getHash().search("ParticipanteEditar") === 0) {
                    this.getRouter().navTo("ParticipantesConsulta");
                } else {
                    this.getView().setModel("Participante");
                }
            }
        });
    });