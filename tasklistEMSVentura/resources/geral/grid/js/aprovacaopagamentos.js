/*
 * 
 * FLUXO APROVAÇÃO PAGAMENTOS
 * 
 * SIG SULCATARINENSE
 * MATHEUS FRANCISCO JASCHKE
 * FEVEREIRO 2015
 */

var cache = {};
var lastXhr;
var global_numNf = 0;

var APE_global_totalUn = 0;
var APE_global_totalSelecionado = 0;


function abrirDialogAprovacaoPagamentos(numFluxo) {
    
    // montaHtmlAprovacaoPagamentos(numFluxo);
    
    
    geral();

    $("#dialog").dialog({
        width: (document.body.clientWidth / 100) * 90,
        height: (document.body.clientHeight / 100) * 90,
        resizable: true,
        modal: true,
        open: function(event, ui)
        {

        },
        buttons: {
            "Aprovar": function() {
                dialogMensagemApeAprovar(numFluxo);
            },
            "Cancelar": function() {
                dialogMensagemApeCancelar(numFluxo);
            },
            "Retornar": function() {
                dialogMensagemApeRetornar(numFluxo);
            },
            "Direcionar": function() {
                dialogMensagemApeDirecionar(numFluxo);
            },
            "Fechar": function() {
                $(this).dialog("close");
            }
        }
    });

    $('.ui-dialog-buttonpane button:nth-child(1)').mouseover(function() {
        mensagem('', 'Aprova e da andamento ao fluxo', 'r', 'i', 2000, 1);
    });
    $('.ui-dialog-buttonpane button:nth-child(2)').mouseover(function() {
        mensagem('', 'Cancela o fluxo', 'r', 'i', 2000, 1);
    });
    $('.ui-dialog-buttonpane button:nth-child(3)').mouseover(function() {
        mensagem('', 'Retorna o fluxo para o estágio imediatamente anterior', 'r', 'i', 2000, 1);
    });
    $('.ui-dialog-buttonpane button:nth-child(4)').mouseover(function() {
        mensagem('', "Direciona o fluxo com todas as OC's atreladas à um determinado aprovador", 'r', 'i', 2000, 1);
    });
    $('.ui-dialog-buttonpane button:nth-child(5)').mouseover(function() {
        mensagem('', "Fechar", 'r', 'i', 2000, 1);
    });

    // INSERE ANTES DO PRIMEIRO BOTÃO O HTML ABAIXO :D
    $(".ui-dialog-buttonpane button:nth-child(1)").before('<div style="float: left;margin-top: 6px;" align="center" id="APE_rodape"></div>  ');

}

function montaHtmlAprovacaoPagamentos(numFluxo) {

    setTimeout(function() {
        $("#__mensagem_bloqueio").hide();
        document.getElementById('__mensagem_bloqueio').innerHTML = "Processando, aguarde...<br /> esta operação pode demorar caso você tenha muitas AP's para analisar";
        $("#__mensagem_bloqueio").show('slow');
    }, 2000);

    setTimeout(function() {
        $("#__mensagem_bloqueio").hide();
        document.getElementById('__mensagem_bloqueio').innerHTML = "Processando, aguarde...<br /> sua lista de pendências possui muitos itens para análise, aguarde mais um momento";
        $("#__mensagem_bloqueio").show('slow');
    }, 8000);

    setTimeout(function() {
        $("#__mensagem_bloqueio").hide();
        document.getElementById('__mensagem_bloqueio').innerHTML = "Processando, aguarde...<br /> esta operação pode demorar caso você tenha muitas AP,s para analisar";
        $("#__mensagem_bloqueio").show('slow');
    }, 20000);

    setTimeout(function() {
        $("#__mensagem_bloqueio").hide();
        document.getElementById('__mensagem_bloqueio').innerHTML = "Processando, aguarde...<br /> sua lista de pendências possui muitos itens para análise, aguarde mais um momento";
        $("#__mensagem_bloqueio").show('slow');
    }, 35000);

    setTimeout(function() {
        $("#__mensagem_bloqueio").hide();
        document.getElementById('__mensagem_bloqueio').innerHTML = "Processando, aguarde...<br />";
        $("#__mensagem_bloqueio").show('slow');
    }, 60000);

    $.ajax({
        url: 'index.php?m=workflow&c=aprovacaopagamentoscontroller&f=montaHtmlAprovacaoPagamentos',
        data: {
            idFluxo: numFluxo
        },
        type: 'POST',
        dataType: 'json',
        async: true,
        success: function(html) {
            document.getElementById('dialog').innerHTML = html;
            desbloqueiaTela();

            APE_global_totalSelecionado = 0;
            APE_global_totalUn = 0;

            //APE_checkAll();
        },
        error: function(e) {
            desbloqueiaTela();
        }
    });
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
}

