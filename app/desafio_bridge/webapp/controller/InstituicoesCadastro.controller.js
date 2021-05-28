sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (BaseController, JSONModel, MessageBox) {
		"use strict";

		return BaseController.extend("desafiobridge.desafiobridge.InstituicoesCadastro", {
			onInit: function () {
                // Rota de cadastro
                this.getRouter().getRoute("InstituicoesCadastro").attachPatternMatched(this.handleRouteMatched, this);
                 // Rota de edição
                this.getRouter().getRoute("EditarInstituicoes").attachPatternMatched(this.handleRouteMatchedEditarInstituicoesCadastro, this);
                var oModelLocal = {
                    nome:"",
                    email:"",
                    tipo_ensino:""
                };
                this.setModel(new JSONModel(oModelLocal),"Instituicao");
            
            
                },

            // Rota de edição
            handleRouteMatchedEditarInstituicoesCadastro: async function(){
                var that = this;
                var id = this.getRouter().getHashChanger().getHash().split("/")[1];
                this.getView().setBusy(true);
               
                await 
                $.ajax({
                    "url": "/main/InstituicoesSet("+ id +")", // concatena a URL com o ID
                    "method": "GET",
                    success(data) {
                        that.getView().setModel(new JSONModel(data), "Instituicao"); // salva o retorno da API (data) em um Model chamado 'Vaga'
                    },
                    error() {
                        MessageBox.error("Não foi possível buscar as Instituicoes.") //Se der erro de API, exibe uma mensagem ao usuário
                    }
                });
                this.getView().setBusy(false);
            },

            // Função do botão "Confirmar"
            onConfirmar: async function(){
                var oInstituicoes = this.getView().getModel("Instituicao").getData();
                var that = this;
                console.log(oInstituicoes)
               

                // Primeiro é validado se a rota que estamos é a rota de 'instituicoesEditar'
                // Se for, o botão será responsável por atualizar (PUT) os dados
                // Senão, irá criar (POST) um novo registro na tabela
                if(this.getRouter().getHashChanger().getHash().search("EditarInstituicoes") === 0){

                    await $.ajax("/main/InstituicoesSet("+ oInstituicoes.ID +")", { // Concatena o ID da instituicao selecionado na url
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    // Cria a estrutura dos dados para enviar para API
                    data: JSON.stringify({
                        "nome": oInstituicoes.nome,
                        "email": oInstituicoes.email,
                        "tipo_ensino": oInstituicoes.tipo_ensino
                    }),
                    success() {
                        // Se a api retornar sucesso, exibe uma mensagem para o usuário e navega para a tela de "InstituicaoConsulta"
                        MessageBox.success("Editado com sucesso!", {
                            onClose: function() {
                                that.getRouter().navTo("InstituicoesConsulta");
                            }
                        });
                    },
                    error() {
                        //Se a api retornar erro, exibe uma mensagem ao usuário
                        MessageBox.error("Não foi possível editar a Instituição.");
                    }
                });
                //Limpa os campos da edição
                    this.getView().setModel(new JSONModel(), "Instituicao");

                }else{
                    this.getView().setBusy(true);
                    // Método POST para salvar os dados 
                    
                    await $.ajax("/main/InstituicoesSet", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: JSON.stringify(oInstituicoes),
                        success(){
                            MessageBox.success("Salvo com sucesso!");
                        },
                        error(){
                            MessageBox.error("Não foi possível salvar a instituição!");
                        }
                    });
                    this.getView().setBusy(false);

                }
                //Limpa os campos
                this.getView().setModel(new JSONModel(), "Instituicao");
            },

            // Função do botão Cancelar
            onCancelar: function(){
                // Se a rota for a de "EditarInstituicoes", navega para a tela de Consuta
                // Senão, limpa o model 'Instituicao'
                if(this.getRouter().getHashChanger().getHash().search("EditarInstituicoes") === 0){
                    this.getRouter().navTo("InstituicoesConsulta");
                    //Limpa os campos
                    this.getView().setModel(new JSONModel(), "Instituicao");
                }else{
                    //Limpa os campos
                    this.getView().setModel(new JSONModel(), "Instituicao");    
                }
            }
		});
	});
            