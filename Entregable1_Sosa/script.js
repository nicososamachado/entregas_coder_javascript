const NOMBRE_USUARIO = prompt("Antes de arrancar, vamos a necesitar tu nombre:");
alert(`Hola ${NOMBRE_USUARIO}, bienvenido! Si estas con hambre (o ganas de algo dulce) acá estoy para ayudarte! Arrancamos?`);

let saldoInicial = Number(prompt("Cuanto $UYU tenes (o cuanto vas a gastar)?"));

while (isNaN(saldoInicial) || saldoInicial <= 0) {
    saldoInicial = Number(prompt("El saldo ingresado no es válido. Por favor, ingresa un número positivo"));
}

const PRODUCTOS = [
    { nombre: "Barrita", precio: 90 },
    { nombre: "Alfajor", precio: 100 },
    { nombre: "Coca", precio: 120 },
    { nombre: "Agua", precio: 60 },
    { nombre: "Papas C", precio: 45 },
    { nombre: "Papas M", precio: 70 },
    { nombre: "Juguito", precio: 80 },
    { nombre: "Salchichon", precio: 200 },
]

console.log(`El nombre del usuario es: ${NOMBRE_USUARIO}. Arranca con un saldo de $${saldoInicial}`);

let minPrecio = 999999;
for (let i = 0; i < PRODUCTOS.length; i++) {
    if (PRODUCTOS[i].precio < minPrecio) {
        minPrecio = PRODUCTOS[i].precio;
    };
}

console.log(`El precio mínimo de los productos es: $${minPrecio}`);

function mostrarProductos(saldo) {
    let mensajeProducotos = "Estos son los productos que podes elegir con tu saldo:\n";
    for (let i = 0; i < PRODUCTOS.length; i++) {
        if (PRODUCTOS[i].precio <= saldo) {
            mensajeProducotos += `- ${PRODUCTOS[i].nombre} --> $${PRODUCTOS[i].precio}\n`;
            continue;
        };
    };
    return mensajeProducotos;
};


const tieneSaldoParaGastar = (saldoTotal, minPrecio) => {
    if (saldoTotal < minPrecio) {
        return false;
    } else {
        return true;
    };
};

const productoEncontrado = (productoElegido) => {
    for (let i = 0; i < PRODUCTOS.length; i++) {
        if (PRODUCTOS[i].nombre.toLowerCase() === productoElegido.toLowerCase()) {
            return true;
        };
    }
    return false;
};

const precioProductoElegido = (productoElegido) => {
    for (let i = 0; i < PRODUCTOS.length; i++) {
        if (PRODUCTOS[i].nombre.toLowerCase() === productoElegido.toLowerCase()) {
            return PRODUCTOS[i].precio;
        };
    };
    return null;
}

let saldoTotal = saldoInicial;
let productosElegidos = [];
let contProds = 0;
while(tieneSaldoParaGastar(saldoTotal, minPrecio)) {
    let mensajeDeProductos = `Tu saldo es de $${saldoTotal}.\n` + mostrarProductos(saldoTotal) + `Elige un producto (Si quieres salir solo preciona ENTRER):`;
    let productoElegido = prompt(mensajeDeProductos);
    contProds++;
    
    if (productoElegido === null || productoElegido === "") {
        console.log("El usuario no eligió nada, se sale del bucle");
        break;
    }

    console.log(`El producto ${contProds} elegido es: ${productoElegido}`);
        
    if(!productoEncontrado(productoElegido)) {
        console.log("El producto que eligió el usuario no existe");
        alert("Ese producto no existe!");
        continue;
    }

    productosElegidos.push(productoElegido);
    
    let precioElegido = precioProductoElegido(productoElegido);
    saldoTotal -= precioElegido;
    console.log(`El producto sale $${precioElegido}. El saldo total es: $${saldoTotal}`);
}

if (productosElegidos.length === 0 && saldoTotal >= minPrecio) {
    alert("No elegiste nada, pero no te preocupes, volve cuando quieras!");
    console.log("El usuario tenia saldo pero no eligió nada");
}
else if (productosElegidos.length > 0) {
    alert(`Tu saldo es de $${saldoTotal}. Gracias por tu compra ${NOMBRE_USUARIO}!\nElegiste: ${productosElegidos.join(", ")}`);
    console.log(`El usuario eligió: ${productosElegidos.join(", ")} y se fue`);
}
else if (productosElegidos.length === 0 && saldoTotal < minPrecio) {
    alert(`No puedes elegir nada porque no tenes saldo :(`);
    console.log("El usuario no eligió nada y no tiene saldo para gastar");
}