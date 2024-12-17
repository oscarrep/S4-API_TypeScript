var options = { headers: { 'Accept': 'application/json' } };
var reportAcudits = []; //joke:'', score:n, date:''
var currentJoke = null;
function getJoke() {
    fetch('https://icanhazdadjoke.com/', options)
        .then(function (res) { return res.json(); })
        .then(function (data) {
        printJoke(data);
        currentJoke = { joke: data.joke, score: 0, date: '' };
    });
    console.log(reportAcudits);
}
function printJoke(txt) {
    var jokesContainer = document.querySelector('.jokes-container');
    if (!jokesContainer) {
        console.error('jokesContainer is not found');
        return;
    }
    var print = jokesContainer.querySelector('h5');
    var jokeObj = { joke: '', score: 0, date: '' };
    if (print) {
        print.textContent = txt.joke;
        jokeObj.joke = txt.joke;
        reportAcudits.push(jokeObj);
    }
    else {
        var h5 = document.createElement('h5');
        h5.textContent = txt.joke;
        jokeObj.joke = txt.joke;
        reportAcudits.push(jokeObj);
        jokesContainer.appendChild(h5);
    }
}
function giveScore(toGive) {
    if (!currentJoke)
        console.error('No joke available');
    var jokeObj = reportAcudits.find(function (j) { return j.joke == currentJoke.joke; });
    if (jokeObj) {
        jokeObj.score = toGive;
        jokeObj.date = new Date().toISOString();
    }
    else
        console.error('Joke not found');
    console.log(reportAcudits);
}
function getWeather() {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=41.3888&longitude=2.159&hourly=temperature_2m&timezone=Europe%2FBerlin&forecast_days=1')
        .then(function (res) { return res.json(); })
        .then(function (data) { printWeather(data); console.log(data); });
}
function printWeather(txt) {
    var tempContainer = document.querySelector('.temp-container');
    var currentTime = new Date().getUTCHours();
    var hourIndex = txt.hourly.time.findIndex(function (t) {
        var foundTime = new Date(t).getUTCHours();
        return foundTime === currentTime;
    });
    var temp = 0;
    if (hourIndex !== -1)
        temp = txt.hourly.temperature_2m[hourIndex];
    else
        console.error('No data available');
    if (!tempContainer) {
        console.error('tempContainer not found');
        return;
    }
    var print = tempContainer.querySelector('h6');
    if (print)
        print.textContent = "Temperature: ".concat(temp, "\u00B0C");
    else {
        var h6 = document.createElement('h6');
        h6.textContent = "Temperature: ".concat(temp, "\u00B0C");
        tempContainer.appendChild(h6);
    }
}
getJoke();
getWeather();
