const express = require ('express');
require('express-async-errors');

const routes = require('./routes')
const app = express();

app.use(express.json());
app.use(routes); // para usar as rotas
app.use((error, request, response, next)=>{
    console.log('ERROR HANDLER');
    console.log(error);
    response.sendStatus(500) //criando o middleware tratador de erros
});


app.listen(3000,()=> console.log('servidor iniciado em http://localhost:3000'))


