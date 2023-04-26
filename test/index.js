//sample test
//Para rodar os testes, use: npm test
//PS: Os testes não estão completos e alguns podem comnter erros.

// veja mais infos em:
//https://mochajs.org/
//https://www.chaijs.com/
//https://www.chaijs.com/plugins/chai-json-schema/
//https://developer.mozilla.org/pt-PT/docs/Web/HTTP/Status (http codes)

const app = require("../src/index");
const {
  userSchema,
  raulFound,
  deVozTeamWithRaupp,
  deVozTeamWithoutRaupp,
  estevezFound,
} = require("./samples");

const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");
const chaiJson = require("chai-json-schema");

chai.use(chaiHttp);
chai.use(chaiJson);

const expect = chai.expect;
const server = app.server;

//Inicio dos testes

//este teste é simplesmente pra enteder a usar o mocha/chai
describe("Um simples conjunto de testes sobre 'userSchema'.", function () {
  it("deveria retornar o tipo da variável", function () {
    assert.equal(typeof userSchema, "object");
  });

  it("deveria retornar os elementos de 'userSchema'", function () {
    assert.equal(Object.keys(userSchema).length, 4);
  });

  it("deveria retornar o tipo do segundo valor de [2] de 'properties'", function () {
    assert.equal(
      typeof Object.values(userSchema.properties)[2].minimum,
      "number"
    );
  });

  it("deveria retornar -1 quando o valor não está presente", function () {
    assert.equal(userSchema.required.indexOf(4), -1);
  });
});

//testes da aplicação
describe("Testes da aplicação", () => {
  it("o servidor está online", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/users")
      .end(function (err, res) {
        assert.equal(err, null);
        assert.equal(res.status, 200);
        done();
      });
  });

  it("deveria haver uma lista vazia de usuários", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/users")
      .end(function (err, res) {
        expect(err, null);
        expect(res.status, 200);
        expect(res.body.rows, []);
        done();
      });
  });

  it("deveria criar os usuários deVoz", function (done) {
    chai
      .request(server)
      .keepOpen()
      .post("/user")
      .send({
        nome: "Raupp",
        cpf: "00000000001",
        email: "jose.raupp@devoz.com.br",
        age: 35,
      })
      .send({
        nome: "Estévez",
        cpf: "00000000002",
        email: "antonio.estevez@devoz.com.br",
        age: 53,
      })
      .send({
        nome: "Scielsi",
        cpf: "00000000003",
        email: "giacinto.scielsi@devoz.com.br",
        age: 85,
      })
      .send({
        nome: "Grisey",
        cpf: "00000000004",
        email: "gerard.grisey@devoz.com.br",
        age: 38,
      })
      .send({
        nome: "Murail",
        cpf: "00000000005",
        email: "tristan.murail@devoz.com.br",
        age: 46,
      })
      .end(function (err, res) {
        expect(err, null);
        expect(res.body.message, "Data added successfully!");
        expect(res.status, 201);
        done();
      });
  });

  it("deveria haver uma lista com pelo menos 5 usuários", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/users")
      .end(function (err, res) {
        expect(err, null);
        expect(res.status, 200);
        expect(res.body, deVozTeamWithRaupp);
        expect(res.body.length, 5);
        done();
      });
  });

  it("deveria bloquear o cadastro do usuário Joãozinho", function (done) {
    chai
      .request(server)
      .keepOpen()
      .post("/user")
      .send({
        nome: "Joãozinho",
        cpf: "00000000006",
        email: "joaozinho@devoz.com.br",
        age: 8,
      })
      .end(function (err, res) {
        expect(err, null);
        expect(
          res.body.message,
          "Unauthorized! Users under 18 are not allowed."
        );
        expect(res.status, 403);
        done();
      });
  });

  it("o usuário 'Joãozinho' não existe no sistema", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/user/6")
      .end(function (err, res) {
        expect(res.status, 404);
        expect(res.body.message, "User not found!");
        done();
      });
  });

  it("o usuário 'naoExiste' também não existe no sistema", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/user/naoExiste")
      .end(function (err, res) {
        expect(res.status, 400);
        expect(res.body.message, "Invalid Id! Must be a number.");
        done();
      });
  });

  it("o usuário raupp existe e é valido", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/user/1")
      .end(function (err, res) {
        expect(err, null);
        expect(res.status, 200);
        expect(res.body, raulFound);
        done();
      });
  });

  it("atualiza a idade de Estévez", function (done) {
    chai
      .request(server)
      .keepOpen()
      .patch("/user/2")
      .send({
        age: 36,
      })
      .end(function (err, res) {
        expect(err, null);
        expect(res.status, 200);
        expect(res.body, "User successfully updated!");
        done();
      });
  });

  it("verifica se a idade de Estévez foi atualizada", function (done) {
    // let awaitTest = await
    chai
      .request(server)
      .keepOpen()
      .get("/users/2")
      .end(function (err, res) {
        expect(err, null);
        expect(res.status, 200);
        console.log(res.body);
        expect(res.body, estevezFound);
        //     expect(res.body[0].age, 36);
        // expect(awaitTest.status).to.equal(200);
        // expect(awaitTest.body.age).to.equal(36);
        done();
      });
  });

  it("deveria excluir o usuário raupp", function (done) {
    chai
      .request(server)
      .keepOpen()
      .delete("/user/1")
      .end(function (err, res) {
        expect(err, null);
        expect(res, 204);
        done();
      });
  });

  it("o usuário raupp não deve existir mais no sistema", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/user/1")
      .end(function (err, res) {
        expect(err, null);
        expect(res.status, 404);
        expect(res.body.message, "User not found!");
        done();
      });
  });

  it("agora deveria ser uma lista com pelo menos 4 usuários", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/users")
      .end(function (err, res) {
        expect(err, null);
        expect(res.status, 200);
        expect(res.body, deVozTeamWithoutRaupp);
        expect(res.body.length, 5);
        done();
      });
  });
});
