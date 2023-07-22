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
    seeResult.addEventListener('click', addAnswer)
    
    const saveBtn = document.getElementById('save-btn')
    saveBtn.addEventListener('click', saveAnswer)

    // samla alla divs för frågorna i en NodeList 
    let qElems = document.querySelectorAll('#questions>div');

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

    /* https://codepen.io/mmousawy/pen/LedZPa
    let inputTextarea = document.querySelectorAll('.answer')

    function saveAnswer () {
        localStorage.setItem('savedanswer', inputTextarea.value)
        inputTextarea.textContent = inputTextarea.value
    }
    inputTextarea.textContent = localStorage.getItem('savedanswer')*/

    // skapa variabel för att lägga in svaren i arrayer
    let answerArray = []
    let headingArray = []
    let importanceArray = []
    let currentArray = []
    
    // funktion som körs när man klickar Se svar och som lägger till alla svar i individuella divs
    function addAnswer() {
        for (let l = 0; l < qElems.length - 1; l++) {
            answerArray.push(document.getElementById('a' + l).value)
            headingArray.push(document.getElementById('l' + l).firstChild.data)
            importanceArray.push(document.getElementById('importance' + l).value)
            currentArray.push(document.getElementById('current' + l).value)
        }

        for (let k = 0; k < answerArray.length; k++) {
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