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

		return BaseController.extend("desafiobridge.desafiobridge.VagasConsulta", {
			onInit: function () {
                this.getRouter().getRoute("VagasConsulta").attachPatternMatched(this.handleRouteMatched, this);
            },
            handleRouteMatched: async function(){
                var that = this;
                // Busca todos os Vagas cadastradas (GET)
                await
                $.ajax({
                    "url": "/main/VagasSet",
                    "method": "GET",
                    success(data){
                        that.getView().setModel(new JSONModel(data.value), "Vagas");
                    },
                    error(){
                        MessageBox.error("Não foi possível buscar as Vagas.");
                    }
                })
            },
            // Função do botão 'Excluir'
            onExcluir: async function(oEvent){
                var id = oEvent.getParameter('listItem').getBindingContext("Vagas").getObject().ID; // pega o ID do Vaga selecionado
                this.getView().setBusy(true);
                // Método DELETE para deletar um registro 
                await
                $.ajax({
                    "url": "/main/VagasSet("+ id +")",
                    "method": "DELETE",
                    success(data){
                        MessageBox.success("Excluído com sucesso!");
                    },
                    error(){
                        MessageBox.error("Não foi possível excluir o Vaga.");
                    }

                });
                await this.handleRouteMatched(); // chama a função para recarregar os dados da tabela
                this.getView().setBusy(false);
            },

            // Função do botão editar da tabela
            onNavEditarVaga: function(oEvent){
                var VagaId = oEvent.getSource().getBindingContext("Vagas").getObject().ID; // pega o id do Vaga selecionado
                this.getRouter().navTo("VagasEditar", {ID: VagaId}); // chama a rota de edição passando o id do Vaga selecionado
            },

            // Função do campo de busca (SearchField)
            onSearch: function(oEvent){
                var aFilters = [];
                var sQuery = oEvent.getSource().getValue();
                if (sQuery && sQuery.length > 0) {
                    var filter = new Filter("nome", FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }

                var oList = this.byId("tableVagas");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilters, "Application");
            }
		});
	});