module.exports = (error, request, response, next)=>{ //ordem importa!!!!!
    console.log('ERROR HANDLER');
    console.log(error);
    response.sendStatus(500) //criando o middleware tratador de erros
}
