const startGameButton = document.getElementById('button');
const initialization = document.getElementById('initialization');
const insectSelection = document.getElementById('selection');
const minutes = document.getElementById('minutes')
const seconds = document.getElementById('seconds')
const gameTable = document.getElementById('game')
const scoreTable = document.getElementById('score')
const messageCointainer = document.getElementById('message')
const selectInsect = document.querySelectorAll('.insect')
const insectsContainer = document.getElementById('insectsContainer')

let insectChosen = ''
//Counters
let second = 0
let minute = 0
let score = 0
let insectsArray = []

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
    
    console.log(event.target.id);
    insectChosen = event.target.id
    createElement(event.target.id,1); // pasamos el id que es nombre
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
const createElement = (name, numbers) => {
    
    const insectName = name.toLowerCase()
    const divMeasures = insectsContainer.getBoundingClientRect()
    // console.log(divMeasures);
    
    for (let index = 0; index < numbers; index++) {
        const id = crypto.randomUUID()
        
        
        const animal = {
            id,
            top: randomHeight(divMeasures.bottom, 64),
            left: randomWidth(divMeasures.width, divMeasures.x),
            insectName: insectName,
            insectRotation: rotate() + 'deg'
        }
        insectsArray.push(animal)

    }
    //console.log(insectsArray);
    
    renderInsect(insectsArray)
    // console.log(divMeasures);//Aqui tienes el objeto a trabajar
    
    //console.log(randomHeight(divMeasures.bottom,divMeasures.height));
  
}
const renderInsect = (array) => {
//No tocar mas nada que no sea de aqui para abajo.
    
    insectsContainer.innerHTML = ''
    array ? array.forEach(insect => {
    const {id,top,left,insectName,insectRotation} = insect
    
    
    
    // const height = randomHeight(divMeasures.bottom,divMeasures.height) //Aqui Ani
    // const width = randomWidth(divMeasures.width,divMeasures.x)
    
    const createInsect = document.createElement('img')
    createInsect.src = insects[insectName]
    createInsect.id = id
    createInsect.classList.add('insect')
    createInsect.style.position = 'absolute'
    createInsect.style.top =  top  >= 100 ? top - 100 + 'px' : top + 'px'
    createInsect.style.left =  left >= 100  ? left - 100 + 'px' : left + 'px'
    createInsect.style.rotate = insectRotation
    createInsect.addEventListener('click', (e) => deleteInsect(e.target.id))
    insectsContainer.appendChild(createInsect)
    }) : insectsContainer.innerHTML = ''
}

const deleteInsect = (id) => {
    score++
    scoreTable.innerText = score
    
    const addFadeInsect = insectsArray.find(insect => insect.id === id)
    const insectDelete = document.getElementById(`${addFadeInsect.id}`)
    insectDelete.classList.add('insectFade')

    score >= 20 ? showImpossibleWin() : null 
    setTimeout(() => {
        insectsArray = insectsArray.filter(insect => insect.id != id) 
    
    
        createElement(insectChosen,2) 
    }, 200);
}
const showImpossibleWin = () => {
    
    console.log(messageCointainer);
    
    messageCointainer.classList.add('showMessage')
    

    
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

const rotate = () => {
    return Math.floor(Math.random() * (360 - 1) + 1)
}
console.log(rotate());
