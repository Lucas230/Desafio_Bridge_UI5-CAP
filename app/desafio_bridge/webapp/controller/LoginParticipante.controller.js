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

		return BaseController.extend("desafiobridge.desafiobridge.controller.LoginParticipante", {
			onInit: function () {
              
            },
            
            _getLogin: async function (handleFunction) {
                var that = this;
                
                await
                    $.ajax({
                        "url": "/main/ParticipantesSet",
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
                                })
                        };

                            // Aqui vai existir a array CPF
                            
                            handleFunction(aLogin);


                        },
                        error() {
                            MessageBox.error("Não foi possível buscar os Participantes.") //Se der erro de API, exibe uma mensagem ao usuário
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
                        var that = this;
                        for(var x=0;x<aLogin.email.length;x++){

                            if(email._sTypedInValue == aLogin.email[x] && senha._sTypedInValue == aLogin.senha[x]){
                                MessageBox.success("Login efetuado com sucesso!", {
                                    onClose: function () {
                                        that.getRouter().navTo("InstituicoesConsulta");
                                    }
                                });
                            }

                            else if(x == aLogin.email.length-1){
                                MessageBox.error("Login ou senha inválidos");
                                return;
                            }
                            
                        }
                        

                    });
                }

                

            }
		});
	});