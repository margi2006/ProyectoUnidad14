const conexion = require('../../database/db')

exports.consultar = (req, res) => {
    conexion.query('SELECT * FROM doctores', (error, consulta) => {

        if (error) {
            console.log("error consultando la tabla doctores: " + error)
            return
        }

        res.render('./doctores/index', { consulta: consulta })
    })
}

exports.save = (req, res) => {
    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const especialidad = req.body.especialidad
    const consultorio = req.body.consultorio
    const correo = req.body.correo

    console.log(req.body)

    var comando = "INSERT INTO doctores (nombre, apellido, especialidad, consultorio, correo)"
        + " VALUES ("
        + "'" + nombre + "', '" + apellido + "', '" + especialidad + "', " + consultorio + ", '" + correo + "'"
        + ")"

    console.log(comando)

    conexion.query(comando, (error, resultado) => {
        if (error) {
            console.log(error)
            return
        } else {
            console.log(resultado)
            res.redirect('/doctores')
        }
    })
}

exports.consultaruno = (req, res) => {
    const id = req.params.id
    console.log(id)
    conexion.query('SELECT * FROM doctores WHERE id = ' + id, (error, consulta) => {
        if (error) {
            console.log("Error consultando el id en la tabla doctores: " + error)
            return
        }
        //res.send(consulta)
        res.render('./doctores/edit', { doctor: consulta[0] })
    })
}

exports.actualizar = (req, res) => {
    const id = req.body.id
    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const especialidad = req.body.especialidad
    const consultorio = req.body.consultorio
    const correo = req.body.correo

    var comando = "UPDATE doctores SET "
        + "nombre = '" + nombre + "', "
        + "apellido = '" + apellido + "', "
        + "especialidad = '" + especialidad + "', "
        + "consultorio = " + consultorio + ", "
        + "correo = '" + correo + "' "
        + "WHERE id = " + id
    console.log(comando)
    conexion.query(comando, (error, resultado) => {
        if (error) {
            console.log(error)
            return
        } else {
            res.redirect('/doctores')
        }
    })
}
exports.delete = (req, res) => {
    const id = req.params.id
    var comando = "DELETE FROM doctores WHERE id=" + id
    console.log(comando)
    conexion.query(comando, (error, resultado) => {
        if (error) {
            console.log(error)
            return
        } else {
            res.redirect('/doctores')
        }
    })
}
