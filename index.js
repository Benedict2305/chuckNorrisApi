const btn = document.querySelector('.btn');
btn.addEventListener('click', getJokes)

localGet()

function getJokes (){
const myJokes = new XMLHttpRequest()

myJokes.open('GET', 'https://api.chucknorris.io/jokes/random', true);

myJokes.onload = function(){

    if (this.status === 200) {   
        let text = JSON.parse(this.responseText)

        let textJoke = text.value

        // console.log(text)
        const ol = document.querySelector('.orderList');
        const li = document.createElement('li');
        const spanBtn = document.createElement('input')
        spanBtn.style.backgroundColor = 'red';
        // spanBtn.style.padding = '0.2rem 0.25rem';
        spanBtn.value = 'Delete';
        spanBtn.classList = 'delbtn'
        li.textContent = textJoke;
        li.appendChild(spanBtn)
        ol.appendChild(li)

        local(textJoke)
    }
}
myJokes.send()
}


function local(incoming) {
    let enterHouse;
    if (localStorage.getItem('houseOfChunksJokes') === null) {
        enterHouse = []
    } else {
        enterHouse = JSON.parse(localStorage.getItem('houseOfChunksJokes'))
    }

    enterHouse.push(incoming)

    localStorage.setItem('houseOfChunksJokes', JSON.stringify(enterHouse))
}

function localGet() {
    let enterHouse;
    if (localStorage.getItem('houseOfChunksJokes') === null) {
        enterHouse = []
    } else {
        enterHouse = JSON.parse(localStorage.getItem('houseOfChunksJokes'))
    }
    enterHouse.forEach(enter1 => {
        const ol = document.querySelector('.orderList');
        const li = document.createElement('li');
        const spanBtn = document.createElement('input')
        
        spanBtn.style.backgroundColor = 'red';
        // spanBtn.style.padding = '0.2rem 0.25rem';
        spanBtn.value = 'Delete';
        spanBtn.classList = 'delbtn'
        li.textContent = enter1;
        li.appendChild(spanBtn)
        ol.appendChild(li)
    });
}

const ol = document.querySelector('.orderList')
ol.addEventListener('click', delItem);

function delItem(e) {
    if (e.target.classList.contains('delbtn')) {
        e.target.parentElement.remove();

        localClear(e.target.parentElement);
    }
    e.preventDefault()
}

//          delete an item from local storage
function localClear(targets) {
    let enterHouse;
    if (localStorage.getItem('houseOfChunksJokes') === null) {
        enterHouse = []
    } else {
        enterHouse = JSON.parse(localStorage.getItem('houseOfChunksJokes'))
    }
    // console.log(enterHouse)
    console.log(targets.textContent)
    
    enterHouse.forEach((remove1, index) =>{
        if (targets.textContent === remove1) {
            enterHouse.splice(index, 1)
        }
        localStorage.setItem('houseOfChunksJokes', JSON.stringify(enterHouse))
    })
}