sap.ui.define([
		"./BaseController"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (BaseController) {
		"use strict";

		return BaseController.extend("desafiobridge.desafiobridge.controller.Menu", {
			onInit: function () {

            },
            // Função do botão de "Cadastro de empresas"
            onNavEmpresasCadastro: function(){
                this.getRouter().navTo("EmpresasCadastro");
            },
            // Função do botão de "Consulta de Vagas"
            onNavVagasConsulta: function(){
                this.getRouter().navTo("VagasConsulta");
            },
            
            // Função do botão de "Cadastro de vagas"
            onNavVagasCadastro: function(){
                this.getRouter().navTo("VagasCadastro");
            },

            // Função do botão de "Consulta de Empresas"
            onNavEmpresasConsulta: function(){
                this.getRouter().navTo("EmpresasConsulta");
            },

            onNavParticipanteCadastro: function(){
                console.log("partici");
                this.getRouter().navTo("ParticipanteCadastro");
             },
            
            // Função do botão de "Cadastro de instituições"
            onNavInstituicoesCadastro: function(){
                console.log("Insti");
                this.getRouter().navTo("InstituicoesCadastro");
            },
            onNavParticipantesConsulta: function(){
                this.getRouter().navTo("ParticipantesConsulta");
            },           
            // Função do botão de "Consulta de Instituicoes"
            onNavInstituicoesConsulta: function(){
                this.getRouter().navTo("InstituicoesConsulta");
            },
            onNavVagasParticipantes: function(){
                this.getRouter().navTo("VagasParticipantes");
            }
		});
	});
