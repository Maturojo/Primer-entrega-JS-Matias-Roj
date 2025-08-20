const cortes = [];

async function cargarMateriales() {
    const res = await fetch("materiales.json");
    const materiales = await res.json();

    const select = document.getElementById("Material");
    select.innerHTML = '<option value="">Seleccione un material...</option>';

    materiales.forEach(m => {
        select.innerHTML += `<option value="${m.precio}">${m.tipo}</option>`;
    });
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
    const select = document.getElementById('Material');
    const tipoMadera = select.options[select.selectedIndex].text;



    const mensajeError = document.getElementById('mensajeError');
    mensajeError.textContent = "";

    if (isNaN(largo) || isNaN(ancho) || isNaN(cantidad) || isNaN(precioPorMetro)) {
        Swal.fire({
            icon: "warning",
            title: "Campos incompletos",
            text: "⚠️ Completá todos los campos correctamente."
        });
        return;
    }

    if (largo <= 0 || ancho <= 0) {
        Swal.fire({
            icon: "error",
            title: "Medidas inválidas",
            text: "El largo y el ancho deben ser mayores a 0."
        });
        return;
        }

        if (cantidad <= 0) {
        Swal.fire({
            icon: "error",
            title: "Cantidad inválida",
            text: "La cantidad debe ser mayor a 0."
        });
        return;
        }

        
        if (largo > 1000 || ancho > 1000) { 
        Swal.fire({
            icon: "error",
            title: "Medidas demasiado grandes",
            text: "El largo y ancho no pueden superar 1000 cm (10 metros)."
        });
        return;
        }

        if (cantidad > 1000) {
        Swal.fire({
            icon: "error",
            title: "Cantidad excesiva",
            text: "La cantidad no puede superar las 1000 cortes por material."
        });
        return;
    }

    const acumulado = cortes
        .filter(c => c.tipoMadera === tipoMadera)
        .reduce((sum, c) => sum + c.cantidad, 0);

    if (acumulado + cantidad > 1000) {
        Swal.fire({
        icon: "error",
        title: "Cantidad excedida",
        text: `Ya tenés ${acumulado} cortes de ${tipoMadera}. El máximo total permitido es 1000.`
        });
        return;
    }

    const area = (largo / 100) * (ancho / 100);
    const total = area * precioPorMetro * cantidad;

    
    const id = Date.now();
    const corte = { id, tipoMadera, largo, ancho, cantidad, precioPorMetro, total };
    cortes.push(corte);

    const tabla = document.getElementById('tablaCortes');
    const fila = document.createElement('tr');
    fila.setAttribute("data-id", id);

    fila.innerHTML = `
        <td>${tipoMadera}</td>
        <td>${largo}</td>
        <td>${ancho}</td>
        <td>${cantidad}</td>
        <td>$${formatNumber(precioPorMetro)}</td>
        <td>$${formatNumber(total)}</td>
        <td><button class="btn btn-sm btn-danger" onclick="eliminarCorte(${id})">❌</button></td>
    `;
    tabla.appendChild(fila);


    actualizarTotal();
}

function eliminarCorte(id) {
    const index = cortes.findIndex(c => c.id === id);
    if (index !== -1) {
    cortes.splice(index, 1); // elimina ese corte del array
    }

    const fila = document.querySelector(`tr[data-id="${id}"]`);
    if (fila) fila.remove();

    actualizarTotal();
}

function actualizarTotal() {
    const totalGeneral = cortes.reduce((sum, corte) => sum + corte.total, 0);
    document.getElementById('costototalcorte').textContent = formatNumber(totalGeneral);
}

function resetCortes() {
    Swal.fire({
    title: "¿Estás seguro?",
    text: "Se eliminarán todos los cortes.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, reiniciar",
    cancelButtonText: "Cancelar"
    }).then((result) => {
    if (result.isConfirmed) {
    cortes.length = 0; 
    document.getElementById('tablaCortes').innerHTML = ''; 
    document.getElementById('costototalcorte').textContent = '0.00'; 
    
        Swal.fire({
            icon: "success",
            title: "Cortes reiniciados",
            showConfirmButton: false,
            timer: 1500
        });
        }
    });

}

function formatNumber(num) {
    return new Intl.NumberFormat("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(num);
}


document.addEventListener("DOMContentLoaded", cargarMateriales);

