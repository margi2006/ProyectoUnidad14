// npm init --yes 

// npm install express ejs mysql dotenv
// npm install -g nodemon  //instalamos de forma global 
// npm i -D jest supertest

const express = require('express')
const server = express()

server.set("view engine", "ejs")

const PORT = process.env.PORT || 8081

const crudPacientes = require('./controller/pacientes/crud')
const crudDoctores = require('./controller/doctores/crud')
const crudCitas = require('./controller/citas/crud')

server.use(express.urlencoded({ extended: false }))
server.use(express.json())
server.use(express.static('./database'))    //modelo
server.use(express.static('./views'))       //vista
server.use(express.static('./controller'))  //controlador

//Inicio Rutas
server.get('/', crudPacientes.consultar)

// Rutas Pacientes
server.get('/pacientes', crudPacientes.consultar)
server.get('/pacientes/crear', (req, res) => {
    res.render('pacientes/create')
})
server.post('/pacientes/salvar', crudPacientes.save)
server.get('/pacientes/editar/:id', crudPacientes.consultaruno)
server.post('/pacientes/actualizar', crudPacientes.actualizar)
server.get('/pacientes/borrar/:id', crudPacientes.delete)
// Fin rutas pacientes

// Rutas doctores
server.get('/doctores', crudDoctores.consultar)
server.get('/doctores/crear', (req, res) => {
    res.render('doctores/create')
})
server.post('/doctores/salvar', crudDoctores.save)
server.get('/doctores/editar/:id', crudDoctores.consultaruno)
server.post('/doctores/actualizar', crudDoctores.actualizar)
server.get('/doctores/borrar/:id', crudDoctores.delete)
// Fin rutas doctores

// Rutas citas
server.get('/citas', crudCitas.consultar)
server.get('/citas/crear', crudCitas.consultarDoctores)
server.post('/citas/salvar', crudCitas.save)
server.get('/citas/editar/:id', crudCitas.consultaruno, crudCitas.consultarDoctoresForEdit)
server.post('/citas/actualizar', crudCitas.actualizar)
server.get('/citas/borrar/:id', crudCitas.delete)
// Fin rutas citas

let serverlisten = server.listen(PORT, () => {
    console.log("servidor funcionando en http://localhost:" + PORT)
})

module.exports = { server, serverlisten }