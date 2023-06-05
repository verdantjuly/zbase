import { m } from "./index.js";

export function lovefunc(id) {

    id = Number(id)
    if (m.has(id)) {


        m.set(id, m.get(id) + 'a');


    } else { m.set(id, 'b') }

}