function APE_processaRodape(numOc) {

    var valSelecionado = document.getElementById('check_input-' + numOc).value;
    valSelecionado = parseFloat(valSelecionado.replace(',', '.'));

    if (document.getElementById('check-' + numOc).checked) {
        APE_global_totalSelecionado += valSelecionado;
    } else {
        APE_global_totalSelecionado -= valSelecionado;
    }

    if (APE_global_totalSelecionado < 0) {
        APE_global_totalSelecionado = APE_global_totalSelecionado * -1;
    }

    APE_global_totalUn = 0;
    var lista = document.getElementsByClassName('check_input');
    for (var i = 0; i < lista.length; i++) {
        APE_global_totalUn += parseFloat(lista[i].value.replace(',', '.'));
    }

    var valorTotal = converterParaValorReal(parseFloat(APE_global_totalUn));
    var valorSelecionado = converterParaValorReal(parseFloat(APE_global_totalSelecionado));

    var cor = 'green';

    var diferenca = parseFloat(APE_global_totalUn) - parseFloat(APE_global_totalSelecionado);
    if (diferenca < 0) {
        cor = 'red';
    }

    diferenca = converterParaValorReal(diferenca);

    document.getElementById('APE_rodape').innerHTML = '<div style="background-color: #eee8c3; cursor: pointer; color: black; font-size: 12px;" class="awesome-text-box">' +
            "<b>TOTAL U.N.:</b> R$ " + valorTotal + "  |  <b>TOTAL SELECIONADO:</b> R$ " + valorSelecionado + "  |  <b>DIFERENÇA TOTAL:</b> <span style='color: " + cor + "'>R$ " + diferenca + "</span>" +
            '</div>';

}


function APE_checkAll(numPedido) {

    // utilizado para agrupar todas as OC's de um pedido, esse mecanismo
    // simula o click em todas as ocs do pedido parametrizado

    // #1 recupera uma lista com todas as OCs deste pedido
    var lista = document.getElementsByClassName('check_input-' + numPedido);

    var checagemPedido = document.getElementById('APE_check_pedido-' + numPedido).checked;

    for (var i = 0; i < lista.length; i++) {

        var oc = lista[i].id.split('-')[1];

        if (document.getElementById('check-' + oc).checked) {
            document.getElementById('check-' + oc).checked = false;
        } else {
            document.getElementById('check-' + oc).checked = true;
        }
        APE_processaRodape(oc);
    }

}

function APE_checkAll2(numPedido) {

    //return false;

    $(".check_input_pedido-" + numPedido).prop("checked", true);

    var lista = document.getElementsByClassName('check_input-' + numPedido);

    var v = 0;

    for (var i = 0; i < lista.length; i++) {
        v += parseFloat(lista[i].value);
    }

    APE_global_totalSelecionado = v;
    APE_global_totalUn = v;

    var cor = 'black';

    var diferenca = converterParaValorReal(parseFloat(APE_global_totalUn) - parseFloat(APE_global_totalSelecionado));
    if (diferenca < 0) {
        cor = 'red';
    }

    var totalUn = converterParaValorReal(APE_global_totalUn);
    var totalSelecionado = converterParaValorReal(APE_global_totalSelecionado);

    document.getElementById('APE_rodape').innerHTML = '<div style="background-color: #eee8c3; cursor: pointer; color: black; font-size: 12px;" class="awesome-text-box">' +
            "<b>TOTAL U.N.:</b> R$ " + totalUn + "  |  <b>TOTAL SELECIONADO:</b> R$ " + totalSelecionado + "  |  <b>DIFERENÇA TOTAL:</b> <span style='color: " + cor + "'>R$ " + diferenca + "</span>" +
            '</div>';
}

function dialogMensagemApeAprovar(numFluxo) {

    document.getElementById('txtApe').value = "";
    document.getElementById('msgApe').innerHTML = "<h3>Observação</h3>";
    $("#dialogApeMensagem").attr('title', 'Aprovação Eletrônica');
    $("#dialogApeMensagem").dialog({
        width: 280,
        height: 320,
        resizable: false,
        modal: true,
        show: {
            effect: "drop",
            duration: 150
        },
        hide: {
            effect: "drop",
            duration: 150
        },
        open: function(event, ui)
        {

        },
        buttons: {
            "Aprovar": function() {
                //hasAssinaturaCadastrada();
                bloqueiaTela("Aprovando OC's, aguarde...");
                if (aprovaFluxoApe(numFluxo)) {


                } else {
                    desbloqueiaTela();
                    $(this).dialog("close");
                }
            },
            "Fechar": function() {
                $(this).dialog("close");
            }
        }
    });
}

