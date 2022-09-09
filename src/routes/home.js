const funs = require('../functions.js');
const { handler } = require('@hapi/hapi/lib/cors.js');
const Hapi = require('@hapi/hapi');



async function response(req, h) {

  console.log(req.payload);
  let url = [];
  url = await req.payload.text.split(',');
  
  let result = await funs.getResult(url);


  return h.response(result)
    .header('Content-Type', 'application/pdf')
    .header('Content-Disposition', 'attachment; filename= ' + 'response.pdf');

}
  
  module.exports = {
    method: 'POST', // Метод
    path: '/res', // Путь
    options: { 
      handler: response,
    }
  };