# 🪚 Cotizador de Cortes de Madera

Proyecto final del curso de **JavaScript en Coderhouse**.  
La aplicación permite calcular el costo de cortes de madera según el material elegido, las medidas y la cantidad, mostrando un historial en forma de tabla y el total general.  

---

## 🚀 Funcionalidades

- 📥 **Carga dinámica de materiales con `fetch`** desde un archivo `materiales.json`.  
- 📊 **Tabla de cortes** con detalle de material, medidas, cantidad, precio por m² y subtotal.  
- 🗑 **Botón para borrar cortes individuales**.  
- 🔄 **Botón para reiniciar todos los cortes** (con confirmación SweetAlert).  
- ⚠️ **Validaciones**:
  - No permite medidas ni cantidades en 0 o negativas.
  - Límite máximo de 1000 cm para largo/ancho.
  - Límite máximo de 1000 cortes acumulados por material.
- 💰 **Precios formateados** con separadores de miles (ej: `1.000.000,00`).  
- 📱 **Integración con WhatsApp**: permite generar un pedido con todos los cortes cargados.  
- 🎨 **Interfaz dinámica**: el HTML completo se genera desde JavaScript.  
- 🔔 **Notificaciones con SweetAlert** para errores, confirmaciones y acciones.  

---

## 🛠 Tecnologías usadas

- HTML5  
- CSS3 + Bootstrap 5  
- JavaScript (ES6+)  
- SweetAlert2  
- WhatsApp API (link a `wa.me`)  

---




👨‍💻 Autor

Matías Rojo

Curso de JavaScript - Coderhouse (2025)
