// desktop 클릭 시 mobileSwitch() 함수 실행 > mobile.css로 변환
export function mobileSwitch() {

    let changehref = "./css/mobile.css";

    let css = document.getElementById("cssline");

    css.href = changehref;
}
// desktop 클릭 시 desktopSwitch() 함수 실행 > index.css로 변환
export function desktopSwitch() {

    let changehref = "./css/index.css";

    let css = document.getElementById("cssline");

    css.href = changehref;
}