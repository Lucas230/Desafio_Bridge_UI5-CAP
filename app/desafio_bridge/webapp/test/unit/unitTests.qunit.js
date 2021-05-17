/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"desafio_bridge/desafio_bridge/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
