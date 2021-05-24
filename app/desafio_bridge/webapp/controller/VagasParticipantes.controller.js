sap.ui.define([
    './BaseController',
    'sap/m/MessageToast',
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
function (BaseController, MessageToast, JSONModel, MessageBox, Filter, FilterOperator) {
    "use strict";

    return BaseController.extend("desafiobridge.desafiobridge.controller.VagasParticipante", {
        onInit: function () {
            this.getRouter().getRoute("VagasParticipantes").attachPatternMatched(this.handleRouteMatched, this);
            this.getRouter().getRoute("VerVaga").attachPatternMatched(this.handleRouteMatchedVerVaga, this);

        },
        handleRouteMatched: async function () {
            var that = this;
            // Busca todos os Vagas cadastradas (GET)
            await
            $.ajax({
                "url": "/main/VagasSet?$expand=empresa",
                "method": "GET",
                success(data) {
                    that.getView().setModel(new JSONModel(data.value), "Vagas");
                },
                error() {
                    MessageBox.error("Não foi possível buscar as Vagas.");
                }
            });
        },
        // Função do botão editar da tabela
        onNavVerVaga: function(oEvent){
            var VagaId = oEvent.getSource().getBindingContext("Vagas").getObject().ID; // pega o id do Vaga selecionado
            this.getRouter().navTo("VerVaga", {ID: VagaId}); // chama a rota de edição passando o id do Vaga selecionado
        },
        // Rota de edição
        handleRouteMatchedVerVaga: async function () {
            var that = this;
            var ID = this.getRouter().getHashChanger().getHash().split("/")[1];
            this.getView().setBusy(true);
            await
            $.ajax({
                "url": "/main/VagasSet(" + ID + ")?$expand=empresa", // concatena a URL com o ID
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
        onVoltar: function () {
            this.getRouter().navTo("VagasParticipantes");
        }
    });
});