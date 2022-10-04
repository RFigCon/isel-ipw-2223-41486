function validateProperty( obj, propValidator ){

    if(obj[propValidator.name] == undefined){
        return false;
    }

    /*
    if( !propValidator.validators[0](obj[propValidator.name]) ){
        return false;
    }
    if( !propValidator.validators[1](obj[propValidator.name]) ){
        return false;
    }
    */

    for (const idx in propValidator.validators) {
        if (!propValidator.validators[idx](obj[propValidator.name])) {
            return false;
        }
    }

    return true;
}

const validator = {name : "p1" , validators: [s => typeof s == 'string' && s.length > 2, s => s[0]=="a"]  }
const obj1 = { p1 : "abc" }
const obj2 = { p2 : 123 }
const obj3 = { p1 : "a" , p2 : 123 }
const obj4 = { p1 : "dbc" }

let x1 = validateProperty(obj1, validator) //true
let x2 = validateProperty(obj2, validator) //false
let x3 = validateProperty(obj3, validator) //false
let x4 = validateProperty(obj4, validator) //false

console.log(x1);
console.log(x2);
console.log(x3);
console.log(x4);

