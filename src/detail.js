// 주요 정보
let sendid = localStorage.getItem("movieid")
const apikey = '9119f549275a23ec65b54dfd6152a086'

// 전역 변수 초기화
const movie = {}
let today = new Date();
let movies = []
let writtersarray = []
let showlefttime = ""

// ID 값에 해당하는 개체 변수에 담기
const title = document.querySelector("#title");
const card = document.querySelector("#card");
const overview = document.querySelector("#overview");
const review = document.querySelector("#review");
const comment = document.querySelector("#comment");
const home = document.querySelector("#home");

// prev, next 버튼 실행 방법
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
prev.addEventListener("click", prevfunc);
next.addEventListener("click", nextfunc);

document.addEventListener("DOMContentLoaded", pastereview);

function prevfunc() {
  let ranknum = parseInt(localStorage.getItem("rankof" + sendid)) - 1
  if (ranknum > 0) {
    sendid = localStorage.getItem(ranknum)
    detailload()
    pastereview()
  } else { alert("제일 처음 영화입니다.") }
}
function nextfunc() {
  let ranknum = parseInt(localStorage.getItem("rankof" + sendid)) + 1
  if (ranknum < 21) {
    sendid = localStorage.getItem(ranknum)
    detailload()
    pastereview()
  } else { alert("제일 마지막 영화입니다.") }
}


// 메인페이지를 실행하면 작동하는 함수 detailload
function detailload() {
  fetch(`https://api.themoviedb.org/3/movie/${sendid}?api_key=${apikey}`, { method: 'GET' })
    .then(response => response.json())
    .then(movie => {

      // 개봉일과 개봉일까지 남은 시간을 계산
      let release = movie.release_date
      let releasedate = new Date(release);
      let lefttime = Math.round((releasedate.getTime() - today.getTime()) / 86400000)

      // 개봉일까지 남은 시간이 반올림 하여 0일이라면 내일로 표시해 준다.
      if (1 > lefttime > 0) { showlefttime = lefttime.toString().replace("0", "내") }

      // 그렇지 않다면 n일로 표시한다.
      else { showlefttime = lefttime }

      // 개봉일이 지나면 작동하는 if문
      if (today >= releasedate) {
        title.innerHTML = `${movie.title}`
        overview.innerHTML =
          `<h1 class="alltitle">${movie.title}</h1>
        <p class="alltime">${(localStorage.getItem(movie.id))} people loved this movie</p>  
        <p class="rate" id="rate">★ ${movie.vote_average}</p> 
        <p class="overviewtitle">Overview</p>${movie.overview}`
        card.innerHTML = `<img class="img" id="img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}"></img>`
        review.innerHTML = `<input id="comment" placeholder="please leave short review" autocomplete="off" autofocus></input>
        <div class="login">
            <input id="writter" placeholder="id" autocomplete="off">
            <input type="password" id="password" placeholder="password" autocomplete="off">
        </div>
        <div class="buttons">
            <button class="save" id =${movie.id} type="button">Save</button>
            <button class="edit"  id =${movie.id} type=" button">Edit</button>
            <button class="delete"  id =${movie.id} type=" button">Delete</button>
        </div>`
      }
      // 개봉일 전이면 작동하는 else if문
      else if (today < releasedate) {
        title.innerHTML = `${movie.title}`
        overview.innerHTML =
          `<p class="alltime" id="${movie.id}" >${(localStorage.getItem(movie.id))} people loved this movie</p>  
          <p class="allvote" id="${movie.id}" >★ ${movie.vote_average}</p> 
          <p class="overviewtitle">Overview</p>${movie.overview}`
        card.innerHTML = `<img class="img" id="img"   src="https://image.tmdb.org/t/p/w500${movie.poster_path}"></img>`
        review.innerHTML = `<p class="unrelease" >해당 영화는 아직 개봉되지 않았습니다. <br>${showlefttime}일 후에 개봉됩니다.<br>관람 후에 후기를 남겨 주세요.</p>`
      }
    }
    )
}
detailload()

