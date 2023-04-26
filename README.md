## OZMAP

- [Descrição](#descrição)
- [Instalação](#instalação)
- [Utilização](#utilização)
- [Termos de uso](#termos-de-uso)
- [Referências](#referências)

<br>

# Descrição

<p><b>OZMAP</b> é uma API que faz o gerenciamento de usuários. Seus registros, listagens, atualizações e deleções. Esta aplicação usa o framework <strong>Koa.js</strong> e o banco de dados <strong>SQLite3</strong>.</p>
<br>

# Instalação

<h5>0. Primeiramente, é necessário já ter instalado na própria máquina:</h5>

- Um <b>editor de código</b>, conhecido também como <b>IDE</b>. Por exemplo, o <b>[Visual Studio Code (VSCode)](https://code.visualstudio.com/)</b>.

- Uma <b>ferramenta cliente de API REST</b>. Por exemplo, o <b>[Insomnia](https://insomnia.rest/download)</b> ou o <b>[Postman](https://www.postman.com/product/rest-client/)</b>.

- <p> E versionar o diretório para receber o clone da aplicação:</p>

```
git init
```

<br>
<h5>1. Fazer o clone do reposítório <b>OZMAP</b> na sua máquina pelo terminal do computador ou pelo do IDE:</h5>

```
git clone https://github.com/AndreKuratomi/Ozmap.git
```

<p>Entrar na pasta criada:</p>

```
cd Ozmap
```

<p>Abrir a aplicação no seu IDE:</p>

```
code .
```

<p>Instalar as dependências:</p>

```
npm install
```


<p>E rodar a aplicação:</p>

```
npm run dev
```

<p>A aplicação rodará com o localhost:3000. Adicionar depois deste as rotas e suas terminações, ou endpoints, que veremos a seguir.</p>

<p>Para rodar os testes utilize o seguinte comando:</p>

```
npm test
```

<br>

<h5>2. Feitas as instalações precisamos criar nosso arquivo de variáveis de ambiente, o <strong>.env</strong>:</h5>

```
touch .env
```

Dentro dele precisamos definir nossa variável de ambiente:

```
PORT=port
```

<b>Obs:</b> as informações contidas no arquivo <b>.env</b> não devem ser compartilhadas. O arquivo já consta no <b>.gitignore</b> para não ser subido no repositório.

# Utilização

<p>Após o CLI rodar de modo bem sucedido com o API Client aberto vamos utilizar as seguintes rotas:</p>

<h3>Rotas</h3>

<h4>Cadastro</h4>

Cadastro de usuários (Método POST): <b>/user</b> (ou localhost:3000/user)

Exemplo a ser colocado no body da requisição:

```
{
    "age": "32",
    "cpf": "00000000000",
    "email": "joao.silva@mail.com",
    "nome": "João da Silva"
}
```

E a resposta esperada:

```
Status: 201 CREATED
```

```
{
 "message": "Data added successfully!"
}
```

Caso seja registrado um usuário menor de idade a resposta esperada deverá ser:

```
Status: 403 UNAUTHORIZED
```

```
{
    "message": "Unauthorized! Users under 18 are not allowed."
}
```

<h4>Listagem de usuários:</h4>

Listagem dos usuários cadastrados (Método GET): <b>/users</b> (ou localhost:3000/users)

Exemplo a ser colocado no body da requisição:

```
(Requisição feita sem body)
```

Se o usuário do token for administrador ("isAdmin": true) a resposta esperada será:

```
Status: 200 OK
```

```
[
    {
        "age": "32",
        "cpf": "00000000000",
        "email": "joao.silva@mail.com",
        "nome": "João da Silva"
    }
]
```

<h4>Listagem de usuário por id</h4>

Listagem dos dados de um usuário (Método GET): <b>/user/id**</b> (ou localhost:3000/users/id**)

\*\*preencher com o id do usuário anteriormente cadastrado.

Exemplo a ser colocado no body da requisição:

```
(Requisição feita sem body)
```

E a resposta esperada:

```
Status: 200 OK
```

```
[
    {
        "age": "32",
        "cpf": "00000000000",
        "email": "joao.silva@mail.com",
        "nome": "João da Silva"
    }
]
```

<h4>Atualização de usuário:</h4>

Atualização de dados do usuário cadastrado (Método PATCH): <b>/users/id**</b> (ou localhost:3000/users/id**)

\*\*preencher com o id do usuário anteriormente cadastrado.

Exemplo a ser colocado no body da requisição:

```
{
    "age": 35
}
```

Caso o usuário do token seja o mesmo do id ou for administrador a resposta será:

```
Status: 200 OK
```

```
{
  "message": "User successfully updated!"
}
```

Caso contrário a resposta será:

```
Status: 404 NOT FOUND
```

```
{
  "message": "User not found!"
}
```

<h4>Deleção de usuário:</h4>

Deleção de usuário cadastrado (Método DELETE): <b>/users/id**</b> (ou localhost:3000/users/id**)

\*\*preencher com o id do usuário anteriormente cadastrado.

Exemplo a ser colocado no body da requisição:

```
(Requsição feita sem body)
```

Caso o usuário do token seja o mesmo do id ou for administrador a resposta será:

```
Status: 204 NO CONTENT
```

```
(Resposta feita sem body)
```

Caso contrário a resposta será:

```
Status: 404 NOT FOUND
```

```
{
  "message": "User not found!"
}
```

# Termos de uso

<p>Esta aplicação atende a fins exclusivamente didáticos e não possui qualquer intuito comercial.</p>

# Referências

- [Koa.js](https://koajs.com/)
- [Node.js](https://nodejs.org/en/)
- [SQLite3](https://www.sqlite.org/index.html)
- [Mocha](https://mochajs.org/api/mocha)
- [Chai](https://www.chaijs.com/guide/)
- [Nodemon](https://nodemon.io/)
- [Swagger](https://swagger.io/specification/)
- [Dotenv](https://www.npmjs.com/package/dotenv)

<!--O objetivo do projeto é:

Usando o NodeJs, Koa, Mocha e Chai, fazer uma API que permita:

● Como bônus, a lista de usuário pode permitir paginação. (Não é necessário, é bônus.)

O projeto base já possui boa parte da implementação pronta, incluindo alguns testes de unidade. Não é necessário conexão com nenhuma base de dados, tudo pode rodar em memória.

Não é necessáriA nenhuma interface gráfica para este projeto. Tudo será testado via unit test, ou seja, você deverá implementar mais unit tests, usando o arquivo:/test/index.js antes ou após implementar a API em si.

● Como bônus, pode ser criada uma interface básica em HTML5 ou algum framework web para frontend de sua escolha.(Não é necessário, é bônus).
● Como bônus, poderá ser adicionado uma documentação da API, usando Open-API3 ou Swagger: https://editor.swagger.io/

Se você tiver dúvidas sobre o desenvolvimento do teste, encaminhe um e-mail para silvia.guerreiro@ozmap.com.br

DAS AVALIAÇÕES

O projeto será avaliado por:

● Rodar os testes de unidade corretamente.
● Lógica da aplicação
● Lógica dos testes
● Formatação do código e estrutura do projeto
● As mensagens de commit do git também serão avaliadas caso publicado via git.(bônus)
● Legibilidade da API e documentação da API (favor salvar o arquivo de api, como api.yaml dentro da raiz do projeto)
● Interface gráfica(HTML ou biblioteca)
● Beleza (UI/UX) da interface, e uso de CSS

Estamos à disposição. Boa sorte e bom desenvolvimento!-->
