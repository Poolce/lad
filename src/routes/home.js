const funs = require('../functions.js');


async function response() {
  var url = 'https://habr.com/ru/post/684684/';


  a = await funs.getText(url);
  a = await funs.getRateOfWords(a,4);
  return a;
  }
  
  module.exports = {
    method: 'GET', // Метод
    path: '/', // Путь
    options: { 
      handler: response // Функция, обработчик запроса, для hapi > 17 должна возвращать промис
    }
  };