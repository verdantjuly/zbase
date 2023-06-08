// import data
import { searchfunc } from "./search.js";
import { desktopSwitch, mobileSwitch } from "./switch.js";

// export data
export const cards = document.querySelector(".cards");
export let movies = [];

// ID 값으로 지정된 개체 변수에 담기
const home = document.getElementById("home");
const searchbtn = document.getElementById("searchbtn");
const allchart = document.getElementById("allchart");
const mychart = document.getElementById("mychart");
const mobilebtn = document.getElementById("mobilebtn");
const desktopbtn = document.getElementById("desktopbtn");

// 버튼을 누르면 작동함.
document.addEventListener("DOMContentLoaded", load);
home.addEventListener("click", load);
searchbtn.addEventListener("click", searchfunc);
allchart.addEventListener("click", load);
mychart.addEventListener("click", openloved);
mobilebtn.addEventListener("click", mobileSwitch);
desktopbtn.addEventListener("click", desktopSwitch);

// 화면을 실행하면 작동하는 함수 load()
function load() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTE5ZjU0OTI3NWEyM2VjNjViNTRkZmQ2MTUyYTA4NiIsInN1YiI6IjY0NzA4YTllNzcwNzAwMDBhOTQ3ZDdmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3W-E9KnuKEWvia4zXrXpCRKfHz9a5clH7RjrUwJD8iY'
        }
    };

    fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
        .then(response => response.json())
        .then(data => {

            //innerHTML = "" 를 통해 cards 안을 비워 준다. 
            document.getElementById("cards").innerHTML = ""
            let rows = data['results']

            // rows에서 movies를 복사한다.
            movies = rows.map(movie => ({ ...movie }))

            // 만약에 localStorage에 movieid로 저장된 key가 없다면 초기값으로 0을 준다. 
            // 좋아요를 누를 때 movieid가 key값인 value가 1씩 증가하는 식이 나중에 나온다. 
            for (let i = 0; i < movies.length; i++) {
                let movieid = movies[i]['id']
                if (!(localStorage.getItem(movieid))) {
                    localStorage.setItem(movieid, '0');
                }
                else {
                    //movie 안에 love 라는 항목을 만들고 값을 저장한다.
                    movies[i].love = localStorage.getItem(movieid)
                }
            }

            //movies를 sort 하는데 1. 평점 2. 평점 같으면 제목 순으로 정렬한다.
            movies.sort(function (prev, next) {
                if (next.vote_average === prev.vote_average) {
                    if (prev.title < next.title) {
                        return -1;
                    } else if (prev.title > next.title) {
                        return 1;
                    } else {
                        return 0;
                    }
                } else {
                    return next.vote_average - prev.vote_average;
                }
            });

            //prev, next 버튼 생성시 필요한 순위 데이터 localStorage 에 저장
            let allmovies = []
            for (let i = 0; i < movies.length; i++) {
                allmovies.push(movies[i]["id"])
                localStorage.setItem("rankof" + movies[i]["id"], allmovies.indexOf(movies[i]["id"]) + 1)
                localStorage.setItem(i + 1, movies[i]["id"])
            }

            // 카드 붙이기
            cards.innerHTML = movies
                .map(function append(movie) {
                    return (
                        `<div class="card">      
                            <div class="cardbody" id="${movie.id}">
                                <div class="opacbox" id="${movie.id}" style="position: absolute; z-index: 2;">
                                    <p class="alltitle" id="${movie.id}">${movie.title}</p>
                                    <p class="allvote" id="${movie.id}">평점 : ★ ${movie.vote_average}</p>
                                    <p class="allpopularity" id="${movie.id}">인기도 : ${movie.popularity}</p>
                                    <p class="allrelease_date" id="${movie.id}">개봉일 : ${movie.release_date}</p>
                                </div>
                            <div class="imgbox">
                                <span class="allrank" >${movies.indexOf(movie) + 1}</span>
                                <img class="allimg" id="${movie.id}" src="https://image.tmdb.org/t/p/w500${movie.poster_path}"></img>
                            </div>
                            <div class="rankvote">
                            </div>
                                <p class="alltime" id="${movie.id}">${localStorage.getItem(movie.id)} people loved this movie</p>   
                            </div>
                            <div class="buttons">
                                <button class="lovebtn" id="${movie.id}" type="button">♥︎</button>
                                <button class="details" id="${movie.id}">Details</button>
                            </div>
                        </div>`
                    )
                }).join("")
            cards.addEventListener("click", clickAllChart)
        })

    // enter 를 누르면 search 버튼이 눌리게 한다.
    document.getElementById("search")
        .addEventListener("keyup", function (e) {
            if (e.code === 'Enter') {
                document.getElementById("searchbtn").click();
            }
        })
};

// 버튼을 누르면 함수가 작동한다.
export function clickAllChart({ target }) {
    if (target === cards) return;

    // lovebtn을 누르면 movieid(target.id)를 key로 갖는 value가 1씩 올라간다.
    if (target.matches(".lovebtn")) {
        localStorage.setItem(target.id, Number(localStorage.getItem(target.id)) + 1)
        load()
    }
    // lovebtn2를 버튼을 누르면 love를 1 올린 뒤 seatchfunc를 작동한다. 
    else if (target.matches(".lovebtn2")) {
        localStorage.setItem(target.id, Number(localStorage.getItem(target.id)) + 1)
        searchfunc()
    }
    // details 버튼을 누르면 detail.html으로 이동한다. 
    else if (target.matches(".details")) {
        localStorage.setItem("movieid", `${target.id}`);
        location.href = "./detail.html";
    }
    // 영화 포스터 opacboxx를 누르면 영화 id를 보여준다.
    else if (target.matches(".opacbox")) {
        alert("영화 ID : " + target.id)
    }
}

// loved 차트를 출력하는 함수이다.
function openloved() {
    document.getElementById("cards").innerHTML = ""
    // 1. love 2. title의 알파벳 순서로 정렬한다. 
    movies.sort(function (prev, next) {
        if (next.love === prev.love) {
            if (prev.title < next.title) {
                return -1;
            } else if (prev.title > next.title) {
                return 1;
            } else {
                return 0;
            }
        } else {
            return next.love - prev.love;
        }
    })

    cards.innerHTML = movies
        .map(function append(movie) {
            if (localStorage.getItem(movie.id) > 0) {
                return (
                    `<div class="card">      
                            <div class="cardbody" id="${movie.id}">
                                <div class="opacbox" style="position: absolute; z-index: 2;">
                                    <p class="alltitle" id="${movie.id}">${movie.title}</p>
                                    <p class="allvote" id="${movie.id}">평점 : ★ ${movie.vote_average}</p>
                                    <p class="allpopularity" id="${movie.id}">인기도 : ${movie.popularity}</p>
                                    <p class="allrelease_date" id="${movie.id}">개봉일 : ${movie.release_date}</p>
                                </div>
                            <div class="imgbox">
                                <span class="allrank" id="${movie.id}">${movies.indexOf(movie) + 1}</span>
                                <img class="allimg" id="${movie.id}" src="https://image.tmdb.org/t/p/w500${movie.poster_path}"></img>
                            </div>
                            <div class="rankvote">
                            </div>
                                <p class="alltime" id="${movie.id}">${localStorage.getItem(movie.id)} people loved this movie</p>   
                            </div>
                            <div class="buttons">
                                <button class="details" id="${movie.id}">Details</button>
                            </div>
                        </div>`)
            }
        }).join("")
}