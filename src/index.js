const $ = ( className ) => document.querySelector(className)
const $All = ( className ) => document.querySelectorAll(className)

const getWorld = () => {
    const worlds = ["abaco", "abono", "actor", "afijo", "alijo", "aliso", "amago", "amigo", "ancla", "angel", "anglo", "anima", "anito", "antro", "aroma", "avena", "banco", "bello", "balsa", "blusa", "besar", "bruto", "bicho", "bomba", "boton", "carne", "cable", "cazar", "coger", "causa", "cerca", "cello", "clase", "cruza", "cabra", "drama", "datos", "dosis", "dulce", "doble", "darle", "dardo", "ducha", "dejar", "diana", "erizo", "error", "ebrio", "echar", "enter", "fideo", "flaco", "flama", "flema", "fresa", "fuego", "falso", "ficha", "fluir", "grano", "golpe", "gente", "grifo", "gasto", "grupo", "guion", "glifo", "hacha", "hacer", "huevo", "huella", "hongo", "honor", "harpa", "hedor", "hazme", "humor", "igual", "iluso", "ideal", "jabon", "jugar", "junto", "jodas", "julio", "jubil", "jarra", "joyas", "karma", "labor", "largo", "lente", "lunar", "luzca", "lente", "libro", "limbo", "lindo", "lucha", "manos", "mismo", "mambo", "miedo", "mover", "mitad", "mujer", "metal", "nacer", "nivel", "noble", "nardo", "nariz", "nubla", "oruga", "ocaso", "orden", "oasis", "orina", "oidos", "obvio", "ovalo", "ocupa", "opera", "papas", "papel", "pulso", "pilar", "plaza", "pulir", "prado", "pulga", "piano", "pudor", "queso", "rosas", "ruido", "rango", "razon", "rifle", "rumba", "ronda", "rollo", "risas", "salsa", "sello", "salir", "saber", "silla", "sutil", "sudor", "segun", "sabor", "tabla", "talar", "tarea", "tarta", "techo", "tejon", "tenaz", "terco", "tesis", "tiara", "ultra", "union", "usado", "usare", "utero", "urbis", "vacio", "vagon", "valle", "vasco", "veces", "veloz", "venta", "verbo", "verso", "wisky", "wolof", "xenon", "yacer", "yogur", "zanja", "zarza"];
    const random = Math.floor(Math.random() * worlds.length)
    const world = worlds[random]
    console.log(random)
    console.log(world)
    return world
}

const createDashboard = () => {
    let i = 0
    const dash = $(".dashboard")
    dash.innerHTML = `<div class="dashboard_row dashboard_row-1"></div><div class="dashboard_row dashboard_row-2"></div><div class="dashboard_row dashboard_row-3"></div>`
    const row1 = $(".dashboard_row-1")
    const row2 = $(".dashboard_row-2")
    const row3 = $(".dashboard_row-3")

    lettersAzc.split("").forEach(e => {
        const key = e.toUpperCase()
        if (i < 10) {
            row1.innerHTML += `<button class="dashboard-key dashboard-key-${i}"><span class="dashboard-span-${i}">${key}</span></button>`
        } else if(i < 20) {
            row2.innerHTML += `<button class="dashboard-key dashboard-key-${i}"><span class="dashboard-span-${i}">${key}</span></button>`
        } else {
            if(i === 20) {
                row3.innerHTML += `<button class="dashboard-key dashboard-key-${i}"><span class="dashboard-span-${i}">DEL</span></button>`
                row3.innerHTML += `<button class="dashboard-key dashboard-key-${i}"><span class="dashboard-span-${i}">${key}</span></button>`
            } else if (i === 26) {
                row3.innerHTML += `<button class="dashboard-key dashboard-key-${i}"><span class="dashboard-span-${i}">${key}</span></button>`
                row3.innerHTML += `<button class="dashboard-key dashboard-key-${i}"><span class="dashboard-span-${i}">ENTER</span></button>`
            } else {
                row3.innerHTML += `<button class="dashboard-key dashboard-key-${i}"><span class="dashboard-span-${i}">${key}</span></button>`
            }
        }
        i++
    })
}

const createCells = () => {
    container.innerHTML = ""
    finished = false
    cell = 0
    column = 0
    row = 0
    world = ""

    for( let i=0; i < boxes; i++ ){
        container.innerHTML += `<div class="grid-container_div grid-container_div-${i}"><span class="grid-item grid-item_${i}"></span></div>`
    }
}

const addkey = (key = "") => {
    const animation = $(`.grid-container_div-${cell+row}`)
    const nKey = $(`.grid-item_${cell+row}`)
    nKey.innerHTML = key
    animation.classList.add("animation")

    setTimeout(() => {
        animation.classList.remove("animation")
    }, 500)

    world += key
    column++
    cell++
}

const removeKey = () => {
    cell--
    column--
    $(`.grid-item_${cell+row}`).innerHTML = ""
    world = world.substring(0, world.length - 1)
}

const container = $(".grid-container")
const button = $('.grid-container_button')

const boxes = 5*6
let originalWorld = getWorld()
let cell = 0
let column = 0
let row = 0
let world = ""
let finished = false
const lettersAzc = 'qwertyuiopasdfghjklñzxcvbnm'

const getIndexWord = (world, letter) => {
    for (let i = 0; i < world.length; i++) {
      if (world[i] === letter) {
        return i;
      }
    }
    return -1; // Retorn -1 if not found
}

const pressEnter = () => {

    validateWorld(".grid-item_", ".grid-container_div-")
    validateWorld("dashboard-span-", ".dashboard-key-", true)

    row++
    column = 0
    cell = 5*row - row

    if(world === originalWorld) finished = true;

    world = ''
}

const validateWorld = (classSpan, classContainer, dashboard = false) => {
    let i = 0
    let fakeWorld = originalWorld

    originalWorld.split("").forEach(e => {
        let span = null
        let container = null
        let key = ""

        if(dashboard) {
            key = world[i]
            const indexWord = getIndexWord(lettersAzc, key)
            container = $(`${classContainer}${indexWord}`)
        } else {
            span = $(`${classSpan}${row*5 + i}`) 
            container = $(`${classContainer}${row*5 + i}`)
        
            span.classList.add('flip-reverse')
            container.classList.add('flip')
            key = span.innerHTML.toLowerCase()
        }


        if (e === key) {
            container.classList.add('good')
            fakeWorld = fakeWorld.slice(0, i+1) + fakeWorld.slice(i+2)
        } else if (fakeWorld.includes(key)) {
            container.classList.add('correct')
            fakeWorld = fakeWorld.slice(0, i+1) + fakeWorld.slice(i+2)
        } else {
            container.classList.add('wrong')
        }
        i++
    })
}

button.addEventListener('click', () => {
    createCells()
    createDashboard()
})

document.addEventListener('keydown', ({ key }) => {
    if(!finished) {
        if(key === "Backspace"){
            if(world) {
                removeKey()
            }
        } else if(key == "Enter"){
            if(column === 5 && row <= 5) {
                pressEnter()
            }
        } else if(lettersAzc.includes(key)){
            if(world.length == 0) {
                addkey(key)
            } else if(world.length%5 != 0) {
                addkey(key)
            }
        }
    }
})

createCells()
createDashboard()
