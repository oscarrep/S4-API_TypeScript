var options = { headers: { 'Accept': 'application/json' } };
var reportAcudits = []; //joke:'', score:n, date:''
function getJoke() {
    fetch('https://icanhazdadjoke.com/', options)
        .then(function (res) { return res.json(); })
        .then(function (data) { printJoke(data); });
}
function printJoke(txt) {
    var jokesContainer = document.querySelector('.jokes-container');
    if (!jokesContainer) {
        console.error('jokesContainer is not found');
        return;
    }
    var print = jokesContainer.querySelector('h5');
    if (print)
        print.textContent = txt.joke;
    else {
        var h5 = document.createElement('h5');
        h5.textContent = txt.joke;
        jokesContainer.appendChild(h5);
    }
}
getJoke();
