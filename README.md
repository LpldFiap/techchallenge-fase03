# Tech Challenge - fase 03

## Requisitos funcionais
A interface gráfica deve incluir as seguintes páginas e funcionalidades:
1. Página principal (Lista de posts)
o Exibir uma lista de todos os posts disponíveis.
o Cada item da lista deve mostrar o título, autor e uma breve
descrição do post.
o Incluir um campo de busca para filtrar posts por palavras-chave.
2. Página de leitura de post
o Exibir o conteúdo completo de um post selecionado.
o Permitir comentários nos posts (opcional).
3. Página de criação de postagens
o Formulário para que docentes possam criar postagens.
o Campos para título, conteúdo e autor.
o Botão para enviar o post ao servidor.
4. Página de edição de postagens
o Formulário para que os(as) professores(as) possam editar
postagens existentes.
o Carregar os dados atuais do post para edição.
o Botão para salvar as alterações.
5. Página administrativa
o Exibir uma lista de todas as postagens, com opções para editar e
excluir cada post.
o Botões para editar e excluir postagens específicas.
6. Autenticação e autorização
o Implementar login para professores.
o Garantir que apenas usuários autenticados possam acessar as
páginas de criação, edição e administração de postagens.

## Requisitos técnicos
1. Desenvolvimento em React
o Utilizar React para desenvolver a interface gráfica.
o Utilização de hooks e componentes funcionais.
2. Estilização e responsividade
o Utilizar Styled Components ou outro método de estilização.
o Garantir que a aplicação seja responsiva, funcionando bem em
dispositivos móveis e desktops.
3. Integração com Back-End
o Realizar chamadas aos endpoints REST para obter, criar, editar e
excluir posts.
o Gerenciar o estado da aplicação com ferramentas como Context
API ou Redux (opcional).

## Como executar o projeto
1. `npm i`
2. `npm run dev`
