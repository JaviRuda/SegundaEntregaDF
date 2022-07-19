
const productosContainer = document.querySelector('#f-opciones')

const carritoContainer = document.querySelector('#carrito-contenedor')
const contadorCarrito = document.querySelector('#contador-carrito')
const precioTotal = document.querySelector('#precioTotal')
const vaciarCarrito = document.querySelector('#vaciar-carrito')


let stock = []

// JSON stock de productos
// genera el DOM de los items
fetch('./assets/stock.json')
    .then((resp) => resp.json())
    .then((data) => {
        stock = data,

        stock.forEach((producto) => {
            const div = document.createElement('div')
            div.classList.add('form')
            
            const {img,nombre,precio,id,} = producto
        
            div.innerHTML = `
            <div class="card">
            <img src= ${img} alt="">
            <p> ${nombre} </p>
            <p> $${precio} uds </p>
            <div class="f-boton">
            <button onclick="agregarCarrito( ${id} )" class="agregar">Agregar <i class="fa-solid fa-cart-shopping"></i></button>
            </div>
            `
            productosContainer.append(div)
        })
    });

// --CARRITO--

function agregarCarrito(id) {
    const item = stock.find((el) => el.id === id)
    carrito.push(item)

    const {nombre} = item

    Toastify({
        text: `Se agregó ${nombre} al carrito!`,
        position: "right",
        gravity: "bottom",
        duration: 2000,
        className: "btnToastify",
        style: {
        background: "linear-gradient(to right, #056bba, #02a3df)",
        }
    }).showToast();
    
    localStorage.setItem('carrito',JSON.stringify(carrito))
    
    genCarrito()
    genCantidad()
    genTotal()
}

const removerCarrito = (id) => {
    const item = carrito.find((producto) => producto.id === id)
    const indice = carrito.indexOf(item)
    carrito.splice(indice,1)

    const {nombre} = item

    Toastify({
        text: `Se eliminó ${nombre} del carrito!`,
        position: "right",
        gravity: "bottom",
        duration: 2000,
        className: "btnToastify",
        style: {
        background: "linear-gradient(to right, ##df0202, ##b81423, #8d2947)",
        }
    }).showToast();
    
    localStorage.setItem('carrito',JSON.stringify(carrito))

    genCarrito()
    genCantidad()
    genTotal()
}

const removerTotalCarrito = () => {
    carrito.splice(0,carrito.length)        
    
    Swal.fire({
        title: 'Estas seguro?',
        text: 'No puedes revertir los cambios!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, vaciar!',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Vaciado',
            'Tu carrito fue vaciado.',
            'success'
          )
        }
      })


    localStorage.setItem('carrito',JSON.stringify(carrito))
    genCarrito()
    genCantidad()
    genTotal()
}

vaciarCarrito.addEventListener('click', removerTotalCarrito)


const genCarrito = () => {
    
    carritoContainer.innerHTML = ' '
    
    carrito.forEach((item) => {
        const div = document.createElement('div')
        const {nombre,precio,id} = item
        div.classList.add('productoEnCarrito')
        
        div.innerHTML = `
        <p> ${nombre} </p>
        <p>Precio: $${precio} uds </p>
        <button onclick="removerCarrito( ${id} )" class="boton-eliminar"><i class="fa-solid fa-trash" id="tacho"></i></button>
        `
        carritoContainer.append(div)
    })
    
}

const genCantidad = () => {
    contadorCarrito.innerText = carrito.length
}

const genTotal = () => {
    let total = 0
    
    carrito.forEach((producto) => {
        total += producto.precio
    })
    
    precioTotal.innerText = total
}


// JSON carrito
let carrito 
const carritoEnLs = JSON.parse(localStorage.getItem('carrito'))

if (carritoEnLs) {
    carrito = carritoEnLs

    genCarrito()
    genCantidad()
    genTotal()
} else {
    carrito = []
}

// Funciones ternarias.

function guardarUsuario() {
    let nombre = document.getElementById("nombre");
    let email = document.getElementById("email");
    let edad = document.getElementById("edad");
    
    const usuario = {
        nombre:nombre.value,
        email:email.value,
        edad:edad.value
    }

    usuario.edad == "SI" ? registrarUsuario() : informarError();

    function registrarUsuario() {
        const usuario_edad = {
            ...usuario,
            numero_aventura: Math.round(Math.random() * 10000)
        }

        informarRegistracion(usuario_edad);
    }

    function informarRegistracion(usuario) {
        let salida = `Nombre: ${usuario.nombre}<br>
        Email: ${usuario.email}<br>
        Mayor de edad: ${usuario.edad}<br>
        Codigo unico: #${usuario.numero_aventura}`;
        document.getElementById("resultado").innerHTML = `<p class="alert alert-success" role="alert">${salida}  Usa este numero para obtener 20% de descuento</p>`;
        limpiarCampos();
    }

    function informarError() {
        document.getElementById("resultado").innerHTML = `<p class="alert alert-danger" role="alert">No es posible reservarle a menores. Lo siento.</p>`;
    }

    function limpiarCampos() {
        document.getElementById("nombre").value = "";
        document.getElementById("email").value = "";
        document.getElementById("edad").value = "";
    }
}

document.getElementById("enviarForm").addEventListener("click", guardarUsuario);
