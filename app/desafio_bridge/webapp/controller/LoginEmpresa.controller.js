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
            
            _getLogin: async function (handleFunction) {
                
                await
                    $.ajax({
                        "url": "/main/EmpresasSet",
                        "method": "GET",
                        success(data) {
                            //console.log(data.value); // salva o retorno da API (data) em um Model chamado 'Instituição'
                            
                            var aLogin;

                            aLogin = {
                                "email": data.value.map((element) => {
                                    return element.email;
                                }),
                                "senha": data.value.map((element) => {
                                    return element.senha;
                                }),
                                "id": data.value.map((element) => {
                                    return element.ID;
                                })
                        };
                        if(aLogin.length==0){
                            aLogin = null;
                        }

                            // Aqui vai existir a array CPF
                            
                            handleFunction(aLogin);


                        },
                        error() {
                            MessageBox.error("Não foi possível buscar os Empresa.") //Se der erro de API, exibe uma mensagem ao usuário
                        }
                    });
            },

            onConfirmar: function(){
                
                var email = this.getView().byId('email');
                var senha = this.getView().byId('senha');

                if(email._sTypedInValue === ''){
                    MessageBox.error("insira um email");
                }
                else if(senha._sTypedInValue === ''){
                    MessageBox.error("insira uma senha");
                }
                else{
                    this._getLogin((aLogin) => {
                        if(aLogin == null){
                             MessageBox.success("Conta inexistente, cria uma para acesar", {
                                        onClose: function () {
                                            that.getRouter().navTo("EmpresaCadastro");
                                        }
                                    });
                        }
                        else{
                            var that = this;
                            for(var x=0;x<aLogin.email.length;x++){
                                if(email._sTypedInValue == aLogin.email[x] && senha._sTypedInValue == aLogin.senha[x]){
                                    sap.ui.getCore().setModel( aLogin.id[x], "global");
                                    MessageBox.success("Login efetuado com sucesso!", {
                                        onClose: function () {
                                            that.getRouter().navTo("ParticipantesConsulta");
                                        }
                                    });
                                    return;
                                }

                                else if(x == aLogin.email.length-1){
                                    MessageBox.error("Login ou senha inválidos opa");
                                    return;
                                }
                                
                            }
                        }              
                    });
                }

                

            }
		});
	});