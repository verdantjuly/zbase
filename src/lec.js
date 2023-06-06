// document.addEventListener("DOMContentLoaded", comment); // 페이지 로드시 코멘트 함수 실행
// function comment() {

//     const save = document.querySelector("#save")
//     save.addEventListener("click", savecomment);

// }
// function savecomment() {
//     let Allcomment = []


//     let name = document.querySelector("#name").value;
//     let password = document.querySelector("#password").value;
//     let review = document.querySelector("#review").value; // 리뷰 input
//     // Json.stringify(
//     localStorage.setItem("namekey",Json.stringify(name));
//     localStorage.setItem("passwordkey",password);
//     localStorage.setItem("reviewkey",review);
//     localStorage.setItem ("Allcomment", name,review)

//     let output = localStorage.getItem("namekey");		

//     let Parsedname= JSON.parse(output);

    
    // 구분자가 필요한 이유! -> 영화 별로 저장해야한다
    // 무비 아이디 별로 저장을한다.
    // 저장해야할것이 3개.
    
// }


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





