class Tarea {
    constructor(texto, id) {
        this.texto = texto;
        this.id = id;
    }
}

// let mainContainer = document.querySelector("#mainContainer");
let seccionTareas = document.querySelector("#listaTareas");


const operarTextArea = () => {

    let boton = document.querySelector("#btnAddToDo");
    // let botonGetId = document.getElementById("btnAddToDo");
    boton.onclick = () => {
        const cards = [];
        let tarea = document.querySelector("#inputTarea");
        if (tarea.value != "") {
            if (localStorage.getItem('cards') === null) {
                cards.push(new Tarea(tarea.value, 1)); // CREO UN NUEVO OBJETO EN EL ARRAY LISTA 1
                localStorage.setItem('cards', JSON.stringify(cards));// GUARDO EL ARRAY EN LOCALSTORAGE
            } else {
                let cards = JSON.parse(localStorage.getItem('cards'))
                let i = cards.length + 1;
                cards.push(new Tarea(tarea.value, i));
                localStorage.setItem('cards', JSON.stringify(cards));
            }
            crearCard();
            tarea.value = "";
        }
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

const crearCard = () => {
    let dibujar = JSON.parse(localStorage.getItem('cards'));
    if (dibujar !== null) {
        let article = document.createElement("article");
        article.classList.add("container");
        seccionTareas.innerHTML = "";
        dibujar.forEach((element, i )=> {
            article.innerHTML += `
            <div class="card col-3 m-3">
                <div class="card-body m-1">
                    <p>${element.texto}</p>
                    <button type="button" onclick="borrarCard(${i})" class="btn btn-danger">Eliminar</button>
                </div>
            </div>
        `;

            seccionTareas.appendChild(article);
        });
    }
    /* for (const card of cards) {
        // checkItem.classList.add("form-check");
        article.innerHTML = `
        <label>${card.texto}</label>
    `;
        seccionTareas.appendChild(article);
    } */
}

const borrarCard = (i) => {
    // console.log(i)
    let card = JSON.parse(localStorage.getItem('cards'));
    card.splice(i, 1);
    localStorage.setItem('cards', JSON.stringify(card));
    crearCard();
}


const agregarTarea = () => {
    crearCard();
    operarTextArea();
    cancelarInput();
}

agregarTarea();


