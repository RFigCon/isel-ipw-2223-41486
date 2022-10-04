function validateProperty( obj, propValidator ){

    if(obj[propValidator.name] == undefined){
        return false;
    }

    for (const idx in propValidator.validators) {
        if (!propValidator.validators[idx](obj[propValidator.name])) {
            return false;
        }
    }

    return true;
}

function validateProperties( obj, propValidators ){

    var invalidProperties = [];
    var iP_count = 0;

    for (const val_idx in propValidators){

        if( !validateProperty(obj, propValidators[val_idx]) ){
            invalidProperties[iP_count++] = propValidators[val_idx].name;
        }

    }

    return invalidProperties;
}

Object.prototype.validateProperties = function (propValidators) {
    return validateProperties( this, propValidators );
}

const validators = [
    {
    name : "p1" , validators: [s => typeof s == 'string' && s.length > 2, s => s[0]=="a"] 
    },
    {
    name : "p2" , validators: [s => Number.isInteger(s)] 
    }
]

const obj1 = { p1 : "a" }
const obj2 = { p1 : 123  }
const obj3 = { p1 : "abc" , p2 : 123 }

const x1 = validateProperties(obj1, validators) // ["p1", "p2"]
const x2 = validateProperties(obj2, validators) // ["p1", "p2"]
const x3 = validateProperties(obj3, validators) // []

//const x1 = obj1.validateProperties(validators) // ["p1", "p2"]
//const x2 = obj2.validateProperties(validators) // ["p1", "p2"]
//const x3 = obj3.validateProperties(validators) // []

console.log(x1);
console.log(x2);
console.log(x3);
