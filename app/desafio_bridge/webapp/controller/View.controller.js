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
               this.getOwnerComponent()._oSplitApp = this.byId("app");
                var oSplitApp = this.getOwnerComponent()._oSplitApp;
			}
		});
	});