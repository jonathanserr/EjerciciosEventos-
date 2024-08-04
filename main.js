console.log("helloo");

// Ejercicio IMC evento Submit

document.getElementById("form").addEventListener("submit", (evento) => {
    evento.preventDefault()
    const altura = parseFloat(document.getElementById("altura").value) / 100
    const kilogramos = parseFloat(document.getElementById("kilogramo").value)

    if (altura > 0 && kilogramos > 0) {
        const imc = kilogramos / (altura * altura)
        const resultado = "  Su Indice de Masa Corporal es --> " + imc.toFixed(1)
        document.getElementById("IMC").value = resultado
    } else {
        document.getElementById("IMC").value = 'INTRODUZCA VALORES VALIDOS'
    }

})