function aprovaFluxoApe(numFluxo) {

    var arrOc = new Array();
    var listaOc = document.getElementsByClassName('check');
    for (var i = 0; i < listaOc.length; i++) {

        var id = listaOc[i].id;
        if (document.getElementById(id).checked) {
            arrOc.push(id.split('-')[1]);
        }
    }

    if (arrOc.length == 0) {
        desbloqueiaTela();
        mensagem('', "Selecione pelo menos uma OC para aprova-la", 'r', 'i', 2000, 1);
        return false;
    }

    
    $.ajax({
        url: 'index.php?m=workflow&c=aprovacaoeletronicacontroller&f=aprovaFluxoApe',
        data: {
            idFluxo: numFluxo,
            arrOc: JSON.stringify(arrOc),
            msg: document.getElementById('txtApe').value
        },
        type: 'POST',
        dataType: 'json',
        async: true,
        success: function(r) {
            if (r == true || r == 'true') {
                desbloqueiaTela();
                mensagem('', "OC's aprovadas", 'r', 's', 2000, 1);
                $("#dialogApeMensagem").dialog("close");
                $("#dialog").dialog("close");
                $("#grid").trigger("reloadGrid");
            } else {
                $("#dialogApeMensagem").dialog("close");
                $("#dialog").dialog("close");
                $("#grid").trigger("reloadGrid");
                desbloqueiaTela();
                mensagem('Atenção', r, 'r', 'e', 2000, 1);
            }
        },
        error: function(e) {
            $("#dialogApeMensagem").dialog("close");
            $("#dialog").dialog("close");
            $("#grid").trigger("reloadGrid");
            desbloqueiaTela();
            mensagem('Atenção', "Houve um problema ao aprovar as OC's, favor entrar em contato coma  equipe de suporte", 'r', 'e', 2000, 1);
        }
    });
}

function dialogMensagemApeRetornar(numFluxo) {

    document.getElementById('txtApe').value = "";
    document.getElementById('msgApe').innerHTML = "<h3>Observação obrigatória</h3>";
    $("#dialogApeMensagem").attr('title', 'Retorno do Fluxo de Aprovação Eletrônica');
    $("#dialogApeMensagem").dialog({
        width: 280,
        height: 350,
        resizable: false,
        modal: true,
        show: {
            effect: "drop",
            duration: 150
        },
        hide: {
            effect: "drop",
            duration: 150
        },
        open: function(event, ui)
        {

        },
        buttons: {
            "Retornar": function() {

                if (document.getElementById('txtApe').value == "") {
                    mensagem('Atenção', 'Favor inserir uma observação para retornar o fluxo', 'r', 'w', 2000, 1);

                } else {
                    if (retornaFluxoApe(numFluxo)) {
                    }
                }

            },
            "Fechar": function() {
                $(this).dialog("close");
            }
        }
    });
}

function dialogMensagemApeDirecionar(numFluxo) {

    document.getElementById('txtApe2').value = "";
    $.ajax({
        url: 'index.php?m=workflow&c=aprovacaoeletronicacontroller&f=getListaUsuarios',
        data: {
            numFluxo: numFluxo
        },
        type: 'POST',
        dataType: 'json',
        async: false,
        success: function(itens) {
            document.getElementById('listaUsuarioApe').innerHTML = itens;
        },
        error: function(e) {
            mensagem('Atenção', 'Houve um problema ao direcionar o processo, favor entrar em contato com a equipe de suporte', 'r', 'e', 2000, 1);
        }
    });
    $("#dialogApeDirecionamento").dialog({
        width: 350,
        height: 390,
        resizable: false,
        modal: true,
        show: {
            effect: "drop",
            duration: 150
        },
        hide: {
            effect: "drop",
            duration: 150
        },
        open: function(event, ui)
        {

        },
        buttons: {
            "Direcionar Processo": function() {
                if (APE_validaDirecionamento()) {
                    direcionarFluxoApe(numFluxo);
                }
            },
            "Fechar": function() {
                $(this).dialog("close");
            }
        }
    });
}



function direcionarFluxoApe(numFluxo) {

    var retorno = false;
    var msg = document.getElementById('txtApe2').value;
    var tipoRetorno = document.getElementById('tipoRetornoApe').value;
    var usuario = document.getElementById('listaUsuarioApe').value;
    $.ajax({
        url: 'index.php?m=workflow&c=aprovacaoeletronicacontroller&f=direcionarFluxoApe',
        data: {
            numFluxo: numFluxo,
            msg: msg,
            tipoRetorno: tipoRetorno,
            usuario: usuario
        },
        type: 'POST',
        dataType: 'json',
        async: false,
        success: function(sucesso) {
            if (sucesso != false) {
                mensagem('', 'Processo Direcionado', 'r', 's', 2000, 1);
                $("#dialogApeMensagem").dialog("close");
                $("#dialog").dialog("close");
                $("#grid").trigger("reloadGrid");
                retorno = true;
            } else {
                mensagem('Atenção', sucesso, 'r', 'w', 2000, 1);
            }
        },
        error: function(e) {
            $("#dialogApeMensagem").dialog("close");
            $("#dialog").dialog("close");
            $("#grid").trigger("reloadGrid");
            mensagem('Atenção', 'Houve um problema ao direcionar o processo, favor entrar em contato com a equipe de suporte', 'r', 'e', 2000, 1);
        }
    });
    return retorno;
}


