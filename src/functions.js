const {convert} = require('html-to-text');
var needle = require('needle');
const { format } = require('url');
const fs = require('fs');
const PDFDocument = require('pdfkit');


module.exports = {
    getText:getText,
    getRateOfWords: getRateOfWords,
    addToPDF: addToPDF,
    getResult: getResult
}


async function getResult(arr_urls,pdfDoc)
{

  for(const url of arr_urls)
  {

    let words = await getText(url);

    let topWords = await getRateOfWords(words,4);

    let wtiting = await pdfDoc.font('Spectral').fontSize(10).fillColor('red').text(url+'\n\n');

     for(const word of topWords)
     {
       console.log(word);
       writing = await pdfDoc.font('Spectral').fontSize(10).fillColor('blue').text('|'+word[1]+'|\n');
     }
  }

 console.log('good');
}




async function addToPDF(url,arr)
{
  let pdfDoc = new PDFDocument;

  //pdfDoc.pipe(fs.createWriteStream('SampleDocument.pdf'));
  pdfDoc.registerFont('Spectral', 'Spectral.ttf');
  let resText ='';
  for(i=0;i<arr.length;i++)
  {
    resText+='| '+ arr[i][1] +' встречается '+ arr[i][0]+'раз | \n';
  }

  pdfDoc.font('Spectral').fontSize(10).fillColor('red').text(url+'\n'+resText);



pdfDoc.end();
return pdfDoc;
}


async function sizeWords(arr,minSize)
{
  res = [];
  for(i=0;i<arr.length;i++)
    {
      if(arr[i].length>minSize)
      {
        res.push(arr[i]);
      }
    
    }
    return res;
} 

async function getText(url)
{
    let htmlText = await needle('get', url); //Получение html текста страницы

    let text = await convert(htmlText.body, { wordwrap: null });//преобразовывает html в слова

    text = await text.replace(/[^\\da-zA-Zа-яёА-ЯЁ ]/g, '');//выбирает только слова

    text= await text.toUpperCase();//Большими буквами

    var wordsArr = await text.split(' ').filter(function(i){return i})//Разбивает слова в массив

    wordsArr = await sizeWords(wordsArr,4);//Только слова больше 5

    wordsArr = await wordsArr.sort();


    return wordsArr;
}

async function getRateOfWords(arr, wordsQuanity)
{
    arr = await arr.sort();//Сортировка
    let curWord = arr[0];
    let inputLength = arr.length;
    let resultArr=[];
    let curIndex = 1;

    for(i=1;i<inputLength;i++)
    {
      if(arr[i]==curWord)
      {
        curIndex++;
      }
      else
      {
        resultArr.push([curIndex,curWord]);
        curWord = arr[i];
        curIndex = 1;
      }
    }
    resultArr = await resultArr.sort(sortByIndex);
    return resultArr.splice(0,wordsQuanity);

}

function sortByIndex(a, b) {
  return b[0]-a[0];
}
