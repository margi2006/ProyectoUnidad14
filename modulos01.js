//forma mas basica de realizar test unitarios
function suma (a, b){ //funcion que suma dos numeros y retorna su resultado
    return a + b + 1
}

console.assert(
    suma(1,2) === 3,
    "funcion suma de 1 y 2 deberia retornar 3, retorna "+ suma(1,2)  
)
console.assert(
    suma(0,0) === 0,
    "funcion suma de 0 y 0 deberia retornar 0, retorna "+ suma(0,0)  
)
let casos = [
    {a:1, b:4, c:5},
    {a:0, b:3, c:3},
    {a:-1, b:-3, c:-4},
]
casos.forEach(x => {
    let {a, b, c} = x
    console.assert(
      suma(a,b) === c,
      `funcion suma de ${a} y ${b} deberia retornar ${c}, retorna ${suma(a,b)}`   
    )    
})
