//Global variables
const passwordInput = document.querySelector('#password');
const copyButton = document.querySelector('#copy-button');
const renewButton = document.querySelector('#renew-button');
const passordLength = document.querySelector('#passord-length');
const size = document.querySelector('#passord-length-text');
const passCopyBtn1 = document.querySelector('#pass-copy-btn1');
const passCopyBtn2 = document.querySelector('#pass-copy-btn2');
const bar = document.querySelector('#security-indicator-bar');
let range = 4;
const upper = document.querySelector('#uppercase-check'),
    number = document.querySelector('#number-check'),
    symbol = document.querySelector('#symbol-check');

//Functions
function generatePassword(){
    let char = 'abcdefghijklmnopqrstuvxwyz';
    const upperCaseChar = 'ABCDEFGHIJKLMNOPQRSTUVXWYZ';
    const numberChar = '123456789';
    const symbolChar = '!@#$%&*()[]{}/?';

    if(upper.checked){
        char += upperCaseChar;
    }
    if(number.checked){
        char += numberChar;
    }
    if(symbol.checked){
        char += symbolChar;
    }

    let password = '';

    for(let i = 0; i < range; i++){
        const rand = Math.floor(Math.random() * char.length);
        password += char.substring(rand, rand + 1);
    }
    passwordInput.value = password;
    size.innerHTML = `${password.length}`;
}
function randLength(){
    range = passordLength.value;
    generatePassword();
}
function copyPassword(){
    navigator.clipboard.writeText(passwordInput.value);
}
function calculateQuality(){
    const percent = Math.round((passordLength.value / 64) * 
    25 + (upper.checked ? 15 : 0) + 
    (number.checked ? 25 : 0) + 
    (symbol.checked ? 35 : 0));
    if(percent <= 6){
        bar.classList.remove('warning', 'safe', 'completed');
        bar.classList.add('critical');
        bar.style.width = `${percent}%`
    } else if(percent >= 7 && percent <= 11){
        bar.classList.remove('critical', 'safe', 'completed');
        bar.classList.add('warning');
        bar.style.width = `${percent}%`
    } else if(percent >= 12 && percent <= 30){
        bar.classList.remove('critical', 'warning', 'completed');
        bar.classList.add('safe');
        bar.style.width = `${percent}%`
    } else if(percent >= 31 && percent <= 100){
        bar.classList.remove('critical', 'warning', 'safe');
        bar.classList.add('completed');
        bar.style.width = `${percent}%`
    }
}
function calculateFontSize(){
    if(passordLength.value > 45){
        passwordInput.classList.remove('large', 'medium');
        passwordInput.classList.add('little');
    }
    if(passordLength.value > 32 && passordLength.value < 45){
        passwordInput.classList.remove('large', 'little');
        passwordInput.classList.add('medium');
    }
    if(passordLength.value > 22 && passordLength.value < 32){
        passwordInput.classList.remove('medium', 'little');
        passwordInput.classList.add('large');
    }
}

//Event listeners
renewButton.addEventListener('click', () => {
    generatePassword();
    calculateQuality();
    renewButton.classList.add('clicked');
});
passordLength.addEventListener('input', () => {
    randLength();
    calculateQuality();
    calculateFontSize();
});
passCopyBtn1.addEventListener('click', copyPassword);
passCopyBtn2.addEventListener('click', copyPassword);
upper.addEventListener('click', () => {calculateQuality(); generatePassword()});
number.addEventListener('click', () => {calculateQuality(); generatePassword()});
symbol.addEventListener('click', () => {calculateQuality(); generatePassword()});