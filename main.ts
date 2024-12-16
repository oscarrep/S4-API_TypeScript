const options = { headers: { 'Accept': 'application/json' } }

let reportAcudits = [] //joke:'', score:n, date:''

function getJoke(): void {
    fetch('https://icanhazdadjoke.com/', options)
        .then((res) => res.json())
        .then((data) => { printJoke(data) });
}

function printJoke(txt: { joke: string }): void {
    let jokesContainer = document.querySelector('.jokes-container');

    if (!jokesContainer) {
        console.error('jokesContainer is not found');
        return;
    }
    let print = jokesContainer.querySelector('h5');

    if (print) print.textContent = txt.joke;
    else {
        const h5 = document.createElement('h5');
        h5.textContent = txt.joke;
        jokesContainer.appendChild(h5);
    }
}

getJoke();

