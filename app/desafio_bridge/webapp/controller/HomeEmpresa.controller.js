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

    return BaseController.extend("desafiobridge.desafiobridge.controller.HomeEmpresa", {
        onInit: function () {
            this.getRouter().getRoute("HomeEmpresa").attachPatternMatched(this.handleRouteMatched, this);
        },
        
        handleRouteMatched: async function () {
            var that = this;
            var ID = "1d53302c-742b-41ae-b066-2453d35c8aab";
            this.getView().setBusy(true);
            await
            $.ajax({
                "url": "/main/EmpresasSet("+ ID +")", // concatena a URL com o ID
                "method": "GET",
                success(data) {
                    that.getView().setModel(new JSONModel(data), "Empresa"); // salva o retorno da API (data) em um Model chamado 'Vaga'
                },
                error() {
                    MessageBox.error("Não foi possível buscar a Empresa.") //Se der erro de API, exibe uma mensagem ao usuário
                }
            });
            this.getView().setBusy(false);
        },
        onNavEditar: function(){
            var EmpresaId = "1d53302c-742b-41ae-b066-2453d35c8aab";
            this.getRouter().navTo("EditarEmpresa", {ID: EmpresaId});
        }

    });
});