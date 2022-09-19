class Tarea {
    constructor(texto, id) {
        this.texto = texto;
        this.id = id;
        this.checked = false;
    }
}

let mainContainer = document.querySelector("#mainContainer");
let seccionTareas = document.querySelector("#listaTareas")


const lista1 = [];
let idLista1 = 1;

const operarTextArea = () => {
    let boton = document.querySelector("#btnAddToDo");
    // let botonGetId = document.getElementById("btnAddToDo");
    boton.onclick = () => {
        let tarea = document.querySelector("#inputTarea");
        lista1.push(new Tarea(tarea.value, idLista1)); // CREO UN NUEVO OBJETO EN EL ARRAY LISTA 1
        idLista1++; // AUMENTO EN 1 EL ID
        crearCheckItem(tarea.value);
        tarea.value = ""; // BORRO EL TEXT AREA
        // console.log(lista1);
        // crearCheckItem(lista1[length-1].texto);
    }
}

const cancelarInput = () => {
    // FUNCIÓN PARA BORRAR EL TEXT AREA AL CERRAR EL MODAL
    let boton = document.querySelector("#closeToDo");
    boton.onclick = () => {
        let tarea = document.querySelector("#inputTarea");
        tarea.value = "";
    }
}

const crearCheckItem = (texto) => {
    let checkItem = document.createElement("article");
    checkItem.classList.add("form-check");
    checkItem.innerHTML = `
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault" id="">
                    ${texto}
                </label>`;
    seccionTareas.appendChild(checkItem);
}

const agregarTarea = () => {
    operarTextArea();
    cancelarInput();
    // crearCheckItem(lista1[length-1].texto);
}

agregarTarea();


