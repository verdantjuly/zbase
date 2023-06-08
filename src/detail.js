const sendid = localStorage.getItem("movieid")
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
let writtersarray = []
let showlefttime = ""
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
            </div>`}
      if (movie.id == sendid && today < releasedate) {
      // 42번째 줄은 삭제하고 다른 'delete'버튼에 연결해야 합니다!
        title.innerHTML = `${movie.title}`
        overview.innerHTML =
          `<p class="alltime" id="${movie.id}" >${(localStorage.getItem(movie.id))} people loved this movie</p>  
          <p class="allvote" id="${movie.id}" >★ ${movie.vote_average}</p> 
          <p class="overviewtitle">Overview</p>${movie.overview}`

        card.innerHTML = `<img class="img" id="img"   src="https://image.tmdb.org/t/p/w500${movie.poster_path}"></img>`

        review.innerHTML = `<p class="unrelease" >해당 영화는 아직 개봉되지 않았습니다. <br>${showlefttime}일 후에 개봉됩니다.<br>관람 후에 후기를 남겨 주세요.</p>`
      }
    })
}

detailload();

home.addEventListener("click", clickhome);
function clickhome() {
  location.href = "index.html"
}

review.addEventListener("click", clickDetails);

if (!localStorage.getItem(sendid + "allWritters")) { localStorage.setItem(sendid + "allWritters", "|"); }

function clickDetails({ target }) {

  let inputcomment = document.querySelector("#comment").value
  let writtercomment = document.querySelector("#writter").value
  let passwordcomment = document.querySelector("#password").value

  if (target === review) return;

  if (target.matches(".save")) {
    if (!localStorage.getItem(writtercomment + sendid + "pw", passwordcomment)) {
      today = new Date();
      localStorage.setItem(writtercomment + sendid + "pw", passwordcomment);
      localStorage.setItem(writtercomment + sendid + "input", inputcomment);
      localStorage.setItem(writtercomment + sendid + "time", today.toString().slice(0, 24))
      location.reload()
      localStorage.setItem(sendid + "allWritters", localStorage.getItem(sendid + "allWritters") + "|" + writtercomment);
    } else { alert("중복 ID를 생성할 수 없습니다.") }
  }

  else if (target.matches(".edit")) {
    today = new Date();
    if (passwordcomment == localStorage.getItem(writtercomment + sendid + "pw")) {
      localStorage.setItem(writtercomment + sendid + "input", inputcomment)
      localStorage.setItem(writtercomment + sendid + "time", today.toString().slice(0, 24))
      location.reload()
    }
    else if (passwordcomment !== localStorage.getItem(writtercomment + sendid + "pw")) {
      alert("비밀번호가 일치하지 않습니다.")
    }
  }
  // else if (target.matches(".delete")) {
  //   if (passwordcomment == localStorage.getItem(writtercomment + sendid + "pw")) {
  //     localStorage.removeItem(writtercomment + sendid + "pw");
  //     localStorage.removeItem(writtercomment + sendid + "input");
  //     localStorage.removeItem(writtercomment + sendid + "time");
  //     let newwritters = (localStorage.getItem(sendid + "allWritters")).replace("|" + writtercomment, "")
  //     localStorage.setItem(sendid + "allWritters", newwritters)
  //     location.reload()

  //   }
  //   else if (passwordcomment !== writtercomment + target.id + "pw") { alert("비밀번호가 일치하지 않습니다.") }
  // }
}

writtersarray = localStorage.getItem(sendid + 'allWritters').split("|")

for (let i = writtersarray.length - 1; i > 1; i--) {
  let p =
    `<p id="top">Review</p>
    <p class="content">${localStorage.getItem(writtersarray[i] + sendid + "input")}</p>
    <p id="id">ID</p>
    <p class="content">${writtersarray[i]}</p>
    <p id="id">Reivew date</p>
    <p class="content">${localStorage.getItem(writtersarray[i] + sendid + "time")}</p>
    <button class="delete_to_modal" id="${sendid}" type="button">Delete</button>`;

  let divBox = document.createElement('div');
  divBox.className = 'divBoxClass';
  divBox.innerHTML = p;
  comment.appendChild(divBox);
}

// 'modal' 기능을 구현한 함수입니다.
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('delete_to_modal')) {
    console.log(`this is 'sendid' => ${sendid}`);

    let temp_html =
      `<div id="modal_up">
          <input id="user_id" placeholder="user ID" autocomplete="off"></input>
          <input id="user_pw" placeholder="user PW" autocomplete="off"></input>
          <button class="delete_in_modal" id="${movie.id}" type="button">Delete</button>
      </div>`;

    document.getElementById('modal_container').insertAdjacentHTML('beforeend', temp_html);
    document.getElementById('modal').classList.add('active');
    document.getElementById('modal_up').classList.add('active');
  }

  // 'review' 삭제 기능입니다.
  const delete_in_modal = document.querySelector(".delete_in_modal");

  delete_in_modal.addEventListener('click', function () {
  
    let writtercomment = document.querySelector("#user_id").value
    console.log(`this is 'writtercomment' => ${writtercomment}`)
    let passwordcomment = document.querySelector("#user_pw").value
    console.log(`this is 'writtercomment' => ${passwordcomment}`)

    console.log('hello!')
  
    if (passwordcomment == localStorage.getItem(writtercomment + sendid + "pw")) {

      localStorage.removeItem(writtercomment + sendid + "pw");
      localStorage.removeItem(writtercomment + sendid + "input");
      localStorage.removeItem(writtercomment + sendid + "time");

      let newwritters = (localStorage.getItem(sendid + "allWritters")).replace("|" + writtercomment, "")
      localStorage.setItem(sendid + "allWritters", newwritters)

      alert("삭제 완료 되었습니다!")
      location.reload()
    }
    else if (passwordcomment !== writtercomment + sendid + "pw") { alert("비밀번호가 일치하지 않습니다.") }
    }
  )
});

// 'modal' 창을 닫히게 하는 함수입니다.
document.addEventListener('click', function (event) {
  if (event.target.id === 'modal') {
    document.getElementById('modal').classList.remove('active');
    document.getElementById('modal_up').classList.remove('active');
  }
});
