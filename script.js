let currentValue = 0;
let screenValue = "0";
let prevOp;

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (!isNaN(key) || key === '+' || key === '-') {
        clickButton(key);
    }  else if (key === '*'){
        clickButton('×');
    } else if(key === '/'){
        clickButton('÷');
    } else if (key === 'Enter') {
        clickButton('=');
    } else if (key === 'Backspace') {
        clickButton('←');
    } else if (key === 'Escape') {
        clickButton('CLEAR');
    }
});


const screen = document.querySelector('.screen');

function clickButton(value){
    if(isNaN(value)){
        handleSymbol(value);
    }
    else{
        handleNumber(value);
    }
    screen.innerText = screenValue;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'CLEAR':
            screenValue = "0";
            currentValue = 0;
            break;
        case '=':
            if(prevOp === null) {return}
            flushOperation(parseInt(screenValue));
            screenValue = currentValue.toString();
            currentValue = 0;
            break;
        case '←':
            if(screenValue.length === 1){
                screenValue = '0';
            }
            else{
                screenValue = screenValue.slice(0,screenValue.length-1);
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){
    if(screenValue === '0'){
        return;
    }
    const intscreenValue = parseInt(screenValue);
    if(currentValue === 0){
        currentValue = intscreenValue;
    }
    else{
        flushOperation(intscreenValue);
    }
    prevOp = symbol;
    screenValue = '0'
}

function flushOperation(intscreenValue){
    if(prevOp === "+"){
        currentValue += intscreenValue;
    }
    else if(prevOp === "-"){
        currentValue -= intscreenValue;
    }
    else if(prevOp === "×"){
        currentValue *= intscreenValue;
    }
    else if(prevOp === "÷"){
        currentValue /= intscreenValue;
    }
}

function handleNumber(numberString){
    console.log(numberString);
    if(screenValue === '0'){
        screenValue = numberString;
    }else if(prevOp === "="){
        prevOp = null;
        screenValue = numberString;
    }
    else{
        screenValue += numberString;
    }
}

function calculate(){
    document.querySelector('.numbers').addEventListener('click',function(event){
        console.log("Start");
        clickButton(event.target.innerText);
    });
}

calculate();