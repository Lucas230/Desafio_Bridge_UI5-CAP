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

		return BaseController.extend("desafiobridge.desafiobridge.ParticipantesConsulta", {
			onInit: function () {
                this.getRouter().getRoute("ParticipantesConsulta").attachPatternMatched(this.handleRouteMatched, this);
                
                

            },
            
            handleRouteMatched: async function(){
                var that = this;
                // Busca todos os Participantes cadastradas (GET)
                await
                $.ajax({
                    "url": "/main/ParticipantesSet",
                    "method": "GET",
                    success(data){
                        that.getView().setModel(new JSONModel(data.value), "Participantes");
                    },
                    error(){
                        MessageBox.error("Não foi possível buscar as Participantes.");
                    }
                })
            },
            
            // Função do botão 'Excluir'
            onExcluir: async function(oEvent){
                var id = oEvent.getParameter('listItem').getBindingContext("Participantes").getObject().ID; // pega o ID do Participante selecionado
                this.getView().setBusy(true);
                // Método DELETE para deletar um registro 
                await
                $.ajax({
                    "url": "/main/ParticipantesSet("+ id +")",
                    "method": "DELETE",
                    success(data){
                        MessageBox.success("Excluído com sucesso!");
                    },
                    error(){
                        MessageBox.error("Não foi possível excluir o Participante.")
                    }

                });
                await this.handleRouteMatched(); // chama a função para recarregar os dados da tabela
                this.getView().setBusy(false);

            },

            // Função do botão editar da tabela
            onNavEditarParticipante: function(oEvent){
                var ParticipanteId = oEvent.getSource().getBindingContext("Participantes").getObject().ID; // pega o id do Participante selecionado
                this.getRouter().navTo("EditarParticipante", {id: ParticipanteId}); // chama a rota de edição passando o id do Participante selecionado
            },

            // Função do campo de busca (SearchField)
            onSearch: function(oEvent){
                var aFilters = [];
                var sQuery = oEvent.getSource().getValue();
                if (sQuery && sQuery.length > 0) {
                    var filter = new Filter("nome", FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }

                var oList = this.byId("tableParticipantes");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilters, "Application");
            }
		});
	});