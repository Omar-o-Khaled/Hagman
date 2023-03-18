const words = ['application','programming','interface','wizard'];
let selectedWord=words[Math.trunc(words.length*Math.random())];
let selectedWordArray=selectedWord.split("");
let wordContainer=document.querySelector(".word");
let wrongLetterContainer=document.querySelector(".wrong_letters");
let allLine=[...document.querySelectorAll(".figure-part")];
let popup=document.querySelector(".popup");
let exist=document.querySelector(".exist");
let popupHeading=document.querySelector(".popupHeading");
let linesCount=allLine.length;
let play=document.querySelector(".play");

let arrayTrue=[];
let arrayFalse=[];

function removeLines(){
    allLine.map(singleLine=>{
        singleLine.style.display="none";
    })
}
removeLines();

function createTrueSpan(){
    selectedWordArray.map((letter)=>{
        let spanTrue=document.createElement("span");
        spanTrue.className="single_litter";
        wordContainer.append(spanTrue);
    })
}
createTrueSpan();

function createFalseSpan(){
    wrongLetterContainer.innerHTML="";
    let p=document.createElement("p");
    p.innerHTML="Word";
    wrongLetterContainer.append(p)

    if(arrayFalse){
        arrayFalse.map((value,i)=>{
            let spanFalse=document.createElement("span");
            spanFalse.innerHTML=value;
            wrongLetterContainer.append(i?" - ":"",spanFalse);            
        })
    }
}
function writeYourLetter(){
    document.addEventListener("keypress",keybordLetter);
    function keybordLetter(ele){
        let numLetter=ele.which;
        let letterKeyboard=String.fromCharCode(numLetter);
        let trueSpan=[...document.querySelectorAll(".single_litter")];
        
        if(selectedWordArray.includes(letterKeyboard)){
            selectedWordArray[selectedWordArray.indexOf(letterKeyboard)]
            trueSpan[selectedWordArray.indexOf(letterKeyboard)].innerHTML=letterKeyboard;
            trueSpan[selectedWordArray.lastIndexOf(letterKeyboard)].innerHTML=letterKeyboard;
            if(!arrayTrue.includes(letterKeyboard)){
                arrayTrue.push(letterKeyboard);
                if(trueSpan[selectedWordArray.indexOf(letterKeyboard)]!=trueSpan[selectedWordArray.lastIndexOf(letterKeyboard)]){
                    arrayTrue.push(letterKeyboard);
                }
            }else{
                showSetTimePopup();
            }
        } else{
            if(!arrayFalse.includes(letterKeyboard)){
                arrayFalse.push(letterKeyboard);
                createFalseSpan();
                lineDraw();
                checkfalseArrayLength();
            }else{
                showSetTimePopup();
            }
        }
        arrayTrueLength()
    }
}
writeYourLetter();
function arrayTrueLength(){
    if(selectedWordArray.length==arrayTrue.length){
        popupHeading.innerHTML="Congratulations! You won! 😃";
        popup.classList.add("showPopup");
    }
}
function lineDraw(){
    allLine.map((singleLine,i,arr)=>{
        if(arrayFalse[i]){
            singleLine.style.display="block";
        }
    })
}
function checkfalseArrayLength(){
    if(arrayFalse.length >= linesCount){
        popup.classList.add("showPopup");
        popupHeading.innerHTML="Unfortunately you lost. 😕";
    }
}

play.addEventListener("click",clearAllData)
function clearAllData(){
    arrayTrue=[];
    arrayFalse=[];
    selectedWord=words[Math.trunc(words.length*Math.random())];
    selectedWordArray=selectedWord.split("");
    wordContainer.innerHTML="";
    wrongLetterContainer.innerHTML="";
    createTrueSpan();
    removeLines();
    popup.classList.remove("showPopup");
}
function showSetTimePopup(){
    setTimeout(()=>{exist.classList.add("existShow");},100);
    setTimeout(()=>{exist.classList.remove("existShow");},1000);
}