///////////////////////////////////////////////
// TaskList 	                         	///
//                                      	///
// Desenvolvido por Heitor Manoel Siqueira  ///
//                                      	///   
// Janeiro 2018                          	///
//                                      	///
///////////////////////////////////////////////

$(document).ready(function() {
 
    getGrid(); // carregar Grid ao iniciar
 

});

function novo(){
     
    document.getElementById("titulo").disabled      = false;
    document.getElementById("descricao").disabled   = false;
    document.getElementById("concluir").disabled    = false;
    document.getElementById("prioridade").disabled  = false;
     
    document.getElementById("titulo").value        = "";
    document.getElementById("descricao").value     = "";
    document.getElementById("prioridade").value    = 0;
    
    $('#concluir').prop('checked', false);
    
    $.ajax({
        url: 'index.php?m=tasklist&c=tasklistcontroller&f=novo',
        data: {
            
           
        },
        type: 'POST',
        dataType: 'json',
        async: true,
        success: function(r) {
            
             document.getElementById("id").value  = r;
                 
            
        },
        error: function(e) {
           
        }
    }); 
    
}

function salvar(){
         
    var id                =   $('#id').val();             
    var titulo            =   $('#titulo').val();           
    var descricao         =   $('#descricao').val();
    var prioridade        =   $('#prioridade').val();
       
    var controleDePreenchimento = 'S';
 
    if(id == ""){
        controleDePreenchimento = 'N';
    }
    if(titulo == ""){
        controleDePreenchimento = 'N';
    }
    if(descricao == ""){
        controleDePreenchimento = 'N';
    }
    if(prioridade == 0){
        controleDePreenchimento = 'N';
    }
    
    
    if($("#concluir").is(':checked') == true){
        var concluir = 'S';
    }
    else{
        var concluir = 'N';
    }  
    
    if(controleDePreenchimento ==  'S'){
 
    
        $.ajax({
            url: 'index.php?m=tasklist&c=tasklistcontroller&f=salvar',
            data: {
                id: id,
                titulo: titulo,
                descricao: descricao,
                prioridade: prioridade,
                concluir: concluir
               
            },
            type: 'POST',
            dataType: 'json',
            async: true,
            success: function(data) {

                if (data != false) {

                    mensagem('', 'Salvo com sucesso', 'success');
                    atualizar();

                } else {
                    mensagem('', 'Erro ao salvar', 'error');

                }

            },
            error: function() {

            }
        });
    
    }
    else{
         mensagem('', '(*) Campos Obrigatórios', 'alert');
    }
   
    
    
}

function getGrid() {
    
               
    $('#grid').DataTable({
        "destroy": true,
        ajax: {
            "url": "index.php?m=tasklist&c=tasklistcontroller&f=getGrid",
           
            "type": "POST",
        },
        language: {
            "url": '//cdn.datatables.net/plug-ins/1.10.7/i18n/Portuguese-Brasil.json'
        },
        
        "columns": [
            {"data": "ID"},
            {"data": "TITULO"},
            {"data": "DESCRICAO"},
            {"data": "PRIORIDADE"},
            {"data": "CONCLUIR"},
            {"data": "ACOES"},
           
           
         
        ],
        "order": [
                [3, 'asc']
            ],
        searching: true
    });

    $('#grid')
        .removeClass('display')
        .addClass('table table-hover table-striped table-bordered');
   
   
        
}

function editar(id) {
     
    $.ajax({
        url: 'index.php?m=tasklist&c=tasklistcontroller&f=editar',
        data: {
            id: id
          

        },
        type: 'POST',
        dataType: 'json',
        async: true,
       success: function(r) {
           
            document.getElementById("titulo").disabled      = false;
            document.getElementById("descricao").disabled   = false;
            document.getElementById("concluir").disabled    = false;
            document.getElementById("prioridade").disabled  = false;
                        
            document.getElementById("id").value              = id;
            document.getElementById("titulo").value          = r[0];
            document.getElementById("descricao").value       = r[1];
            document.getElementById("prioridade").value      = r[2];
            
            
            if(r[3] == 'S' ){
                  $('#concluir').prop('checked', true);
            }
            else{
                 $('#concluir').prop('checked', false);
                
            }
                    
                     
        },
        error: function() {

        }
    });    
   
    
   
}

function excluirConfirmar(){
    
    var id  =   $('#id').val();             
   
    if(id == ""){
        mensagem('', 'Selecione um Item', 'alert'); 
    }else{
       $('#excluirModal').modal('show');
    }
    
    
    
}

function excluir(){
    
    var id  =   $('#id').val();
    
    $.ajax({
        url: 'index.php?m=tasklist&c=tasklistcontroller&f=excluir',
        data: {
            id: id
           
        },
        type: 'POST',
        dataType: 'json',
        async: true,
        success: function(r) {
            
            if (r == true) {
                  $('#excluirModal').modal('hide');  
                  mensagem('', 'Excluído com Sucesso', 'success');
                  atualizar();
            }    
            else {
                  $('#excluirModal').modal('hide');
                  mensagem('', 'Erro ao Excluir', 'error'); 
                  atualizar();
            }
                 
            
        },
        error: function(e) {
            $('#excluirModal').modal('hide');
            mensagem('', 'Erro ao Excluir', 'error');
            atualizar();
            
        }
    }); 
     
}

function atualizar(){
     
    getGrid();
   
    document.getElementById("titulo").disabled      = true;
    document.getElementById("descricao").disabled   = true;
    document.getElementById("concluir").disabled    = true;
    document.getElementById("prioridade").disabled  = true;
     
    document.getElementById("id").value            = "";
    document.getElementById("titulo").value        = "";
    document.getElementById("descricao").value     = "";
    document.getElementById("prioridade").value    = 0;
    $('#concluir').prop('checked', false);
    
     
            
    
}


