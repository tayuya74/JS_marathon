const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeElement = document.querySelector('#time')
let time = 10
const board = document.querySelector('#board')
let score = 0
const colors = ['#6495ED', '#00BFFF', '#7B68EE', '#FF69B4', '#BA55D3','#AFEEEE','#ADD8E6', '#E0FFFF', '#87CEFA', '#008B8B', '#B0C4DE']
let intervalId;

startBtn.addEventListener('click', (event) => {
	event.preventDefault()
	screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
	if (event.target.classList.contains('time-btn')) {
		time = parseInt(event.target.getAttribute('data-time'))
		screens[1].classList.add('up')
		startGame()
	}
})

board.addEventListener('click', event => {
	if (event.target.classList.contains('circle')) {
		score++
		event.target.remove()
		createRandomCircle()
	}
})


function startGame() {
	clearInterval(intervalId)
	intervalId = setInterval(decreaseTime, 1000)
	createRandomCircle()
	setTime(time)
}

function decreaseTime() {
	if (time === 0) {
		finishGame()
	} else {
		let current = --time
		if (current < 10) {
			current = `0${current}`
		}
		setTime(current)
	}
}

function setTime(value) {
	timeElement.innerHTML = `00:${value}`
}

function finishGame() {
	timeElement.parentNode.classList.add('hide')
	board.innerHTML = `
		<h1>Результат: <span class="primary">${score}</span></h1>
		<br><button onclick="restartBtn()">Попробовать еще раз</button>
	`
	clearInterval(intervalId)
}

function restartBtn() {
	screens[1].classList.remove('up')
	board.innerHTML = ``
	timeElement.parentNode.classList.remove('hide')
	score = 0
}

function createRandomCircle() {
	const circle = document.createElement('div')
	const size = getRandomNumber(10, 60)
	const {width, height} = board.getBoundingClientRect()
	const x = getRandomNumber(0, width - size)
	const y = getRandomNumber(0, height - size)

	circle.classList.add('circle')
	circle.style.width = `${size}px`
	circle.style.height = `${size}px`
	circle.style.top = `${y}px`
	circle.style.left = `${x}px`

	setColor(circle)
	board.append(circle)
}

function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min)
}

function setColor(element) {
	const color = getRandomColor()
	element.style.backgroundColor = color
	element.style.boxShadow = `0 0 5px ${color}, 0 0 10px ${color}`
}

function getRandomColor() {
	const index = Math.floor(Math.random() * colors.length)
	return colors[index]
}