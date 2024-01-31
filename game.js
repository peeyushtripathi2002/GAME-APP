let canvas = document.querySelector('canvas')
let pan = canvas.getContext('2d')
let cellsize = 50
let snakeCell = [
    [0, 0]
]
let direction = 'right'
let gameOver = false
let boardW = 1200
let boardH = 550
let count = 0
let generateFoods = function() {
    return ([
        Math.round(Math.random() * (boardW - cellsize) / 50) * 50,
        Math.round(Math.random() * (boardH - cellsize) / 50) * 50
    ])
}

let foodcell = generateFoods()
console.log(foodcell, 'true')
document.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowUp') {
        direction = 'up'
    } else if (e.key == 'ArrowDown') {
        direction = 'down'
    } else if (e.key == 'ArrowLeft') {
        direction = 'left'
    } else {
        direction = 'right'
    }
})

function draw() {
    if (gameOver) {
        pan.fillStyle = 'red'
        pan.fillText('GAME OVER', 120, 120)
        clearInterval(id)
        return;
    }
    pan.clearRect(0, 0, 1200, 550)
    for (let cell of snakeCell) {
        pan.fillStyle = 'blue'
        pan.fillRect(cell[0], cell[1], cellsize, cellsize)
    }
    pan.fillStyle = 'green'
    pan.fillRect(foodcell[0], foodcell[1], cellsize, cellsize)
    pan.font = '30px san-sarif'
    pan.fillStyle = 'green '
    pan.fillText(` score  ${count}`, 50, 50)
}

function update() {
    let headX = snakeCell[snakeCell.length - 1][0]
    let headY = snakeCell[snakeCell.length - 1][1]
    let newX
    let newY
    if (direction === 'left') {
        newX = headX - cellsize;
        newY = headY
        if (newX < 0 || checkMate(newX, newY)) {
            gameOver = true
        }
    } else if (direction === 'right') {
        newX = headX + cellsize;
        newY = headY
        if (newX === boardW || checkMate(newX, newY)) {
            gameOver = true
        }
    } else if (direction === 'up') {
        newX = headX
        newY = headY - cellsize;
        if (newY < 0 || checkMate(newX, newY)) {
            gameOver = true
        }
    } else {
        newX = headX
        newY = headY + cellsize
        if (newY === boardH || checkMate(newX, newY)) {
            gameOver = true
        }
    }
    snakeCell.push([newX, newY])
    if (newX === foodcell[0] && newY === foodcell[1]) {
        foodcell = generateFoods()
        count++
    } else {
        snakeCell.shift()
    }
}
let id = setInterval(() => {
    draw()
    update()
}, 100)

function checkMate(newX, newY) {
    for (let item of snakeCell) {
        if (item[0] === newX && item[1] === newY) return true;
    }
    return false;
}