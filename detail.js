

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



