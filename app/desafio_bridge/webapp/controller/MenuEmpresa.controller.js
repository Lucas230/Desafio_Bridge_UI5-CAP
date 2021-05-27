sap.ui.define([
		"./BaseController"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (BaseController) {
		"use strict";

		return BaseController.extend("desafiobridge.desafiobridge.controller.MenuEmpresa", {
			onInit: function () {

            },
            onNavLoginParticipante: function(){
                this.getRouter().navTo("HomeEmpresa");
            },
            onNavVagasCadastro: function(){
                this.getRouter().navTo("VagasCadastro");
            },
            onNavParticipantes: function(){
                this.getRouter().navTo("Participantes");
            },
            onNavLoginParticipante: function(){
                this.getRouter().navTo("LoginParticipante");
            }
		});
	});