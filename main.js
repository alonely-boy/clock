// import digit from './digit'
const gap = 120
const radius = 6
const ballGap = 15
const G = 0.5
const u = 0.2 //阻力系数
const screenWidth = 1020
const screenHeight = 600
// let ball = {
//     x: 10,
//     y: 0,
//     r: 20,
//     vx: 5,
//     vy: 5,
//     color:'red'
// }

/** @type {HTMLCanvasElement} */
let canvas = document.getElementById('canvas')
canvas.width = screenWidth
canvas.height = screenHeight
let ctx = canvas.getContext('2d')
let timeArr = [], tempArr = []//存上一次的时间记录
let ballArr = [] //存当前的球
function drawNow() {
    ctx.clearRect(0, 0, screenWidth, screenHeight)
    let date = new Date()

    timeArr[0] = date.getHours().toString().padStart(2, '0')
    timeArr[1] = 10
    timeArr[2] = date.getMinutes().toString().padStart(2, '0')
    timeArr[3] = 10
    timeArr[4] = date.getSeconds().toString().padStart(2, '0')

    for (let i = 0, j = 0; i < timeArr.length; i++) {
        if (typeof timeArr[i] == 'string') {
            if (tempArr.length && tempArr[i][0] === timeArr[i][0])
                drawNumber(ctx, Number(timeArr[i][0]), gap * j++, 100)
            else
                drawNumber(ctx, Number(timeArr[i][0]), gap * j++, 100, true)
            if (tempArr.length && tempArr[i][1] === timeArr[i][1])
                drawNumber(ctx, Number(timeArr[i][1]), gap * j++, 100)
            else
                drawNumber(ctx, Number(timeArr[i][1]), gap * j++, 100, true)
        }
        if (typeof timeArr[i] == 'number') {//画冒号，坐标10
            drawNumber(ctx, (timeArr)[i], gap * j++, 100)
        }
    }
    drawBall(ballArr)
    for (let i in timeArr) {
        tempArr[i] = timeArr[i]
    }
    window.requestAnimationFrame(drawNow)
    // ctx.clearRect(0,0,1020,764)

}
drawNow()
function drawNumber(ctx, number, positionX, positionY, drawBall) {
    if (typeof number != 'number')
        throw new Error('传入参数不是数字')
    if (number < 0 || number > 10)
        throw new Error('传入0-10的数字')

    ctx.moveTo(positionX, positionY)
    let x = positionX, y = positionY//绘制坐标
    for (let i of digit[number]) {
        y = y + ballGap
        for (let j of i) {
            x = x + ballGap
            if (j) {
                ctx.beginPath()
                ctx.strokeStyle = 'white'
                ctx.fillStyle = 'white'
                ctx.arc(x, y, radius, 0, 2 * Math.PI)
                ctx.stroke()
                ctx.fill()
            }
        }
        x = positionX
    }
    ctx.closePath()
    if (drawBall) {
        let x = positionX, y = positionY//绘制坐标
        for (let i of digit[number]) {
            y = y + ballGap
            for (let j of i) {
                x = x + ballGap
                if (j) {
                    let ball = {}
                    ball.x = x
                    ball.y = y
                    ball.r = radius
                    ball.vx = Math.floor(Math.random() * 10 - 5)
                    ball.vy = -10
                    ball.color = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
                    ballArr.push(ball)
                }
            }
            x = positionX
        }
    }
}

function drawBall(ballArr) {
    for (let ball of ballArr) {
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, radius, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.fillStyle = ball.color
        ctx.fill()
        ball.x = ball.x + ball.vx
        ball.y = ball.y + ball.vy
        ball.vy = ball.vy >= 0 ? ball.vy + G - u : ball.vy + G + u
        test(ball)
    }
}

function test(ball) {
    if (ballArr.length >= 300) {
        ballArr.splice(0, 30)
    }
    if (ball.x > canvas.width || ball.x < 0) {
        ball.vx = -ball.vx
    }
    if (ball.y >= canvas.height) {
        ball.vy = -ball.vy
    }
}