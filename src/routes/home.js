async function response() {
  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
  // content-type будет автоматически генерироваться в зависимости оттого какой тип данных  в ответе
    
    let vd = await fetch('https://api.github.com/');
    console.log(''+vd.text());
    vr = vd.json();
    return ''+vr.hub_url;
  }
  
  module.exports = {
    method: 'GET', // Метод
    path: '/', // Путь
    options: { 
      handler: response // Функция, обработчик запроса, для hapi > 17 должна возвращать промис
    }
  };