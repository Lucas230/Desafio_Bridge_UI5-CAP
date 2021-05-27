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
                this.getRouter().getRoute("Participantes").attachPatternMatched(this.handleRouteMatched, this);
                this.getRouter().getRoute("VerParticipante").attachPatternMatched(this.handleRouteMatchedVerPart, this);

            },
            
            handleRouteMatched: async function(){
                var that = this;
                // Busca todos os Participantes cadastradas (GET)
                await
                $.ajax({
                    "url": "/main/ParticipantesSet?$expand=instituicao",
                    "method": "GET",
                    success(data){
                        that.getView().setModel(new JSONModel(data.value), "Participantes");
                    },
                    error(){
                        MessageBox.error("Não foi possível buscar as Participantes.");
                    }
                })
            },

            // Função do campo de busca (SearchField)
            onSearch: function(oEvent){
                var aFilters = [];
                var sQuery = oEvent.getSource().getValue();
                if (sQuery && sQuery.length > 0) {
                    var filter = new Filter("conhecimento", FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }

                var oList = this.byId("tableParticipantes");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilters, "Application");
            },
            onNavVerParticipante: function(oEvent){
                var PartId = oEvent.getSource().getBindingContext("Participantes").getObject().ID; 
                console.log(PartId);
                this.getRouter().navTo("VerParticipante", {id: PartId}); 
            },
            
            handleRouteMatchedVerPart: async function () {
                var that = this;
                var id = this.getRouter().getHashChanger().getHash().split("/")[1];
                this.getView().setBusy(true);

                await
                $.ajax({
                    "url": "/main/ParticipantesSet(" + id + ")?$expand=instituicao", // concatena a URL com o ID
                    "method": "GET",
                    success(data) {
                        console.log("data:" + data)
                        that.getView().setModel(new JSONModel(data), "Participante"); // salva o retorno da API (data) em um Model chamado 'Vaga'
                    },
                    error() {
                        MessageBox.error("Não foi possível buscar o Participante.") //Se der erro de API, exibe uma mensagem ao usuário
                    }
                });
                this.getView().setBusy(false);
            },
            onVoltar: function () {
                this.getRouter().navTo("Participantes");
            }
		});
	});