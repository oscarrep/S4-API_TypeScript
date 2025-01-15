const options = { headers: { 'Accept': 'application/json' } }

let reportAcudits: { joke: string; score: number; date: string }[] = [] //joke:'', score:n, date:''
let dadJoke: { joke: string } | null = null;
let chuckJoke: { joke: string } | null = null;
let currentJokes: { joke: string }[] = [];

const blobImages = [
    "./blobs/blob0.png",
    "./blobs/blob1.png",
    "./blobs/blob2.png",
    "./blobs/blob3.png",
    "./blobs/blob4.png",
    "./blobs/blob5.png",
    "./blobs/blob6.png",
    "./blobs/blob7.png",
    "./blobs/blob8.png"
]

function randomBlob(): string {
    let random = Math.floor(Math.random() * blobImages.length);

    return blobImages[random];
}

function getJoke(): void {
    currentJokes = [];
    const dadApi = fetch('https://icanhazdadjoke.com/', options);
    const chuckApi = fetch('https://api.chucknorris.io/jokes/random');

    Promise.all([dadApi, chuckApi])
        .then(([dadRes, chuckRes]) => Promise.all([dadRes.json(), chuckRes.json()]))
        .then(([dadData, chuckData]) => {
            dadJoke = { joke: dadData.joke }
            chuckJoke = { joke: chuckData.value }
            currentJokes.push(dadJoke)
            currentJokes.push(chuckJoke)
            printJoke(currentJokes)
        });

    const image = document.getElementById('blobImage') as HTMLImageElement; // HTMLimgelement tells TS this is an image element, if not there can't .src
    if (image) image.src = randomBlob();
    else console.error("Blob image element not found");
}

function printJoke(jokeArr: { joke: string }[]): void {
    let jokesContainer = document.querySelector('.jokes-container'); // looks for jokes-container in html
    let rand = Math.random() < 0.5 ? 0 : 1;//generates random n between 0-1, if n < 0.5 ---- n = 0, else n = 1

    if (!jokesContainer) {
        console.error('jokesContainer is not found');
        return;
    }
    let print = jokesContainer.querySelector('h5'); // looks for h5 in html
    let jokeObj = { joke: '', score: 0, date: '' }; // create new obj

    if (print) { // if h5 exists
        print.textContent = jokeArr[rand].joke;
        jokeObj.joke = jokeArr[rand].joke;
        reportAcudits.push(jokeObj);
    }
    else { // if h5 does not exist
        const h5 = document.createElement('h5');
        h5.textContent = jokeArr[rand].joke;
        jokeObj.joke = jokeArr[rand].joke;
        reportAcudits.push(jokeObj);
        jokesContainer.appendChild(h5);
    }
    console.log('Jokes pulled from API:');
    console.log(jokeArr);
}

function giveScore(toGive: number): void {
    if (!dadJoke) console.error('No dad joke available');
    if (!chuckJoke) console.error('No Chuck joke available');

    let dadJokeObj = reportAcudits.find(j => j.joke == dadJoke!.joke); // put the '!' so typescript doesnt give could be null
    let chuckJokeObj = reportAcudits.find(j => j.joke == chuckJoke!.joke);

    if (dadJokeObj) {// if obj exists add score and date
        dadJokeObj.score = toGive;
        dadJokeObj.date = new Date().toISOString();
    }
    if (chuckJokeObj) {// if obj exists add score and date
        chuckJokeObj.score = toGive;
        chuckJokeObj.date = new Date().toISOString();
    }
    else console.error('Joke not found');

    console.log('reportAcudits')
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
//getChuck();
getWeather();

