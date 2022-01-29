const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const {username} = request.headers; 

  const user = users.find(user => 
    user.username == username
    );

    if(!user) {
      return response.status(400).json({error: "Já Existe Mensagem de erro!! "});
    }

    request.user = user;

    return next();
}

app.post('/users', (request, response) => {

  const {name, username} = request.body;

  const userAlreadyExist = users.some(
    (user) => user.username === username
  );

  if(userAlreadyExist) {
    return response.status(400).json({error: "Essa Conta Existe"});
  }

  const user = {
    id: uuidv4(),
    name,
    username,
    todos: []
  };

  users.push(user);

  return response.status(201).json(user);
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;

  return response.json(user.todos);

});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const {title, deadline} = request.body;

  const { user } = request;

  const userInclud = {
    id: uuidv4(), 
	  title,
	  done: false, 
	  deadline: new Date(deadline), 
	  created_at: new Date()
  }
  
  user.todos.push(userInclud);

  return response.json(user.todos);

});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const {title, deadline} = request.body;
  const { user } = request;
  const {id} = request.params;

  const todo = user.todos.find(
    todo => todo.id === id
  );

  if (!todo){
    return response.status(404).json({  error : 'Mensagem do erro' });
  }

    todo.title = title;
    todo.deadline = new Date(deadline);

    return response.status(201).json(todo);

});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;