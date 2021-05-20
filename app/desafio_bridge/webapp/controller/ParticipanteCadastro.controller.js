sap.ui.define([
        "./BaseController",
        "sap/ui/model/json/JSONModel",
        "sap/m/MessageBox"
    ],
    
	function (BaseController, JSONModel, MessageBox) {
		"use strict";

		return BaseController.extend("desafiobridge.desafiobridge.ParticipanteCadastro", {
			onInit: function () {
                // Rota de cadastro
                this.getRouter().getRoute("ParticipanteCadastro").attachPatternMatched(this.handleRouteMatched, this);
                // Rota de edição
                /*this.getRouter().getRoute("VagasEditar").attachPatternMatched(this.handleRouteMatchedEditarVaga, this);*/
            },
            
            // Rota de cadastro
            handleRouteMatched: function(){
                //this.getView().setModel();
            },

            // Rota de edição
            handleRouteMatchedEditarVaga: async function(){
                var that = this;
                var id = this.getRouter().getHashChanger().getHash().split("/")[1];
                this.getView().setBusy(true);
                await 
                $.ajax({
                    "url": `desafiobridge.desafiobridge/${id}`, // concatena a URL com o ID
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
            onConfirmar: async function(){
                var oParticipante = this.getView().getModel("Participante").getData();
                var that = this;
                console.log(oParticipante)

                // Primeiro é validado se a rota que estamos é a rota de 'VagasEditar'
                // Se for, o botão será responsável por atualizar (PUT) os dados
                // Senão, irá criar (POST) um novo registro na tabela
                if(this.getRouter().getHashChanger().getHash().search("VagasEditar") === 0){

                    await $.ajax(`/api/parceiros/${oVaga.id}`, { // Concatena o ID da vaga selecionado na url
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    // Cria a estrutura dos dados para enviar para API
                    data: JSON.stringify({
                        "nome": oVaga.descricao,
                        "tipo": oVaga.requisitos,
                        "conhecimento": oVaga.nivel_conhecimento
                    }),
                    success() {
                        // Se a api retornar sucesso, exibe uma mensagem para o usuário e navega para a tela de "VagasConsulta"
                        MessageBox.success("Editado com sucesso!", {
                            onClose: function() {
                                that.getRouter().navTo("VagasConsulta");
                            }
                        });
                    },
                    error() {
                        //Se a api retornar erro, exibe uma mensagem ao usuário
                        MessageBox.error("Não foi possível editar a vaga.");
                    }
                });

                }
                else{

                    this.getView().setBusy(true);
                    // Método POST para salvar os dados 
                    await $.ajax("/api/Participante", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: JSON.stringify(oParticipante),
                        success(){
                            MessageBox.success("Salvo com sucesso!");
                        },
                        error(){
                            MessageBox.error("Não foi possível salvar a vaga!");
                        }
                    })

                    this.getView().setBusy(false);

                }
            },

            // Função do botão Cancelar
            onCancelar: function(){
                // Se a rota for a de "VagasEditar", navega para a tela de Consuta
                // Senão, limpa o model 'Vaga'
                if(this.getRouter().getHashChanger().getHash().search("VagasEditar") === 0){
                    this.getRouter().navTo("VagasConsulta");
                }else{
                    this.getView().setModel( "Vaga");
                }
            }
		});
	});