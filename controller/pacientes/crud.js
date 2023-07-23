const conexion = require('../../database/db')

exports.consultar = (req, res) => {
    conexion.query('SELECT * FROM personas', (error, consulta) => {

        if (error) {
            console.log("error consultando la tabla personas: " + error)
            return
        }

        res.render('./pacientes/index', { consulta: consulta })
    })
}

exports.save = (req, res) => {
    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const cedula = req.body.cedula
    const edad = req.body.edad
    const telefono = req.body.telefono

    console.log(req.body)

    var comando = "INSERT INTO personas (nombre, apellidos, cedula, edad, telefono)"
        + " VALUES ("
        +  "'" + nombre + "', '" + apellido + "', '" + cedula + "', " + edad + ", '" + telefono + "'"
        + ")"

    console.log(comando)

    conexion.query(comando, (error, resultado) => {
        if(error){
            console.log(error)
            return
        } else {
            console.log(resultado)
            res.redirect('/pacientes')
        }
    })
}

exports.consultaruno = (req, res) => {
    const id = req.params.id
    console.log(id)
    conexion.query('SELECT * FROM personas WHERE id = ' + id, (error, consulta) => {
        if (error) {
            console.log("Error consultando el id en la tabla personas: " + error)
            return
        }
        //res.send(consulta)
        res.render('./pacientes/edit', { persona: consulta[0] })
    })
}

exports.actualizar = (req, res) => {
    const id = req.body.id
    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const cedula = req.body.cedula
    const edad = req.body.edad
    const telefono = req.body.telefono

    var comando = "UPDATE personas SET "
        + "nombre = '" + nombre + "', "
        + "apellidos = '" + apellido + "', "
        + "cedula = '" + cedula + "', "
        + "edad = " + edad +", "
        + "telefono = '" + telefono + "' "
        + "WHERE id = " + id
    console.log(comando)
    conexion.query(comando, (error, resultado) => {
        if (error) {
            console.log(error)
            return
        } else {
            res.redirect('/pacientes')
        }
    })
}
exports.delete = (req, res) => {
    const id = req.params.id
    var comando = "DELETE FROM personas WHERE id=" + id
    console.log(comando)
    conexion.query(comando, (error, resultado) => {
        if (error) {
            console.log(error)
            return
        } else {
            res.redirect('/pacientes')
        }
    })
}
