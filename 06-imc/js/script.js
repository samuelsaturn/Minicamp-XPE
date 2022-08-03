function start() {
    const buttonCalculateIMC = document.querySelector("#button-calcule-imc");
    buttonCalculateIMC.addEventListener('click', handleButtonClick);

    const inputWeight = document.querySelector("#input-weight")
    const inputHeight = document.querySelector("#input-height")

    inputWeight.addEventListener('input', handleButtonClick)
    inputHeight.addEventListener('input', handleButtonClick)

    handleButtonClick();
}

function calculateIMC(weight, height) {
    return weight / (height * height) ;
}

function handleButtonClick () {
    const inputWeight = document.querySelector("#input-weight")
    const inputHeight = document.querySelector("#input-height")
    let imcResult = document.querySelector("#imcResult")

    let weight = Number(inputWeight.value);
    let height = Number(inputHeight.value);

    let imc = calculateIMC(weight, height);
    const formattedIMC = imc.toFixed(2).replace('.', ',')
    
    imcResult.textContent = formattedIMC;
}

start()