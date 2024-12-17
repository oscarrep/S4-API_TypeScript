const options = { headers: { 'Accept': 'application/json' } }

let reportAcudits: { joke: string; score: number; date: string }[] = [] //joke:'', score:n, date:''
let currentJoke: { joke: string; score: number; date: string } | null = null;

function getJoke(): void {
    fetch('https://icanhazdadjoke.com/', options)
        .then((res) => res.json())
        .then((data) => {
            printJoke(data)
            currentJoke = { joke: data.joke, score: 0, date: '' }
        });
    console.log(reportAcudits);
}

function printJoke(txt: { joke: string }): void {
    let jokesContainer = document.querySelector('.jokes-container'); // looks for jokes-container in html

    if (!jokesContainer) {
        console.error('jokesContainer is not found');
        return;
    }
    let print = jokesContainer.querySelector('h5'); // looks for h5 in html
    let jokeObj = { joke: '', score: 0, date: '' }; // create new obj

    if (print) { // if h5 exists
        print.textContent = txt.joke; 
        jokeObj.joke = txt.joke;
        reportAcudits.push(jokeObj);
    }
    else { // if h5 does not exist
        const h5 = document.createElement('h5');
        h5.textContent = txt.joke;
        jokeObj.joke = txt.joke;
        reportAcudits.push(jokeObj);
        jokesContainer.appendChild(h5);
    }
}

function giveScore(toGive: number): void {
    if (!currentJoke) console.error('No joke available');

    let jokeObj = reportAcudits.find(j => j.joke == currentJoke!.joke); // put the '!' so typescript doesnt give could be null

    if (jokeObj) {// if obj exists add score and date
        jokeObj.score = toGive;
        jokeObj.date = new Date().toISOString();
    }
    else console.error('Joke not found');

    console.log(reportAcudits);
}

function getWeather(): void {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=41.3888&longitude=2.159&hourly=temperature_2m&timezone=Europe%2FBerlin&forecast_days=1')
        .then((res) => res.json())
        .then((data) => { printWeather(data); console.log(data) });
}

function printWeather(txt: { hourly: { time: string[]; temperature_2m: number[] } }): void {
    let tempContainer = document.querySelector('.temp-container');

    const currentTime = new Date().getUTCHours();
    let hourIndex = txt.hourly.time.findIndex((t) => {
        const foundTime = new Date(t).getUTCHours();
        return foundTime === currentTime;
    })

    let temp = 0;

    if (hourIndex !== -1) temp = txt.hourly.temperature_2m[hourIndex];
    else console.error('No data available');

    if (!tempContainer) {
        console.error('tempContainer not found');
        return;
    }
    let print = tempContainer.querySelector('h6');

    if (print) print.textContent = `Temperature: ${temp}°C`;
    else {
        const h6 = document.createElement('h6');
        h6.textContent = `Temperature: ${temp}°C`;
        tempContainer.appendChild(h6);
    }


}

getJoke();
getWeather();

