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

let minPrecio = 999999;
for (let i = 0; i < PRODUCTOS.length; i++) {
    if (PRODUCTOS[i].precio < minPrecio) {
        minPrecio = PRODUCTOS[i].precio;
    };
}

function mostrarProductos(saldo) {
    let mensajeProducotos = document.createElement('p')
    mensajeProducotos.id = 'productos'
    mensajeProducotos.textContent = "Estos son los productos que podes elegir con tu saldo:\n";
    for (let i = 0; i < PRODUCTOS.length; i++) {
        if (PRODUCTOS[i].precio <= saldo) {
            let li = document.createElement('li')
            li.innerHTML = `${PRODUCTOS[i].nombre} --> $${PRODUCTOS[i].precio}`;
            mensajeProducotos.appendChild(li);
            continue;
        };
    };
    return mensajeProducotos;
};


function eliminarElemento(elementoId) {
    let elementoABorrar = document.getElementById(elementoId);
    if (elementoABorrar) {
        elementoABorrar.remove();
    }
}

const productoEncontrado = (productoElegido) => {
    for (let i = 0; i < PRODUCTOS.length; i++) {
        if (PRODUCTOS[i].nombre.toLowerCase() === productoElegido.toLowerCase()) {
            return true;
        };
    }
    return false;
};


class Resultado {
    constructor(nombre, saldo, resultado) {
        this.nombre = nombre;
        this.saldo = saldo;
        this.resultado = resultado;
    }
}

const NOMBRE_USUARIO = document.getElementById("nombreUsuario");
NOMBRE_USUARIO.onchange = () =>{
    console.log(`El nombre del usuario es: ${NOMBRE_USUARIO.value}`);

    eliminarElemento('nombreUsuario');

    let parrafo = document.createElement('h2')
    parrafo.textContent = `Hola ${NOMBRE_USUARIO.value}, bienvenido! Si estas con hambre (o ganas de algo dulce) acá estoy para ayudarte! Arrancamos...`
    document.body.append(parrafo)
    
    let mensajeSaldo = document.createElement('p')
    mensajeSaldo.textContent = "Cuanto $UYU tenes (o cuanto vas a gastar)?"
    document.body.append(mensajeSaldo)

    let newInput = document.createElement('input')
    newInput.id = 'saldoInicial'
    newInput.type = 'number'
    newInput.placeholder = 'Ingresa tu saldo inicial'
    document.body.append(newInput)

    newInput.onchange = () => {
        let saldoInicial = Number(newInput.value);

        eliminarElemento('mensajeError');
        eliminarElemento('productos');
        eliminarElemento('seleccionProducto');

        let mensajeError;
        if (saldoInicial < 0) {
            console.log(`El usuario ingresó un saldo negativo: ${saldoInicial}`);
            mensajeError = document.createElement('p')
            mensajeError.id = 'mensajeError'
            mensajeError.textContent = "El saldo ingresado no es válido. Por favor, ingresa un número positivo"
            document.body.append(mensajeError)

            const resultado = new Resultado(NOMBRE_USUARIO.value, saldoInicial, "ERROR: Saldo no válido");
            localStorage.setItem('resultadoVendingMachine', JSON.stringify(resultado));
        } else {
            console.log(`El usuario ingresó un saldo de: ${saldoInicial}`);

            eliminarElemento('mensajeError');

            if (saldoInicial < minPrecio) {
                console.log(`El saldo no alcanza al precio mínimo: $${minPrecio}`);
                mensajeError = document.createElement('p')
                mensajeError.id = 'mensajeError'
                mensajeError.textContent = "No tienes saldo suficiente para elegir un producto. Por favor, recargá tu saldo."
                document.body.append(mensajeError)
                const resultado = new Resultado(NOMBRE_USUARIO.value, saldoInicial, "ERROR: Saldo insuficiente");
                localStorage.setItem('resultadoVendingMachine', JSON.stringify(resultado));
            }
            else {
                let mensajeProductos = mostrarProductos(saldoInicial);
                document.body.append(mensajeProductos);

                let seleccionProducto = document.createElement('div')
                seleccionProducto.id = 'seleccionProducto'
                seleccionProducto.innerHTML = `<p>Tu saldo es de $${saldoInicial}. Elige un producto</p>`
                seleccionProducto.innerHTML += '<input type="text" id="productoElegido" placeholder="Escribe el nombre del producto">'
                seleccionProducto.innerHTML += '<button id="btnElegir">Elegir</button>';
                document.body.append(seleccionProducto);

                let btn = document.getElementById('btnElegir')
                btn.onclick = () => {
                    console.log(`El usuario eligió el producto: ${document.getElementById('productoElegido').value}`);

                    eliminarElemento('mensajeError');
                    eliminarElemento('mensajeSalida');

                    let productoElegido = document.getElementById('productoElegido').value;
                    if (!productoEncontrado(productoElegido)){
                        console.log(`El producto no existe`);

                        mensajeError = document.createElement('p')
                        mensajeError.id = 'mensajeError'
                        mensajeError.textContent = "El producto que eligió el usuario no existe"
                        document.body.append(mensajeError)
                        const resultado = new Resultado(NOMBRE_USUARIO.value, saldoInicial, "ERROR: Producto no encontrado");
                        localStorage.setItem('resultadoVendingMachine', JSON.stringify(resultado));
                    }
                    else {
                        eliminarElemento('mensajeError');
                    
                        let mensajeSalida = document.createElement('p')
                        mensajeSalida.id = 'mensajeSalida'
                        mensajeSalida.textContent = `Has elegido el producto: ${productoElegido}. Gracias por tu compra!`
                        document.body.append(mensajeSalida)

                        const resultado = new Resultado(NOMBRE_USUARIO.value, saldoInicial, `Producto elegido: ${productoElegido}`);
                        localStorage.setItem('resultadoVendingMachine', JSON.stringify(resultado));
                    }
                }
            }
            
        }
    }
}