function APE_validaDirecionamento() {

    var obs = document.getElementById('txtApe2').value;
    var usuario = document.getElementById('listaUsuarioApe').value;
    var tipoRetorno = document.getElementById('tipoRetornoApe').value;
    if (obs == "") {
        mensagem('Atenção', 'Favor inserir uma observação para direcionar o processo', 'r', 'w', 2000, 1);
        return false;
    }

    if (usuario == 0) {
        mensagem('Atenção', 'Favor selecionar um usuário para direcionar o processo', 'r', 'w', 2000, 1);
        return false;
    }

    if (tipoRetorno == 0) {
        mensagem('Atenção', 'Favor selecionar um tipo de retorno para direcionar o processo', 'r', 'w', 2000, 1);
        return false;
    }

    return true;
}

function retornaFluxoApe(numFluxo) {

    var arrOc = new Array();
    var listaOc = document.getElementsByClassName('check');
    for (var i = 0; i < listaOc.length; i++) {

        var id = listaOc[i].id;
        if (document.getElementById(id).checked) {
            arrOc.push(id.split('-')[1]);
        }
    }

    if (arrOc.length == 0) {
        mensagem('', "Selecione pelo menos uma OC para retorna-la", 'r', 'i', 2000, 1);
        return false;
    }

    bloqueiaTela("Retornando OC's, aguarde...");
    $.ajax({
        url: 'index.php?m=workflow&c=aprovacaoeletronicacontroller&f=retornaFluxoApe',
        data: {
            idFluxo: numFluxo,
            arrOc: JSON.stringify(arrOc),
            msg: document.getElementById('txtApe').value
        },
        type: 'POST',
        dataType: 'json',
        async: true,
        success: function(r) {
            if (r == true || r == 'true') {
                desbloqueiaTela();
                mensagem('', "OC's retornadas", 'r', 's', 2000, 1);
                $("#dialogApeMensagem").dialog("close");
                $("#dialog").dialog("close");
                $("#grid").trigger("reloadGrid");

            } else {
                $("#dialogApeMensagem").dialog("close");
                $("#dialog").dialog("close");
                $("#grid").trigger("reloadGrid");
                desbloqueiaTela();
                mensagem('Atenção', r, 'r', 'e', 2000, 1);
            }
        },
        error: function(e) {
            $("#dialogApeMensagem").dialog("close");
            $("#dialog").dialog("close");
            $("#grid").trigger("reloadGrid");
            desbloqueiaTela();
            mensagem('Atenção', "Houve um problema ao retornar as OC's, favor entrar em contato coma  equipe de suporte", 'r', 'e', 2000, 1);
        }
    });

}

function dialogMensagemApeCancelar(numFluxo) {

    document.getElementById('txtApe').value = "";
	
    document.getElementById('msgApe').innerHTML = "<h3>Observação obrigatória</h3>";
    $("#dialogApeMensagem").attr('title', 'Cancelamento de Fluxo de Aprovação Eletrônica');
    $("#dialogApeMensagem").dialog({
        width: 280,
        height: 350,
        resizable: false,
        modal: true,
        show: {
            effect: "drop",
            duration: 150
        },
        hide: {
            effect: "drop",
            duration: 150
        },
        open: function(event, ui)
        {

        },
        buttons: {
            "Cancelar": function() {
					
                if (document.getElementById('txtApe').value == "") {
                    mensagem('Atenção', 'Favor inserir uma observação para cancelar o(s) fluxo(s)', 'r', 'w', 2000, 1);

                } else {
                    if (cancelaFluxoApe(numFluxo)) {
                        
                    }
                }

            },
            "Fechar": function() {
                $(this).dialog("close");
            }
        }
    });
}

function cancelaFluxoApe(numFluxo) {

    var arrOc = new Array();
    var listaOc = document.getElementsByClassName('check');
    for (var i = 0; i < listaOc.length; i++) {

        var id = listaOc[i].id;
        if (document.getElementById(id).checked) {
            arrOc.push(id.split('-')[1]);
        }
    }

    if (arrOc.length == 0) {
        mensagem('', "Selecione pelo menos uma OC para cancelá-la", 'r', 'i', 2000, 1);
        return false;
    }

    bloqueiaTela("Cancelando OC's, aguarde...");
    $.ajax({
        url: 'index.php?m=workflow&c=aprovacaoeletronicacontroller&f=cancelaFluxoApe',
        data: {
            idFluxo: numFluxo,
            arrOc: JSON.stringify(arrOc),
            msg: document.getElementById('txtApe').value
        },
        type: 'POST',
        dataType: 'json',
        async: true,
        success: function(r) {
            if (r == true || r == 'true') {
                desbloqueiaTela();
                mensagem('', "OC's canceladas", 'r', 's', 2000, 1);
                $("#dialogApeMensagem").dialog("close");
                $("#dialog").dialog("close");
                $("#grid").trigger("reloadGrid");

            } else {
                $("#dialogApeMensagem").dialog("close");
                $("#dialog").dialog("close");
                $("#grid").trigger("reloadGrid");
                desbloqueiaTela();
                mensagem('Atenção', r, 'r', 'e', 2000, 1);
            }
        },
        error: function(e) {
            $("#dialogApeMensagem").dialog("close");
                $("#dialog").dialog("close");
                $("#grid").trigger("reloadGrid");
            desbloqueiaTela();
            mensagem('Atenção', "Houve um problema ao cancelar as OC's, favor entrar em contato coma  equipe de suporte", 'r', 'e', 2000, 1);
        }
    });

}

