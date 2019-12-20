const express = require('express')

const _ = require('underscore')

const Producto = require('../models/producto')
const Usuario = require('../models/usuario')
const Categoria = require('../models/categoria')
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion')

const app = express()

/**
 * Obtener todos los productos
 */
app.get('/productos', function(req, res) {

    let limite = req.query.limite || 0
    limite = Number(limite)

    let desde = req.query.desde || 0
    desde = Number(desde)

    Producto.find({})
        .skip(desde)
        .limit(limite)
        .sort('nombre')
        .populate('usuario')
        .populate('categoria')
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Producto.count((err, total) => {

                return res.json({
                    ok: true,
                    total,
                    productos
                })
            })
        })
})

/**
 * Ontener un producto por ID
 */
app.get('/productos/:id', function(req, res) {

    let id = req.params.id

    Producto.findById(id)
        .populate('usuario')
        .populate('categoria')
        .exec((err, productoDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El Id no Existe!!'
                    }
                })
            }

            return res.json({
                ok: true,
                producto: productoDB
            })
        })
})

/**
 * Creat un producto nuevo
 */
app.post('/productos', function(req, res) {

    let body = req.body

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        categoria: body.categoria,
        usuario: req.usuario._id
    })

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        return res.json({
            ok: true,
            producto: productoDB
        })
    })
})

/**
 * Actualizar un producto por ID
 */
app.put('/productos/:id', function(req, res) {

    let id = req.params.id
    let body = _.pick(req.body, ['nombre', 'precioUni', 'descripcion', 'categoria', 'disponible'])

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        return res.json({
            ok: true,
            producto: productoDB
        })
    })
})

/**
 * Eliminar un producto por ID
 */
app.delete('/productos/:id', function(req, res) {

    let id = req.params.id
    let body = _.pick(req.body, ['disponible'])

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        return res.json({
            ok: true,
            producto: productoDB
        })
    })
})