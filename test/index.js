const Koa = require("koa");
const router = require("../src/routes");

const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");
const chaiJson = require("chai-json-schema");

const {
  userSchema,
  raulFound,
  deVozTeamWithRaupp,
  deVozTeamWithoutRaupp,
} = require("./samples");

const {
  testServerPort
} = require("../utils/envs");

const {
  testDb, 
  initializeTestDb
} = require("./config/testDb");

chai.use(chaiHttp);
chai.use(chaiJson);

const expect = chai.expect;
const koa = new Koa()

koa.use(router.routes()).use(router.allowedMethods());

// TESTES PRELIMINARES:
describe("Um simples conjunto de testes sobre 'userSchema'.", function () {
  before(() => {
    testServer = koa.listen(testServerPort, () => {
      console.log(`Test server running on port "http://localhost:${testServerPort}"!`);
    });
  })

  after(() => {
    testServer.close();
  })
  
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

//TESTES DA APLICAÇÃO:
describe("Testes da aplicação", () => {
  before(() => {
    initializeTestDb();
    testServer = koa.listen(testServerPort, () => {
      console.log(`Test server running on port "http://localhost:${testServerPort}"!`);
    });
  });

  after(() => {
    testDb.close();
    testServer.close();
  });

  // beforeEach(async () => { // reinitializes the test database before each individual test case
  //   await initializeTestDb();
  // });

  it("o servidor está online", function (done) {
    chai
      .request(testServer)
      .get("/users")
      .end(function (err, res) {
        assert.equal(err, null);
        assert.equal(res.status, 200);
        done();
      });
  });

  it("deveria haver uma lista vazia de usuários", function (done) {
    chai
      .request(testServer)
      .get("/users")
      .end(function (err, res) {
        expect(err, null);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array').that.is.empty;
        done();
      });
  });

  it("deveria criar os usuários deVoz", function (done) {
    
    let requests = deVozTeamWithRaupp.map(user => 
      chai
        .request(testServer)
        .keepOpen()
        .post("/user")
        .send(user)
    );
    // console.log(requests)
    Promise.all(requests).then(responses => {
      responses.forEach(res => {
        console.log(res.body.message)
        expect(res.body.message).to.equal("Data added succesfully!");
        expect(res.status).to.equal(201);
      });
      done();
    }).catch(err => {
      done(err);
    });
  });

  it("deveria haver uma lista com pelo menos 5 usuários", function (done) {
    chai
      .request(testServer)
      .keepOpen()
      .get("/users")
      .end(function (err, res) {
        expect(err, null);
        expect(res.status, 200);
        expect(res.body, deVozTeamWithRaupp);
        expect(res.body.length, 6);
        done();
      });
  });

  it("deveria bloquear o cadastro do usuário Joãozinho", function (done) {
    chai
      .request(testServer)
      .keepOpen()
      .post("/user")
      .send({
        nome: "Joãozinho",
        cpf: "00000000006",
        email: "joaozinho@devoz.com.br",
        age: 80,
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
      .request(testServer)
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
      .request(testServer)
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
      .request(testServer)
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
      .request(testServer)
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

  it("verifica se a idade de Estévez foi atualizada", function () {
    let awaitFunction = async function () {
      await new Promise(
        chai
          .request(testServer)
          .keepOpen()
          .get("/users/2")
          .then(function (err, res) {
            expect(err, null);
            expect(res.status, 200);
            expect(res.body[0].age, 36);
          })
      );
    };
  });

  it("deveria excluir o usuário raupp", function (done) {
    chai
      .request(testServer)
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
      .request(testServer)
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
      .request(testServer)
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
