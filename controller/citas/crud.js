const conexion = require('../../database/db')

exports.consultar = (req, res) => {
    conexion.query("SELECT * FROM vista_citas", (error, consulta) => {

        if (error) {
            console.log("error consultando la tabla citas: " + error)
            return
        }

        res.render('./citas/index', { consulta: consulta })
    })
}

exports.consultarPacientes = (req, res) => {

    conexion.query("SELECT cedula, CONCAT(nombre, ' ', apellidos) AS paciente FROM personas ORDER BY nombre, apellidos", (error, consulta) => {

        if (error) {
            console.log("error consultando la tabla doctores: " + error)
            return
        }

        console.log(consulta)

        res.render('./citas/create', { consulta: consulta })
    })

}

exports.consultarDoctores = (req, res) => {

    conexion.query("SELECT id, CONCAT(nombre, ' ', apellido) AS doctor, especialidad FROM doctores ORDER BY especialidad, nombre, apellido", (error, consulta) => {

        if (error) {
            console.log("error consultando la tabla doctores: " + error)
            return
        }

        res.render('./citas/create', { consulta: consulta })
    })

}

exports.consultarDoctoresForEdit = (req, res) => {

    conexion.query("SELECT id, CONCAT(nombre, ' ', apellido) AS doctor, especialidad FROM doctores ORDER BY especialidad, nombre, apellido", (error, consulta) => {

        if (error) {
            console.log("error consultando la tabla doctores: " + error)
            return
        }

        res.render('./citas/edit', { consulta: consulta })
    })

}

exports.save = (req, res) => {
    const cedula = req.body.cedula
    const doctor = req.body.doctor

    const words = doctor.split('|');
    const idDoctor = words[1]
    const especialidad = words[0]

    console.log(req.body)

    var comando = "INSERT INTO citas (cedulaPaciente, especialidad, idDoctor)"
        + " VALUES ("
        + "'" + cedula + "', '" + especialidad + "', " + idDoctor
        + ")"

    console.log(comando)

    conexion.query(comando, (error, resultado) => {
        if (error) {
            console.log(error)
            return
        } else {
            console.log(resultado)
            res.redirect('/citas')
        }
    })
}

exports.consultaruno = (req, res) => {
    const id = req.params.id
    console.log(id)
    conexion.query('SELECT * FROM citas WHERE id = ' + id, (error, consulta) => {
        if (error) {
            console.log("Error consultando el id en la tabla citas: " + error)
            return
        }

        res.render('./citas/edit', { doctor: consulta[0] })
    })
}

exports.actualizar = (req, res) => {
    const id = req.body.id
    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const especialidad = req.body.especialidad
    const consultorio = req.body.consultorio
    const correo = req.body.correo

    var comando = "UPDATE citas SET "
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
            res.redirect('/citas')
        }
    })
}
exports.delete = (req, res) => {
    const id = req.params.id
    var comando = "DELETE FROM citas WHERE id=" + id
    console.log(comando)
    conexion.query(comando, (error, resultado) => {
        if (error) {
            console.log(error)
            return
        } else {
            res.redirect('/citas')
        }
    })
}
