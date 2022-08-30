const funs = require('../functions.js');
const PDFDocument = require('pdfkit');
const { handler } = require('@hapi/hapi/lib/cors.js');
const Hapi = require('@hapi/hapi');
const { output } = require('pdfkit');


async function response() {
  var url = 'https://stackoverflow.com/questions/9168737/read-a-text-file-using-node-js'


  a = await funs.getText(url);
  a = await funs.getRateOfWords(a,4);

  let res = new PDFDocument;
  res = await funs.addToPDF(url,a);

  res.info['Title'] = 'TestDocument';
  console.log(res.info);
  
  return 'f';
  }
  
  module.exports = {
    method: 'GET', // Метод
    path: '/', // Путь
    options: { 
      handler: response,
    }
  };