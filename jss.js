  const formProducto = document.getElementById('formProducto');
  const tablaBody = document.querySelector('#tablaProductos tbody');
  const totalGeneral = document.getElementById('totalGeneral');
  let productos = [];

  formProducto.addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombreProducto').value;
    const precio = parseFloat(document.getElementById('precioProducto').value);
    const cantidad = parseInt(document.getElementById('cantidadProducto').value);

    const subtotal = precio * cantidad;

    const producto = { nombre, precio, cantidad, subtotal };
    productos.push(producto);
    actualizarTabla();

    // Limpiar formulario
    formProducto.reset();
  });

  function actualizarTabla() {
    tablaBody.innerHTML = '';
    let total = 0;

    productos.forEach((prod, index) => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${prod.nombre}</td>
        <td>S/ ${prod.precio.toFixed(2)}</td>
        <td>${prod.cantidad}</td>
        <td>S/ ${prod.subtotal.toFixed(2)}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button>
        </td>
      `;
      tablaBody.appendChild(fila);
      total += prod.subtotal;
    });

    totalGeneral.textContent = `S/ ${total.toFixed(2)}`;
  }

  function eliminarProducto(index) {
    productos.splice(index, 1);
    actualizarTabla();
  }
