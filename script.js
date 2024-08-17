const startGameButton = document.getElementById('button');
const initialization = document.getElementById('initialization');
const insectSelection = document.getElementById('selection');
const gameTable = document.getElementById('game')
const selectInsect = document.querySelectorAll('.insect')


const showGameStage = () => {
    insectSelection.classList.remove('show');
    gameTable.classList.add('show')
}
selectInsect.forEach(insect => insect.addEventListener('click',showGameStage))

const showSelectionStage = () => {
    initialization.classList.remove('show');
    insectSelection.classList.add('show');
}

startGameButton.addEventListener('click', showSelectionStage)