function converterParaValorReal(num) {

    var p = num.toFixed(2).split(".");
    return "" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return  num + (i && !(i % 3) ? "." : "") + acc;
    }, "") + "," + p[1];
}

function APE_exibirTextOc(numOc) {

    bloqueiaTela("Processando, aguarde...");

    document.getElementById('dialogApeTextosOC').innerHTML = "";

    $("#dialogApeTextosOC").dialog({
        width: 500,
        height: 350,
        resizable: false,
        modal: true,
        show: {
            effect: "drop",
            duration: 150
        },
        hide: {
            effect: "drop",
            duration: 150
        },
        open: function(event, ui)
        {

        },
        buttons: {
            "Fechar": function() {
                $(this).dialog("close");
            }
        }
    });

    $.ajax({
        url: 'index.php?m=workflow&c=aprovacaoeletronicacontroller&f=exibirTextOc',
        data: {
            numOc: numOc
        },
        type: 'POST',
        dataType: 'json',
        async: true,
        success: function(data) {
            if (data != false) {
                desbloqueiaTela();
                document.getElementById('dialogApeTextosOC').innerHTML = data;

            } else {
                desbloqueiaTela();
                mensagem('Atenção', "Houve um problema ao consultar os textos desta OC, favor entrar em contato coma  equipe de suporte", 'i', 'e', 2000, 1);
            }
        },
        error: function(e) {
            desbloqueiaTela();
            mensagem('Atenção', "Houve um problema ao consultar os textos desta OC, favor entrar em contato coma  equipe de suporte", 'r', 'e', 2000, 1);
        }
    });
}

function APE_exibirCotacoes(numPedido) {

    bloqueiaTela("Processando, aguarde...");

    document.getElementById('dialogApeCotacoes').innerHTML = "";

    $("#dialogApeCotacoes").dialog({
        width: 1080,
        height: 500,
        resizable: true,
        modal: true,
        show: {
            effect: "drop",
            duration: 150
        },
        hide: {
            effect: "drop",
            duration: 150
        },
        open: function(event, ui)
        {

        },
        buttons: {
            "Fechar": function() {
                $(this).dialog("close");
            }
        }
    });

    $.ajax({
        url: 'index.php?m=workflow&c=aprovacaoeletronicacontroller&f=exibirCotacoes',
        data: {
            numPedido: numPedido
        },
        type: 'POST',
        dataType: 'json',
        async: true,
        success: function(data) {
            if (data != false) {
                desbloqueiaTela();
                document.getElementById('dialogApeCotacoes').innerHTML = data;

            } else {
                desbloqueiaTela();
                mensagem('Atenção', "Houve um problema ao consultar as cotações deste pedido, favor entrar em contato coma  equipe de suporte", 'i', 'e', 2000, 1);
            }
        },
        error: function(e) {
            desbloqueiaTela();
            mensagem('Atenção', "Houve um problema ao consultar as cotações deste pedido, favor entrar em contato coma  equipe de suporte", 'r', 'e', 2000, 1);
        }
    });
}

function APE_exibirHistorico(numOc) {

    bloqueiaTela("Processando, aguarde...");

    document.getElementById('dialogApeHistorico').innerHTML = "";

    $("#dialogApeHistorico").dialog({
        width: 1000,
        height: 550,
        resizable: false,
        modal: true,
        show: {
            effect: "drop",
            duration: 150
        },
        hide: {
            effect: "drop",
            duration: 150
        },
        open: function(event, ui)
        {

        },
        buttons: {
            "Fechar": function() {
                $(this).dialog("close");
            }
        }
    });

    $.ajax({
        url: 'index.php?m=workflow&c=aprovacaoeletronicacontroller&f=exibirHistorico',
        data: {
            numOc: numOc
        },
        type: 'POST',
        dataType: 'json',
        async: true,
        success: function(data) {
            if (data != false) {
                desbloqueiaTela();
                document.getElementById('dialogApeHistorico').innerHTML = data;

            } else {
                desbloqueiaTela();
                mensagem('Atenção', "Houve um problema ao consultar o histórico desta OC, favor entrar em contato coma  equipe de suporte", 'i', 'e', 2000, 1);
            }
        },
        error: function(e) {
            desbloqueiaTela();
            mensagem('Atenção', "Houve um problema ao consultar o histórico desta OC, favor entrar em contato coma  equipe de suporte", 'r', 'e', 2000, 1);
        }
    });
}

// NOTIFICAÇÃO

