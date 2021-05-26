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

    return BaseController.extend("desafiobridge.desafiobridge.controller.HomeParticipante", {
        onInit: function () {
            this.getRouter().getRoute("HomeParticipante").attachPatternMatched(this.handleRouteMatched, this);
        },
        
        handleRouteMatched: async function () {
            var that = this;
            var ID = "ef0381e0-4967-438d-863f-6ecc74ff2a98";
            this.getView().setBusy(true);
            await
            $.ajax({
                "url": "/main/ParticipantesSet("+ ID +")", // concatena a URL com o ID
                "method": "GET",
                success(data) {
                    that.getView().setModel(new JSONModel(data), "Participante"); // salva o retorno da API (data) em um Model chamado 'Vaga'
                },
                error() {
                    MessageBox.error("Não foi possível buscar a Empresa.") //Se der erro de API, exibe uma mensagem ao usuário
                }
            });
            this.getView().setBusy(false);
        },
        onNavEditar: function(){
            var UserId = "ef0381e0-4967-438d-863f-6ecc74ff2a98";
            this.getRouter().navTo("EditarParticipante", {id: UserId});
        }

    });
});