
let memoinput

// 전역변수 m에 새 Map을 담아보자.
let m = new Map()

// 전역변수 memo에 새 Map을 담아보자.
let memo = new Map()

// 전역변수 movies에  배열을 세팅하자. 담길 내용은 rows + love이다. 
let movies = []

// 전역변수 rankarray에 빈 배열을 세팅하자. 영화 순위를 담는 배열이다.
let rankarray = []

// 전역변수 rank를 0으로 초기화하자. 영화 순위이다.
let rank = 0

// load() 함수 : h1 Moviechart 타이틀과 allchart 버튼을 누르면 작동하며 body를 켜면 실행된다.
function load() {
    const options = {
        method: 'GET', //GET 메서드
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTE5ZjU0OTI3NWEyM2VjNjViNTRkZmQ2MTUyYTA4NiIsInN1YiI6IjY0NzA4YTllNzcwNzAwMDBhOTQ3ZDdmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3W-E9KnuKEWvia4zXrXpCRKfHz9a5clH7RjrUwJD8iY'
        } // Authorization : 토큰
    };

    // fetch에 options를 더해서 작동한다.
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)

        // json 방식으로 응답해 줘. 여기서 response는 매개변수로 이름을 바꿔도 작동한다.
        .then(response => response.json())

        // then : 비동기 처리가 끝난 다음에 처리할 일을 정의할 수 있다.
        // 비동기 처리 : 특정 로직의 실행이 끝날때까지 기다려주지 않고 나머지 코드를 먼저 실행하는것
        .then(data => {

            //rankarray 초기화 
            rankarray = []

            // rank 초기화 
            rank = 0

            // data의 results 값을 변수 rows에 담는다.
            let rows = data['results']


            // movies의 length가 0이라면 즉 movies라는 것이 빈 배열이라면
            if (movies.length == 0) {

                //movies에 rows를 복제한 것에 love:0을 movies 전체에 추가해 준다.
                movies = rows.map(movie => ({ ...movie, love: 0 }))
                // 인수(parameter)가 하나일 때는 ()생략 가능
            }

            // 그 외의 경우, 즉 movies[0] 이 존재하면
            // (movies에 요소를 생성하는 위 식에 의해 movies는 [0]이 있으면 나머지가 다 있는 것이다.) 
            else {

                for (i = 0; i < movies.length; i++) {
                    //movies의 i번째 배열의 love를 업데이트 해 준다. 이때 love가 없는 경우 undefined가 발생한다.
                    movies[i].love = m.get(movies[i]['id'])

                    //love가 false 즉 undefined 하면 love는 다시 0을 넣어준다.
                    if (!movies[i].love) { movies[i].love = 0 }
                }
            }

            // populararray라는 빈 배열을 선언한다.
            // 이 배열은 각 movies의 popularity를 API순서대로 모은 것이다.
            //for문 안에 선언해 주면 계속 초기화 되므로 바깥으로 뺀다.
            let populararray = []

            // for문을 인덱스 0부터 movies.length까지 돌린다.
            for (i = 0; i < movies.length; i++) {

                // popularity를 API 순서대로 모은 배열을 만든다.
                populararray.push(movies[i]['popularity'])

                // map을 통해 각 populararray의 요소를 연산한다.
                let popular = populararray.map(function (item) {

                    // Math.floor를 이용해 소수점 뒷 부분을 내린다. (소수점 제거)
                    return Math.floor(item);
                })

                // movies의 i번째 인덱스에 showpopularity가 없으면
                if (!movies[i].showpopularity) {

                    // movies의 i번째 인덱스에 showpopularity 를 popular[i] 값으로 바꿔준다.
                    movies[i].showpopularity = popular[i]
                }
            }

            // cards 안에 있는 모든 것을 지운다.
            document.getElementById("cards").innerHTML = ""

            movies.sort(function (a, b) {

                // 평점이 같으면
                if (b.vote_average === a.vote_average) {

                    //제목을 비교하여 알파벳순으로 sort 한다.
                    if (a.title < b.title) {
                        return -1;
                    } else if (a.title > b.title) {
                        return 1;
                    } else {
                        return 0;
                    }

                    // 이 외에, 즉 평점이 다르면 평점순으로 sort 한다.
                } else {
                    return b.vote_average - a.vote_average;
                }
            });


            // mychart를 갔다가 다시 allchart로 돌아오는 경우 movies가 love 순으로 sort 된다.
            // 그러므로 vote_average 기준으로 다시 sort 해 준다.
            // 이때 vote_average가 같으면 알파벳 순으로 정렬한다.

            //movies를 기준으로 forEach 반복문을 돌린다.
            movies.forEach((a) => {

                // 영화 id
                let id = a['id']

                // 영화 제목
                let title = a['title']

                // 영화 포스터 이미지 경로
                // 기본 주소값을 String으로 주고 w500은 weight, 시도 결과 일정 크기 미만은 엑박 오류가 난다.) 
                // 뒤에 경로를 API에서 찾아서 붙여 준다.
                let poster_path = "https://image.tmdb.org/t/p/w500" + a['poster_path']

                // 영화 줄거리
                let overview = a['overview']

                // 평점
                let vote_average = a['vote_average']

                // 인기도
                let showpopularity = a['showpopularity']

                // 장르id
                let genre = a['genre_ids']

                // all chart의 movies는 평점 순으로 정리되어 있다. 평점 순으로 id를 rankarray 배열에 push 한다.
                rankarray.push(id)

                // rankarray의 인덱스가 순위가 된다. 인덱스이므로 0부터 시작하여 편의상 1을 더해서 1부터 세게 만든다.
                rank = rankarray.indexOf(id) + 1

                // love는 movies의 love이다.
                let love = a['love']

                // 만약 love가 false이면 love에 0을 담는다.
                if (!love) { love = 0 }

                // 전역변수 memoinput에 id를 키로 갖는 memo객체의 value를 넣어주자.
                memoinput = memo.get(id)

                // memoinput이 false 이면 "" 빈 문자열을 넣어준다.
                if (!memoinput) { memoinput = "" }

                // 백틱 안에 카드 내용을 작성한다. 이게 하나의 카드 양식이다.
                let temp =
                    ` <div class = "card">
                        <button id="lovebtn" onclick="love(${id}),load()" type="button">♥︎</button>
                        <p class="love">${love} times loved this movie</p>  
                        <div class="card-body" onclick = 'alert("영화 ID : ${id}")' > 
                        <img src="${poster_path}"
                        class="poster_path">
                                <div class="card-body">
                                    <p class = "rank"> ${rank} </p>
                                    <h4 class="cardtitle">${title}</h4>
                                    <p class = "vote_average">★ ${vote_average}</p>
                                    <p class="showpopularity">popularity : ${showpopularity}</p>
                                    <p class="overview">${overview}</p>    
                                 </div>
                            </div>
                            <div class = "memo">
                            <input id="memo${id}" class="memobox" placeholder="short memo" autocomplete="off" >
                            <button id="memobtn" onclick="memolist(${id}),load()" type="button">memo</button> 
                            <p class = "memoinput"> ${memoinput} </p>
                            </div> 
                        <div>`

                // 하트
                // 하트 버튼을 누르면 love(id)와 load()가 연쇄적으로 작동한다. 
                // love(id)로 클릭 수를 저장하고 load로 화면을 다시 띄워 표시한다.

                // 메모
                // 메모 버튼을 누르면 memolist(id)와 load()가 연쇄적으로 작동한다.
                // memoinput 으로 memo 객체의 value를 받아서 표시해 준다.

                // 카드를 클릭하면 영화 ID를 alert로 알려 준다.
                // ${}를 이용하여 백틱 안에 변수들을 차곡차곡 넣어 준다.

                document.getElementById("cards").insertAdjacentHTML('beforeend', temp);
                // cards라는 id를 가진 곳이 끝나기 전에 temp를 붙인다.
                // forEach안에 있으므로 연속해서 붙인다.
            })

        }
        )


};


