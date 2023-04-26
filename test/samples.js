const userSchema = {
  title: "Schema do Usuario, define como é o usuario, linha 24 do teste",
  type: "object",
  required: ["nome", "email", "cpf"],
  properties: {
    nome: {
      type: "string",
    },
    email: {
      type: "string",
    },
    age: {
      type: "number",
      minimum: 18,
    },
  },
};

const rauppFound = [
  {
    id: 1,
    age: 35,
    cpf: "00000000001",
    email: "jose.raupp@devoz.com.br",
    nome: "Raupp",
  },
];

const deVozTeamWithRaupp = [
  {
    id: 1,
    age: 35,
    cpf: "00000000001",
    email: "jose.raupp@devoz.com.br",
    nome: "Raupp",
  },
  {
    id: 2,
    age: 53,
    cpf: "00000000002",
    email: "antonio.estevez@devoz.com.br",
    nome: "Estévez",
  },
  {
    id: 3,
    age: 85,
    cpf: "00000000003",
    email: "giacinto.scielsi@devoz.com.br",
    nome: "Scielsi",
  },
  {
    id: 4,
    age: 38,
    cpf: "00000000004",
    email: "gerard.grisey@devoz.com.br",
    nome: "Grisey",
  },
  {
    id: 5,
    age: 46,
    cpf: "00000000005",
    email: "tristan.murail@devoz.com.br",
    nome: "Murail",
  },
];

const estevezFound = [
  {
    id: 2,
    age: 53,
    cpf: "00000000002",
    email: "antonio.estevez@devoz.com.br",
    nome: "Estévez",
  },
];

const deVozTeamWithoutRaupp = [
  {
    id: 2,
    age: 53,
    cpf: "00000000002",
    email: "antonio.estevez@devoz.com.br",
    nome: "Estévez",
  },
  {
    id: 3,
    age: 85,
    cpf: "00000000003",
    email: "giacinto.scielsi@devoz.com.br",
    nome: "Scielsi",
  },
  {
    id: 4,
    age: 38,
    cpf: "00000000004",
    email: "gerard.grisey@devoz.com.br",
    nome: "Grisey",
  },
  {
    id: 5,
    age: 46,
    cpf: "00000000005",
    email: "tristan.murail@devoz.com.br",
    nome: "Murail",
  },
];

module.exports = {
  userSchema,
  rauppFound,
  deVozTeamWithRaupp,
  estevezFound,
  deVozTeamWithoutRaupp,
};
