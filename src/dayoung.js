// dayoung
let today = new Date();
let movies = []
const movie = {}
const apikey = '9119f549275a23ec65b54dfd6152a086'
const title = document.querySelector("#title");
const card = document.querySelector("#card");
const overview = document.querySelector("#overview");
const review = document.querySelector("#review");
const comment = document.querySelector("#comment");
const home = document.querySelector("#home");
let writterarray = []
let showlefttime = ""
home.addEventListener("click", gohome);
function gohome() {
    location.href = "./index.html";
}


let sendid = localStorage.getItem('movieid')
sendid = parseInt(sendid.replace(" type=", ""))

document.addEventListener("DOMContentLoaded", detailload);



function detailload() {
    fetch(`https://api.themoviedb.org/3/movie/${sendid}?api_key=${apikey}`, { method: 'GET' })
        .then(response => response.json())
        .then(movie => {

            let release = movie.release_date
            let releasedate = new Date(release);
            let lefttime = Math.round((releasedate.getTime() - today.getTime()) / 86400000)
            if (1 > lefttime > 0) { showlefttime = lefttime.toString().replace("0", "내") }
            else { showlefttime = lefttime }

            if (movie.id == sendid && today >= releasedate) {
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
      </div>
      `
            }
            if (movie.id == sendid && today < releasedate) {
                title.innerHTML = `${movie.title}`
                overview.innerHTML =
                    `<p class="alltime" id="${movie.id}" >${(localStorage.getItem(movie.id))} people loved this movie</p>  
                <p class="allvote" id="${movie.id}" >★ ${movie.vote_average}</p> 
                <p class="overviewtitle">Overview</p>${movie.overview}`

                card.innerHTML = `<img class="img" id="img"   src="https://image.tmdb.org/t/p/w500${movie.poster_path}"></img>`

                review.innerHTML = `
            
      <p class="unrelease" >해당 영화는 아직 개봉되지 않았습니다. <br>${showlefttime}일 후에 개봉됩니다.<br>관람 후에 후기를 남겨 주세요.</p>  
      `
            }


        })
    let writtersarray = (localStorage.getItem(sendid + 'writters')).split("|")
    for (let i = writtersarray.length - 1; i > 1; i--) {
        let p = `<p id="top">Review</p>
                <p class="content" >
                ${localStorage.getItem(writtersarray[i] + sendid + "input")}
                </p>
                <p id="id">ID</p>
                <p class="content" >${writtersarray[i]} </p>
                <p id="id">Reivew date</p>
                <p class="content" >${localStorage.getItem(writtersarray[i] + sendid + "time")} </p>`

        let div = document.createElement("div")
        div.className = "commentviewbox"
        div.innerHTML = p
        comment.appendChild(div)
    }

}

review.addEventListener("click", clickDetails)



function clickDetails({ target }) {


    let inputcomment = document.querySelector("#comment").value
    let writtercomment = document.querySelector("#writter").value
    let passwordcomment = document.querySelector("#password").value


    if (target === review) return;

    if (target.matches(".save")) {
        today = new Date();
        localStorage.setItem(writtercomment + sendid + "input", inputcomment)
        localStorage.setItem(writtercomment + sendid + "pw", passwordcomment)
        localStorage.setItem(writtercomment + sendid + "time", today.toString().slice(0, 24))
        if (!localStorage.getItem(sendid + 'writters')) { localStorage.setItem(sendid + 'writters', "|") }
        localStorage.setItem(sendid + 'writters', localStorage.getItem(sendid + 'writters') + "|" + writtercomment)
        location.reload()
    }
    else if (target.matches(".edit")) {

        today = new Date();
        if (passwordcomment == localStorage.getItem(writtercomment + sendid + "pw")) {
            localStorage.setItem(writtercomment + sendid + "time", today.toString().slice(0, 24))
            localStorage.setItem(writtercomment + sendid + "input", inputcomment)
            location.reload()
        }
        else if (passwordcomment !== localStorage.getItem(writtercomment + sendid + "pw")) { alert("비밀번호가 일치하지 않습니다.") }
    }
    else if (target.matches(".delete")) {
        if (passwordcomment == localStorage.getItem(writtercomment + sendid + "pw")) {
            localStorage.removeItem(writtercomment + sendid + "input");
            localStorage.removeItem(writtercomment + sendid + "pw");
            localStorage.removeItem(writtercomment + sendid + "time");
            let newwritters = (localStorage.getItem(sendid + 'writters')).replace("|" + writtercomment, "")
            localStorage.setItem(sendid + 'writters', newwritters)
            location.reload()

        }
        else if (passwordcomment !== localStorage.getItem(writtercomment + sendid + "pw")) { alert("비밀번호가 일치하지 않습니다.") }
    }

}







