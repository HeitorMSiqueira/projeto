/*******************************************************************************
 ****************************** SISTEMA  ***************************************
 * 
 * FUNCIONALIDADES GLOBAIS.JS
 * 
 * 
 * 
 ******************************************************************************/

$(document).ready(function () {


    formatarData();

})

function formatarData() {

    // inputs que tenham como classe o nome datepicker � automaticamente
    // tranformado pelo plugin de escolha de data
    $('.datepicker').datepicker({
        format: "dd/mm/yyyy",
        todayBtn: "linked",
        clearBtn: true,
        language: "pt-BR",
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true,
        beforeShowDay: function (date) {

        }
    });

    
}

// exibe mensagem em tela utilizando o plugin PNotify
function mensagem(titulo, mensagem, tipo) {

    PNotify.prototype.options.styling = "brighttheme";
    new PNotify({
        title: titulo,
        text: mensagem,
        type: tipo
    });
}


/******************************************************************************/
// em cada programa por padr�o � criado um array com as informa��es
// do programa, como modulo, versao, codigo do programa, versao e release
// gerando o codigo de execu��o o mesmo � utilizado para gerar log
// em todas as fun��es consideradas importantes, o c�digo da execu��o que
// ser� enviado por par�metro para gerar log � global sob o nome _codExecucao

var _codExecucao = false;

function getCodExecucao(codPrograma, observacao) {

    $.ajax({
        url: "index.php?m=base&c=basecontroller&f=getCodExecucao",
        data: {
            codPrograma: codPrograma,
            observacao: observacao
        },
        type: "POST",
        dataType: "json",
        async: true,
        cache: false,
        success: function (retorno) {
            if (retorno != false) {
                _codExecucao = retorno
            }
        }
    });
}


/******************************************************************************/

/*******************************************************************************/

function bloquearTela(mensagem) {

    if (mensagem == undefined || mensagem == null) {
        mensagem = 'Processando, aguarde...';
    }

    $.blockUI({
        css: {backgroundColor: '#FFFFFF',
            border: '0px',
            baseZ: 99999
        },
        overlayCSS: {
            backgroundColor: 'gray',
            opacity: 0.7},
            message: '<div style="padding: 15px;border: 2px solid grey">\n\
                        <img width="64px" src="resources/geral/images/loading.gif" />\n\
                        <label style="font-size: 16px; padding-left: 10px;" id="__mensagem_bloqueio"><h3>' + mensagem + '</h3></label>\n\
                      </div>'
    });

}

function desbloquearTela() {
    $.unblockUI();
}

/******************************************************************************/

