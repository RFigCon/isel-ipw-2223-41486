//Task 5
function checkUsersValid(goodUsers){

    const method = function(list){
        
        for(let idx = 0; idx<list.length; idx++){

            let exists = false;
            for(let count = 0; count<goodUsers.length; count++){

                if(list[idx].id == goodUsers[count].id){
                    exists = true;
                    break;
                }
            }
            if(!exists) return false;

        }

        return true;
    }

    return method;

}

var goodUsers = [
    { id: 1 },
    { id: 2 },
    { id: 3 }
 ]
 
 // `checkUsersValid` is the function you'll define
 var testAllValid = checkUsersValid(goodUsers)
 
 const x1 = testAllValid([
    { id: 2 },
    { id: 1 }
 ])
 // => true
 
 const x2 = testAllValid([
    { id: 2 },
    { id: 4 },
    { id: 1 }
 ])
 // => false

 console.log(x1);
 console.log(x2);