const {convert} = require('html-to-text');
var needle = require('needle');
const { format } = require('url');
const fs = require('fs');
let { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
///Pdfmake
module.exports = {
    getText:getText,
    getRateOfWords: getRateOfWords,
    addToPDF: addToPDF 
}


async function addToPDF(url,arr)
{
    const pdfDoc = await PDFDocument.create()

// Embed the Times Roman font
const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

// Add a blank page to the document
const page = pdfDoc.addPage()

// Get the width and height of the page
const { width, height } = page.getSize()

// Draw a string of text toward the top of the page
const fontSize = 30
page.drawText('Creating PDFs in JavaScript is awesome!', {
  x: 50,
  y: height - 4 * fontSize,
  size: fontSize,
  font: timesRomanFont,
  color: rgb(0, 0.53, 0.71),
})

// Serialize the PDFDocument to bytes (a Uint8Array)
const pdfBytes = await pdfDoc.save()
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

    console.log(htmlText);

    let text = await convert(htmlText.body, { wordwrap: null });//преобразовывает html в слова

    text = await text.replace(/[^ а-яё]/gi, '');//выбирает только русские слова

    text= await text.toLowerCase();//Большими буквами

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
