sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],

    function (BaseController, JSONModel, MessageBox) {
        "use strict";

        return BaseController.extend("desafiobridge.desafiobridge.EmpresasCadastro", {
            onInit: function () {

                var oModelLocal = {
                    nome: "",
                    email: "",
                    senha: ""
                };
                this.setModel(new JSONModel(oModelLocal), "Empresa");

                // Rota de cadastro
                this.getRouter().getRoute("EmpresasCadastro").attachPatternMatched(this.handleRouteMatched, this);
                // Rota de edição
                //this.getRouter().getRoute("EmpresasEditar").attachPatternMatched(this.handleRouteMatchedEditarEmpresa, this);
            },

            // Rota de edição
            handleRouteMatchedEditarEmpresa: async function () {
                var that = this;
                var ID = this.getRouter().getHashChanger().getHash().split("/")[1];
                this.getView().setBusy(true);
                await
                    $.ajax({
                        "url": "/main/EmpresasSet(" + ID + ")", // concatena a URL com o ID
                        "method": "GET",
                        success(data) {
                            that.getView().setModel(new JSONModel(data), "Empresa"); // salva o retorno da API (data) em um Model chamado 'Empresa'
                        },
                        error() {
                            MessageBox.error("Não foi possível buscar as Empresas.") //Se der erro de API, exibe uma mensagem ao usuário
                        }
                    });
                this.getView().setBusy(false);
            },

            // Função do botão "Confirmar"
            onConfirmar: async function () {
                var oEmpresa = this.getView().getModel("Empresa").getData();
                var that = this;
                console.log(oEmpresa);

                // Primeiro é validado se a rota que estamos é a rota de 'EmpresasEditar'
                // Se for, o botão será responsável por atualizar (PUT) os dados
                // Senão, irá criar (POST) um novo registro na tabela
                if (this.getRouter().getHashChanger().getHash().search("EmpresasEditar") === 0) {

                    await $.ajax("/main/EmpresasSet(" + oEmpresa.ID + ")", { // Concatena o ID da Empresa selecionado na url
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        // Cria a estrutura dos dados para enviar para API
                        data: JSON.stringify({
                            "descricao": oEmpresa.descricao,
                            "requisitos": oEmpresa.requisitos,
                            "nivel_conhecimento": oEmpresa.nivel_conhecimento,
                            "empresa": oEmpresa.empresa,
                            "participantes": oEmpresa.participantes
                        }),
                        success() {
                            // Se a api retornar sucesso, exibe uma mensagem para o usuário e navega para a tela de "EmpresasConsulta"
                            MessageBox.success("Editado com sucesso!", {
                                onClose: function () {
                                    that.getRouter().navTo("EmpresasConsulta");
                                }
                            });
                        },
                        error() {
                            //Se a api retornar erro, exibe uma mensagem ao usuário
                            MessageBox.error("Não foi possível editar a Empresa.");
                        }
                    });
                    //Limpa os campos
                    this.getView().setModel(new JSONModel(), "Empresa");
                }
                else {
                    this.getView().setBusy(true);
                    // Método POST para salvar os dados 

                    await $.ajax("/main/EmpresasSet", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: JSON.stringify(oEmpresa),
                        success() {
                            MessageBox.success("Salvo com sucesso!");
                        },
                        error() {
                            MessageBox.error("Não foi possível salvar a Empresa!");
                        }
                    })

                    this.getView().setBusy(false);
                }
                //Limpa os campos
                this.getView().setModel(new JSONModel(), "Empresa");
            },

            // Função do botão Cancelar
            onCancelar: function () {
                // Se a rota for a de "EmpresasEditar", navega para a tela de Consuta
                // Senão, limpa o model 'Empresa'
                if (this.getRouter().getHashChanger().getHash().search("EmpresasEditar") === 0) {
                    this.getRouter().navTo("EmpresasConsulta");
                    //Limpa os campos
                    this.getView().setModel(new JSONModel(), "Empresa");
                } else {
                    //Limpa os campos
                    this.getView().setModel(new JSONModel(), "Empresa");
                }
            }
        });
    });