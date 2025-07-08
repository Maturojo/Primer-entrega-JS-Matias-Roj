const cortes = [];

// Preguntar el nombre del cliente al cargar la página
let nombreCliente = prompt("¡Bienvenido! ¿Cuál es tu nombre?");

// Mostrar el nombre en el HTML si lo completó
if (nombreCliente) {
    document.getElementById('nombre').value = nombreCliente;


}

function actualizarPrecio() {
    const material = document.getElementById('Material');
    const precio = parseFloat(material.value) || 0;
    document.getElementById('preciometromadera').value = precio;
}



function calcularCosto() {
    const largo = parseFloat(document.getElementById('alto').value);
    const ancho = parseFloat(document.getElementById('ancho').value);
    const cantidad = parseFloat(document.getElementById('cantidad').value);
    const precioPorMetro = parseFloat(document.getElementById('preciometromadera').value);
    const tipoMadera = document.getElementById('Material').options[document.getElementById('Material').selectedIndex].text;

    if (isNaN(largo) || isNaN(ancho) || isNaN(cantidad) || isNaN(precioPorMetro)) {
        alert("Completá todos los campos correctamente.");
        return;
    }

    const area = (largo / 100) * (ancho / 100);
    const total = area * precioPorMetro * cantidad;

    document.getElementById('costototalcorte').textContent = total.toFixed(2);

    // 👉 Guardar el corte en el array
    const corte = {
        material: tipoMadera,
        largo,
        ancho,
        cantidad,
        precioPorMetro,
        total: total.toFixed(2)
    };

    cortes.push(corte);
    console.log(cortes); // 🛠️ Para verlos en consola

    const lista = document.getElementById('listaCortes');
    const item = document.createElement('li');
    item.className = 'list-group-item';
    item.textContent = `${cantidad}x ${tipoMadera} de ${largo}cm x ${ancho}cm - $${total.toFixed(2)}`;
    lista.appendChild(item);

}
