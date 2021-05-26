sap.ui.define([
    "./BaseController",
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (BaseController, Controller, MessageBox) {
		"use strict";

		return BaseController.extend("desafiobridge.desafiobridge.controller.LoginEmpresa", {
			onInit: function () {
              
            },

            onConfirmar: function(){
                
                var email = this.getView().byId('email');
                var senha = this.getView().byId('senha');

                var emailcerto = "admin@bridge.com.br";
                var senhacerta = "admin";

                if(email._sTypedInValue === ''){
                    MessageBox.error("insira um email");
                }
                else if(senha._sTypedInValue === ''){
                    MessageBox.error("insira uma senha");
                }
                else{
                    var that = this;
                    if(email._sTypedInValue == emailcerto && senha._sTypedInValue == senhacerta){
                        sap.ui.getCore().setModel( "admin", "global");
                        MessageBox.success("Login efetuado com sucesso!", {
                            onClose: function () {
                                that.getRouter().navTo("ParticipantesConsulta");
                            }
                        });
                        return;
                    }

                    else{
                        MessageBox.error("Login ou senha inválidos");
                        return;
                    }
                }
            }
		});
	});