function mensagem(titulo, mensagem, orientacao, tipoMensagem, overlay, opacidade) {


    if (titulo != "") {
        mensagem = "<div style='font-size: 15px;' align='center'><b>" + titulo + "</b></div><br /><p align='center'>" + mensagem + "</p>";
    }

    var o = 'right';
    switch (orientacao) {
        case 'r':
            o = 'right';
            break;
        case 'l':
            o = 'left';
            break;
        case 't':
            o = 'top';
            break;
        case 'b':
            o = 'bottom';
            break;
        default:
            o = 'right';
            break;
    }

    var w = 'info';
    switch (tipoMensagem) {
        case 'i':
            w = 'info';
            break;
        case 'e':
            w = 'error';
            break;
        case 'w':
            w = 'warning';
            break;
        case 's':
            w = 'success';
            break;
        default:
            w = 'info';
            break;
    }

    notif({
        type: w,
        msg: mensagem,
        position: o,
        opacity: opacidade,
        multiline: true,
        time: overlay
    });
}

// PESQUISA

function abrirDialogDetalhamentoAprovacaoEletronica(numFluxo) {

    montaHtmlDetalhamentoAprovacaoEletronica(numFluxo);

    $("#dialog").dialog({
        width: (document.body.clientWidth / 100) * 90,
        height: (document.body.clientHeight / 100) * 90,
        resizable: true,
        modal: true,
        open: function(event, ui)
        {

        },
        buttons: {
            "Fechar": function() {
                $(this).dialog("close");
            }
        }
    });

    $('.ui-dialog-buttonpane button:nth-child(1)').mouseover(function() {
        mensagem('', 'Aprova e da andamento ao fluxo', 'r', 'i', 2000, 1);
    });
    $('.ui-dialog-buttonpane button:nth-child(2)').mouseover(function() {
        mensagem('', 'Cancela o fluxo', 'r', 'i', 2000, 1);
    });
    $('.ui-dialog-buttonpane button:nth-child(3)').mouseover(function() {
        mensagem('', 'Retorna o fluxo para o estágio imediatamente anterior', 'r', 'i', 2000, 1);
    });
    $('.ui-dialog-buttonpane button:nth-child(4)').mouseover(function() {
        mensagem('', "Direciona o fluxo com todas as OC's atreladas à um determinado aprovador", 'r', 'i', 2000, 1);
    });
    $('.ui-dialog-buttonpane button:nth-child(5)').mouseover(function() {
        mensagem('', "Fechar", 'r', 'i', 2000, 1);
    });


}

function montaHtmlDetalhamentoAprovacaoEletronica(numFluxo) {

    bloqueiaTela();

    document.getElementById('dialog').innerHTML = '';

    $.ajax({
        url: 'index.php?m=workflow&c=aprovacaoeletronicacontroller&f=montaHtmlDetalhamentoAprovacaoEletronica',
        data: {
            idFluxo: numFluxo
        },
        type: 'POST',
        dataType: 'json',
        async: true,
        success: function(html) {
            document.getElementById('dialog').innerHTML = html;
            $('#dialog').find(':checkbox').each(function() {

                jQuery(this).css('display', 'none');

            });
            desbloqueiaTela();
        },
        error: function(e) {
            desbloqueiaTela();
        }
    });



    setTimeout(function() {
        $("#__mensagem_bloqueio").hide();
        document.getElementById('__mensagem_bloqueio').innerHTML = "Processando, aguarde...<br /> esta operação pode demorar caso você tenha muitas OC's para analisar";
        $("#__mensagem_bloqueio").show('slow');
    }, 2000);

    setTimeout(function() {
        $("#__mensagem_bloqueio").hide();
        document.getElementById('__mensagem_bloqueio').innerHTML = "Processando, aguarde...<br /> sua lista de pendências possui muitos itens para análise, aguarde mais um momento";
        $("#__mensagem_bloqueio").show('slow');
    }, 8000);

    setTimeout(function() {
        $("#__mensagem_bloqueio").hide();
        document.getElementById('__mensagem_bloqueio').innerHTML = "Processando, aguarde...<br /> esta operação pode demorar caso você tenha muitas OC's para analisar";
        $("#__mensagem_bloqueio").show('slow');
    }, 20000);

    setTimeout(function() {
        $("#__mensagem_bloqueio").hide();
        document.getElementById('__mensagem_bloqueio').innerHTML = "Processando, aguarde...<br /> sua lista de pendências possui muitos itens para análise, aguarde mais um momento";
        $("#__mensagem_bloqueio").show('slow');
    }, 35000);

    setTimeout(function() {
        $("#__mensagem_bloqueio").hide();
        document.getElementById('__mensagem_bloqueio').innerHTML = "Processando, aguarde...<br /> quase lá";
        $("#__mensagem_bloqueio").show('slow');
    }, 60000);
}




////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////




function geral(){
    
    
     carregarGrid1();
    carregarGrid2();
    carregarGrid3();
    carregarGrid4();
    carregarGrid5();
    getValorTotalGrid1();
    
    
    
}

