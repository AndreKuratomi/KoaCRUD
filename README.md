## KoaCRUD

- [Description](#description)
- [Instalation](#instalation)
- [How to use](#how-to-use)
- [Terms of use](#terms-of-use)
- [References](#references)

<br>

# Translations

- [English](https://github.com/AndreKuratomi/KoaCRUD)
- [Português brasileiro / Brazilian portuguese](./.multilingual_readmes/README_pt-br.md)

<br>

# Description

<p><b>KoaCRUD</b> is an API that manages users, its registrations, listings, updates and deletions. This app uses the programming language <strong>Javascript</strong>, its framework <strong>Koa.js</strong>, the database <strong>SQLite3</strong> the APIs documenter <strong>Swagger</strong> and the test libs <strong>Mocha</strong> and <strong>Chai</strong>.</p>
<br>

# Instalation

<h3>0. It is first necessary to have instaled the following devices:</h3>

- The code versioning <strong>[Git](https://git-scm.com/downloads)</strong>,

- A <b>code editor</b>, also known as <b>IDE</b>. For instance, <strong>[Visual Studio Code (VSCode)](https://code.visualstudio.com/)</strong>,

- A <b> client API REST </b> program. <strong>[Insomnia](https://insomnia.rest/download)</strong> or <b>[Postman](https://www.postman.com/product/rest-client/)</b>, for instance,

- Javascript's runtime enviroment <strong>[Node.js](https://nodejs.org/en/download/package-manager)</strong>,
- And Node.js' package manager <strong>[NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)</strong>:

```
npm install -g npm
```

<br>
<h3>1. Clone the repository <b>KoaCRUD</b> by your machine terminal or by the IDE:</h3>

```
git clone https://github.com/AndreKuratomi/KoaCRUD.git
```

WINDOWS:

Obs: In case of any mistake similar to this one: 

```
unable to access 'https://github.com/AndreKuratomi/KoaCRUD.git': SSL certificate problem: self-signed certificate in certificate chain
```

Configure git to disable SSL certification:

```
git config --global http.sslVerify "false"
```

<p>Enter the directory:</p>

```
cd KoaCRUD
```
<br>

<p>Open your app for your IDE:</p>

```
code .
```

<p>Install its dependencies:</p>

```
npm install
```
WINDOWS:

In case any error similar to the one bellow be returned:

```
ERROR: Could not install packages due to an OSError: [Errno 2] No such file or directory: 'C:\\Users\\KoaCRUD\\lorem\\ipsum\\dolor\\etc'
HINT: This error might have occurred since this system does not have Windows Long Path support enabled. You can find information on how to enable this at https://pip.pypa.io/warnings/enable-long-paths
```

Run cmd as adminstrador with the following command:

```
reg.exe add HKLM\SYSTEM\CurrentControlSet\Control\FileSystem /v LongPathsEnabled /t REG_DWORD /d 1 /f
```
<br>

<p>And run the application:</p>

```
npm run dev
```

<p>The app will run with local server localhost:<your-port> or the default port 3000. Write after it the application routes or endpoint's as we are going to see bellow.</p>

<p>For running the app's tests use the following command:</p>

```
npm test
```

<br>

<h3>2. After everything installed we need to create our enviroment variable <strong>.env</strong>:</h3>

```
touch .env
```

Inside it we need to define our enviroment variable PORT:

```
PORT=port
```

<b>Obs:</b> the <b>.env</b> infos cannot be shared! The arquive is already at <b>.gitignore</b> for not being pushed to the repository.


# How to use 

<p>After everything is well installed use your API Client for the following routes:</p>

<h3>Routes</h3>

<h4>Registration:</h4>

User Registration (POST method): <b>/user</b> (or localhost:3000/user)

Example to be used as requisition body:

```
{
    "age": "32",
    "cpf": "00000000000",
    "email": "joao.silva@mail.com",
    "nome": "João da Silva"
}
```

And the expected response:

```
Status: 201 CREATED
```

```
{
 "message": "Data added successfully!"
}
```

In case of underage user registration the expected answer must be:

```
Status: 403 UNAUTHORIZED
```

```
{
    "message": "Unauthorized! Users under 18 are not allowed."
}
```

<h4>User listing:</h4>

Registered users listing (GET method): <b>/users</b> (or localhost:3000/users)

Example to be used as requisition body:

```
(No body requisition)
```

And the expected response:

```
Status: 200 OK
```

```
[
    {
        "id": 1,
        "age": "32",
        "cpf": "00000000000",
        "email": "joao.silva@mail.com",
        "nome": "João da Silva"
    }
]
```

<h4>User listing by id:</h4>

User listing data (GET method): <b>/user/id**</b> (ou localhost:3000/users/id**)

\*\*fill with the previously registerd user id.

Example to be used as requisition body:

```
(No body requisition)
```

And the expected response:

```
Status: 200 OK
```

```
[
    {
        "id": 1,
        "age": "32",
        "cpf": "00000000000",
        "email": "joao.silva@mail.com",
        "nome": "João da Silva"
    }
]
```

In case user is not found by id the expected answer must be:

```
Status: 404 NOT FOUND
```

```
{
    "message": "User not found!"
}
```

<h4>User update:</h4>

User data update (PATCH method): <b>/user/id**</b> (or localhost:3000/users/id**)

\*\*fill with the previously registerd user id.

Only the 'age' and 'email' fields can be updated.

Example to be used as requisition body:

```
{
    "age": 35
}
```

In case the user is already registered in SQLite the response will be:

```
Status: 200 OK
```

```
{
  "message": "User successfully updated!"
}
```

Otherwise the response will be:

```
Status: 404 NOT FOUND
```

```
{
  "message": "User not found!"
}
```

If neither "age" nor "email" fields will be used the response will be:

```
Status: 400 BAD REQUEST
```

```
{
  ""message": "Invalid params! Must be or age or email or both!"
}
```


<h4>User deletion:</h4>

User registered deletion (DELETE method): <b>/user/id**</b> (or localhost:3000/users/id**)

\*\*fill with the previously registerd user id.

Example to be used as requisition body:

```
(No body requisition)
```

In case the user is already registered in SQLite the response will be:

```
Status: 204 NO CONTENT
```

```
(No body requisition)
```

Otherwise the response will be:

```
Status: 404 NOT FOUND
```

```
{
  "message": "User not found!"
}
```

<h4>Swagger:</h4>

API documentation by Swagger: <b>/swagger</b> (or localhost:3000/swagger)

# Terms of use

<p>This API is only for didatic purposes, not commercial.</p>

# References

- [Chai](https://www.chaijs.com/guide/)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Koa.js](https://koajs.com/)
- [Mocha](https://mochajs.org/api/mocha)
- [Node.js](https://nodejs.org/en/)
- [Nodemon](https://nodemon.io/)
- [NPM](https://www.npmjs.com/)
- [SQLite3](https://www.sqlite.org/index.html)
- [Swagger](https://editor.swagger.io/)

<!--O objetivo do projeto é:

Usando o NodeJs, Koa, Mocha e Chai, fazer uma API que permita:

● Como bônus, a lista de usuário pode permitir paginação. (Não é necessário, é bônus.)

O projeto base já possui boa parte da implementação pronta, incluindo alguns testes de unidade. Não é necessário conexão com nenhuma base de dados, tudo pode rodar em memória.

Não é necessáriA nenhuma interface gráfica para este projeto. Tudo será testado via unit test, ou seja, você deverá implementar mais unit tests, usando o arquivo:/test/index.js antes ou após implementar a API em si.

● Como bônus, pode ser criada uma interface básica em HTML5 ou algum framework web para frontend de sua escolha.(Não é necessário, é bônus).
● Como bônus, poderá ser adicionado uma documentação da API, usando Open-API3 ou Swagger: https://editor.swagger.io/

Se você tiver dúvidas sobre o desenvolvimento do teste, encaminhe um e-mail para silvia.guerreiro@KoaCRUD.com.br

DAS AVALIAÇÕES

O projeto será avaliado por:

● Interface gráfica(HTML ou biblioteca)
● Beleza (UI/UX) da interface, e uso de CSS

Estamos à disposição. Boa sorte e bom desenvolvimento!-->
