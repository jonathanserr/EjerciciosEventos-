console.log("helloo");

// Ejercicio IMC evento Submit

document.getElementById("form").addEventListener("submit", (evento) => {
    evento.preventDefault()
    let altura = parseFloat(document.getElementById("altura").value) / 100
    let kilogramos = parseFloat(document.getElementById("kilogramo").value)

    if (altura > 0 && kilogramos > 0) {
        let imc = kilogramos / (altura * altura)
        let resultado = "  Su Indice de Masa Corporal es --> " + imc.toFixed(3)
        document.getElementById("IMC").value = resultado
    } else {
        document.getElementById("IMC").value = 'INTRODUZCA VALORES VALIDOS'
    }

})

let usd = document.getElementById('dolar')
let cop = document.getElementById('peso')
let tasaCambio = 4052.01
let temporal = 0;

usd.addEventListener('focus' , ()=>{
    temporal = 'dolar';
})
usd.addEventListener('blur' , ()=>{
    temporal = 0;
})
cop.addEventListener('focus' , ()=>{
    temporal = 'peso';
})
cop.addEventListener('blur' , ()=>{
    temporal = 0;
})

function cambio() {
    let dolares = parseFloat(usd.value);
    let pesos = parseFloat(cop.value);
    if (temporal === 'dolar' && dolares >= 0) {
        cop.value = (dolares * tasaCambio).toFixed(2);
    } else if (temporal === 'peso' && pesos > 0) {
        usd.value = (pesos / tasaCambio).toFixed(2);
    } 
}

usd.addEventListener('keyup', cambio)
cop.addEventListener('keyup', cambio)


