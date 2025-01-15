var options = { headers: { 'Accept': 'application/json' } };
var reportAcudits = []; //joke:'', score:n, date:''
var dadJoke = null;
var chuckJoke = null;
var currentJokes = [];
var blobImages = [
    "./blobs/blob0.png",
    "./blobs/blob1.png",
    "./blobs/blob2.png",
    "./blobs/blob3.png",
    "./blobs/blob4.png",
    "./blobs/blob5.png",
    "./blobs/blob6.png",
    "./blobs/blob7.png",
    "./blobs/blob8.png"
];
function randomBlob() {
    var random = Math.floor(Math.random() * blobImages.length);
    return blobImages[random];
}
function getJoke() {
    currentJokes = [];
    var dadApi = fetch('https://icanhazdadjoke.com/', options);
    var chuckApi = fetch('https://api.chucknorris.io/jokes/random');
    Promise.all([dadApi, chuckApi])
        .then(function (_a) {
        var dadRes = _a[0], chuckRes = _a[1];
        return Promise.all([dadRes.json(), chuckRes.json()]);
    })
        .then(function (_a) {
        var dadData = _a[0], chuckData = _a[1];
        dadJoke = { joke: dadData.joke };
        chuckJoke = { joke: chuckData.value };
        currentJokes.push(dadJoke);
        currentJokes.push(chuckJoke);
        printJoke(currentJokes);
    });
    var image = document.getElementById('blobImage'); // HTMLimgelement tells TS this is an image element, if not there can't .src
    if (image)
        image.src = randomBlob();
    else
        console.error("Blob image element not found");
}
function printJoke(jokeArr) {
    var jokesContainer = document.querySelector('.jokes-container'); // looks for jokes-container in html
    var rand = Math.random() < 0.5 ? 0 : 1; //generates random n between 0-1, if n < 0.5 ---- n = 0, else n = 1
    if (!jokesContainer) {
        console.error('jokesContainer is not found');
        return;
    }
    var print = jokesContainer.querySelector('h5'); // looks for h5 in html
    var jokeObj = { joke: '', score: 0, date: '' }; // create new obj
    if (print) { // if h5 exists
        print.textContent = jokeArr[rand].joke;
        jokeObj.joke = jokeArr[rand].joke;
        reportAcudits.push(jokeObj);
    }
    else { // if h5 does not exist
        var h5 = document.createElement('h5');
        h5.textContent = jokeArr[rand].joke;
        jokeObj.joke = jokeArr[rand].joke;
        reportAcudits.push(jokeObj);
        jokesContainer.appendChild(h5);
    }
    console.log('Jokes pulled from API:');
    console.log(jokeArr);
}
function giveScore(toGive) {
    if (!dadJoke)
        console.error('No dad joke available');
    if (!chuckJoke)
        console.error('No Chuck joke available');
    var dadJokeObj = reportAcudits.find(function (j) { return j.joke == dadJoke.joke; }); // put the '!' so typescript doesnt give could be null
    var chuckJokeObj = reportAcudits.find(function (j) { return j.joke == chuckJoke.joke; });
    if (dadJokeObj) { // if obj exists add score and date
        dadJokeObj.score = toGive;
        dadJokeObj.date = new Date().toISOString();
    }
    if (chuckJokeObj) { // if obj exists add score and date
        chuckJokeObj.score = toGive;
        chuckJokeObj.date = new Date().toISOString();
    }
    else
        console.error('Joke not found');
    console.log('reportAcudits');
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
//getChuck();
getWeather();
