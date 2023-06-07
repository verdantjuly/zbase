// 주요 정보
const sendid = localStorage.getItem("movieid")
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
            <button class="save" type="button">Save</button>
            <button class="edit" type=" button">Edit</button>
            <button class="delete" type=" button">Delete</button>
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

// 페이지를 열면 실행한다.
detailload();

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
    if (!localStorage.getItem(cid + sendid + "pw", cpw)) {
      today = new Date();
      localStorage.setItem(cid + sendid + "pw", cpw);
      localStorage.setItem(cid + sendid + "input", cinput);
      localStorage.setItem(cid + sendid + "time", today.toString().slice(0, 24))
      location.reload()
      // 작성자를 아까 만든 key에 save 할 때 마다 덧붙여 저장한다. 이 때 구분자는 "|" 로 준다. 
      localStorage.setItem(sendid + "allWritters", localStorage.getItem(sendid + "allWritters") + "|" + cid);
    }
    // 같은 아이디가 있는 경우 중복 ID 생성을 방지한다.
    else { alert("중복 ID를 생성할 수 없습니다.") }
  }

  // edit 버튼을 누르면 실행됨
  // 비밀번호와 아이디 입력이 일치할 경우 작성시간과 댓글 내용을 업데이트 해 준다.
  else if (target.matches(".edit")) {
    today = new Date();
    if (cpw == localStorage.getItem(cid + sendid + "pw")) {
      localStorage.setItem(cid + sendid + "input", cinput)
      localStorage.setItem(cid + sendid + "time", today.toString().slice(0, 24))
      location.reload()
    }
    // 비밀번호가 일치하지 않는 경우 alert를 띄운다.
    else if (cpw !== localStorage.getItem(cid + sendid + "pw")) {
      alert("비밀번호가 일치하지 않습니다.")
    }
  }
  // delete 버튼을 누르면 실행됨
  // 비밀번호와 아이디 입력이 일치할 경우 데이터를 삭제한다.
  else if (target.matches(".delete")) {
    if (cpw == localStorage.getItem(cid + sendid + "pw")) {
      localStorage.removeItem(cid + sendid + "pw");
      localStorage.removeItem(cid + sendid + "input");
      localStorage.removeItem(cid + sendid + "time");
      let newwritters = (localStorage.getItem(sendid + "allWritters")).replace("|" + cid, "");
      localStorage.setItem(sendid + "allWritters", newwritters);
      location.reload()
    }
    // 비밀번호가 일치하지 않는 경우 alert를 띄운다.
    else if (cpw !== cid + target.id + "pw") { alert("비밀번호가 일치하지 않습니다.") }
  }
}

// 아까 만든 작성자 이름을 모은 key의 value를 가져와서 split을 통해 배열로 만들어 준다.
writtersarray = localStorage.getItem(sendid + 'allWritters').split("|")
// 리뷰의 개수 만큼 리뷰를 붙여 준다. 
for (let i = writtersarray.length - 1; i > 1; i--) {
  let p =
    `<p id="top">Review</p>
    <p class="content">
      ${localStorage.getItem(writtersarray[i] + sendid + "input")}
    </p>
    <p id="id">ID</p>
    <p class="content" >${writtersarray[i]} </p>
    <p id="id">Reivew date</p>
    <p class="content" >${localStorage.getItem(writtersarray[i] + sendid + "time")}</p>`
  let divBox = document.createElement('div')
  divBox.className = 'divBoxClass'
  divBox.innerHTML = p
  comment.appendChild(divBox)
}