// 홈 버튼을 누르면 index.html 로 이동한다.
home.addEventListener("click", clickhome);
function clickhome() {
  location.href = "index.html"
}

// review 영역을 클릭하면 clickDetails 함수가 작동한다.
review.addEventListener("click", clickDetails);

// 작성자 이름을 모은 key를 생성한다. 작성자가 없으면 초기값으로 "|"를 할당한다.
if (!localStorage.getItem(sendid + "allWritters")) { localStorage.setItem(sendid + "allWritters", "|"); }

function clickDetails({ target }) {

  // 입력창의 댓글
  let cinput = document.querySelector("#comment").value

  // 입력창의 아이디
  let cid = document.querySelector("#writter").value

  // 입력창의 비밀번호
  let cpw = document.querySelector("#password").value

  // 클릭한 곳이 매치 바깥의 리뷰라면 아무것도 반환하지 않는다.
  if (target === review) return;

  // save 버튼을 누르면 실행됨( 비밀번호, 댓글, 작성시간을 저장 )
  if (target.matches(".save")) {
    // ID를 입력하지 않았을 경우 alert를 띄운다.
    if (!cid) { alert("ID를 입력해주세요.") }
    // PW를 입력하지 않았을 경우 alert를 띄운다.
    else if (!cpw) { alert("비밀번호를 입력해주세요.") }
    // INPUT를 입력하지 않았을 경우 alert를 띄운다.
    else if (!cinput) { alert("내용을 입력해주세요.") }
    // 같은 아이디가 있는 경우 중복 ID 생성을 방지한다.
    else if (cpw == localStorage.getItem(cid + target.id + "pw", cpw)) { alert("중복 ID를 생성할 수 없습니다.") }
    // 위의 경우가 모두 안닌 경우 ID 생성을 허가한다.
    else if (!localStorage.getItem(cid + target.id + "pw", cpw)) {
      today = new Date();
      localStorage.setItem(cid + target.id + "pw", cpw);
      localStorage.setItem(cid + target.id + "input", cinput);
      localStorage.setItem(cid + target.id + "time", today.toString().slice(0, 24))
      // 작성자를 아까 만든 key에 save 할 때 마다 덧붙여 저장한다. 이 때 구분자는 "|" 로 준다. 
      localStorage.setItem(target.id + "allWritters", localStorage.getItem(target.id + "allWritters") + "|" + cid);
      sendid = target.id
      detailload()
      pastereview()
    }
  }

  // edit 버튼을 누르면 실행됨
  // 비밀번호와 아이디 입력이 일치할 경우 작성시간과 댓글 내용을 업데이트 해 준다.
  else if (target.matches(".edit")) {
    today = new Date();
    if (cpw == localStorage.getItem(cid + target.id + "pw")) {
      console.log(target.id)
      localStorage.setItem(cid + target.id + "input", cinput)
      localStorage.setItem(cid + target.id + "time", today.toString().slice(0, 24))
      sendid = target.id
      detailload()
      pastereview()
    }
    // 비밀번호가 일치하지 않는 경우 alert를 띄운다.
    else if (cpw !== localStorage.getItem(cid + target.id + "pw")) {
      alert("비밀번호가 일치하지 않습니다.")
      console.log(target.id)
      sendid = target.id
      detailload()
      pastereview()
    }
  }
  // delete 버튼을 누르면 실행됨
  // 비밀번호와 아이디 입력이 일치할 경우 데이터를 삭제한다.
  else if (target.matches(".delete")) {
    if (cpw == localStorage.getItem(cid + target.id + "pw")) {
      localStorage.removeItem(cid + target.id + "pw");
      localStorage.removeItem(cid + target.id + "input");
      localStorage.removeItem(cid + target.id + "time");
      let newwritters = (localStorage.getItem(target.id + "allWritters")).replace("|" + cid, "");
      localStorage.setItem(target.id + "allWritters", newwritters);
      location.reload;
    }
    // 비밀번호가 일치하지 않는 경우 alert를 띄운다.
    else if (cpw !== cid + target.id + "pw") { alert("비밀번호가 일치하지 않습니다.") }
  }
}

