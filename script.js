const startGameButton = document.getElementById('button');
const initialization = document.getElementById('initialization');
const insectSelection = document.getElementById('selection');
const minutes = document.getElementById('minutes')
const seconds = document.getElementById('seconds')
const gameTable = document.getElementById('game')
const selectInsect = document.querySelectorAll('.insect')
const insectsContainer = document.getElementById('insectsContainer')

//Counters
let second = 0
let minute = 0

const insectsArray = [crypto.randomUUID(),crypto.randomUUID()]

const insects = {
    fly: 'https://pngimg.com/uploads/fly/fly_PNG3946.png',
    mosquito : 'https://pngimg.com/uploads/mosquito/mosquito_PNG18175.png',
    spider : 'https://pngimg.com/uploads/spider/spider_PNG12.png',
    roach : 'https://pngimg.com/uploads/roach/roach_PNG12163.png'
}


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
    const insectName = name.toLowerCase()
    const divMeasures = insectsContainer.getBoundingClientRect()
    const id = crypto.randomUUID()
    insectsArray.push(id)
    // console.log(divMeasures);//Aqui tienes el objeto a trabajar
    
    //console.log(randomHeight(divMeasures.bottom,divMeasures.height));
    
    
    
    //No tocar mas nada que no sea de aqui para abajo.
    insectsArray.forEach(insectId => {
        const height = randomHeight(divMeasures.bottom,divMeasures.height) //Aqui Ani
        const width = randomWidth(divMeasures.width,divMeasures.x)
        
        const createInsect = document.createElement('img')
        createInsect.src = insects[insectName]
        createInsect.id = insectId
        createInsect.classList.add('insect')
        createInsect.style.position = 'absolute'
        createInsect.style.top =  height  >= 100 ? height - 100 + 'px' : height + 'px'
        createInsect.style.left =  width >= 100  ? width - 100 + 'px' : width + 'px'
        insectsContainer.appendChild(createInsect)
    })
    
}
setInterval(() => {
    if (gameTable.classList.contains('show')) {
        runTimer()
        
    }
}, 1000);

//Aqui 
const randomHeight = (max,min) => { //ESTO ES PARA EL EJE Y VERTICAL
    return Math.floor(Math.random() * (max - min) + min)
}
//Aqui.
const randomWidth = (max,min) => {//ESTO ES PARA EL EJE X HORIZONTAL
    return Math.floor(Math.random() * (max - min) + min)
}


startGameButton.addEventListener('click', showSelectionStage)