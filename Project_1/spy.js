function Spy(target, method){
    
    const oldFunc = target[method];

    const spyObj = { count : 0 };
    
    target[method] = function(arg){

        spyObj.count++;
        oldFunc(arg);

    };

    return spyObj;
}

var spy = Spy(console, 'error')

console.error('calling console.error')
console.error('calling console.error')
console.error('calling console.error')

console.log(spy.count) // 3