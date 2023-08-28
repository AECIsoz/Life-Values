//document.addEventListener('DOMContentLoaded', () => {

// en funktion för att rensa innehållet i formuläret när man klickar se svar-knappen
function clearInput() {
    document.getElementById('questions').reset()
}

// skapa array av divs som innehåller frågorna för att kunna bläddra mellan dem
/*let questions = []
for (let i = 0; i < 4; i++) {
    questions.push(document.getElementById('q' + i))
    console.log(questions)
}*/

//skapa variabler för knappar och koppla event listeners till dem
const nextBtn = document.getElementById('next-btn')
nextBtn.addEventListener('click', next)

const backBtn = document.getElementById('back-btn')
backBtn.addEventListener('click', back)

const seeResult = document.getElementById('see-result')
//seeResult.addEventListener('click', addAnswer)

const saveBtn = document.getElementById('save-btn')
//saveBtn.addEventListener('click', updateOutput)

// samla alla divs för frågorna i en NodeList 
let qElems = document.querySelectorAll('#questions>form');

// funktion som bläddrar framåt och visar nästa fråga när man klickar på nästa-knappen
function next() {
    for (var i = 0; i < qElems.length; i++) {
        if (qElems[i].style.display != 'none') {
            qElems[i].style.display = 'none';
            if (i == qElems.length - 1) {
                qElems[0].style.display = 'flex';
            } else {
                qElems[i + 1].style.display = 'flex';
            }
            break;
        }
    }
}
// funktion som bläddrar bakåt och visar förra fråga när man klickar på bakåt-knappen
function back() {
    for (let j = 0; j < qElems.length; j++) {
        if (qElems[j].style.display != 'none') {
            qElems[j].style.display = 'none'
            if (j == 0) {
                qElems[qElems.length - 1].style.display = 'flex'
            } else {
                qElems[j - 1].style.display = 'flex'
            }
            break
        }
    }
}



// https://codepen.io/mmousawy/pen/LedZPa


// skapa variabel för att lägga in svaren i arrayer
let answerArray = []
let importanceArray = []
let currentArray = []
let resultArray = []


// funktion som körs när man klickar spara och som lägger till alla svar i individuella divs
function addAnswer() {
    for (let l = 0; l < qElems.length; l++) {
        answerArray.push(document.getElementById('a' + l).value)
        importanceArray.push(document.getElementById('importance' + l).value)
        currentArray.push(document.getElementById('current' + l).value)
        resultArray.push(document.getElementById('result' + l))
    }
    console.log(answerArray, importanceArray, currentArray, resultArray)
}


/*let answer0 = document.getElementById('a0').value
console.log(answer0)
let importance0 = document.getElementById('importance0').value
console.log(importance0)
let current0 = document.getElementById('current0').value
console.log(current0)
let displayAnswer0 = document.getElementById('result0')*/

// spara input från formulär i object och local storage
function displayResult(num) {
    addAnswer()
    console.log(answerArray)
    let displayAnswer = document.getElementById('result' + num)
    localStorage.setItem('text'+num, answerArray[num])
    localStorage.setItem('importance'+num, importanceArray[num])
    localStorage.setItem('current'+num, currentArray[num])
    displayAnswer.innerHTML += localStorage.getItem('text'+num)
    displayAnswer.innerHTML += '<h4>Viktighet: ' + localStorage.getItem('importance'+num) + '</h4>'
    displayAnswer.innerHTML += '<h4>Nuläge: ' + localStorage.getItem('current'+num) + '</h4>'
}

function load(num) {
    if (localStorage.getItem('text'+num, 'importance'+num, 'current'+num)) {
            //console.log(localStorage.getItem('text'+num))
            let displayAnswer = document.getElementById('result' + num)
            document.getElementById('a' + num).value = localStorage.getItem('text'+num )
            console.log(localStorage.getItem('text'+num))
            document.getElementById('importance' + num).value = localStorage.getItem('importance'+num)
            document.getElementById('current' + num).value = localStorage.getItem('current'+num)
            displayAnswer.innerHTML += localStorage.getItem('text'+num)
            displayAnswer.innerHTML += '<h4>Viktighet: ' + localStorage.getItem('importance'+num) + '</h4>'
            displayAnswer.innerHTML += '<h4>Nuläge: ' + localStorage.getItem('current'+num) + '</h4>'
    }
}

function loadAll() {
    load(0);
    load(1);
    load(2);
    load(3);
    load(4);
    load(5);
    load(6);
    load(7);
    load(8);
}



function clearStorage() {
    localStorage.clear()
    //document.getElementById('a0').value = ' '
    //document.getElementById('importance0').value = ' '
    //document.getElementById('current0').value = ' '
    load()
}

/*for (let k = 0; k < answerArray.length; k++) {
    let newDiv = document.createElement('div')
    let newContent = document.createTextNode(answerArray[k])
    newDiv.classList.add('display-results', 'drag')
    newDiv.innerHTML += '<h4>' + headingArray[k] + '</h4>'
    newDiv.innerHTML += '<h5 style="display: inline;">Viktighet: </h5>' + '<div style="display: inline;">' + importanceArray[k] + '</div>' + '<h5 style="display: inline;"> Nuläge: </h5>' + '<div style="display: inline;">' + currentArray[k] + ' </div> <br>'
    newDiv.appendChild(newContent)
    const element = document.getElementById('result' + k)
    element.appendChild(newDiv)
}
}
*/

// göra svars-divarna draggable så att man kan rangordna dem

let dragElement = document.querySelectorAll('.drag')

dragElement.forEach(element => {
    element.addEventListener('dragstart', dragstart)
})


function dragstart(e) {
    e.dataTransfer.setData('text/plain', e.target.id)
    console.log(e)
    setTimeout(() => {
        e.target.classList.add('hide')
    }, 0)

}

const boxes = document.querySelectorAll('.empty')

boxes.forEach(box => {
    box.addEventListener('dragenter', dragEnter)
    box.addEventListener('dragover', dragOver);
    box.addEventListener('dragleave', dragLeave);
    box.addEventListener('drop', drop);
})

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

function drop(e) {
    e.target.classList.remove('drag-over');


    // get the draggable element
    const id = e.dataTransfer.getData('text/plain')
    console.log(id)
    const draggable = document.getElementById(id)
    console.log(draggable)

    // add it to the drop target
    e.target.appendChild(draggable)

    // display the draggable element
    draggable.classList.remove('hide')
}
//})