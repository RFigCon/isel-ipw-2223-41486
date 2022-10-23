//API-Key = k_722ghagn
import { readFile, writeFile } from 'node:fs/promises'
import fetch from 'node-fetch'

const URL = 'https://imdb-api.com/en/API/Title/k_722ghagn/'
const IN_FILE = './movie_request.json'
const OUT_FILE = 'movies.json'

async function main(){
    let id_list = await get_ids()
    let movie_list = await make_all_requests(id_list)
    write_file(movie_list)
}

async function get_ids(){
    let fileContent = await readFile(IN_FILE)
    
    return  JSON.parse(fileContent)['movie-ids']
}

async function make_all_requests(id_list){
    return Promise.all(id_list.map(new_url))
}

function new_url(id){
    return make_request(URL + id)
}

async function make_request(url) {
    try {
        let response = await fetch(url)
        //let response = await internal_id_fetch(URL)
        return await response.json()
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

main()

function internal_id_fetch(url){
    let jsonObj = {
        id:	"tt0111161",
        title:	"The Shawshank Redemption",
        runtimeMins:	"142"
    }
    return jsonObj
}
