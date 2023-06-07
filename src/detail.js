const sendid = window.localStorage.getItem("movieid")
console.log(sendid)
const apikey = '9119f549275a23ec65b54dfd6152a086'
let today = new Date();
let movies = []
const movie = {}
const title = document.querySelector("#title");
const card = document.querySelector("#card");
const overview = document.querySelector("#overview");
const review = document.querySelector("#review");
const comment = document.querySelector("#comment");
const home = document.querySelector("#home");
let writterarray = []
let showlefttime = ""
function detailload() {
    fetch(`https://api.themoviedb.org/3/movie/${sendid}?api_key=${apikey}`, { method: 'GET' })
        .then(response => response.json())
        .then(movie => {
            title.innerHTML = `${movie.title}`
            overview.innerHTML =
                `<h1 class="alltitle"  id="${movie.id}" >${movie.title}</h1>
            <p class="alltime" id="${movie.id}" >${(localStorage.getItem(movie.id))} people loved this movie</p>  
            <p class="rate" id="rate" >★ ${movie.vote_average}</p> 
            <p class="overviewtitle">Overview</p>${movie.overview}`
            card.innerHTML = `<img class="img" id="img"   src="https://image.tmdb.org/t/p/w500${movie.poster_path}"></img>`
            review.innerHTML = `<input id="comment" placeholder="please leave short review" autocomplete="off" autofocus></input>
            <div class = "login">
                <input id="writter" placeholder="id" autocomplete="off" >
                <input type="password" id="password" placeholder="password" autocomplete="off" >
            </div>
            <div class = "buttons">
                <button class="save" id="${movie.id}" type="button">Save</button>
                <button class="edit" id="${movie.id}" type=" button">Edit</button>
                <button class="delete" id="${movie.id}" type=" button">Delete</button>
            </div>`
        })
}

detailload();

reivew.addEventListener("click", clickDetails);

function clickDetails({ target }) {


    let inputcomment = document.querySelector("#comment").value
    let writtercomment = document.querySelector("#writter").value
    let passwordcomment = document.querySelector("#password").value


    if (target === review) return;

    if (target.matches(".save")) {
            localStorage.setItem(
              writtercomment + target.id + "passwordcomment",
              passwordcomment
            );
            localStorage.setItem(
              writtercomment + target.id + "inputcomment",
              inputcomment
            );
          
          
            if (localStorage.getItem("allWritters") == null) {
              localStorage.setItem("allWritters", "|");
            }
            localStorage.setItem(
              "allWritters",
              localStorage.getItem("allWritters") + "|" + writtercomment
            );
            location.reload()
          
          } 

    
    else if (target.matches(".edit")) {

        

        
    }
    else if (target.matches(".delete")) {
        
}}

home.addEventListener("click", clickhome);

function clickhome () {
    alert("test")
}

// 갑시다
//뭐를 포문으로 돌려달라고 말씀하신거죵?
//이걸 for문으로 돌려서 붙일 거예용
// 가운데 조건은 우리가 작성한 만큼 붙일 거예요 일단은
// 그렇게 하려면 작성자가 모여 있는 배열의 length를 가져와 주면 됩니다
// 작성자가 모여 있는 배열은 writtersarray로 제가 만들었어요


let p = `<p id="top">Review</p>
<p class="content" >
${localStorage.getItem(writtersarray[i] + sendid + "input")}
</p>
<p id="id">ID</p>
<p class="content" >${writtersarray[i]} </p>
<p id="id">Reivew date</p>
<p class="content" >${localStorage.getItem(writtersarray[i] + sendid + "time")} </p>`

for (let i=0; i < writterarray.length ; i++)

// git add .
// git checkout -b LEC
// git





