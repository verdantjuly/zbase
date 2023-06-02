// mobileSwitch() : mobilebtn과 연결된 함수로 css를 모바일 버전으로 바꿔 준다.
function mobileSwitch() { 

    //changehref라는 변수를 선언하고 href로 들어갈 mobile.css의 주소를 작성해 준다.
    let changehref = "src/css/mobile.css" 

    //css라는 변수를 선언하고 cssline을 담는다.
    let css = document.getElementById("cssline") 

    //cssline에서 href부분만 changehref에 담긴 값으로 바꿔준다.
    css.href = changehref; 
}
 // desktopSwitch() : desktopbtn과 연결된 함수로 css를 모바일 버전으로 바꿔 준다.
function desktopSwitch() { 

    //changehref라는 변수를 선언하고 href로 들어갈 index.css의 주소를 작성해 준다.
    let changehref = "src/css/index.css" 

    //css라는 변수를 선언하고 cssline을 담는다.
    let css = document.getElementById("cssline") 

    //cssline에서 href부분만 changehref에 담긴 값으로 바꿔준다.
    css.href = changehref; 
}