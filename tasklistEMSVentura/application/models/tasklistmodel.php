<?php

class tasklistmodel extends CI_Model {

    private $conBanco;

    public function __construct() {
        parent::__construct();
    }

    private function initConBanco() {
        if ($this->conBanco == null) {
            $this->conBanco = $this->load->database("default", TRUE);
        }
    }

    private function getUsuarioLogado() {
        $this->load->library("access");

        return $this->access->getUsuarioLogado();
    }

    public function novo() {

        $this->initConBanco();

        $query = "SELECT MAX(ID_TASK) AS ID_TASK FROM TASKLIST_TAB";

        $cs = $this->conBanco->query($query);
        $rs = $cs->result();

        if (count($rs) > 0) {
            $novoId = $rs[0]->ID_TASK + 1;
        } else {
            $novoId = 1;
        }

        return $novoId;
    }

    public function salvar($id, $titulo, $descricao, $prioridade, $concluir) {

        $this->initConBanco();

        $query = "SELECT * FROM TASKLIST_TAB WHERE ID_TASK = $id";
        $cs = $this->conBanco->query($query);
        $rs = $cs->result();

        if (is_array($rs) && count($rs) > 0) {

            $query = "UPDATE TASKLIST_TAB SET TITULO = '$titulo', DESCRICAO = '$descricao' , CONCLUIR = '$concluir', PRIORIDADE = $prioridade, DATA_MOVIMENTO = CURRENT_TIMESTAMP WHERE ID_TASK = $id";

            $resultado = $this->conBanco->query($query);

            if ($resultado == true) {
                return true;
            } else {
                return false;
            }
        } else {

            $query = "INSERT INTO TASKLIST_TAB (ID_TASK, TITULO, DESCRICAO, CONCLUIR, PRIORIDADE, DATA_MOVIMENTO)
                             VALUES ($id, '$titulo', '$descricao', '$concluir', $prioridade, CURRENT_TIMESTAMP)";
            //print_r($query);exit();
            $resultado = $this->conBanco->query($query);

            if ($resultado == true) {
                return true;
            } else {
                return false;
            }
        }
    }

    public function getGrid($indice, $ordem, $inicio, $tamanho, $draw) {


        $this->initConBanco();

        $count = $this->getCountGrid();

        $grid = array();

        $grid['draw'] = $draw; // mecanismo de conformidade
        $grid['recordsTotal'] = $count; // total de registros 
        $grid['recordsFiltered'] = $count; // tota de registros filtrados

        $data = array(); // linhas


        $query = "SELECT * FROM TASKLIST_TAB ORDER BY PRIORIDADE DESC ";
        $cs = $this->conBanco->query($query);
        $itens = $cs->result();

        if (is_array($itens) && count($itens) > 0) {

            $obj = array();

            foreach ($itens as $item) {


                $idTask = $item->ID_TASK;

                if ($item->PRIORIDADE == 1) {
                    $prioridade = "Baixa";
                }
                if ($item->PRIORIDADE == 2) {
                    $prioridade = "Normal";
                }
                if ($item->PRIORIDADE == 3) {
                    $prioridade = "Alta";
                }

                if ($item->CONCLUIR == "S") {
                    $concluir = "SIM";
                } else {
                    $concluir = "NÃO";
                }

                $obj['ID'] = $idTask;
                $obj['TITULO'] = $item->TITULO;
                $obj['DESCRICAO'] = $item->DESCRICAO;
                $obj['PRIORIDADE'] = $prioridade;
                $obj['CONCLUIR'] = $concluir;

                $obj['ACOES'] = "<a title='Editar' onclick='editar($idTask)' class='btn btn-warning'>
                                    <span class='glyphicon glyphicon glyphicon-pencil'></span>
                                   </a>";


                $data[] = $obj;
            }

            $grid['data'] = $data;

            return $grid;
        }
    }

    private function getCountGrid() {

        $this->initConBanco();

        $query = "SELECT COUNT(ID_TASK) AS TOTAL FROM TASKLIST_TAB";
        $cs = $this->conBanco->query($query);
        $rs = $cs->result();


        if (is_array($rs) && count($rs) > 0) {
            return $rs[0]->TOTAL;
        } else {
            return 0;
        }
    }

    public function editar($id) {

        $this->initConBanco();

        $query = "SELECT * FROM TASKLIST_TAB WHERE ID_TASK =  '$id'";
        $cs = $this->conBanco->query($query);
        $rs = $cs->result();


        $obj = array();

        if (is_array($rs) && count($rs) > 0) {


            $obj[] = $rs[0]->TITULO;
            $obj[] = $rs[0]->DESCRICAO;
            $obj[] = $rs[0]->PRIORIDADE;
            $obj[] = $rs[0]->CONCLUIR;

            return json_encode($obj);
        }
    }

    public function excluir($id) {

        $this->initConBanco();

        $query = "DELETE FROM TASKLIST_TAB WHERE ID_TASK = $id";
        $resultado = $this->conBanco->query($query);

        if ($resultado == true) {
            return true;
        } else {
            return false;
        }
    }

}
