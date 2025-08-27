console.log("AS SOMAS DOS SEUS CALCULOS SÃO:");

function soma(a, b) {
    return a + b;
}

function subtracao(a, b) {
    return a - b;
}

function multiplicacao(a, b) {
    return a * b;
}
function divisao(a, b) {
    if (b === 0) {
        throw new Error("Divisão por zero não é permitida.");
    }
    return a / b;   
}
function raizQuadrada(a) {
    if (a < 0) {
        throw new Error("Número negativo não tem raiz quadrada real.");
    }
    return Math.sqrt(a);
}
function potencia(a, b) {
    return Math.pow(a, b);
}   




module.exports = {
    soma,
    subtracao,
    multiplicacao,
    divisao,
    raizQuadrada,
    potencia
}