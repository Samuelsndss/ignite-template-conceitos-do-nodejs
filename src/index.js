const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  // Complete aqui

  const {username} = request.headers; 

  const userExist = users.find(userExist => 
    userExist.username == username
    );

    if(!userExist) {
      return response.status(400).json({error: "Já Existe Mensagem de erro!! "});
    }
}

app.post('/users', (request, response) => {
  // Complete aqui
  const {name, username} = request.body;

  const userAlreadyExist = users.some(
    (userExist) => userExist.username === username
  );

  if(userAlreadyExist) {
    return response.status(400).json({error: "Essa Conta Existe"});
  }

  users.push({
    id: uuidv4(),
    name,
    username,
    todos: []
  });

  return response.status(201).json(users);
});

app.get('/todos', (request, response) => {
  const { users } = request;

  return response.json(users);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;