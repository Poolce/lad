const etch = require('node-fetch');

async function response() {
    // content-type будет автоматически генерироваться в зависимости оттого какой тип данных  в ответе
    
    return fetch("https://hibrain.ru/news/materiali-dlya-podgotovki-k-backend-stazhirovke-");
  }
  
  module.exports = {
    method: 'GET', // Метод
    path: '/', // Путь
    options: { 
      handler: response // Функция, обработчик запроса, для hapi > 17 должна возвращать промис
    }
  };