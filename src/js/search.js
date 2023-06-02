// search()함수이다. 검색버튼을 누르면 작동한다. 
// index.js의 주석과 동일한 부분은 적지 않는다.
function search() { 
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTE5ZjU0OTI3NWEyM2VjNjViNTRkZmQ2MTUyYTA4NiIsInN1YiI6IjY0NzA4YTllNzcwNzAwMDBhOTQ3ZDdmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3W-E9KnuKEWvia4zXrXpCRKfHz9a5clH7RjrUwJD8iY'
        }
    };

    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        .then(response => response.json())
        .then(data => {

            //search를 id로 갖는 input box에 입력된 내용을 가져와 searchString에 담는다.
            let searchString = document.querySelector("#search").value
            
            //searchString 이 존재하지 않으면 alert를 보여준다.
             if (searchString == false) {
                alert("검색어를 입력하세요!")
             }
             

            let rows = data['results']
            document.getElementById("cards").innerHTML = ""
            
            //대소문자 구별하지 않고 검색이 가능하게 만들기 위해 받은 searchString을 
            // toUpperCase()로 전부 대문자로 바꿔준다.
            let upperSearch = searchString.toUpperCase()
                
            // API에 없는 영화를 찾기 위해 만든 배열이다. 
            let noarray = [] 
            for (i = 0; i < rows.length; i++) {

                //rows에 있는 영화 제목들을 전부 대문자로 저장해 준다.
                noarray.push(rows[i]['title'].toUpperCase())
            } 

            //upperSearch와 일치하는 영화를 담는 배열을 filter를 통해 만든다.
            let filteredtitlearray = noarray.filter(function (item) {
                return item.includes(upperSearch)
            }) 

            //배열의 요소가 생성되지 않아 배열의 길이가 0이라면 alert를 리턴한다.
            if(filteredtitlearray.length==0){ 
                alert("찾으시는 영화가 없습니다!")
            }
            
                
            rows.forEach((a) => {
                let title = a['title']

                //대소문자의 구분 없이 검색어를 찾기 위해 title을 모두 대문자로 바꾼다.
                let uppperTitle = title.toUpperCase() 

                let poster_path = "https://image.tmdb.org/t/p/w500" + a['poster_path']
                let overview = a['overview']
                let vote_average = a['vote_average']
                let id = a['id']  
                let temp =
                    `<div class = "card">
                    <div class="card-body" onclick = 'alert("영화 ID : ${id}")'>
                    <img src="${poster_path}"
                        class="poster_path">
                                <div class="card-body">
                                    <h4 class="cardtitle">${title}</h4>
                                    <p class = "vote_average">★ ${vote_average}</p>
                                    <p class="overview">${overview}</p>
                            </div>
                    </div>`
                    
                //upperSearch를 포함하는 제목이 있다면 해당 카드를 붙인다.
                if (uppperTitle.includes(upperSearch)) { 
                    document.getElementById("cards").insertAdjacentHTML('beforeend', temp);
                }
            })


        }
        )
        

}