

document.addEventListener("DOMContentLoaded", comment); // 페이지 로드시 코멘트 함수 실행
function comment() {

    const save = document.querySelector("#save")
    save.addEventListener("click", savecomment);

}
function savecomment() {

    let name = document.querySelector("#name").value;
    let password = document.querySelector("#password").value;
    localStorage.setItem(name, password);

    let review = document.querySelector("#review").value; // 리뷰 input
    localStorage.setItem("key", review);
    
}


//   save.addEventListener("click", function () {
    
//     const reviewform = document.querySelector(".reviewform"); // 부모 요소
//     const review = document.querySelector(".review"); // 리뷰 input
//     let name = document.querySelector(".name").value; // input name의 name 벨류를 가져온다 ;
//     let password = document.querySelector(".password").value; // input password의 패스워드의 벨류를 가져온다 ;
//     let save = document.querySelector(".save")
    
//     // localStorage에 저장
//     localStorage.setItem(name, password);
//   });


