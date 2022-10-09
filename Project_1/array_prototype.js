Array.prototype.associateWith = function(transformation){

    let obj = {};

    for(let idx=0; idx<this.length; idx++){
        obj[this[idx]] = transformation(this[idx]);
    }
    
    return obj;
}

let numbers = ["one", "two", "three", "four"]
console.log(numbers.associateWith( str => str.length )) //{ one: 3, two: 3, three: 5, four: 4}
