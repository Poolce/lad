const funs = require('../functions.js');
const { handler } = require('@hapi/hapi/lib/cors.js');
const Hapi = require('@hapi/hapi');



async function response(req, h) {
  let url = 
  [
    'https://stackoverflow.com/questions/9168737/read-a-text-file-using-node-js',
    'https://learn.javascript.ru/promise?ysclid=l7hrjy152a262632226',
    'https://habr.com/ru/post/435084/?ysclid=l7hshp9oz1328557447',
    'https://infostart.ru/1c/articles/812886/?ysclid=l7hnxl4a6l651953880'
  ];


  let result = await funs.getResult(url);


  return h.response(result)
    .header('Content-Type', 'application/pdf')
    .header('Content-Disposition', 'attachment; filename= ' + 'file.pdf');

}
  
  module.exports = {
    method: 'GET', // Метод
    path: '/', // Путь
    options: { 
      handler: response,
    }
    
  };