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


    let errorDiv = document.getElementById('mensajeError');
    if (!errorDiv) {
        errorDiv = document.createElement('p');
        errorDiv.id = 'mensajeError';
        errorDiv.style.color = 'red';
        document.querySelector('.mb-3').appendChild(errorDiv);
    }
    errorDiv.textContent = '';


    if (isNaN(largo) || isNaN(ancho) || isNaN(cantidad) || isNaN(precioPorMetro)) {
        errorDiv.textContent = '⚠️ Completá todos los campos correctamente.';
        return;
    }

    const area = (largo / 100) * (ancho / 100);
    const total = area * precioPorMetro * cantidad;
    document.getElementById('costototalcorte').textContent = total.toFixed(2);


    const corte = { tipoMadera, largo, ancho, cantidad, precioPorMetro, total: total.toFixed(2) };
    cortes.push(corte);

    const lista = document.getElementById('listaCortes');
    const item = document.createElement('li');
    item.className = 'list-group-item';
    item.textContent = `${cantidad}x ${tipoMadera} de ${largo}cm x ${ancho}cm - $${total.toFixed(2)}`;
    lista.appendChild(item);
}
