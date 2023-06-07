// import 모듈을 통해 index.js 경로의 변수를 지정하여 가져옵니다.
import { movies, cards, clickAllChart } from "./index.js";
// export 모듈을 활성화 하여 searchfunc 함수 데이터를 보냅니다.
export function searchfunc() {
    // 영화 제목을 받아와 일치하는지 확인 후 조건에 맞는 alert 창 띄움
    document.getElementById("cards").innerHTML = ""
    let searchString = document.querySelector("#search").value
    let noarray = [];

    // 검색어가 없으면 alert를 띄운다.
    if (searchString == false) {
        alert("검색어를 입력하세요!")
    }

    // 검색어가 일치하지 않으면 alert를 띄운다.
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
    // 영화 cards 그리기
    cards.innerHTML = movies
        .map(function append(movie) {
            let uppertitle = movie.title.toUpperCase()
            if (uppertitle.includes(upperSearch)) {
                return (
                    `<div class= "card">      
                        <div class="cardbody" id="${movie.id}">
                            <img class="allimg" id="${movie.id}"  src="https://image.tmdb.org/t/p/w500${movie.poster_path}"></img>
                            <h4 class="alltitle" id="${movie.id}">${movie.title}</h4> 
                            <p class="alltime" id="${movie.id}">${((localStorage.getItem(movie.id)).length) - 1} people loved this movie</p>   
                        </div>
                        <div class = "buttons">
                            <button class="details" id="${movie.id} type="button">Details</button>
                        </div>
                    </div>`)
            }
            cards.addEventListener("click", clickAllChart)
        }).join("")
};

