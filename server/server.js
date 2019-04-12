require('./config/config')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/usuario', function(req, res) {
    res.json('Get Usuario')
})
app.post('/usuario', function(req, res) {
    let body = req.body

    if (body.name === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        })
    } else {
        res.json({
            personas: body
        })
    }
})
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id
    res.json({
        name: 'Put Usuario',
        id
    })
})
app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id
    res.json({ nombre: 'delete Usuario', id })
})

app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto:`, process.env.PORT);
})