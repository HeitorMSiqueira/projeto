<?php

class tasklistcontroller extends CI_Controller {

    public function __construct() {

        parent::__construct();
    }

    public function index() {
        
        $this->load->view('tasklistview');
    }

    public function novo() {

        $this->load->model('tasklistmodel');

        $retorno = $this->tasklistmodel->novo();

        echo json_encode($retorno);
    }

    public function salvar() {

        $this->load->model('tasklistmodel');

        $id = $this->input->POST('id');
        $titulo = $this->input->POST('titulo');
        $descricao = $this->input->POST('descricao');
        $prioridade = $this->input->POST('prioridade');
        $concluir = $this->input->POST('concluir');

        $retorno = $this->tasklistmodel->salvar($id, $titulo, $descricao, $prioridade, $concluir);

        echo json_encode($retorno);
    }

    public function getGrid() {

        $pOrdem = $this->input->POST('order');
        $pColumn = $this->input->POST('columns');
        $indice = $pColumn[$pOrdem[0]['column']]['data'];

        $ordem = $pOrdem[0]['dir'];
        $inicio = $this->input->POST('start');
        $tamanho = $this->input->POST('length');
        $draw = $this->input->POST('draw');


        $this->load->model('tasklistmodel');

        $retorno = $this->tasklistmodel->getGrid($indice, $ordem, $inicio, $tamanho, $draw);

        echo json_encode($retorno);
    }

    public function editar() {

        $id = $this->input->POST('id');

        $this->load->model('tasklistmodel');

        $retorno = $this->tasklistmodel->editar($id);

        echo ($retorno);
    }

    public function excluir() {

        $id = $this->input->POST('id');

        $this->load->model('tasklistmodel');

        $retorno = $this->tasklistmodel->excluir($id);

        echo ($retorno);
    }

}
