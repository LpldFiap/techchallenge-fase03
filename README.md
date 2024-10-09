# Tech Challenge - Fase 03

## Grupo
* - Danilo Soares da Silva - RM:354317*
* - Gabriel Antunes – RM: 354712
* - Lucas dos Santos Melo – RM:355274*
* - Lucas Souza Davanso – RM: 354925*
* - Paloma Cristina da Silva Correa – RM:355519*


## Índice
- [Descrição do Projeto](#descrição-do-projeto)
- [Requisitos Técnicos](#requisitos-técnicos)
- [Página Principal (Lista de Posts)](#página-principal-lista-de-posts)
- [Página de Leitura de Post](#página-de-leitura-de-post)
- [Página de Criação de Postagens](#página-de-criação-de-postagens)
- [Página de Edição de Postagens](#página-de-edição-de-postagens)
- [Página Administrativa](#página-administrativa)
- [Autenticação e Autorização](#autenticação-e-autorização)
- [Como Executar o Projeto](#como-executar-o-projeto)
- [Contribuição](#contribuição)


## Descrição do Projeto
Este projeto visa desenvolver uma interface gráfica intuitiva para gerenciar postagens, utilizando as tecnologias Vite, React e Tailwind CSS. A aplicação permite a criação, edição e leitura de posts, além de funcionalidades administrativas.

## Requisitos Técnicos
A interface foi desenvolvida com **Vite** e **React**, utilizando **Tailwind CSS** para garantir um design responsivo. A integração é feita com a API desenvolvida na fase anterior:

## Requisitos Funcionais

### Página Principal (Lista de Posts)
- Exibir uma lista de todos os posts disponíveis.
- Exibir uma lista de todas as postagens, com opções para editar e excluir cada post.
![Imagem da Página Principal](src/assets/home_admin.png)

### Página de Leitura de Post
- Exibir o conteúdo completo de um post selecionado.
![Imagem da Página de Leitura de Post](src/assets/detalhes_post_aluno.png)

### Página de visualização de Posts como aluno
- Exibir uma lista contendo todos os posts.
![Imagem da Página de Leitura de Post](src/assets/detalhes_post_aluno.png)

### Página de Criação de Postagens
- Formulário para que docentes possam criar postagens.
- Campos para título, conteúdo e autor.
- Botão para enviar o post ao servidor.
![Imagem da Página de Criação de Postagens](src/assets/criacao_post.png)

### Página de Edição de Postagens
- Formulário para que os(as) professores(as) possam editar postagens existentes.
- Carregar os dados atuais do post para edição.
- Botão para salvar as alterações.
![Imagem da Página de Edição de Postagens](src/assets/editar_post.png)

### Página Administrativa
- Permitir que o admin altere o tipo de permissão dos usuários
![Imagem da Página Administrativa](src/assets/admin.png)

### Autenticação e Autorização
- Implementar login para professores.
- Garantir que apenas usuários autenticados possam acessar as páginas de criação, edição e administração de postagens.
![Imagem da Autenticação](src/assets/login.png)

[Repositório API Fase 2](https://github.com/LpldFiap/StudyTech.git)

## Como Executar o Projeto
1. Clone o repositório da API:

```bash
git clone https://github.com/LpldFiap/StudyTech.git
```
2. Siga as instruções para rodar o backend e garantir que ele esteja ativo.

3. Clone este repositório e execute o comando abaixo:

```bash
npm run dev
```

## Apresentação

![Vídeo apresentação desse Projeto](src/assets/apresentacao)
- Caminho > *src/assets/apresentacao.zip*