const express = require ('express');
require('express-async-errors');

const routes = require('./routes')
const app = express();
const cors = require('./app/controllers/middlewares/cors')
const errorHandler = require('./app/controllers/middlewares/errorHandler')

app.use(express.json());
app.use(cors);
app.use(routes); // para usar as rotas
app.use(errorHandler);


app.listen(3000,()=> console.log('servidor iniciado em http://localhost:3000'))


