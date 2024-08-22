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

//
//Show second section
const showSelectionStage = () => {
    initialization.classList.remove('show');
    
    insectSelection.classList.add('show');
     
}

//Show third section (game section)
const showGameStage = (event) => {
    insectSelection.classList.remove('show'); //Closed selection state
    insectSelection.classList.add('top') // It takes insect sention up
    gameTable.classList.add('show') //Show game section
    
    
    insectChosen = event.target.id //Saving insect's name
    createElement(event.target.id,1); //passing name and how many element(insect) to create
}

//Adding listener to every insect
selectInsect.forEach(insect => insect.addEventListener('click',(event) => {
    showGameStage(event)
}))

//Creating insect, it receive name and how many element(insects) to create.
const createElement = (name, numbers) => {
    
    const insectName = name.toLowerCase()//all id(insect name) to lowercase
    const divMeasures = insectsContainer.getBoundingClientRect() //retriving screen's measurements.
    
    //how many elements(insect) to create. It depends on how many numbers(insects either 1 or 2) it receives.
    for (let index = 0; index < numbers; index++) {
        const id = crypto.randomUUID() // creating unique ID
        
        //insect's features.
        const insect = {
            id,
            top: randomNumber(divMeasures.bottom, 64), //it receives a random number to position insect at Y axis
            left: randomNumber(divMeasures.width, divMeasures.x),//it receives a random number to position insect at X axis
            insectName,
            insectRotation: randomNumber(360,1) + 'deg' //Degrees to rotate insect image.
        }
        insectsArray.push(insect) //Adding insect in every loop

    }
    
    renderInsect(insectsArray) //Passing array of insects
 
}
//Rendering Insect
const renderInsect = (array) => { 
    insectsContainer.innerHTML = '' //Cleaning container
    //If array is not empty, render every one of them, if not only empty container.

    array ? array.forEach(insect => {
    const {id,top,left,insectName,insectRotation} = insect //destructuring from insect object
    
    const createInsect = document.createElement('img')
    createInsect.src = insects[insectName] // mosquito, roach,fly,spider. Retrieving insect img acording to its name. Other way to access data from an object.
    createInsect.id = id
    createInsect.classList.add('insect')
    createInsect.style.position = 'absolute'
    createInsect.style.top =  top  >= 100 ? top - 100 + 'px' : top + 'px'
    createInsect.style.left =  left >= 100  ? left - 100 + 'px' : left + 'px'
    createInsect.style.rotate = insectRotation
    createInsect.addEventListener('click', (e) => deleteInsect(e.target.id)) //Adding listener to call deleted function if it is clicked.
    insectsContainer.appendChild(createInsect)
    }) : insectsContainer.innerHTML = ''
}
//Delete insect
const deleteInsect = (id) => {
    score++ //updating score
    scoreTable.innerText = score //rendering new score.
    
    const addFadeInsect = insectsArray.find(insect => insect.id === id) //Find insect
    const insectDelete = document.getElementById(`${addFadeInsect.id}`) //insect id it supposed to be unique.
    insectDelete.classList.add('insectFade') //Fading when it is deleted.

    score >= 20 ? showImpossibleWin() : null 
    
    setTimeout(() => {
        insectsArray = insectsArray.filter(insect => insect.id != id) //it creates a new array with the id that are different from the ID selected.
        createElement(insectChosen,2) //passing name and how many element(insect) to create.
    }, 200);
}
//timer
const runTimer = () => {
    
    second++ 
    second > 59 ? minute++ : null
    second >= 60 ? second = 0 : null
    seconds.innerHTML = second > 9 ? second : `0${second}`
    minutes.innerHTML = minute > 9 ? minute : `0${minute}`
        

}

//Showing impossible victory.
const showImpossibleWin = () => {
    messageCointainer.classList.add('showMessage')   
}

//If game table is displayed it calls runtimer every 1seg.
setInterval(() => {
    if (gameTable.classList.contains('show')) {
        runTimer()
        
    }
}, 1000);

//Creating random height
const randomNumber = (max,min) => { //ESTO ES PARA EL EJE Y VERTICAL
    return Math.floor(Math.random() * (max - min) + min)
}


startGameButton.addEventListener('click', showSelectionStage) //Here is where everything starts!s



