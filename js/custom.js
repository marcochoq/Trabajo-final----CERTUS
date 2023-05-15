// Obtener una referencia al contenedor de productos en tu HTML
const productsContainer = document.getElementById('productsContainer');

// Carrito de compras
let cartItems = [];

// Función para agregar un producto al carrito
function addToCart(productCard) {
  cartItems.push(productCard);
  console.log('Producto agregado al carrito:', productCard);
}

// Obtener los productos desde el archivo JSON
fetch('productos.json')
  .then(response => response.json())
  .then(products => {
    // Generar el catálogo
    products.forEach(product => {
      // Crear elementos HTML para mostrar la información del producto
      const productCard = document.createElement('div');
      productCard.classList.add('col-md-4', 'my-3');

      const productImage = document.createElement('img');
      productImage.src = `image/productos/${product.image}`;
      productImage.alt = product.name;
      productImage.classList.add('img-fluid');

      const productName = document.createElement('h3');
      productName.textContent = product.name;

      const productPrice = document.createElement('p');
      productPrice.textContent = `Precio: $${product.price}`;

      const addToCartButton = document.createElement('button');
      addToCartButton.textContent = 'Agregar al carrito';
      addToCartButton.classList.add('agregar-carrito-btn');
      addToCartButton.addEventListener('click', () => {
        agregarProductoAlCarrito(productCard);
      });

      // Agregar los elementos al producto
      productCard.appendChild(productImage);
      productCard.appendChild(productName);
      productCard.appendChild(productPrice);
      productCard.appendChild(addToCartButton);

      // Agregar el producto al contenedor de productos
      productsContainer.appendChild(productCard);
    });
  })
  .catch(error => {
    console.error('Error al cargar los productos:', error);
  });

  function agregarProductoAlCarrito(productCard) {
    // obtener datos del producto
    const tituloProducto = productCard.querySelector("h3").textContent;
    const precioProducto = productCard.querySelector("p").textContent;
    const imagenProducto = productCard.querySelector("img").cloneNode(true);
  
    // obtener referencia al modal
    const modalCuerpo = document.querySelector("#ventanaCarrito .modal-body");
  
    // verificar si el modal está vacío
    const modalVacio = modalCuerpo.innerHTML.trim() === "";
  
    // crear elemento HTML para mostrar datos del producto
    const productoHTML = document.createElement("div");
  
    // Crear elementos HTML para el título, imagen y precio del producto
    const tituloElemento = document.createElement("h3");
    tituloElemento.textContent = tituloProducto;
  
    const imagenElemento = document.createElement("div");
    imagenElemento.appendChild(imagenProducto);
  
    const precioElemento = document.createElement("p");
    precioElemento.textContent = precioProducto;
  
    // Agregar los elementos al producto
    productoHTML.appendChild(tituloElemento);
    productoHTML.appendChild(imagenElemento);
    productoHTML.appendChild(precioElemento);
  
    // agregar elemento HTML al modal
    modalCuerpo.appendChild(productoHTML);
  
    // actualizar el mensaje del modal si no está vacío
    if (!modalVacio) {
      document.querySelector("#ventanaCarrito .modal-body p").textContent = "Estos son sus productos:";
    }
  }
  
  

  function limpiarCarrito() {
    // Obtener referencia al modal
    let modalCuerpo = document.querySelector("#ventanaCarrito .modal-body");
  
    // Vaciar el contenido del modal, excepto imageCarritoVacio
    const imageCarritoVacio = document.querySelector("#imageCarritoVacio");
    modalCuerpo.innerHTML = "";
    modalCuerpo.appendChild(imageCarritoVacio);
  
    // Crear el mensaje "Su carrito está actualmente vacío"
    const mensajeCarritoVacio = document.createElement("p");
    mensajeCarritoVacio.textContent = "Su carrito está actualmente vacío.";
  
    // Agregar el mensaje al modal
    modalCuerpo.appendChild(mensajeCarritoVacio);
  }
  