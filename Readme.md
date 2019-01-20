Teste Prático, Autor: HEITOR MANOEL SIQUEIRA, JANEIRO 2019.

Olá,

Segue o desenvolvimento do TaskList, o desenvolvimento está no arquivo compactado "projeto tasklist EMSVentura".

Este projeto foi desenvolvido utilizando o framework codeigniter, na estrutura de projeto MVC, utilizando um arquivo Javascript para realizar validação dos campos.

Os códigos fontes utilizado para criar esta aplicação consta neste arquivo, foi utilizado um template bootstrap de front-end, banco mysql, utilizado html5, javascript, php, jquery.

A pasta tasklistEMSVentura é uma pasta do codeigniter que fica dentro do htdocs do XAMPP, servidor este que uso para rodar minhas aplicações PHP.
../htdocs/tasklistEMSVentura

O arquivo chamado tasklist.sql é o arquivo do banco mySQL, onde contem a tabela "tasklist_tab" utilizada para este projeto.

Acessando aplicação:

  Ao clicar no botão "Novo" o usuário pode inserir um nova tarefa, adicionando o título, descrição, prioridade, estes campos são obrigatórios.
  
  O campo de "Concluir" ao iniciar uma nova inserção apresenta-se como "não selecionado" indicando o concluído como: NÃO.
  
  Finaliza-se a inserção clicando no botao "salvar". Ao salvar, a tarefa será salvo no banco de dados e apresentada na Grid.
  
  As tarefas são apresentadas em uma grid, onde é possível escolher mostrar 5, 10, 20, 50 ou 100 tarefas na primeira página.
  	
  Na Grid tambem existe o campo de pesquisar para facilitar a consulta de alguma tarefa já salva.
  
  Cada tarefa apresentada na grid, tem um botão de "editar", onde pode alterar os dados da tarefa. Confirmando as alterações ao clicar no botão "salvar".

  O botão de "excluir" ao clicar, abre um modal para realizar a confirmação da exclusão, com o objetivo de evitar uma exclusão acidental.
  
  Ao abrir o modal "Confirmar Exclusão", para excluir clica-se no botao "excluir" do modal (exclui a tarefa salva em banco, atualiza a Grid), 
  caso contrário clica-se no botão "Sair" do modal.
  
  O botao "Atualizar", faz uma limpeza dos campos em tela, deixando desativados e "sem valor" e atualiza a grid.