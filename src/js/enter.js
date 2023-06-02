//search라는 ID를 가진 것에서
document.getElementById("search") 
.addEventListener("keyup", function (e) {
    //Enter 키를 누르게 되면
    if (e.code === 'Enter') { 
        //searchbtn이 클릭 되는 것과 같다.
        document.getElementById("searchbtn").click(); 
    }
});