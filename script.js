const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');


let firstValue = 0;
let operatotValue = '';
let awaitingNextValue = false;

function sendNumberValue (number) {
     //Replace current display value if first value is entered
        if (awaitingNextValue) {
            calculatorDisplay.textContent = number ;
            awaitingNextValue = false;
        } else {
             //If current display value is 0, replace it,if not add number
            const displayValue=calculatorDisplay.textContent
            calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
        }
   
    // console.log(number);
   
}


function addDecimal(){
    // If operator pressed , dont't add decimal
    if(awaitingNextValue) return;
     //If no decimal, add one 
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}




//Calculate first and second values depending on operator
const Calculate = {
    '/' :(firstNumber,secondNumber) => firstNumber / secondNumber ,
    '*' :(firstNumber,secondNumber) => firstNumber * secondNumber ,
    '+' :(firstNumber,secondNumber) => firstNumber + secondNumber ,
    '-' :(firstNumber,secondNumber) => firstNumber - secondNumber ,
    '=' :(firstNumber,secondNumber) => secondNumber ,
};




function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);

    // Assign firstValue if no value
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        console.log(firstValue, operatorValue, currentValue);
        const calculation = Calculate[operatorValue](firstValue, currentValue);
        console.log('calculation', calculation);
        firstValue = calculation; // Update firstValue for the next operation
        calculatorDisplay.textContent = calculation; // Display the result
    }

    // For the '=' operator, clear operatorValue and awaitingNextValue
    if (operator === '=') {
        operatorValue = '';
        awaitingNextValue = false;
    } else {
        // Ready for next value, store operator
        awaitingNextValue = true;
        operatorValue = operator;
    }
}







//original code

// function useOperator(operator) {
//     const currentValue = Number(calculatorDisplay.textContent) ;
    
//     //Prevent multiple operators
//     // if (operatorValue && awaitingNextValue)  
//     // {
//         // operatorValue =operator;
//         // return;

//     // }



//     //Assign firstValue if no value
//     if (!firstValue){
//         firstValue = currentValue ;
//     } else {
//         console.log(firstValue, operatorValue , currentValue);
//         const calculation = Calculate[operatorValue](firstValue , currentValue);
//         console.log(('calculation' , calculation));
//     }


// // For the '=' operator, clear operatorValue and awaitingNextValue
// if (operator === '=') {
//     operatorValue = '';
//     awaitingNextValue = false;
// } else {
//     // Ready for next value, store operator
//     awaitingNextValue = true;
//     operatorValue = operator;
// }
// }








//     console.log('firstValue' ,firstValue);
//     console.log('operator' , operatotValue);
//}
// console.log(inputBtns);









//Add Event Listeners for numbers, operators , decimal buttons

inputBtns.forEach((inputBtn) => {

    if (inputBtn.classList.length === 0) {

        inputBtn.addEventListener('click' , () => sendNumberValue(inputBtn.value))  ;

    } else if (inputBtn.classList.contains('operator')) {

        inputBtn.addEventListener('click' , () => useOperator(inputBtn.value))  ;

    } else if (inputBtn.classList.contains('decimal')) {

        inputBtn.addEventListener('click' , () => addDecimal())  ;
    }

} );

//Reset display
function resetAll(){
 firstValue = 0;
 operatotValue = '';
 awaitingNextValue = false;
calculatorDisplay.textContent = '0';
}

//Event Listener
clearBtn.addEventListener('click' ,resetAll);