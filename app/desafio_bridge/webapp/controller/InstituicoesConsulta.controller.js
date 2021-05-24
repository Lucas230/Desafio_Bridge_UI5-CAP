sap.ui.define([
        "./BaseController",
        "sap/ui/model/json/JSONModel",
        "sap/m/MessageBox",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (BaseController, JSONModel, MessageBox, Filter, FilterOperator) {
		"use strict";

		return BaseController.extend("desafiobridge.desafiobridge.InstituicoesConsulta", {
			onInit: function () {
                this.getRouter().getRoute("InstituicoesConsulta").attachPatternMatched(this.handleRouteMatched, this);

            },
            
            handleRouteMatched: async function(){
                var that = this;
                // Busca todos as instituições cadastradas (GET)
                await
                $.ajax({
                    "url": "/main/InstituicoesSet",
                    "method": "GET",
                    success(data){
                        that.getView().setModel(new JSONModel(data.value), "Instituicoes");
                    },
                    error(){
                        MessageBox.error("Não foi possível buscar a Instituição.");
                    }
                })
            },
            
            // Função do botão 'Excluir'
            onExcluir: async function(oEvent){
                var id = oEvent.getParameter('listItem').getBindingContext("Instituicoes").getObject().id; // pega o ID da Instituicaos elecionado
                this.getView().setBusy(true);
                // Método DELETE para deletar um registro 
                await
                $.ajax({
                    "url": "/main/InstituicoesSet("+ id +")",
                    "method": "DELETE",
                    success(data){
                        MessageBox.success("Excluído com sucesso!");
                    },
                    error(){
                        MessageBox.error("Não foi possível excluir a Instituição")
                    }

                });
                await this.handleRouteMatched(); // chama a função para recarregar os dados da tabela
                this.getView().setBusy(false);

            },

            // Função do botão editar da tabela
            onNavEditarInstituicoes: function(oEvent){
                var InstituicaoId = oEvent.getSource().getBindingContext("Instituicoes").getObject().ID; // pega o id da Instituicao selecionado
                this.getRouter().navTo("EditarInstituicoes", {ID: InstituicaoId}); // chama a rota de edição passando o id da Instituicao selecionado
            },

            // Função do campo de busca (SearchField)
            onSearch: function(oEvent){
                var aFilters = [];
                var sQuery = oEvent.getSource().getValue();
                if (sQuery && sQuery.length > 0) {
                    var filter = new Filter("nome", FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }

                var oList = this.byId("tableInstituicoes");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilters, "Application");
            }
		});
	});