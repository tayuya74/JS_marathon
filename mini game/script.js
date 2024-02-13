const board = document.querySelector('#board')
const SQUARES_NUMBER = 800
const colors = ['#6495ED', '#00BFFF', '#7B68EE', '#FF69B4', '#BA55D3','#AFEEEE','#ADD8E6', '#E0FFFF', '#87CEFA', '#008B8B', '#B0C4DE']


for (let i = 0; i < SQUARES_NUMBER; i++) {
	const square = document.createElement('div')
	square.classList.add('square')

	square.addEventListener('mouseover', setColor)
	square.addEventListener('mouseleave', removeColor)

	board.append(square)
}

function setColor(event) {
	const element = event.target
	const color = getRandomColor()
	element.style.backgroundColor = color
	element.style.boxShadow = `0 0 5px ${color}, 0 0 10px ${color}`
}

function removeColor(event) {
	const element = event.target
	element.style.backgroundColor = '#1d1d1d'
	element.style.boxShadow = '0 0 2px #000'
}

function getRandomColor() {
	return colors[Math.floor(Math.random() * colors.length)]
}