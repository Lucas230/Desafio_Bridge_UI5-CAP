sap.ui.define([
		"./BaseController"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (BaseController) {
		"use strict";

		return BaseController.extend("desafiobridge.desafiobridge.controller.MenuParticipante", {
			onInit: function () {

            },
            onNavLoginParticipante: function(){
                this.getRouter().navTo("HomeParticipante");
            },
            onNavVagasParticipantes: function(){
                this.getRouter().navTo("VagasParticipantes");
            },
            onNavLoginParticipante: function(){
                this.getRouter().navTo("LoginParticipante");
            }
		});
	});