function carregarGrid1() {
    
    
 
    var url = 'index.php?m=aprovacaopagamentos&c=aprovacaopagamentos&f=getGrid1&data=' + document.getElementById('dataProposta').value;
    $("#grid1").GridUnload();
    $("#grid1").jqGrid({
        ajaxGridOptions: {cache: false},
        datatype: "json",
        width: $(document).width() - 1,
        height: 200,
        cache: false,
        url: url,
        colNames: ["Apro", "Ap", "Cnpj", "Fornencedor", "NF", "Vencto", "Observação", "Valor"],
        colModel: [
            {name: 'APRO', index: 'APRO', width: 1, align: 'center'},
            {name: 'AP', index: 'AP', width: 1, align: 'center'},
            {name: 'CNPJ', index: 'CNPJ', width: 2, align: 'center'},
            {name: 'FORNECEDOR', index: 'FORNECEDOR', width: 2, align: 'center'},
            {name: 'NF', index: 'NF', width: 1, align: 'center'},
            {name: 'VENCTO', index: 'VENCTO', width: 2, align: 'center'},
            {name: 'OBSERVACAO', index: 'OBSERVACAO', width: 2, align: 'center'},
            {name: 'VALOR', index: 'VALOR', width: 2, align: 'center'},
        ],
        rowNum: 9999,
        pager: '#pager1',
        sortname: 'UN',
        viewrecords: true,
        sortorder: "DESC",
        caption: "",
        footerrow: true,
        userDataOnFooter: false,
        onSelectRow: function(id) {
            var rowData = $("#grid1").jqGrid('getRowData', id);
        },
        gridComplete: function() {

        }, GridUnload: function() {
            jQuery("#grid1").jqGrid({
            ajaxGridOptions: {cache: false}
            });
        },
        loadComplete: function() {
            
            alert("load");


        }
    });
    $("#grid1").trigger("reloadGrid");
    
  
  
}

function carregarGrid2() {
 
    var url = 'index.php?m=aprovacaopagamentos&c=aprovacaopagamentos&f=getGrid2&data=' + document.getElementById('dataProposta').value;
    $("#grid2").GridUnload();
    $("#grid2").jqGrid({
        ajaxGridOptions: {cache: false},
        datatype: "json",
        width: $(document).width() - 1,
        height: 200,
        cache: false,
        url: url,
        colNames: ["Apro", "Ap", "Cnpj", "Fornencedor", "NF", "Vencto", "Observação", "Valor"],
        colModel: [
            {name: 'APRO', index: 'APRO', width: 1, align: 'center'},
            {name: 'AP', index: 'AP', width: 1, align: 'center'},
            {name: 'CNPJ', index: 'CNPJ', width: 2, align: 'center'},
            {name: 'FORNECEDOR', index: 'FORNECEDOR', width: 2, align: 'center'},
            {name: 'NF', index: 'NF', width: 1, align: 'center'},
            {name: 'VENCTO', index: 'VENCTO', width: 2, align: 'center'},
            {name: 'OBSERVACAO', index: 'OBSERVACAO', width: 2, align: 'center'},
            {name: 'VALOR', index: 'VALOR', width: 2, align: 'center'},
        ],
        rowNum: 9999,
        pager: '#pager2',
        sortname: 'UN',
        viewrecords: true,
        sortorder: "DESC",
        caption: "",
        onSelectRow: function(id) {
            var rowData = $("#grid2").jqGrid('getRowData', id);
        },
        gridComplete: function() {

        }, GridUnload: function() {
            jQuery("#grid2").jqGrid({
                ajaxGridOptions: {cache: false}
            });
        }
    });
    $("#grid2").trigger("reloadGrid");

}
function carregarGrid3() {
 
    var url = 'index.php?m=aprovacaopagamentos&c=aprovacaopagamentos&f=getGrid2&data=' + document.getElementById('dataProposta').value;
    $("#grid3").GridUnload();
    $("#grid3").jqGrid({
        ajaxGridOptions: {cache: false},
        datatype: "json",
        width: $(document).width() - 1,
        height: 200,
        cache: false,
        url: url,
        colNames: ["UNIDADE", "VALOR", "SELECIONADO", "SALDO",],
        colModel: [
            {name: 'UNIDADE', index: 'UNIDADE', width: 1, align: 'center'},
            {name: 'VALOR', index: 'VALOR', width: 1, align: 'center'},
            {name: 'SELECIONADO', index: 'SELECIONADO', width: 2, align: 'center'},
            {name: 'SALDO', index: 'SALDO', width: 2, align: 'center'}
        ],
        rowNum: 9999,
        pager: '#pager3',
        sortname: 'UN',
        viewrecords: true,
        sortorder: "DESC",
        caption: "",
        onSelectRow: function(id) {
            var rowData = $("#grid3").jqGrid('getRowData', id);
        },
        gridComplete: function() {

        }, GridUnload: function() {
            jQuery("#grid3").jqGrid({
                ajaxGridOptions: {cache: false}
            });
        }
    });
    $("#grid3").trigger("reloadGrid");

}
function carregarGrid4() {
 
    var url = 'index.php?m=aprovacaopagamentos&c=aprovacaopagamentos&f=getGrid2&data=' + document.getElementById('dataProposta').value;
    $("#grid4").GridUnload();
    $("#grid4").jqGrid({
        ajaxGridOptions: {cache: false},
        datatype: "json",
        width: $(document).width() - 1,
        height: 200,
        cache: false,
        url: url,
        colNames: ["BANCO", "SALDO", "SELECIONADO", "SALDO FINAL"],
        colModel: [
            {name: 'BANCO', index: 'BANCO', width: 1, align: 'center'},
            {name: 'SALDO', index: 'SALDO', width: 1, align: 'center'},
            {name: 'SELECIONADO', index: 'SELECIONADO', width: 2, align: 'center'},
            {name: 'SALDO FINAL', index: 'SALDO FINAL', width: 2, align: 'center'}
        ],
        rowNum: 9999,
        pager: '#pager4',
        sortname: 'UN',
        viewrecords: true,
        sortorder: "DESC",
        caption: "",
        onSelectRow: function(id) {
            var rowData = $("#grid4").jqGrid('getRowData', id);
        },
        gridComplete: function() {

        }, GridUnload: function() {
            jQuery("#grid4").jqGrid({
                ajaxGridOptions: {cache: false}
            });
        }
    });
    $("#grid4").trigger("reloadGrid");

}

