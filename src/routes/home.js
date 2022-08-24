const {convert} = require('html-to-text');
var needle = require('needle');

async function getText(url)
{
    let htmlText = await needle('get', url);
    let text = await convert(String(htmlText.body), { wordwrap: 0 });
    text=text.replace(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g, '').replace(/\s+/g,' ').trim();
    let resText='';

    for(i=0;i<=text.length;i++)
    {
      if(text[i]=='[')
      {
        while(text[i]!=']'&&i<=text.length)
        {
          i++;
        }
        i++;
      }
      resText += text[i];
    }

    console.log(text);
    return resText;

}

async function response() {
  var url = 'https://yandex.ru/';
  a = await getText(url);
  console.log(a);
  return String(a);
  }
  
  module.exports = {
    method: 'GET', // Метод
    path: '/', // Путь
    options: { 
      handler: response // Функция, обработчик запроса, для hapi > 17 должна возвращать промис
    }
  };