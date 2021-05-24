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

		return BaseController.extend("desafiobridge.desafiobridge.EmpresasConsulta", {
			onInit: function () {
                this.getRouter().getRoute("EmpresasConsulta").attachPatternMatched(this.handleRouteMatched, this);

            },
            
            handleRouteMatched: async function(){
                var that = this;
                // Busca todos os Empresas cadastradas (GET)
                await
                $.ajax({
                    "url": "/main/EmpresasSet",
                    "method": "GET",
                    success(data){
                        that.getView().setModel(new JSONModel(data.value), "Empresas");
                    },
                    error(){
                        MessageBox.error("Não foi possível buscar as Empresas.");
                    }
                })
            },
            
            // Função do botão 'Excluir'
            onExcluir: async function(oEvent){
                var id = oEvent.getParameter('listItem').getBindingContext("Empresas").getObject().ID; // pega o ID do Empresa selecionado
                this.getView().setBusy(true);
                // Método DELETE para deletar um registro 
                await
                $.ajax({
                    "url": "/main/EmpresasSet("+ id +")",
                    "method": "DELETE",
                    success(data){
                        MessageBox.success("Excluído com sucesso!");
                    },
                    error(){
                        MessageBox.error("Não foi possível excluir o Empresa.")
                    }

                });
                await this.handleRouteMatched(); // chama a função para recarregar os dados da tabela
                this.getView().setBusy(false);

            },

            // Função do botão editar da tabela
            onNavEditarEmpresa: function(oEvent){
                var EmpresaId = oEvent.getSource().getBindingContext("Empresas").getObject().ID; // pega o id do Empresa selecionado
                this.getRouter().navTo("EditarEmpresa", {ID: EmpresaId}); // chama a rota de edição passando o id do Empresa selecionado
            },

            // Função do campo de busca (SearchField)
            onSearch: function(oEvent){
                var aFilters = [];
                var sQuery = oEvent.getSource().getValue();
                if (sQuery && sQuery.length > 0) {
                    var filter = new Filter("nome", FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }

                var oList = this.byId("tableEmpresas");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilters, "Application");
            }
		});
	});