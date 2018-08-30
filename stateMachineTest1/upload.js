var textarea=document.getElementById("upload");

var btn=document.getElementById("upload-btn");

btn.addEventListener("click",HandleUpload,false);

//Put initial value
var questions="[\n";
   questions+="{\n";
   questions+="'state': '0',\n";
   questions+="'Question':'1+1?',\n";
   questions+="'answers':['2','3','4'],\n";
   questions+="'right-answer': 0,\n";
    questions+="'next': 1\n";
   questions+="},\n";
    questions+="{\n";
   questions+="'state': 1,\n";
   questions+="'Question':'2+2?',\n";
   questions+="'answers':['2','3','4'],\n";
   questions+="'right-answer': 2,\n";
    questions+="'next':null\n";
   questions+="},\n";
    questions+="]\n";
var json=JSON.parse(questions);
console.log(JSON.stringify(json));

textarea.value=questions;



function HandleUpload(){
    console.log(textarea.value);
}