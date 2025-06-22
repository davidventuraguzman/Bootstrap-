const form = document.getElementById('formEmpleado');
const tablaBody = document.querySelector('#tablaEmpleados tbody');
const fotoInput = document.getElementById('fotoEmpleado');
const nombreFotoSpan = document.getElementById('nombreFoto');
let empleados = [];

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombreEmpleado').value.trim();
    const dni = document.getElementById('dniEmpleado').value.trim();
    const correo = document.getElementById('correoEmpleado').value.trim();
    const direccion = document.getElementById('direccionEmpleado').value.trim();
    const nivel = document.getElementById('nivel').value;
    const fotoArchivo = fotoInput.files[0];

    const lector = new FileReader();
    lector.onload = function (e) {
        const imagenBase64 = e.target.result;

        empleados.push({ nombre, dni, correo, direccion, ocupacion, nivel, foto: imagenBase64 });
        actualizarTabla();
        form.reset();
        nombreFotoSpan.textContent = 'Ningún archivo seleccionado';
    };

    lector.readAsDataURL(fotoArchivo);
});

function actualizarTabla() {
    tablaBody.innerHTML = '';
    empleados.forEach((emp, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
      <td>${emp.nombre}</td>
      <td>${emp.dni}</td>
      <td>${emp.correo}</td>
      <td>${emp.direccion}</td>
      <td>${emp.nivel}</td>
      <td><img src="${emp.foto}" alt="Foto" style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px;"></td>
      <td><button class="btn btn-danger btn-sm" onclick="eliminarEmpleado(${index})">Eliminar</button></td>
    `;
        tablaBody.appendChild(fila);
    });
}

function eliminarEmpleado(index) {
    empleados.splice(index, 1);
    actualizarTabla();
}
