//id라는 매개변수를 받는 love라는 함수이다.
function love(id) { 

    //m이라는 Map에 매개변수 id 에 해당하는 key를 갖는 객체가 있으면
    if (m.has(id)) { 

        // 해당하는 key를 갖는 객체를 찾아서 원래 value 값에 +1 해 준다.
        m.set(id, m.get(id) + 1); 

    // 그렇지 않으면 매개변수 id를 key, value를 1로 갖는 객체를 생성해 준다. 
    } else { m.set(id, 1) } 

} 
