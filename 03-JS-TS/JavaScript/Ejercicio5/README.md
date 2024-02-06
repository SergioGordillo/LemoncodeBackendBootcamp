Implementa una función para eliminar valores falsys de una estructura de datos. Si el argumento es un objeto, deberá eliminar sus propiedades falsys. Si el argumento es un array, deberá eliminar los elementos falsys. Si el argumento es un objeto o un array no deberán ser mutados. Siempre deberá de crear una estructura nueva. Si no es ni un objeto ni un array deberá de devolver dicho argumento.

const elements = [0, 1, false, 2, "", 3];

const compact = (arg) => {

};

console.log(compact(123)); // 123
console.log(compact(null)); // null
console.log(compact([0, 1, false, 2, "", 3])); // [1, 2, 3]
console.log(compact({})); // {}
console.log(compact({ price: 0, name: "cloud", altitude: NaN, taste: undefined, isAlive: false })); // {name: "cloud"}