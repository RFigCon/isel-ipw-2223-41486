Array.prototype.associateWith = function(transformation){

}

let numbers = ["one", "two", "three", "four"]
console.log(numbers.associateWith( str => str.length )) //{ one: 3, two: 3, three: 5, four: 4}
