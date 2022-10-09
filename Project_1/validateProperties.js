function validateProperty( obj, propValidator ){                                    //Task 1

    if(obj[propValidator.name] == undefined){
        return false;
    }

    for (let idx=0; idx<propValidator.validators.length; idx++) {
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

console.log("\nTask 1:")
console.log( validateProperty(obj1, validator) ) //true
console.log( validateProperty(obj2, validator) ) //false
console.log( validateProperty(obj3, validator) ) //false


function validateProperties( obj, propValidators ){                                 //Task 2

    let invalidProperties = [];
    let iP_count = 0;

    for(let val_idx=0; val_idx<propValidators.length; val_idx++){
        if( !validateProperty(obj, propValidators[val_idx]) ){
            invalidProperties[iP_count++] = propValidators[val_idx].name;
        }
    }
    
    return invalidProperties;
}

const validators = [
    {
    name : "p1" , validators: [s => typeof s == 'string' && s.length > 2, s => s[0]=="a"] 
    },
    {
    name : "p2" , validators: [s => Number.isInteger(s)] 
    }
]

const obj4 = { p1 : "a" }
const obj5 = { p1 : 123  }
const obj6 = { p1 : "abc" , p2 : 123 }

console.log("\nTask 2:")
console.log( validateProperties(obj4, validators) ) // ["p1", "p2"]
console.log( validateProperties(obj5, validators) ) // ["p1", "p2"]
console.log( validateProperties(obj6, validators) ) // []


Object.prototype.validateProperties = function (propValidators) {                   //Task_3
    return validateProperties( this, propValidators );
}

console.log("\nTask 3:")
console.log( obj4.validateProperties(validators) ) // ["p1", "p2"]
console.log( obj5.validateProperties(validators) ) // ["p1", "p2"]
console.log( obj6.validateProperties(validators) ) // []
