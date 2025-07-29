const cortes = [];

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

    const mensajeError = document.getElementById('mensajeError');
    mensajeError.textContent = "";

    if (isNaN(largo) || isNaN(ancho) || isNaN(cantidad) || isNaN(precioPorMetro)) {
        mensajeError.textContent = "⚠️ Completá todos los campos correctamente.";
        return;
    }

    const area = (largo / 100) * (ancho / 100);
    const total = area * precioPorMetro * cantidad;

    // Guardar corte en el array
    cortes.push({ tipoMadera, largo, ancho, cantidad, precioPorMetro, total: total });

    // Mostrar en historial
    const lista = document.getElementById('listaCortes');
    const item = document.createElement('li');
    item.className = 'list-group-item';
    item.textContent = `${cantidad}x ${tipoMadera} de ${largo}cm x ${ancho}cm - $${total.toFixed(2)}`;
    lista.appendChild(item);

    // Calcular el total de todos los cortes
    actualizarTotal();
}

function actualizarTotal() {
    const totalGeneral = cortes.reduce((sum, corte) => sum + corte.total, 0);
    document.getElementById('costototalcorte').textContent = totalGeneral.toFixed(2);
}

function resetCortes() {
    cortes.length = 0; // Vacía el array
    document.getElementById('listaCortes').innerHTML = ''; // Limpia la lista
    document.getElementById('costototalcorte').textContent = '0.00'; // Reinicia el total
}
