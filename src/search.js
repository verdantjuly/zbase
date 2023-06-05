import { movies, cards, clickAllChart } from "./index.js";
export function searchfunc() {

    document.getElementById("cards").innerHTML = ""
    let searchString = document.querySelector("#search").value
    let noarray = [];
    if (searchString == false) {
        alert("검색어를 입력하세요!")
    }

    let upperSearch = searchString.toUpperCase()
    for (let i = 0; i < movies.length; i++) {

        noarray.push(movies[i]['title'].toUpperCase());
    }
    let filteredtitlearray = noarray.filter(function (item) {
        return item.includes(upperSearch)
    })
    if (filteredtitlearray.length == 0) {
        alert("찾으시는 영화가 없습니다!")
    }


    cards.innerHTML = movies
        .map(function append(movie) {
            let uppertitle = movie.title.toUpperCase()
            if (uppertitle.includes(upperSearch)) {
                return (`<div class= "card">      
                <div class="cardbody" id="${movie.id}" >
                <img class="allimg" id="${movie.id}"  src="https://image.tmdb.org/t/p/w500${movie.poster_path}"></img>
                <h4 class="alltitle" id="${movie.id}" >${movie.title}</h4> 
                <p class="alltime" id="${movie.id}">${((localStorage.getItem(movie.id)).length) - 1} people loved this movie</p>   
            </div>
            <div class = "buttons">
            <button class = "lovebtn" id="${movie.id}" type="button">♥︎</button>
            <button class="details" id="${movie.id} type="button">Details</button>
            </div>
            </div>`)
            }
            cards.addEventListener("click", clickAllChart)
        })
        .join("")
};

