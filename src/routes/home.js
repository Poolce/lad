const funs = require('../functions.js');
const PDFDocument = require('pdfkit');
const { handler } = require('@hapi/hapi/lib/cors.js');
const Hapi = require('@hapi/hapi');
const { output } = require('pdfkit');
const fs = require('fs');


async function response(req, h) {

  let url = 
[
  'https://stackoverflow.com/questions/9168737/read-a-text-file-using-node-js',
]
pdfDoc = new PDFDocument;
let l = await pdfDoc.pipe(fs.createWriteStream('SampleDocument.pdf'));
l = await pdfDoc.registerFont('Spectral', 'Spectral.ttf');

k = await funs.getResult(url,pdfDoc);

k = await pdfDoc.end();

  // a = await funs.getText(url);
  // a = await funs.getRateOfWords(a,4);

  // k = await funs.getResult(url);
  // s = await k;
  return h.response(pdfDoc)
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