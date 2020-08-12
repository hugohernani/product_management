# Ruby on Rails Challenge 20200810

### Obrigatório
 
- Leia atentamente todo o descritivo desse documento antes de qualquer coisa;
- Trabalhar em um FORK deste repositório em seu usuário;
- O projeto Web deve utilizar Rails, superior a versão 5.1.5;
- O projeto back-end deverá ser desenvolvido em Ruby, superior a versão 2.4.1;
- O Front-End deve utilizar [Bootstrap](https://getbootstrap.com/) ou [Material UI](https://material-ui.com);
- Utilize sempre boas práticas nas implementações. OOP, SOLID, DDD, Clean Code, Injeção de Dependência são sempre bem-vindos e fazem toda diferença!!!


## Back-End
 
### Banco de Dados
 
- Criar um banco de dados MySQL no Heroku: https://elements.heroku.com/addons/jawsdb
- Utilize Migrations
- Utilize Repository Pattern

### Endpoints

- Criar uma REST API usando Ruby com os seguintes endpoints:
     
        `GET /`: Retornar um Status: 200 e uma Mensagem "Ruby on Rails Challenge 20200810"
        `POST /products`: O endpoint irá processar o [products.json](products.json) que será enviado pelo Projeto Web
        `PUT /products/:productId`: Será responsável por receber atualizações realizadas no Projeto Web
        `DELETE /products/:productId`: Remover o produto da base
        `GET /products/:productId`: Obter a informação somente de um produto da base de dados
        `GET /products`: Listar todos os produtos da base de dados

- Integrar a API com o banco de dados MySQL criado no Heroku para persistir os dados
- Até o momento, os Endpoints estão todos abertos para acesso. Isso não é legal a nível de segurança, dessa forma, queremos que você use um esquema para bloquear qualquer tipo de acesso, configurando
uma **API Key** para que somente possa acessar os Endpoints, "Requests" autorizadas;

> Dica: Talvez o endpoint da Home precise ser público.

### Documentação

Escrever a documentação da API utlizando conceito [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification) em versões superiores ao v2.0

### Extras

- **Diferencial 1 -** Escrever um fluxo em background para processar o upload de produtos usando [Resque](https://github.com/resque/resque) 
- **Diferencial 2 -** Escrever Unit Test utilizando [RSpec](https://rspec.info/)
- **Diferencial 3 -** Executar o projeto usando Docker
- **Diferencial 4 -** Escrever o esquema de seguranção aplicado nos endpoints 
 
## Front-End
 
![Home](assets/images/home.png)

### Upload de produtos
 
Seu objetivo é montar uma tela para a equipe de produtos importar os arquivos JSON gerados pelo sistema de manufatura da empresa ao novo Dashboard. 
Nesta tela devemos adicionar um campo do tipo File que somente permite arquivos .json e tem faça a validação dos arquivos anexados antes de serem enviados a REST API. 

Somente arquivos válidos podem ser enviados ao Dashboard. 

O Product Manager do projeto deixou uma sugestão de mockup acima.

> Recomendado adicionar alertas de validações em casa passo

 
#### Listar produtos
 
Criar uma sessão na tela com uma tabela para listar os produtos processados pela API. É importante ter os seguintes campos:
 
        - Title
        - Type
        - Rating
        - Price
        - Created (Data do upload do produto a nova base de datos)
        - Actions (Botões Editar e Excluir)
 
#### Editar produto
 
Na tabela com os produtos precisamos disponibilizar os formulários com todos os campos dos produtos para que a equipe possa editá-los. 
Fazer validação de alguns campos obrigatórios:

        - Title
        - Type
        - Price
 
#### Remover produto
 
Antes de completar a ação de remover produto, devemos perguntar ao usuário se ele realmente 
quer realizar a ação. Para evitar a remoção de produtos de maneira indesejada. 

Após remover com êxito, notificar o usuário com um alerta de sucesso. 
 
## Readme do Repositório
 
- Deve conter o título de cada projeto
- Uma descrição de uma frase
- Como instalar e usar o projeto (instruções)
- Não esqueça o [.gitignore](https://www.toptal.com/developers/gitignore)
 
## Finalização 

Avisar sobre a finalização e enviar para correção em: [https://bit.ly/3e7MjcK](https://bit.ly/3e7MjcK) 
Após essa etapa será marcado a apresentação/correção do projeto.

## Instruções para a Apresentação: 

1. Será necessário compartilhar a tela durante a vídeo chamada;
2. Deixe todos os projetos de solução previamente abertos em seu computador antes de iniciar a chamada;
3. Deixe os ambientes configurados e prontos para rodar; 
4. Prepara-se pois você será questionado sobre cada etapa e decisão do Challenge;
5. Prepare uma lista de perguntas, dúvidas, sugestões de melhorias e feedbacks (caso tenha).


## Suporte

Use o nosso canal no slack: http://bit.ly/32CuOMy para tirar dúvidas sobre o processo ou envie um e-mail para contato@coodesh.com. 