function pastereview() {
  // 아까 만든 작성자 이름을 모은 key의 value를 가져와서 split을 통해 배열로 만들어 준다.
  if (!localStorage.getItem(sendid + 'allWritters')) { localStorage.setItem(sendid + 'allWritters', "|") }
  writtersarray = localStorage.getItem(sendid + 'allWritters').split("|")
  // 리뷰의 개수 만큼 리뷰를 붙여 준다. 
  comment.innerHTML = ""
  for (let i = writtersarray.length - 1; i > 1; i--) {
    let p =
      `<p id="top">Review</p>
    <p class="content">
      ${localStorage.getItem(writtersarray[i] + sendid + "input")}
    </p>
    <p id="id">ID</p>
    <p class="content" >${writtersarray[i]} </p>
    <p id="id">Reivew date</p>
    <p class="content" >${localStorage.getItem(writtersarray[i] + sendid + "time")}</p>
    <button class="delete_to_modal" id="${writtersarray[i]}" type="button">Delete</button>
    <div id ='modal_container'></div>
    <div id ='modal'></div>
    <div id ='modal_up'></div>`
    let divBox = document.createElement('div')
    divBox.className = 'divBoxClass'
    divBox.innerHTML = p
    comment.appendChild(divBox)
  }
}

// 'modal' 기능을 구현한 함수입니다.
document.addEventListener('click', function (event) {

  if (event.target.classList.contains('delete_to_modal')) {
    let targetid = event.target.id

    let temp_html =
      `<div id="modal_up">
          <input id="user_id" placeholder="user ID" autocomplete="off"></input>
          <input id="user_pw" placeholder="user PW" autocomplete="off"></input>
          <button class="delete_in_modal" id="${targetid}" type="button">Delete</button>
      </div>`;

    document.getElementById('modal_container').insertAdjacentHTML('beforeend', temp_html);
    document.getElementById('modal').classList.add('active');
    document.getElementById('modal_up').classList.add('active');
  } else { return; } // <--- 이걸로 인해서 해결!

  // 'review' 삭제 기능입니다.

  const delete_in_modal = document.querySelector(".delete_in_modal");

  delete_in_modal.addEventListener('click', function ({ target }) {

    let writtercomment = document.querySelector("#user_id").value
    let passwordcomment = document.querySelector("#user_pw").value

    if (passwordcomment == localStorage.getItem(target.id + sendid + "pw") && writtercomment == target.id) {
      localStorage.removeItem(target.id + sendid + "pw");
      localStorage.removeItem(target.id + sendid + "input");
      localStorage.removeItem(target.id + sendid + "time");

      let newwritters = (localStorage.getItem(sendid + "allWritters")).replace("|" + target.id, "");
      localStorage.setItem(sendid + "allWritters", newwritters);

      alert("삭제 완료 되었습니다!")
      return location.reload() // <--- 이걸로 인해서 해결!
    }
    else if (writtercomment !== target.id && passwordcomment !== localStorage.getItem(target.id + sendid + "pw")) {
      alert("해당 리뷰 작성자가 아닙니다.")
      return
    }
    else if (writtercomment == target.id && passwordcomment !== localStorage.getItem(target.id + sendid + "pw")) {
      alert("비밀번호가 일치하지 않습니다.")
      return
    }
    else if (writtercomment !== target.id && passwordcomment == localStorage.getItem(target.id + sendid + "pw")) {
      alert("ID가 일치하지 않습니다.")
      return
    }
  });
})

// 'modal' 창을 닫히게 하는 함수입니다.
document.addEventListener('click', function (event) {
  if (event.target.id === 'modal') {
    document.getElementById('modal').classList.remove('active');
    document.getElementById('modal_up').classList.remove('active');
  }
});