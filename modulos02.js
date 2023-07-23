exports.suma = (a, b) => {
    return a + b //+ 1
}
exports.resta= (a,b) =>{
        return a - b
    }
exports.multi= (a,b) =>{
        return a * b
    }
exports.divid= (a,b) =>{
        if (b === 0){
            throw new Error('Dividir por cero no es permitido')
        }
        return a / b
    }
exports.reversar = (string) =>{
    if(string === '') return null
    console.log(typeof(string))
    if(typeof(string) === 'undefined') return undefined 
    return string.split('').reverse().join('')
}
exports.promedio = (array) => {
    //console.log(typeof(array))
    if(array.length === 0) return 0
    if(!Array.isArray(array)) return false
    let suma = 0
    array.forEach(element => {
        suma += element
    });
    return suma / array.length
}
