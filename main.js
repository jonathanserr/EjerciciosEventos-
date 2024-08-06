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

// Ejercicio Divisas

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

// Ejercicio Notas


let notas = [
    {
        id: 1,
        titulo: "Sacar la basura",
        texto: "mi mama me va a retar si no o hago",
        realizada: false,
    },
    {
        id: 2,
        titulo: "Estudiar eventos",
        texto: " taller para martes 8am",
        realizada: false,
    },
    {
        id: 3,
        titulo: "Series pendientes",
        texto: "ver ultimos capitulos de The Boys",
        realizada: true,
    }
]

let idGlobal = 3;

let contenedorNotas = document.getElementById("contNotas")
let Guardarbt = document.getElementById("Guardar")
let tituloNota = document.getElementById("titulo")
let descripcionNota = document.getElementById("notaDecripcion")
let filterCheck = document.getElementById("CheckFiltro")
let filterSearch = document.getElementById("Busqueda")

function crearNota(nota) {
    let notaHTML = `
    <div class="card col-sm-6 col-md-5 col-lg-4 " id="note-${nota.id}">
            <div class="card-header d-flex justify-content-start ">
                <input class="form-check-input " onClick="marcarRealizada(${nota.id})" type="checkbox" ${nota.realizada ?
                    "checked" : ""} id="note-${nota.id}">
                <h5 class="card-title">${nota.titulo}</h5>
            </div>
            <p class="card-text p-2">${nota.texto}</p>
            <div class="d-flex justify-content-end">
                <button type="button" onclick="borrarNota(${nota.id})" class="btn btn-danger m-2">Borrar Nota</button>
            </div>
    </div>
    `
    return notaHTML
}

function pintarNotas(notas, contenedorNotas) {
    let notasHTML = ""
    if (notas.length > 0) {
        for (let nota of notas) {
            notasHTML += crearNota(nota)
        }
        contenedorNotas.innerHTML = notasHTML
    } else {
        contenedorNotas.innerHTML = ""
        let NoNotas = document.createElement("div")
        NoNotas.textContent = "NO HAY NOTAS PARA MOSTRAR"
        contenedorNotas.appendChild(NoNotas)
    }
}

function agregarNota(titulo, texto) {
    idGlobal++
    let nota = {
        id: idGlobal,
        titulo: titulo,
        texto: texto,
        realizada: false
    }
    notas.push(nota)
}

function borrarNota(id) {
    let Borrar = notas.findIndex(nota =>
        nota.id == id)
    notas.splice(Borrar, 1)
    pintarNotas(notas, contenedorNotas)
}

function limpiarCampos() {
    tituloNota.value = ""
    descripcionNota.value = ""
}

function marcarRealizada(id){
    let i = notas.findIndex(nota => nota.id == id)
    notas[i].realizada = !notas[i].realizada
    pintarNotas(notas, contenedorNotas)
}

function filtrarPorRealizada(notas){
    if (filterCheck.checked) {
        return notas.filter(nota => nota.realizada)
    }
    return notas
}

function filtrarPorTexto(notas, texto){
    let notasFiltradas = notas.filter(nota => nota.titulo.toLowerCase().includes(texto)
    || nota.texto.toLowerCase().includes(texto))
    return notasFiltradas
}

pintarNotas(notas, contenedorNotas)

Guardarbt.addEventListener("click", () => {
    let titulo = tituloNota.value
    let texto = descripcionNota.value

    if (titulo == "" || texto == "") {
        alert("Campos X Llenar")
    } else {
        agregarNota(titulo, texto)
        pintarNotas(notas, contenedorNotas)
        tituloNota.value = ""
        descripcionNota.value = ""
        filterCheck.checked = false
        filterSearch.value = ""
    }
})

filterCheck.addEventListener("click", () => {
    let notasFilter = filtrarPorRealizada(notas)
    notasFilter = filtrarPorTexto(notasFilter, filterSearch.value.toLowerCase())
    pintarNotas(notasFilter, contenedorNotas)
})

filterSearch.addEventListener("keyup", () => {
    let notasFilter = filtrarPorTexto(notas, filterSearch.value.toLowerCase())
    notasFilter = filtrarPorRealizada(notasFilter)
    pintarNotas(notasFilter, contenedorNotas)
})


