const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");
const resetEl = document.getElementById("reset");

const randomFunc = {
    upper : randomUpperCase,
    lower : randomLowerCase,
    number : randomNumber,
    symbol : randomSymbol
}

clipboardEl.addEventListener("click" ,()=>{
    const textArea = document.createElement("textarea");
    const finalPassword = resultEl.innerText;
    
    if(!finalPassword)
    {
        return;
    }
    textArea.value = finalPassword;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
    alert("Password is copied to the clipboard");
});
function generatePassword()
{
    const length = +lengthEl.value;
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumber = numberEl.checked;
    const hasSymbol = symbolEl.checked;

    resultEl.innerText = makePassword(hasUpper,hasLower,hasNumber,hasSymbol, length);

};

function makePassword(upper,lower,number,symbol,length) 
{
    if(length<4 || length>20)
    {
        return alert("Please choose appropriate length !");
    }
    let password = "";
    const count = upper + lower + number + symbol ;
    const arr = [{upper}, {lower}, {number}, {symbol}].filter(
        item => Object.values(item)[0]   
    );
    if(count===0)
    {
        return "";
    }

    for(let i=0; i<length; i+=count)
    {
        arr.forEach(type => {
            const funcName = Object.keys(type)[0];
            password += randomFunc[funcName]();
        });
    }
    const editPassword = password.slice(0,length);
   return editPassword;
}

resetEl.addEventListener("click", ()=>{
    resultEl.innerText = "";
});

function randomLowerCase()
{
    return String.fromCharCode(Math.floor(Math.random()*26 + 97));
}
function randomUpperCase()
{
    return String.fromCharCode(Math.floor(Math.random()*26 + 65));
}
function randomNumber()
{
    return String.fromCharCode(Math.floor(Math.random()*10 + 48));
}
function randomSymbol()
{
    const symbols = "!@#$%^&*()_+=-{}[]\/><?,;:'"
    return symbols[Math.floor(Math.random()*symbols.length)];
}
