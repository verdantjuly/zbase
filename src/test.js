// dayoung

let movies = []
const movie = {}
const apikey = '9119f549275a23ec65b54dfd6152a086'
const title = document.querySelector("#title");
const card = document.querySelector("#card");
const overview = document.querySelector("#overview");
const review = document.querySelector("#review");
const comment = document.querySelector("#comment");
const home = document.getElementById("home");
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
    // let writtersarray = (localStorage.getItem(sendid + 'writters')).split("|")
    // console.log(writtersarray)
    // for (let i = writtersarray.length - 1; i > 1; i--) {
    //     let p = `<p id="top">Review</p>
    //             <p class="content" id="reviewcontent2">
    //             ${localStorage.getItem(sendid + "inputcomment")}
    //             </p>
    //             <p id="id">ID</p>
    //             <p class="content" id="writter2">${target.id + "writtercomment"} </p>`
    //     let div = document.createElement("div")
    //     div.className = "commentviewbox"
    //     div.innerHTML = p
    //     comment.appendChild(div)
    // }

}

review.addEventListener("click", clickDetails)



function clickDetails({ target }) {


    let inputcomment = document.querySelector("#comment").value
    let writtercomment = document.querySelector("#writter").value
    let passwordcomment = document.querySelector("#password").value


    if (target === review) return;

    if (target.matches(".save")) {


        localStorage.setItem(writtercomment + target.id + "passwordcomment", passwordcomment);
        localStorage.setItem(writtercomment + target.id + "inputcomment", inputcomment);



        // if (localStorage.getItem("Allcomment") == null) { localStorage.setItem("Allcomment", "|") }
        // localStorage.setItem("Allcomment", localStorage.getItem("Allcomment") + [target.id, writtercomment, passwordcomment, inputcomment]) //배열로 저장하려고 했음



        let allWritters = localStorage.getItem("allWritters")
        let arrayWritters = allWritters.split("|")
        console.log(arrayWritters[0])

        // let output = localStorage.getItem("namekey");

        // const Parsedname = JSON.parse(output);


        // 구분자가 필요한 이유! -> 영화 별로 저장해야한다
        // 무비 아이디 별로 저장을한다.
        // 저장해야할것이 3개.

    }
    else if (target.matches(".edit")) {

    }
    else if (target.matches(".delete")) {

    }


}







