sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("desafiobridge.desafiobridge.controller.View", {
			onInit: function () {
                console.log("teste");
			}
		});
	});