// anime 함수이다. 애니메이션 차트를 소환한다. 
// 애니메이션 장르만을 담아서 sort해서 순위를 재정렬한다.
// 중복되는 설명은 생략할 수 있다.
// movies라는 배열을 돌려서 사용할 것이므로 fetch할 필요가 없다.
function anime() {

    document.getElementById("cards").innerHTML = ""
    rankarray = []
    rank = 0

    // anime 차트를 한 번 돌 때 마다 love를 업데이트하는 식
    for (i = 0; i < movies.length; i++) {

        //movies의 i번째 배열의 love를 업데이트 해 준다.
        movies[i].love = m.get(movies[i]['id'])

        //love가 false 즉 undefined 하면 love는 0을 넣어준다.
        if (!movies[i].love) { movies[i].love = 0 }
    }

    movies.sort(function (a, b) {

        // 평점이 같으면
        if (b.vote_average === a.vote_average) {

            //제목을 비교하여 알파벳순으로 sort 한다.
            if (a.title < b.title) {
                return -1;
            } else if (a.title > b.title) {
                return 1;
            } else {
                return 0;
            }

            //이 외에, 즉 평점이 다르면 평점순으로 sort 한다.
        } else {
            return b.vote_average - a.vote_average;
        }
    })

    movies.forEach((a) => {
        let id = a['id']
        let title = a['title']
        let poster_path = "https://image.tmdb.org/t/p/w500" + a['poster_path']
        let overview = a['overview']
        let vote_average = a['vote_average']
        let showpopularity = a['showpopularity']
        let genre = a['genre_ids']

        //rankarray 에 애니메이션만 모은다. 즉 장르 id가 16인 것들만 모은다. 장르 id 16은 애니메이션이다.
        if (genre.includes(16)) { rankarray.push(id) }

        // rankarray의 인덱스가 순위가 된다. 인덱스이므로 0부터 시작하여 편의상 1을 더해서 1부터 세게 만든다.
        rank = rankarray.indexOf(id) + 1

        // love는 movies의 love이다.
        let love = a['love']

        // 만약 love가 false이면 love에 0을 담는다.
        if (!love) { love = 0 }
        memoinput = memo.get(id)
        if (!memoinput) { memoinput = "" }
        let temp =
            ` <div class = "card">
            <button id="lovebtn" onclick="love(${id}),anime()" type="button">♥︎</button>
            <p class="love">${love} times loved this movie</p>  
            <div class="card-body" onclick = 'alert("영화 ID : ${id}")' > 
            <img src="${poster_path}"
            class="poster_path">
                    <div class="card-body">
                        <p class = "rank"> ${rank} </p>
                        <h4 class="cardtitle">${title}</h4>
                        <p class = "vote_average">★ ${vote_average}</p>
                        <p class="showpopularity">popularity : ${showpopularity}</p>
                        <p class="overview">${overview}</p>    
                     </div>
                </div>
                <div class = "memo">
                <input id="memo${id}" class="memobox" placeholder="short memo" autocomplete="off" >
                <button id="memobtn" onclick="memolist(${id}),anime()" type="button">memo</button> 
                <p class = "memoinput"> ${memoinput} </p>
                </div> 
            <div>`
        // 하트 버튼을 누르면 love(id)와 anime()가 연쇄적으로 작동한다. 
        // love(id)로 클릭 수를 저장하고 load로 화면을 다시 띄워 표시한다.


        // 장르아이디에 16 (애니메이션)을 포함하면
        if (genre.includes(16)) {

            // 그 카드들만 붙여 준다. 
            document.getElementById("cards").insertAdjacentHTML('beforeend', temp);
        }
    })

}


