const request = require('supertest');
const {server, serverlisten} = require('../app')
const conexion = require('../database/db')

let regInsert
beforeEach((done) => {
// Eliminar los datos existentes en la tabla "personas" antes de cada prueba
conexion.query('DELETE FROM personas', () => {
    // Insertar datos de ejemplo en la tabla "persona"
    const personas = [
      { nombre: 'Maria', apellido:'Rueda', cedula: 632571, edad: 30, telefono:2345 },
      { nombre: 'Vicente', apellido:'Fernandez', cedula: 123456, edad: 70, telefono:9345 },
    ];
    conexion.query(
        'INSERT INTO persona (nombre, apellido, cedula, edad, telefono) VALUES ?',
      [personas.map(personas => Object.values(personas))],
        () => {
      done();
    });
  });
});

//test de Rutas
describe("Test de Rutas", () => {
    test('ruta index', async () => {
        const response = await request(server).get('/').send()
        expect(response.statusCode).toBe(200);
        expect(response.status).toBe(200);
    })
    test('ruta no valida', async () => {
        const response = await request(server).get('/pruebita').send()
        expect(response.status).toBe(404);
    })
    test('ruta /api/personas', async () => {
        const response = await request(server).get('/api/personas').send()
        expect(response.statusCode).toBe(200);
        expect(response.status).toBe(200);
        expect(response.header['content-type']).toMatch("json")
        expect(response.body).toHaveLength(3) //retorne 3 elementos
        expect(response.body).toBeInstanceOf(Array)
        //expect(response.body).toBeInstanceOf(String)
        //expect(response.body).toBeInstanceOf(Boolean)
        //expect(response.body).toBeInstanceOf(Number)
        expect(response.body[0].nombre).toBe("Maria")
    })
    test('ruta /api/personas aseguar registro Jose', async () => {
        const response = await request(server).get('/api/personas').send()
        expect(response.statusCode).toBe(200);
        expect(response.status).toBe(200);
        expect(response.header['content-type']).toMatch("json")
        const tuplas = response.body.map(personas => personas.nombre)
        console.log("mi mapeo " + tuplas)
        expect(tuplas).toContain("Jose")
    })
    test('test de post agregar persona', async () => {
        const persona = {
            nombre:"Luisa",
            apellido:"Luna",
            cedula:323456,
            edad:32,
            telefono:12432,
        }
        const response = await request(server).post('/api/agregar/')
        .send(persona)
        expect(response.status).toBe(200);
        //console.log(response.body.resultado.insertId)
        regInsert = response.body.resultado.insertId
    })
    test('test de delete de una persona', async () => {
        const id = {id:regInsert}
        const response = await request(server).delete('/api/borrar/:id')
        .send(id)
        expect(response.status).toBe(200);
        //console.log(response.body.resultado.insertId)
    })
})

afterAll(() => {
    console.log(regInsert)
    serverlisten.close()
    conexion.end()
})