
// =====================================
// 1. BASE DE DATOS DE EJEMPLO
// =====================================

const repuestos = [
    {
        id: 1,
        nombre: "Filtro de aceite",
        tipo: "Moto",
        marca: "Suzuki",
        modelo: "V-Strom 650",
        anio: 2012,
        codigo: "FIL-SUZ-001",
        precio: 45000,
        proveedor: "Repuestos del Valle (Ejemplo)",
        telefono: "3000000000",
        ciudad: "Buga",
        direccion: "Dirección pendiente",
        vin: ""
    },

    {
        id: 2,
        nombre: "Pastillas de freno",
        tipo: "Moto",
        marca: "Honda",
        modelo: "XR 150",
        anio: 2024,
        codigo: "FRE-HON-002",
        precio: 65000,
        proveedor: "Moto Repuestos (Ejemplo)",
        telefono: "3000000000",
        ciudad: "Cali",
        direccion: "Dirección pendiente",
        vin: ""
    },

    {
        id: 3,
        nombre: "Batería",
        tipo: "Carro",
        marca: "Chevrolet",
        modelo: "Spark",
        anio: 2018,
        codigo: "BAT-CHE-003",
        precio: 280000,
        proveedor: "Auto Partes (Ejemplo)",
        telefono: "3000000000",
        ciudad: "Buga",
        direccion: "Dirección pendiente",
        vin: ""
    },

    {
        id: 4,
        nombre: "Filtro de aire",
        tipo: "Moto",
        marca: "Suzuki",
        modelo: "V-Strom 650",
        anio: 2012,
        codigo: "AIR-SUZ-004",
        precio: 55000,
        proveedor: "Repuestos del Valle (Ejemplo)",
        telefono: "3000000000",
        ciudad: "Buga",
        direccion: "Dirección pendiente",
        vin: ""
    },

    {
        id: 5,
        nombre: "Amortiguador delantero",
        tipo: "Carro",
        marca: "Renault",
        modelo: "Logan",
        anio: 2020,
        codigo: "AMO-REN-005",
        precio: 195000,
        proveedor: "Auto Partes (Ejemplo)",
        telefono: "3000000000",
        ciudad: "Cali",
        direccion: "Dirección pendiente",
        vin: ""
    }
];

// =====================================
// 2. OBTENER ELEMENTOS DEL HTML
// =====================================

const formulario = document.getElementById("formBusqueda");

const campoRepuesto = document.getElementById("repuesto");
const campoTipo = document.getElementById("tipo");
const campoMarca = document.getElementById("marca");
const campoModelo = document.getElementById("modelo");
const campoAnio = document.getElementById("anio");
const campoVin = document.getElementById("vin");

const resultados = document.getElementById("resultados");
const contador = document.getElementById("contador");

const ventana = document.getElementById("ventanaDetalle");
const contenidoDetalle = document.getElementById("contenidoDetalle");
const cerrarDetalle = document.getElementById("cerrarDetalle");

// =====================================
// 3. FORMATO DE PRECIOS
// =====================================

function formatoPrecio(valor) {

    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    }).format(valor);

}

// =====================================
// 4. MOSTRAR MARCAS
// =====================================

function cargarMarcas() {

    const tipoSeleccionado = campoTipo.value;

    const marcas = repuestos
        .filter(item =>
            tipoSeleccionado === "" ||
            item.tipo === tipoSeleccionado
        )
        .map(item => item.marca);

    const marcasUnicas = [...new Set(marcas)].sort();

    campoMarca.innerHTML =
        '<option value="">Todas las marcas</option>';

    marcasUnicas.forEach(marca => {

        const opcion = document.createElement("option");

        opcion.value = marca;
        opcion.textContent = marca;

        campoMarca.appendChild(opcion);

    });

}

// =====================================
// 5. MOSTRAR REPUESTOS
// =====================================

function mostrarRepuestos(lista) {

    resultados.innerHTML = "";

    contador.textContent =
        `${lista.length} repuesto(s) encontrado(s)`;

    if (lista.length === 0) {

        resultados.textContent =
            "No encontramos repuestos con esos filtros.";

        return;
    }

    lista.forEach(item => {

        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta";

        const titulo = document.createElement("h3");
        titulo.textContent = item.nombre;

        const vehiculo = document.createElement("p");
        vehiculo.textContent =
            `${item.marca} - ${item.modelo} - ${item.anio}`;

        const codigo = document.createElement("p");
        codigo.textContent = `Código: ${item.codigo}`;

        const ciudad = document.createElement("p");
        ciudad.textContent = `Ciudad: ${item.ciudad}`;

        const precio = document.createElement("p");
        precio.className = "precio";
        precio.textContent = formatoPrecio(item.precio);

        const boton = document.createElement("button");
        boton.className = "btnDetalle";
        boton.textContent = "Ver proveedor";

        boton.addEventListener("click", () => {
            verDetalle(item.id);
        });

        tarjeta.append(
            titulo,
            vehiculo,
            codigo,
            ciudad,
            precio,
            boton
        );

        resultados.appendChild(tarjeta);

    });

}

