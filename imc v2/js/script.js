function start() {
    const buttonCalculateIMC = document.querySelector("#button-calcule-imc");
    buttonCalculateIMC.addEventListener('click', handleButtonClick);

    const inputWeight = document.querySelector("#input-weight")
    const inputHeight = document.querySelector("#input-height")

    inputWeight.addEventListener('input', handleButtonClick)
    inputHeight.addEventListener('input', handleButtonClick)
}

function calculateIMC(weight, height) {
    return weight / (height * height) ;
}

function determiningWeightRange(imcResult) {
    if (imcResult >= 16 && imcResult < 17) {
        return "Muito abaixo do peso"
    } else if (imcResult >= 17 && imcResult <= 18.4) {
        return 'Abaixo do peso'
    }
     else if (imcResult >= 17 && imcResult <= 18.4) {
        return 'Abaixo do peso'
    }
     else if (imcResult >= 18.5 && imcResult <= 24.99) {
        return 'Peso normal'
    }
     else if (imcResult >= 25 && imcResult <= 29.9) {
        return 'Acima do peso'
    }
     else if (imcResult >= 30 && imcResult <= 34.9) {
        return 'Obesidade Grau I'
    }
     else if (imcResult >= 35 && imcResult <= 40) {
        return 'Obesidade Grau II'
    }
     else if (imcResult > 40) {
        return 'Obesidade Grau III'
    } else {
        return 'Inválido'
    }
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

    let faixaResult = document.querySelector('#faixa')
    let result = determiningWeightRange(imc);
    faixaResult.textContent = result;
}

start()