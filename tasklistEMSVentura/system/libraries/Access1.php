<?php
class Access{
    
    private $ci;
    
    public function Access(){
        $this->ci =& get_instance();
    }
    
    public function loginCheck(){
        
        $this->ci->load->library('session');
        
        $usuario = $this->ci->session->userdata('usuario');

        if (empty($usuario)) {
            
            $url = $this->montaUrlCodificada();
            
            $this->redirectUrl("m=login&returnUrl=".$url);
            
        }
        
    }
    
    public function permissionCheck($funcao){
        
        $this->ci->load->library('session');
        
        $usuario = $this->ci->session->userdata('usuario');
        
        if(!in_array($funcao, $usuario->funcoes)){
            $this->redirectUrl("m=login&c=login&f=semPermissao");
        }
        
    }
    
    private function montaUrlCodificada(){
        $m = $this->ci->input->get_post('m');
        $c = $this->ci->input->get_post('c');
        $f = $this->ci->input->get_post('f');

        $this->ci->load->helper('url');

        $addr = current_url();

        if(!empty($m)){
            $addr .=  "?m=$m";
        }

        if(!empty($c)){
            $addr .=  "&c=$c";
        }

        if(!empty($f)){
            $addr .=  "&f=$f";
        }
        

        return base64_encode($addr);
    }
    
    private function redirectUrl($url){

        $this->ci->load->helper('url');

        redirect($url);
            
    }
    
    public function getNomeUsuarioLogado(){
        $this->ci->load->library('session');
        $usuario = $this->ci->session->userdata('usuario');
        return $usuario->LOGIN;
    }
    
    public function getUsuarioLogado(){
        $this->ci->load->library('session');
        $usuario = $this->ci->session->userdata('usuario');
        return $usuario;
    }
    
}