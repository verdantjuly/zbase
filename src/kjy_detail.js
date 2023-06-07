let apikey = "9119f549275a23ec65b54dfd6152a086"
let sendid = localStorage.getItem("movie_ID");

const detailsCards = document.querySelector(".detailsCards");

const writter1 = document.querySelector("#writter1");
const writter2 = document.querySelector("#writter2");
const writter3 = document.querySelector("#writter3");

const reviewcontent1 = document.querySelector("#reviewcontent1");
const reviewcontent2 = document.querySelector("#reviewcontent2");
const reviewcontent3 = document.querySelector("#reviewcontent3");

document.addEventListener("DOMContentLoaded", function() {
    detailload();
    writterload();
});

function detailload() {
    fetch(`https://api.themoviedb.org/3/movie/${sendid}?api_key=${apikey}`, { method: 'GET' })
        .then(response => response.json())
        .then(movie => {
            console.log(sendid);
            detailsCards.innerHTML = 
            `<div class= "card">
                <img class="allimg" id="${movie.id}"   src="https://image.tmdb.org/t/p/w500${movie.poster_path}"></img>
                <div class="cardbody" id="${movie.id}" >
                    <h1 class="alltitle"  id="${movie.id}" >${movie.title}</h1>
                    <p class="alltime" id="${movie.id}" >${((localStorage.getItem(movie.id)).length) - 1} people loved this movie</p>
                    <p class="allvote" id="${movie.id}" >★ ${movie.vote_average}</p>
                    <p class="overview" id="${movie.id}" >${movie.overview}</p>
                    <input id="comment" placeholder="please leave short review" autocomplete="off" autofocus></input>
                <div class = "login">
                    <input id="writter" placeholder="id" autocomplete="off" >
                    <input type="password" id="password" placeholder="password" autocomplete="off" >
                </div>
                <div class = "buttons">
                    <button class="save" id="${movie.id}" type="button">Save</button>
                    <button class="edit" id="${movie.id}" type=" button">Edit</button>
                    <button class="delete" id="${movie.id}" type=" button">Delete</button>
                </div>
            </div>`
        })
}


let recentWritter1;
let recentWritter2;
let recentWritter3;

let recentreview11;
let recentreview12;
let recentreview13;

detailsCards.addEventListener("click", clickDetails)

function clickDetails({ target }) {
    console.log(target)
    
    let inputcomment = document.querySelector("#comment").value
    let writtercomment = document.querySelector("#writter").value
    let passwordcomment = document.querySelector("#password").value

    if (target === detailsCards) return;

    if (target.matches(".save")) {

        // localStorage.clear();

        localStorage.setItem(writtercomment + sendid + "input", inputcomment)

        // sendid(movieId) : 384
        // writer comment : id111
        // input comment : 1번째
        // key : id111384input, 1번째

        localStorage.setItem(writtercomment + sendid + "pw", passwordcomment)

        // passwordcomment : pw111
        // key : id111384pw
        // value : pw111

        if (!localStorage.getItem(sendid + 'writters')) { localStorage.setItem(sendid + 'writters', "|") }
        localStorage.setItem(sendid + 'writters', localStorage.getItem(sendid + 'writters') + "|" + writtercomment)

        // sendid : 384
        // writterscomment : 김지안

        // 1회
        // key : 384writters
        // value : || 김지안

        // 2회
        // key : 384writters
        // value : || 김지안(1) | 김지안(2)

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            console.log(`Key: ${key}, Value: ${value}`);
        }

        // sendid1writters key에서 value를 가져와서 "|"를 기준으로 분할하여 배열로 만듭니다.
        const writtersString = localStorage.getItem(`${sendid}writters`);
        const writtersArray = writtersString.split("|");

        // 최근 3개의 writtercomment를 추출합니다.
        const recentWritters = writtersArray.slice(-3);

        // 최근 3개의 writtercomment를 각각 변수에 할당합니다.
        [recentWritter3, recentWritter2, recentWritter1] = recentWritters;

        console.log('this is recentWritters ' + recentWritters);

        console.log('this is recentWritter1 ' + recentWritter1);
        console.log('this is recentWritter2 ' + recentWritter2);
        console.log('this is recentWritter3 ' + recentWritter3);

        location.reload()
    }
}

function writterload() {
    // sendid1writters key에서 value를 가져와서 "|"를 기준으로 분할하여 배열로 만듭니다.
    const writtersString = localStorage.getItem(`${sendid}writters`);
    const writtersArray = writtersString.split("|");

    // 최근 3개의 writtercomment를 추출합니다.
    const recentWritters = writtersArray.slice(-3);

    // 최근 3개의 writtercomment를 각각 변수에 할당합니다.
    [recentWritter3, recentWritter2, recentWritter1] = recentWritters;

    console.log('this is recentWritter1 ' + recentWritter1);
    console.log('this is recentWritter2 ' + recentWritter2);
    console.log('this is recentWritter3 ' + recentWritter3);

    const recentreview11 = localStorage.getItem(`${recentWritter1}${sendid}input`)
    console.log(recentreview11)
    const recentreview12 = localStorage.getItem(`${recentWritter2}${sendid}input`)
    console.log(recentreview12)
    const recentreview13 = localStorage.getItem(`${recentWritter3}${sendid}input`)
    console.log(recentreview13)

    writter1.innerHTML = recentWritter1;
    writter2.innerHTML = recentWritter2;
    writter3.innerHTML = recentWritter3;

    reviewcontent1.innerHTML = recentreview11
    reviewcontent2.innerHTML = recentreview12
    reviewcontent3.innerHTML = recentreview13
}
