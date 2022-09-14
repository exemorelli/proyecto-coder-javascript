
// RODRI, la lógica es la misma de la entrega anterior; no llegué a aplicar tus correcciones
class Personal {
    constructor(nombre, sector) {
        this.nombre = nombre.toUpperCase();
        this.sector = sector.toUpperCase();
        this.estado = "ACTIVO";
    }
}

//Declaro un array para guardar al personal registrado
const personal = [];
const sectores = [
    { id: 1, sector: "Preparación" },
    { id: 2, sector: "Fabricación" },
    { id: 3, sector: "Pintura" },
    { id: 4, sector: "Puesta" }
];

// Función para realizar la carga de un nuevo empleado
function entradaPersonal() {
    let texto = "";
    let nombre = prompt("Ingrese el nombre");
    for (const sector of sectores) {
        texto = `${texto}${sector.id}. ${sector.sector}\n`;
    }
    let idSector = prompt(`Ingrese el sector:\n${texto}`);
    idSector = Number(idSector);
    if (validarSector(idSector)) {
        personal.push(new Personal(nombre, sectores[idSector - 1].sector));
    } else {
        alert("Valor inválido")
    }
};

// Función para validar que el ID del sector existe
function validarSector(sector) {
    if (sector <= sectores.length && sector > 0) {
        return true;
    }
}

// Pregunto si quiere seguir cargando empleados a la plataforma
function continuar() {
    let comprobacion = prompt("¿Desea repetir el proceso? (S/N)")
    switch (comprobacion) {
        case "S":
            return true;
        case "s":
            return true;
        default:
            return false;
    }
}

// Antes de terminar, consulto si quiere realizar una búsqueda
function consultarBusqueda() {
    let comprobacion = prompt("¿Desea realizar una búsqueda dentro del personal? (S/N)")
    switch (comprobacion) {
        case "S":
            return true;
        case "s":
            return true;
        default:
            return false;
    }
}

// Función para realizar una búsqueda dentro del personal
function buscarPersonal() {
    let consultarNombre = prompt("Ingrese el nombre que desea buscar");
    consultarNombre = consultarNombre.toUpperCase();
    const buscar = personal.find((persona) => persona.nombre === consultarNombre);
    // console.log(buscar);
    if (typeof (buscar) == "object") {
        alert(`Nombre: ${buscar.nombre}\nSector: ${buscar.sector}\nEstado: ${buscar.estado}`)
    } else {
        alert("No se encontraron coincidencias.")
    }
}



// CÓDIGO PRINCIPAL
do {
    entradaPersonal();
} while (continuar());


// INTERECCIÓN CON HTML
let mostrarHTML = document.createElement("div");
document.body.append(mostrarHTML);

for (const persona of personal) {
    let tituloNombre = document.createElement("h2");
    let tituloSector = document.createElement("h2");

    tituloNombre.innerHTML = `Nombre: ${persona.nombre}`;
    tituloSector.innerHTML = `Sector: ${persona.sector}`;

    mostrarHTML.appendChild(tituloNombre);
    mostrarHTML.appendChild(tituloSector);

}
/*
*/

// buscarPersonal();