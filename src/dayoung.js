let movies = []
const movie = {}
let writtersarray = []
const apikey = '9119f549275a23ec65b54dfd6152a086'
const title = document.querySelector("#title");
const card = document.querySelector("#card");
const overview = document.querySelector("#overview");
const review = document.querySelector("#review");
const home = document.getElementById("home");
const reviewcontent1 = document.querySelector("#reviewcontent1");
const reviewcontent2 = document.querySelector("#reviewcontent2");
const reviewcontent3 = document.querySelector("#reviewcontent3");
const writter1 = document.querySelector("#writter1");
const writter2 = document.querySelector("#writter2");
const writter3 = document.querySelector("#writter3");
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
            let today = new Date();
            let release = movie.release_date
            let releasedate = new Date(release);
            let lefttime = Math.round((releasedate.getTime() - today.getTime()) / 86400000)
            if (1 > lefttime > 0) { showlefttime = lefttime.toString().replace("0", "내") }
            else { showlefttime = lefttime }

            if (movie.id == sendid && today >= releasedate) {
                title.innerHTML = `${movie.title}`
                overview.innerHTML =
                    `<h1 class="alltitle"  id="${movie.id}" >${movie.title}</h1>
                    <p class="alltime" id="${movie.id}" >${((localStorage.getItem(movie.id)).length) - 1} people loved this movie</p>  
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
                    `<p class="alltime" id="${movie.id}" >${((localStorage.getItem(movie.id)).length) - 1} people loved this movie</p>  
                <p class="allvote" id="${movie.id}" >★ ${movie.vote_average}</p> 
                <p class="overviewtitle">Overview</p>${movie.overview}`

                card.innerHTML = `<img class="img" id="img"   src="https://image.tmdb.org/t/p/w500${movie.poster_path}"></img>`

                review.innerHTML = `
            
      <p class="unrelease" >해당 영화는 아직 개봉되지 않았습니다. <br>${showlefttime}일 후에 개봉됩니다.<br>관람 후에 후기를 남겨 주세요.</p>  
      `
            }



        })


}

review.addEventListener("click", clickDetails)
if (!localStorage.getItem(sendid + 'writters')) { localStorage.setItem(sendid + 'writters', "|") }
writtersarray = (localStorage.getItem(sendid + 'writters')).split("|")
writter1.innerHTML = writtersarray[writtersarray.length - 1]
writter2.innerHTML = writtersarray[writtersarray.length - 2]
writter3.innerHTML = writtersarray[writtersarray.length - 3]
reviewcontent1.innerHTML = localStorage.getItem(writtersarray[writtersarray.length - 1] + sendid + "input")
reviewcontent2.innerHTML = localStorage.getItem(writtersarray[writtersarray.length - 2] + sendid + "input")
reviewcontent3.innerHTML = localStorage.getItem(writtersarray[writtersarray.length - 3] + sendid + "input")
if (writtersarray[writtersarray.length - 1] == undefined) { writter1.innerHTML = "" }
if (writtersarray[writtersarray.length - 2] == undefined) { writter2.innerHTML = "" }
if (writtersarray[writtersarray.length - 3] == undefined) { writter3.innerHTML = "" }


function clickDetails({ target }) {


    let inputcomment = document.querySelector("#comment").value
    let writtercomment = document.querySelector("#writter").value
    let passwordcomment = document.querySelector("#password").value


    if (target === review) return;

    if (target.matches(".save")) {
        localStorage.setItem(writtercomment + sendid + "input", inputcomment)
        localStorage.setItem(writtercomment + sendid + "pw", passwordcomment)
        if (!localStorage.getItem(sendid + 'writters')) { localStorage.setItem(sendid + 'writters', "|") }
        localStorage.setItem(sendid + 'writters', localStorage.getItem(sendid + 'writters') + "|" + writtercomment)
        localStorage.setItem('admin' + sendid, 'clear')
        location.reload()
    }
    else if (target.matches(".edit")) {
        if (passwordcomment == localStorage.getItem(writtercomment + sendid + "pw")) {
            localStorage.setItem(writtercomment + sendid + "input", inputcomment)
            location.reload()
        }
        else if (passwordcomment !== localStorage.getItem(writtercomment + sendid + "pw")) { alert("비밀번호가 일치하지 않습니다.") }
    }
    else if (target.matches(".delete")) {
        if (passwordcomment == localStorage.getItem(writtercomment + sendid + "pw")) {
            localStorage.removeItem(writtercomment + sendid + "input");
            localStorage.removeItem(writtercomment + sendid + "pw");
            let newwritters = (localStorage.getItem(sendid + 'writters')).replace("|" + writtercomment, "")
            localStorage.setItem(sendid + 'writters', newwritters)
            location.reload()

        }
        else if (passwordcomment !== localStorage.getItem(writtercomment + sendid + "pw")) { alert("비밀번호가 일치하지 않습니다.") }
    }

}







