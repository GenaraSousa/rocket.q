// Responsável por iniciar o servidor
const express = require('express');
const route = require('./routes');
const path = require('path');

const server = express();

//o modulo ejs é necessário pois o node não entende html
// o ejs vai ser responsável por renderizar nosso front-end
// Essas são configurações necessárias para o node entender o ejs e para o ejs encontrar a pasta views
// a pasta tem que chamar views
server.set('view engine', 'ejs');

// dizer quais conteúdos estáticos existem no projeto para o express
server.use(express.static("public"))

server.set('views', path.join(__dirname, 'views'))


//configurando middleware para que seja posssível pegar informações do body pelas rotas
server.use(express.urlencoded({extended: true}))

// Estou dizendo pro express usar as rotas que estão no arquivo de rotas
server.use(route);

server.listen(3000, () => console.log("Rodando 🚀"));