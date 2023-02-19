const $ = ( className ) => document.querySelector(className)
const $All = ( className ) => document.querySelectorAll(className)

const container = $(".grid-container")
const button = $('.grid-container_button')

const boxes = 5*6
let cell = 0
let column = 0
let row = 0
let world = ""
let finished = false
const lettersAzc = 'qwertyuiopasdfghjklñzxcvbnm'

const createDashboard = () => {
    let i = 0
    const row1 = $(".dashboard_row-1")
    const row2 = $(".dashboard_row-2")
    const row3 = $(".dashboard_row-3")

    lettersAzc.split("").forEach(e => {
        const key = e.toUpperCase()
        if (i < 10) {
            row1.innerHTML += `<button class="dashboard-key dashboard-key-${i}"><span>${key}</span></button>`
        } else if(i < 20) {
            row2.innerHTML += `<button class="dashboard-key dashboard-key-${i}"><span>${key}</span></button>`
        } else {
            if(i === 20) {
                row3.innerHTML += `<button class="dashboard-key dashboard-key-${i}"><span>DEL</span></button>`
                row3.innerHTML += `<button class="dashboard-key dashboard-key-${i}"><span>${key}</span></button>`
            } else if (i === 26) {
                row3.innerHTML += `<button class="dashboard-key dashboard-key-${i}"><span>${key}</span></button>`
                row3.innerHTML += `<button class="dashboard-key dashboard-key-${i}"><span>ENTER</span></button>`
            } else {
                row3.innerHTML += `<button class="dashboard-key dashboard-key-${i}"><span>${key}</span></button>`
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

const getWorld = () => {
    return "avena"
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

const pressEnter = () => {
    let i = 0

    const originalWorld = getWorld()
    let fakeWorld = originalWorld

    originalWorld.split("").forEach(e => {
        const span = $(`.grid-item_${row*5 + i}`) 
        const container = $(`.grid-container_div-${row*5 + i}`)
        const key = span.innerHTML.toLowerCase()
        
        span.classList.add('flip-reverse')
        container.classList.add('flip')

        if (e === key) {
            container.classList.add('good')
        } else if (fakeWorld.includes(key)) {
            container.classList.add('correct')
            fakeWorld = fakeWorld.slice(0, i+1) + fakeWorld.slice(i+2)
        } else {
            container.classList.add('wrong')
        }
        i++
    })

    row++
    column = 0
    cell = 5*row - row

    if(world === originalWorld) finished = true;

    world = ''
}

button.addEventListener('click', createCells)

document.addEventListener('keydown', ({ key }) => {
    if(!finished) {
        if(key === "Backspace"){
            if(world) {
                removeKey()
            }
        } else if(key == "Enter"){
            if(column === 5 && row < 5) {
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
