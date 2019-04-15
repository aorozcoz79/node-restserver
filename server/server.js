require('./config/config')


const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// CONFIGURACION GLOBAL DE RUTAS

app.use(require('./routes/index'))

//CONEXION BD

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true },
    (err, res) => {
        if (err) throw err

        console.log('BD online');
    });

app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto:`, process.env.PORT);
})