// =====================================
// 6. BUSCAR REPUESTOS
// =====================================

function buscarRepuestos(evento) {

    evento.preventDefault();

    const nombre = campoRepuesto.value.trim().toLowerCase();
    const tipo = campoTipo.value;
    const marca = campoMarca.value;
    const modelo = campoModelo.value.trim().toLowerCase();
    const anio = campoAnio.value;
    const vin = campoVin.value.trim().toUpperCase();

    // El VIN completo normalmente tiene 17 caracteres.
    if (vin !== "" && vin.length !== 17) {
        alert("El VIN debe tener 17 caracteres.");
        return;
    }

    const encontrados = repuestos.filter(item => {

        const coincideNombre =
            item.nombre.toLowerCase().includes(nombre) ||
            item.codigo.toLowerCase().includes(nombre);

        const coincideTipo =
            tipo === "" || item.tipo === tipo;

        const coincideMarca =
            marca === "" || item.marca === marca;

        const coincideModelo =
            item.modelo.toLowerCase().includes(modelo);

        const coincideAnio =
            anio === "" || item.anio === Number(anio);

        // En esta demostración el VIN solo se compara
        // cuando el registro tiene uno asociado.
        const coincideVin =
            vin === "" || item.vin === vin;

        return (
            coincideNombre &&
            coincideTipo &&
            coincideMarca &&
            coincideModelo &&
            coincideAnio &&
            coincideVin
        );

    });

    mostrarRepuestos(encontrados);

}

// =====================================
// 7. VER INFORMACIÓN DEL PROVEEDOR
// =====================================

function verDetalle(id) {

    const item = repuestos.find(r => r.id === id);

    if (!item) return;

    contenidoDetalle.innerHTML = "";

    const titulo = document.createElement("h2");
    titulo.textContent = item.nombre;

    contenidoDetalle.appendChild(titulo);

    const datos = [
        ["Marca", item.marca],
        ["Modelo", item.modelo],
        ["Año", item.anio],
        ["Código", item.codigo],
        ["Precio", formatoPrecio(item.precio)],
        ["Proveedor", item.proveedor],
        ["Ciudad", item.ciudad],
        ["Dirección", item.direccion]
    ];

    datos.forEach(([etiqueta, valor]) => {

        const parrafo = document.createElement("p");

        const negrita = document.createElement("strong");
        negrita.textContent = etiqueta + ": ";

        parrafo.append(negrita, document.createTextNode(valor));

        contenidoDetalle.appendChild(parrafo);

    });

    // Enlace telefónico de demostración
    const telefono = document.createElement("p");
    telefono.textContent =
        "Teléfono de ejemplo: " + item.telefono;

    contenidoDetalle.appendChild(telefono);

    // Mostrar ubicación mediante Google Maps
    if (item.direccion !== "Dirección pendiente") {

        const enlaceMapa = document.createElement("a");

        const ubicacion =
            `${item.direccion}, ${item.ciudad}, Colombia`;

        enlaceMapa.href =
            "https://www.google.com/maps/search/?api=1&query=" +
            encodeURIComponent(ubicacion);

        enlaceMapa.target = "_blank";
        enlaceMapa.rel = "noopener noreferrer";
        enlaceMapa.textContent = "📍 Ver ubicación en Google Maps";

        contenidoDetalle.appendChild(enlaceMapa);

    } else {

        const aviso = document.createElement("p");
        aviso.textContent = "Ubicación exacta pendiente de registrar.";

        contenidoDetalle.appendChild(aviso);

    }

    ventana.showModal();

}

// =====================================
// 8. EVENTOS
// =====================================

// Ejecutar búsqueda al presionar el botón
formulario.addEventListener("submit", buscarRepuestos);

// Actualizar marcas al cambiar tipo de vehículo
campoTipo.addEventListener("change", cargarMarcas);

// Limpiar filtros
formulario.addEventListener("reset", () => {

    setTimeout(() => {
        cargarMarcas();
        mostrarRepuestos(repuestos);
    }, 0);

});

// Cerrar ventana de detalles
cerrarDetalle.addEventListener("click", () => {
    ventana.close();
});

// =====================================
// 9. INICIAR LA APLICACIÓN
// =====================================

cargarMarcas();
mostrarRepuestos(repuestos);
