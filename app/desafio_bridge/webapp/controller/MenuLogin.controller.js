sap.ui.define([
		"./BaseController"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (BaseController) {
		"use strict";

		return BaseController.extend("desafiobridge.desafiobridge.controller.MenuLogin", {
			onInit: function () {

            },
            onNavLoginParticipante: function(){
                this.getRouter().navTo("LoginParticipante");
            },
            onNavLoginEmpresa: function(){
                this.getRouter().navTo("LoginEmpresa");
            },
            onNavLoginAdm: function(){
                this.getRouter().navTo("LoginAdm");
            },
            onNavEmpresasCadastro: function(){
                this.getRouter().navTo("EmpresasCadastro");
            },
            onNavParticipanteCadastro: function(){
                this.getRouter().navTo("ParticipanteCadastro");
             }
		});
	});
