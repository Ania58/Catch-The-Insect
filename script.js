const startGameButton = document.getElementById('button');
const initialization = document.getElementById('initialization');
const insectSelection = document.getElementById('selection');
const minutes = document.getElementById('minutes')
const seconds = document.getElementById('seconds')
const gameTable = document.getElementById('game')
const selectInsect = document.querySelectorAll('.insect')

const insects = {
    Fly: 'https://pngimg.com/uploads/fly/fly_PNG3946.png',
    Mosquito : 'https://pngimg.com/uploads/mosquito/mosquito_PNG18175.png',
    Spider : 'https://pngimg.com/uploads/spider/spider_PNG12.png',
    Roach : 'https://pngimg.com/uploads/roach/roach_PNG12163.png'
}

let second = 0
let minute = 0
const showGameStage = (event) => {
    insectSelection.classList.remove('show');
    insectSelection.classList.add('top')
    gameTable.classList.add('show')

    renderInsect(event.target.id); // pasamos el id que es nombre
}
selectInsect.forEach(insect => insect.addEventListener('click',(event) => {
    showGameStage(event)
}))

const showSelectionStage = () => {
    initialization.classList.remove('show');
    
    insectSelection.classList.add('show');
    
    
    
    
}
const runTimer = () => {
    
    second++ 
    second > 59 ? minute++ : null
    second >= 60 ? second = 0 : null
    seconds.innerHTML = second > 9 ? second : `0${second}`
    minutes.innerHTML = minute > 9 ? minute : `0${minute}`
        

}
const renderInsect = (name) => {
    
    const insectsContainer = document.getElementById('insectsContainer')
    console.log(insectsContainer.getBoundingClientRect());
    
}
setInterval(() => {
    if (gameTable.classList.contains('show')) {
        runTimer()
        
    }
}, 1000);

const randomNumber = (max,min) => {
    return Math.floor(Math.random() * (max - min) + 1)
}

startGameButton.addEventListener('click', showSelectionStage)