//API-Key = k_722ghagn
import { readFile, writeFile } from 'node:fs/promises'
import fetch from 'node-fetch'
import { Console } from 'node:console'

const URL = 'https://imdb-api.com/en/API/Title/k_722ghagn/'
const IN_FILE = './movie_request.json'
const OUT_FILE = 'movies.json'


//Async/await
async function main_aw(){
    let st = Date.now()
    let id_list = await get_ids_aw()
    let movie_list = await make_all_requests_aw(id_list)
    write_file(movie_list)
    let end = Date.now()
    console.log(end-st)
}

async function get_ids_aw(){
    let fileContent = await readFile(IN_FILE)
    
    return  JSON.parse(fileContent)['movie-ids']
}

function make_all_requests_aw(id_list){
    return Promise.all(id_list.map(make_request_aw))
}

async function make_request_aw(id) {
    let url = URL + id
    try {
        //let response = await fetch(url)
        let response = await internal_id_fetch(url)
        return await response//.json()
    } catch(err) {
        return err
    }
    
}

function write_file(movie_list) {

    let final_list = {"total-duration" : 0, "movies" : []}

    for(let idx = 0;idx<movie_list.length; idx++){
        final_list["movies"].push({
            id: movie_list[idx].id,
            title: movie_list[idx].title,
            runtimeMins: Number(movie_list[idx].runtimeMins)
        })
        final_list["total-duration"] += Number(movie_list[idx].runtimeMins)
    }

    writeFile(OUT_FILE, JSON.stringify(final_list, null, 4))
}



//Promisses
function main_pr(){
    get_ids_pr()
    .then((id_list) => make_all_requests_pr(id_list))
    .then((movie_list) => write_file(movie_list))
}

function get_ids_pr(){
    let ret = readFile(IN_FILE)
                .then((fileContent) => {
                    JSON.parse(fileContent)['movie-ids']
                }).then()
    return ret

    //return fileContent = await readFile(IN_FILE)
    //return  JSON.parse(fileContent)['movie-ids']
}

function make_all_requests_pr(id_list){

    console.log("Test make_all_requests_pr/id_list = " + id_list)

    return new Promise((resolve, reject) => {

        let arr = []
        for (let index = 0; index < id_list.length; index++) {
            arr[index] = make_request_pr(id_list[index])
        }

        resolve(arr)
    })
    

    //return Promise.all(id_list.map(make_request_pr))
}

function make_request_pr(id) {
    let url = URL + id
    try {
        //return fetch(url).then(response => response.json())
        return internal_id_fetch(url)
    } catch(err) {
        return err
    }
    
}

main_aw()
//main_pr()



//Simulate fetch
function internal_id_fetch(url){
    let jsonObj = {
        id:	"tt0111161",
        title:	"The Shawshank Redemption",
        runtimeMins:	"142"
    }
    return new Promise((resolve, reject) =>
                        {
                            setTimeout(() => {
                                resolve(jsonObj)
                            }, 1000)
                        })
    //return jsonObj
}
