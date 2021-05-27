sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],

    function (BaseController, JSONModel, MessageBox) {
        "use strict";

        return BaseController.extend("desafiobridge.desafiobridge.controller.VagasCadastro", {
            onInit: function () {

                var oModelLocal = {
                    empresa_ID: ""
                };
                this.setModel(new JSONModel(oModelLocal), "Vaga");


                // Rota de cadastro
                this.getRouter().getRoute("VagasCadastro").attachPatternMatched(this.handleRouteMatched, this);
                // Rota de edição
                this.getRouter().getRoute("VagasEditar").attachPatternMatched(this.handleRouteMatchedEditarVaga, this);
            },



            // Rota de edição
            handleRouteMatchedEditarVaga: async function () {
                var that = this;
                var ID = this.getRouter().getHashChanger().getHash().split("/")[1];
                this.getView().setBusy(true);
                await
                    $.ajax({
                        "url": "/main/VagasSet(" + ID + ")", // concatena a URL com o ID
                        "method": "GET",
                        success(data) {
                            that.getView().setModel(new JSONModel(data), "Vaga"); // salva o retorno da API (data) em um Model chamado 'Vaga'
                        },
                        error() {
                            MessageBox.error("Não foi possível buscar as Vagas.") //Se der erro de API, exibe uma mensagem ao usuário
                        }
                    });
                this.getView().setBusy(false);
            },

            // Função do botão "Confirmar"
            onConfirmar: async function () {
                var oVaga = this.getView().getModel("Vaga").getData();
                var that = this;
                var idEmpresa = sap.ui.getCore().getModel("global")
                oVaga.empresa_ID = idEmpresa;

                // Primeiro é validado se a rota que estamos é a rota de 'VagasEditar'
                // Se for, o botão será responsável por atualizar (PUT) os dados
                // Senão, irá criar (POST) um novo registro na tabela
                if (this.getRouter().getHashChanger().getHash().search("VagasEditar") === 0) {

                    await $.ajax("/main/VagasSet(" + oVaga.ID + ")", { // Concatena o ID da vaga selecionado na url
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        // Cria a estrutura dos dados para enviar para API
                        data: JSON.stringify({
                            "descricao": oVaga.descricao,
                            "requisitos": oVaga.requisitos,
                            "nivel_conhecimento": oVaga.nivel_conhecimento,
                            "empresa_ID": oVaga.empresa_ID
                        }),
                        success() {
                            // Se a api retornar sucesso, exibe uma mensagem para o usuário e navega para a tela de "VagasConsulta"
                            MessageBox.success("Editado com sucesso!", {
                                onClose: function () {
                                    that.getRouter().navTo("EmpresaVagasConsulta");
                                }
                            });
                        },
                        error() {
                            //Se a api retornar erro, exibe uma mensagem ao usuário
                            MessageBox.error("Não foi possível editar a vaga.");
                        }
                    });
                    //Limpa os campos da edição
                    this.getView().setModel(new JSONModel(), "Vaga");
                }
                else {
                    this.getView().setBusy(true);
                    // Método POST para salvar os dados 

                    await $.ajax("/main/VagasSet", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: JSON.stringify(oVaga),
                        success() {
                            MessageBox.success("Salvo com sucesso!");
                        },
                        error(data) {
                            MessageBox.error("Não foi possível salvar a vaga!");
                        }
                    });
                    this.getView().setBusy(false);

                }
                //Limpa os campos
                this.getView().setModel(new JSONModel(), "Vaga");
            },

            // Função do botão Cancelar
            onCancelar: function () {
                // Se a rota for a de "VagasEditar", navega para a tela de Consuta
                // Senão, limpa o model 'Vaga'
                if (this.getRouter().getHashChanger().getHash().search("VagasEditar") === 0) {
                    this.getRouter().navTo("EmpresaVagasConsulta");
                    //Limpa os campos
                    this.getView().setModel(new JSONModel(), "Vaga");
                }else {
                    //Limpa os campos
                    this.getView().setModel(new JSONModel(), "Vaga");
                }
            }
        });
    });