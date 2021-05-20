sap.ui.define([
		"./BaseController"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (BaseController) {
		"use strict";

		return BaseController.extend("desafiobridge.desafiobridge.controller.Menu", {
			onInit: function () {

            },
            
            // Função do botão de "Consulta de Vagas"
            onNavVagasConsulta: function(){
                this.getRouter().navTo("VagasConsulta");
            },
            
            // Função do botão de "Cadastro de vagas"
            onNavVagasCadastro: function(){
                this.getRouter().navTo("VagasCadastro");
            }
		});
	});