// mychart 함수이다. 
// 좋아요 순으로 좋아요를 누른 카드만  sort해서 보여 주는 mychart 차트를 소환한다.
// 중복되는 설명은 생략할 수 있다.
// movies라는 배열을 돌려서 사용할 것이므로 fetch할 필요가 없다.
function mychart() {

    document.getElementById("cards").innerHTML = ""
    rankarray = []
    rank = 0

    // mychart 차트를 한 번 돌 때 마다 love를 업데이트하는 식
    for (i = 0; i < movies.length; i++) {
        movies[i].love = m.get(movies[i]['id'])
        if (!movies[i].love) { movies[i].love = 0 }
    }

    // movies의 데이터를 love 즉, 하트 클릭 횟수 내림차순으로 정렬한다.
    movies.sort(function (a, b) {
        //love가 같으면
        if (b.love === a.love) {
            //제목을 비교하여 알파벳순으로 sort 한다.
            if (a.title < b.title) {
                return -1;
            } else if (a.title > b.title) {
                return 1;
            } else {
                return 0;
            }
            //이 외에, 즉 love 가 다르면 love 순으로 sort 한다.
        } else {
            return b.love - a.love;
        }
    })

    movies.forEach((a) => {
        let id = a['id']
        let title = a['title']
        let poster_path = "https://image.tmdb.org/t/p/w500" + a['poster_path']
        let overview = a['overview']
        let vote_average = a['vote_average']
        let showpopularity = a['showpopularity']
        let love = a['love']
        memoinput = memo.get(id)
        if (!memoinput) { memoinput = "" }
        //rankarray 에 하트를 누른 것만 모은다.
        if (love > 0) { rankarray.push(id) }
        rank = rankarray.indexOf(id) + 1

        if (!love) { love = 0 }
        let temp =
            ` <div class = "card">
            <button id="lovebtn" onclick="love(${id}),mychart()" type="button">♥︎</button>
            <p class="love">${love} times loved this movie</p>  
            <div class="card-body" onclick = 'alert("영화 ID : ${id}")' > 
            <img src="${poster_path}"
            class="poster_path">
                    <div class="card-body">
                        <p class = "rank"> ${rank} </p>
                        <h4 class="cardtitle">${title}</h4>
                        <p class = "vote_average">★ ${vote_average}</p>
                        <p class="showpopularity">popularity : ${showpopularity}</p>
                        <p class="overview">${overview}</p>    
                     </div>
                </div>
                <div class = "memo">
                <input id="memo${id}" class="memobox" placeholder="short memo" autocomplete="off" >
                <button id="memobtn" onclick="memolist(${id}),mychart()" type="button">memo</button> 
                <p class = "memoinput"> ${memoinput} </p>
                </div> 
            <div>`
        //하트 버튼을 누르면 love(id)와 mychart()가 연쇄적으로 작동한다. 
        //love(id)로 클릭 수를 저장하고 load로 화면을 다시 띄워 표시한다.

        //love가 0보다 크면, 즉 한 번이라도 love를 눌렀으면 card를 붙인다.
        if (love > 0) {
            document.getElementById("cards").insertAdjacentHTML('beforeend', temp);
        }
    })
}

