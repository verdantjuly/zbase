// desktop 클릭 시 mobileSwitch() 함수 실행 > mobile.css로 변환
export function detailmobileSwitch() {

    let changehref = "./css/mobiledetail.css";

    let css = document.getElementById("cssline");

    css.href = changehref;
}
// desktop 클릭 시 desktopSwitch() 함수 실행 > index.css로 변환
export function detaildesktopSwitch() {

    let changehref = "./css/detail.css";

    let css = document.getElementById("cssline");

    css.href = changehref;
}