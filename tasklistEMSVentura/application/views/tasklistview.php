<!DOCTYPE html>
<?php header("Content-Type: text/html; charset=ISO-8859-1",true);?>

<head> 
    <title>Task List</title>
    <meta http-equiv="Content-Type" content="text/html;charset=iso-8859-1" />

    <!--PROGRESS BAR-->
    <script src="resources/geral/progress-bar/pace.min.js"></script>
    <link href="resources/geral/progress-bar/dataurl.css" rel="stylesheet">
    <!--PROGRESS BAR-->

    <!--JQUERY 1.11-->
    <link href="resources/geral/jquery/jquery-ui-1.11.2/jquery-ui.min.css" rel="stylesheet">
    <script src="resources/geral/jquery/jquery-1.11.1.min.js"></script>
    <script src="resources/geral/jquery/jquery-ui-1.11.2/jquery-ui.min.js"></script>
    <!--JQUERY 1.11-->

    <!--FIELDSET-->
    <link href="resources/geral/css/teste.css" rel="stylesheet">
    <!--FIELDSET-->

    <!--NOTIFICACOES-->
    <link href="resources/geral/notificacoes/pnotify.custom.min.css" rel="stylesheet">
    <script src="resources/geral/notificacoes/pnotify.custom.min.js"></script>
    <!--NOTIFICACOES-->

    <!--BOOSTRAP 3.3.0--> 
    <link href="resources/geral/bootstrap/css/cerulean-theme/bootstrap.min.css" rel="stylesheet">
    <script src="resources/geral/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
    <!--BOOSTRAP 3.3.0--> 

    <!--DATEPICKER-->
    <link href="resources/geral/bootstrap-datepicker/css/datepicker3.css" rel="stylesheet">
    <script src="resources/geral/bootstrap-datepicker/js/bootstrap-datepicker.js" type="text/javascript"></script>
    <script src="resources/geral/bootstrap-datepicker/js/locales/bootstrap-datepicker.pt-BR.js" type="text/javascript"></script>
    <!--DATEPICKER-->

    <!--BLOCKUI-->
    <script src="resources/geral/blockUI/jquery.blockUI.js" type="text/javascript"></script>
    <!--BLOCKUI-->

    <!--GRID-->
    <link href="resources/geral/grid/css/dataTables.bootstrap.css" rel="stylesheet">
    <script src="resources/geral/grid/js/jquery.dataTables.min.js"></script>
    <script src="resources/geral/grid/js/dataTables.bootstrap.js"></script>
    <!--GRID-->

    <!--GERAL-->

    <link href="resources/geral/font-awesome-4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="resources/geral/geral.css" rel="stylesheet">
    <link href="resources/geral/resetarScrollBar.css" rel="stylesheet">
    <script src="resources/geral/geral.js"></script>
    <!--GERAL-->

    <!-- TASKLIST JS-->
    <script src="resources/js/tasklist.js"></script>
    <!-- TASKLIST JS-->
</head>

<body style="zoom: 85%;">
    <nav class="navbart">
        <div class="container-fluid" align="right" style="margin-top: 10px">

            <a onclick="novo()" class="btn btn-primary">
                <span class="glyphicon glyphicon-file"></span>  Novo 
            </a>
            <a onclick="salvar()" class="btn btn-success">
                <span class="glyphicon glyphicon-floppy-disk"></span>  Salvar
            </a>
            <a onclick="excluirConfirmar()" class="btn btn-danger">
                <span class="glyphicon glyphicon glyphicon-remove"></span> Excluir
            </a>   
            <a onclick="atualizar()" class="btn btn-primary">
                <span class="glyphicon glyphicon glyphicon-refresh"></span> Atualizar
            </a> 

        </div>
    </nav>
    <div class="container" style="width: 95%;">
        <h3>Tasklist</h3>
        <fieldset class="fieldset-border">
            <br>
            <table style="width: 99%; border-collapse: collapse" cellpadding="0" cellspacing="5px" align="center" >
                <tr>
					<td  style="width: 5%; padding-right: 10px;font-size: 14px;">
                        <div class="form">
							Id
							<input type="text" class="form-control" id="id"   placeholder="Id" disabled>
						</div>
                    </td>
                    <td  style="width: 25%; padding-right: 10px;font-size: 14px;">
                        <div class="form">
                            Título *
                            <input type="text" class="form-control" id="titulo"   maxlength="40" placeholder="Titulo (max 40 caracteres)" disabled>
                        </div>
                    </td>
                    <td  style="width: 50%;padding-right: 10px;font-size: 14px;">
                        <div class="form">
                            Descrição *
                            <input type="text" class="form-control" id="descricao"   maxlength="80" placeholder="Titulo (max 80 caracteres)" disabled>
                        </div>
                    </td>
                    <td  style="width: 10%; padding-right: 5px;font-size: 14px;">
                        <div class="form">
                            Prioridade *
                            <select  id="prioridade" class="form-control" disabled>
                                <option value="0" readonly>Selecione</option>
                                <option value="1" readonly>Baixa</option>
                                <option value="2" readonly>Normal</option>
                                <option value="3" readonly>Alta</option>

                            </select>
                        </div>
                    </td>
                    <td  style="width: 10%; padding-left: 10px; padding-bottom: 2px;font-size: 14px;" align="center" >

                        <div>
							Concluir
                            <br>
							<input style="width: 35px; height: 35px; "type="checkbox" id="concluir" name="concluir" disabled/>
                        </div>
                    </td>

                </tr>


            </table>
            <br>
        </fieldset>
    </div>   
    <br>
    <div style='width: 99%; margin-left: 7px; margin-right: 4px; overflow-x: auto'>
        <table id="grid" class="display" cellspacing="0" width="100%">
            <thead>
                <tr>
                    <th style='width: 5%;' title="Id">Id</th>
                    <th style='width: 25%;'title="Título">Título</th>
                    <th style='width: 40%;'title="Descrição">Descrição</th>
                    <th style='width: 10%;'title="Prioridade">Prioridade</th>
                    <th style='width: 5%;'title="Concluído">Concluído</th>
                    <th style='width: 5%;'title="Ações">Ações</th>
                </tr>
            </thead>
        </table>
    </div>       


</body>
    
    <!-- Modal para confirmacao de Exclusao -->
    <div class="modal fade" id="excluirModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Confirmar Exclusão</h4>
                </div>
                <div class="modal-body">
                    <p><h4> Tem certeza que deseja excluir ?</h4></p>
                </div>
                <div class="modal-footer">
                    <a class="btn btn-default" data-dismiss="modal">
                        <span class="glyphicon glyphicon glyphicon-remove"></span> Sair
                    </a>
                    <a onclick="excluir()" class="btn btn-danger">
                        <span class="glyphicon glyphicon glyphicon-remove"></span> Excluir
                    </a>
                </div>
            </div>
        </div>
    </div>


 
</html>