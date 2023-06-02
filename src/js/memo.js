//id라는 매개변수를 받는 memo라는 함수이다.
function memolist(id) { 
   
    //memo이라는 Map에 매개변수 id 에 해당하는 key를 갖는 객체가 있으면
    if (memo.has(id)) { 

        // 해당하는 key를 갖는 객체를 찾아서 원래 value 메모 값에 br로 줄바꿈한 뒤 value 메모를 더해 준다.
        memo.set(id, memo.get(id) + "<br>" + document.querySelector(`#memo${id}`).value); 

    // 그렇지 않으면 매개변수 id를 key, value를 메모(document.querySelector(`#memo${id}`).value)로 갖는 객체를 생성해 준다. 
    } else { memo.set(id,document.querySelector(`#memo${id}`).value ) } 

} 

