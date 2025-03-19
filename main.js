let firstNumber = null;
let secondNumber = null;
let operator = null;
let waitingForSecondNumber = false;
let resultShown = false;

const numbers = document.querySelectorAll(".number");
const display = document.querySelector("#display span");
const operations = document.querySelectorAll(".operation");
const equals = document.querySelector('#equals');
const clear = document.querySelector('#clear');
const dot = document.querySelector('#dot');
const backspace = document.querySelector('#delete');


function add(x,y) {
	return x + y;
};

function subtract(x,y) {
	return x-y;
};

function multiply(arr = []) {
    let resultMultiply = 1;
    for(let i=0;i<arr.length;i++){
      resultMultiply *= arr[i];
    }
    return resultMultiply;
};

function divide(x,y){
    if(isNaN(x/y)){
      return "ERROR"
    }else if(x/y === Infinity){
      return 'nope';
    }
    return x/y;
}

function operate(operator,firstNumber,secondNumber){
  if(operator === '+'){
      return add(firstNumber,secondNumber);
  }else if(operator === '-'){
     return subtract(firstNumber,secondNumber);
  }else if(operator === '*'){
    return multiply([firstNumber,secondNumber]);
  }else if(operator === '/'){
    return divide(firstNumber,secondNumber);
  }else{
    return "ERROR"
  }
}

numbers.forEach(number => {
  number.addEventListener('click', () => {
    display.style.opacity= 1;

    if(resultShown){
      display.innerText = '';
      resultShown = false;
    }

    if (waitingForSecondNumber) {
      display.innerText = "";
      waitingForSecondNumber = false;
    }

    if (display.innerText === "0.00") {
      display.innerText = "";
  }

    if (display.innerText.length >= 16) return;
    
    
    display.innerText += number.innerText;
  });
})

operations.forEach(operation => {
  operation.addEventListener('click', ()=>{
    if (display.innerText === '0.00') return;
    firstNumber = display.innerText;
    operator = operation.innerText;
    waitingForSecondNumber = true;
  })
})

function formatResult(result) {
  let resultStr = result.toString();

  if (resultStr.length > 16) {
      if (result % 1 !== 0) { 
          let maxLength = 16; 
          return result.toPrecision(maxLength - 2); 
      } else { 
          return resultStr.slice(0, 16);
      }
  }

  return resultStr;
}

equals.addEventListener('click', () =>{
  if (!operator || !firstNumber) return;

  secondNumber = display.innerText;

  let result = operate(operator,Number(firstNumber),Number(secondNumber));
  
  display.innerText = formatResult(result);
  resultShown = true;
})

clear.addEventListener('click', ()=>{
  display.innerText = '0.00';
  display.style.opacity = 0.3;
  firstNumber = null;
  secondNumber = null;
  operator = null;
  waitingForSecondNumber = false;
  resultShown = false;
})

dot.addEventListener('click',()=>{
  if(!display.innerText.includes('.')){
    display.innerHTML += '.';
  }
})

backspace.addEventListener('click', ()=>{
  if(display.innerText !== '0.00' &&  display.style.opacity !== 0.3){
    display.innerText = display.innerText.slice(0,-1);
  }
  
  if(display.innerText.length === 0){
    display.innerText = '0.00'
    display.style.opacity = 0.3;
  }
})

document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (!isNaN(key)) {
      document.querySelector(`button[data-value='${key}']`)?.click();
  } else if (["+", "-", "*", "/"].includes(key)) {
      document.querySelector(`button[data-value='${key}']`)?.click();
  } else if (key === "Enter" || key === "=") {
      document.querySelector(`button[data-value='=']`)?.click();
  } else if (key === "Backspace") {
      document.querySelector(`button[data-value='backspace']`)?.click();
  } else if (key === "Escape") {
      document.querySelector(`button[data-value='clear']`)?.click();
  } else if (key === ".") {
      document.querySelector(`button[data-value='.']`)?.click();
  }
});


