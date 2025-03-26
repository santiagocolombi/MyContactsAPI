module.exports = (request, response, next)=>{
    response.setHeader('Access-Control-Allow-Origin','http://localhost:3001');
    //Methods para permitir req que façam preFlight
    response.setHeader('Access-Control-Allow-Methods','*');//* para liberar todos os métodos
    response.setHeader('Access-Control-Allow-Headers','*');
    response.setHeader('Access-Control-Max-Age','10'); //tempo que a req  preFligth fica em cache em s

    next(); //next pula para o próximo midleware
        //esse Access é para conectar com meu front-end
};//esse midleware precisa estar antes das rotas, serve para não ter q fazer headers em todas as rotas
//para o CORSE
