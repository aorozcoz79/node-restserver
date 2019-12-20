const express = require('express')

const _ = require('underscore')

const Usuario = require('../models/usuario')
const Categoria = require('../models/categoria')
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion')

const app = express()


/**
 * Mostrar todas las categorias
 */
app.get('/categoria', function(req, res) {
    Categoria.find({})
        .sort('descripcion')
        .populate('usuario')
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Categoria.count((err, total) => {

                return res.json({
                    ok: true,
                    total,
                    categorias
                })
            })
        })
})

/**
 * Mostrar una categoria por ID
 */
app.get('/categoria/:id', [verificaToken], function(req, res) {
    let id = req.params.id

    Categoria.findById(id, (err, categoriaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El Id no Existe!!'
                }
            })
        }

        return res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
})

/**
 * Crear una nueva categoria
 */
app.post('/categoria', [verificaToken], function(req, res) {

    let body = req.body

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    })

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        return res.json({
            ok: true,
            categoria: categoriaDB
        })
    })

})

/**
 * Modificar una nueva categoria
 */
app.put('/categoria/:id', [verificaToken], function(req, res) {

    let id = req.params.id
    let body = req.body
    let descCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        return res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
})

/**
 * Eliminar una nueva categoria
 * Solo la puede borrar el administrador
 */
app.delete('/categoria/:id', [verificaToken, verificaAdminRole], function(req, res) {
    let id = req.params.id

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El Id no Existe!!'
                }
            })
        }

        return res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
})

module.exports = app;