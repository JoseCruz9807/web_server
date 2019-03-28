
const credentials = require('./credentials.js')
const request = require('request')

//const url = 'http://www.omdbapi.com/?i=tt3896198&apikey=62aa9a3b'


const omdbMovie = function (title, callback){
    const url = 'http://www.omdbapi.com/?t='+title+'&apikey='+ credentials.apikey

    request({url: url, json: true}, function(error, response){  //request({url: url, json: true}, function(error, {body}){
        //console.log(response.body)
        if(error){
            callback('Service unavailable', undefined)
        }
        else if(response.body.Response=='False'){
            callback(response.body.Error, undefined)
        }
        else{
            const data={
                title: response.body.Title,
                plot: response.body.Plot,
                rating: response.body.Ratings[0].Value,
                seasons: response.body.totalSeasons
            }
            //callback(undefined, data)
            //console.log(data)

            //omdbSeason(title, data.seasons)

            callback(undefined, data)
        }

    })
}

const omdbSeason= function (title, seasonNo, callback){
    const url = 'http://www.omdbapi.com/?t='+title+'&Season='+seasonNo+'&apikey='+ credentials.apikey
    request({url: url, json: true}, function(error, response){
        //console.log(response.body)
        if(error){
            callback('Service unavailable', undefined)
        }
        else if(response.body.Response=='False'){
            callback(response.body.Error, undefined)
        } else{
            const data = response.body
            const info ={
                title: data.Title,
                season: data.Season,
                episodes: []
            }
            for (i in data.Episodes){
                info.episodes.push(data.Episodes[i].Title)
            }
            callback(undefined, info)
        }
    })
}

module.exports= {
    omdbMovie: omdbMovie,
    omdbSeason: omdbSeason
}