const express = require ('express')
const path = require('path')
const app = express()
const publicDir = path.join(__dirname,'public')
const omdb = require('./omdb.js')


app.use(express.static(publicDir))


/*
app.get('/', function(req, res){
    res.send('<h1>Hola mundo!</h1>')
})
*/

app.get('/about', function(req,res){
    res.send({
        dia: "jueves",
        descripcion: "casi viernes"
    })
})

app.get('/contactanos', function(req,res){
    res.send([{
        dia: "jueves",
        descripcion: "casi viernes"
    },
    {
        dia: "viernes",
        descripcion: "chilango"
    }
    ])
})


app.get('/productos/*', function(req,res){
    if(!req.query.search){
        return res.send({
            error: 'Debes enviar un search'
        })
    }
    console.log(req.query)
    res.send({
        productos: []
    })
})

app.get('/omdb', function(req, res){
    res.setHeader('Access-Control-Allow-Origin','*')
    if(!req.query.search){
            res.send({
            error:'Tienes que dar una peli o serie a buscar'
        })
    }
    omdb.omdbMovie(req.query.search, function(error, response){
            if(error){
                return res.send({
                    error: error
                })
            }
            if(req.query.season){
                return omdb.omdbSeason(response.title, req.query.season,function(error,response){
                    if (error){
                        return res.send({
                            error: error
                        })
                    }
                    return res.send({
                        title: response.title,
                        season: response.season,
                        episodes: response.episodes
                    })
                })
            }
            else{
                return omdb.omdbMovie(response.title, function(error,response){
                    if(error){
                        return res.send({
                            error: error
                        })
                    }
                    return res.send({
                        title: response.title,
                        plot: response.plot,
                        rating: response.rating,
                        seasons: response.seasons
                    })
                }
                )
            }
        })
})


app.get('*', function(req, res){
    res.send({
        error:'Esta ruta no existe'
    })
})

app.listen(3000, function(){
    console.log('up and running')
})
//npm install -g nodemon 