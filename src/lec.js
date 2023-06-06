document.addEventListener("DOMContentLoaded", comment); // 페이지 로드시 코멘트 함수 실행
function comment() {

    const save = document.querySelector("#save")
    save.addEventListener("click", savecomment);

}
function savecomment() {
    const Allcomment = []


    let name = document.querySelector("#name").value;
    let password = document.querySelector("#password").value;
    let review = document.querySelector("#review").value; // 리뷰 input
    // Json.stringify(
    localStorage.setItem("namekey",Json.stringify(name));
    localStorage.setItem("passwordkey",password);
    localStorage.setItem("reviewkey",review);
    Allcoment = localStorage.setItem ("Allcomment",(name,password,review))

    let output = localStorage.getItem("namekey");		

    const Parsedname= JSON.parse(output);

    
    // 구분자가 필요한 이유! -> 영화 별로 저장해야한다
    // 무비 아이디 별로 저장을한다.
    // 저장해야할것이 3개.
    
}





const toDos = [];

//toDos 라는 배열의 내용을 localStorage에 넣기 위한 함수
function saveToDos() {
  localStorage.setItem("todos", toDos);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  //   발생한 사건을 함수의 첫번째 인자로 줌.
  const newTodo = toDoInput.value;
  //   input의 value를 비우기전의 값
  toDoInput.value = "";
  //   newTodo라는 변수와 아래의 toDoInput.value는 무관함.
  //   newTodo는 input의 현재 value를 복사한 것이고
  //   그다음 input에 뭘하든 newTodo와는 무관한 것.
  toDos.push(newTodo);
  paintToDo(newTodo);
  //   newTodo에 담은 값을 호출하는 함수
  saveToDos(newTodo);
}