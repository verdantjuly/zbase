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

home.addEventListener("click", clickhome);

review.addEventListener("click", clickDetails);

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
    if (target.matches(".edit")) {
      // 비밀번호가 저장된 비밀번호와 일치할 때 수정을 해준다
      // 정보를 덮어씌운다
      if (passwordcomment == localStorage.getItem(writtercomment + sendid + "pw")) {
        localStorage.setItem(writtercomment + sendid + "input", inputcomment)
      }
      location.reload()
    }
  }
  else if (target.matches(".delete")) {
  }
}

function clickhome() {
  location.href = "index.html"
}

let writtersarray = (localStorage.getItem(sendid + 'writters')).split("|")

for (let i = 0; i < writtersarray.length - 1; i++) {
  let p = `<p id="top">Review</p>
                <p class="content" >
                ${localStorage.getItem(writtersarray[i] + sendid + "input")}
                </p>
                <p id="id">ID</p>
                <p class="content" >${writtersarray[i]} </p>
                <p id="id">Reivew date</p>
                <p class="content" >${localStorage.getItem(writtersarray[i] + sendid + "time")} </p>`
  let divBox = document.createElement('div')
  divBox.className = 'divBoxClass'
  divBox.innerHTML = p
  comment.appendChild(divBox)
}
