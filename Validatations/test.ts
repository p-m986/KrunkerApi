import { stringify } from "nodemon/lib/utils";

function Test <T> (param: T): T{
    return param;
}


console.log(Test<number>(1));
console.log(Test<String>("YeY"));