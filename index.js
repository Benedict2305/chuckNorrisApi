const btn = document.querySelector('#generate-btn');
const ol = document.querySelector('#joke-list');
const countSpan = document.querySelector('#joke-count');

btn.addEventListener('click', getJokes);
ol.addEventListener('click', delItem);

// Initialize view
localGet();
updateCount();
renderEmptyState();

function getJokes() {
    // Optional: add loading state to button
    const originalContent = btn.innerHTML;
    btn.innerHTML = `<span>Loading...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
    btn.disabled = true;

    const myJokes = new XMLHttpRequest();
    myJokes.open('GET', 'https://api.chucknorris.io/jokes/random', true);

    myJokes.onload = function() {
        if (this.status === 200) {   
            let text = JSON.parse(this.responseText);
            let textJoke = text.value;

            createJokeElement(textJoke);
            localSave(textJoke);
            updateCount();
            renderEmptyState();
        }
        
        // Restore button state
        btn.innerHTML = originalContent;
        btn.disabled = false;
    }
    
    myJokes.onerror = function() {
        btn.innerHTML = originalContent;
        btn.disabled = false;
        alert("Failed to fetch joke. Please try again.");
    }
    
    myJokes.send();
}

function createJokeElement(jokeText) {
    const li = document.createElement('li');
    li.className = 'joke-card';

    const p = document.createElement('p');
    p.className = 'joke-text';
    p.textContent = jokeText;

    const delBtn = document.createElement('button');
    delBtn.className = 'delbtn';
    delBtn.title = 'Delete Joke';
    delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

    li.appendChild(p);
    li.appendChild(delBtn);
    ol.appendChild(li);
}

function localSave(incoming) {
    let enterHouse = getLocalData();
    enterHouse.push(incoming);
    localStorage.setItem('houseOfChunksJokes', JSON.stringify(enterHouse));
    updateCount();
}

function localGet() {
    let enterHouse = getLocalData();
    ol.innerHTML = ''; // Clear current contents
    enterHouse.forEach(joke => {
        createJokeElement(joke);
    });
}

function getLocalData() {
    if (localStorage.getItem('houseOfChunksJokes') === null) {
        return [];
    } else {
        return JSON.parse(localStorage.getItem('houseOfChunksJokes'));
    }
}

function delItem(e) {
    let targetBtn = e.target.closest('.delbtn');
    if (targetBtn) {
        let li = targetBtn.parentElement;
        let jokeText = li.querySelector('.joke-text').textContent;
        
        // Remove from DOM with animation fallback
        li.style.opacity = '0';
        li.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            li.remove();
            localClear(jokeText);
            updateCount();
            renderEmptyState();
        }, 300); // Wait for transition
    }
}

function localClear(jokeTextToRemove) {
    let enterHouse = getLocalData();
    
    // Find precise index to remove only one instance
    const index = enterHouse.findIndex(joke => joke === jokeTextToRemove);
    if (index > -1) {
        enterHouse.splice(index, 1);
        localStorage.setItem('houseOfChunksJokes', JSON.stringify(enterHouse));
    }
}

function updateCount() {
    let enterHouse = getLocalData();
    countSpan.textContent = enterHouse.length;
}

function renderEmptyState() {
    let enterHouse = getLocalData();
    // Only add empty state if there are no jokes and no empty state exists
    const existingEmptyState = document.querySelector('.empty-state');
    
    if (enterHouse.length === 0) {
        if (!existingEmptyState) {
            ol.innerHTML = `<li class="empty-state">No jokes saved yet. Generate one above!</li>`;
        }
    } else {
        if (existingEmptyState) {
            existingEmptyState.remove();
        }
    }
}