function carregarGrid5() {
 
    var url = 'index.php?m=aprovacaopagamentos&c=aprovacaopagamentos&f=getGrid2&data=' + document.getElementById('dataProposta').value;
    $("#grid5").GridUnload();
    $("#grid5").jqGrid({
        ajaxGridOptions: {cache: false},
        datatype: "json",
        width: $(document).width() - 1,
        height: 200,
        cache: false,
        url: url,
        colNames: ["", "Ap", "Cnpj", "Fornencedor"],
        colModel: [
            {name: 'TOTAL', index: 'APRO', width: 1, align: 'center'},
            {name: 'AP', index: 'AP', width: 1, align: 'center'},
            {name: 'CNPJ', index: 'CNPJ', width: 2, align: 'center'},
            {name: 'FORNECEDOR', index: 'FORNECEDOR', width: 2, align: 'center'}
           
        ],
        rowNum: 9999,
        pager: '#pager5',
        sortname: 'UN',
        viewrecords: true,
        sortorder: "DESC",
        caption: "",
        onSelectRow: function(id) {
            var rowData = $("#grid5").jqGrid('getRowData', id);
        },
        gridComplete: function() {

        }, GridUnload: function() {
            jQuery("#grid5").jqGrid({
                ajaxGridOptions: {cache: false}
            });
        }
    });
    $("#grid5").trigger("reloadGrid");

}
 function getGrids(){
     
    carregarGrid1();
    carregarGrid2();
    carregarGrid3();
    carregarGrid4();
    carregarGrid5();
    getValorTotalGrid1();
    
    $(window).bind('resize', function() {
        $("#grid1").setGridWidth($(window).width() - 10);
    }).trigger('resize');
    
    $(window).bind('resize', function() {
        $("#grid2").setGridWidth($(window).width() - 10);
    }).trigger('resize');
    
    $(window).bind('resize', function() {
        $("#grid3").setGridWidth(($(window).width() / 3) - 10 );
    }).trigger('resize');
    
    $(window).bind('resize', function() {
        $("#grid4").setGridWidth(($(window).width() / 3) - 10);
    }).trigger('resize');
    
    $(window).bind('resize', function() {
        $("#grid5").setGridWidth(($(window).width()  / 3) - 10);
    }).trigger('resize');
          
     
 }


function getValorTotalGrid1() {
        
    $.ajax({
        url: "index.php?m=aprovacaopagamentos&c=aprovacaopagamentos&f=getValorTotalGrid1",
        data: {
            
        },
        type: "POST",
        dataType: "json",
        async: true,
        success: function(valor) {
          
            var self = $("#grid1");
            var sumDescontadoTotal = valor;

            self.jqGrid("footerData", "set", {
                                          
                
                OBSERVACAO: "Total:",
                VALOR: "R$ " + sumDescontadoTotal.replace(".", ","),
            });  

            desbloqueiaTela();
        },
        error: function() {
            desbloqueiaTela();
        }
    });   

}


function bloqueiaTela(msg) {
    $.blockUI({
        css: {backgroundColor: '#FFFFFF',
            border: '0px'
        },
        overlayCSS: {
            backgroundColor: 'gray',
            opacity: 0.8},
        message: '<img src="resources/sig/img/sulcat.jpg" style="width: 150px;padding-top: 10px;" /><br /><hr><br /><table style="padding: 10px;" class="carregando"><tr><td><img width="60px" src="resources/integracaotelefoniamovel/img/carregando.gif" /></td><td style="font-size: 16px;">' + msg + '</td></tr></table>'
    });
}

function desbloqueiaTela() {
    $.unblockUI();
}
