sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (BaseController, JSONModel, MessageBox) {
		"use strict";

		return BaseController.extend("desafiobridge.desafiobridge.controller.LoginAdm", {
			onInit: function () {
                var oModelLocal = {
                    email: "",
                    senha: ""
                };
                this.setModel(new JSONModel(oModelLocal),"Adm");
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
                                that.getView().setModel(new JSONModel(), "Adm");
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