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
      if (localStorage.getItem("cards") === null) {
        cards.push(new Tarea(tarea.value, 1)); // CREO UN NUEVO OBJETO EN EL ARRAY LISTA 1
        localStorage.setItem("cards", JSON.stringify(cards)); // GUARDO EL ARRAY EN LOCALSTORAGE
      } else {
        let cards = JSON.parse(localStorage.getItem("cards"));
        let i = cards.length + 1;
        cards.push(new Tarea(tarea.value, i));
        localStorage.setItem("cards", JSON.stringify(cards));
      }
      crearCard();
      tarea.value = "";
    }
  };
};

const cancelarInput = () => {
  // FUNCIÓN PARA BORRAR EL TEXT AREA AL CERRAR EL MODAL
  let boton = document.querySelector("#closeToDo");
  boton.onclick = () => {
    let tarea = document.querySelector("#inputTarea");
    tarea.value = "";
  };
};

const crearCard = () => {
  let dibujar = JSON.parse(localStorage.getItem("cards"));
  if (dibujar !== null) {
    let article = document.createElement("article");
    article.classList.add("container");
    seccionTareas.innerHTML = "";
    dibujar.forEach((element, i) => {
      article.innerHTML += `
            <div class="card dragCard col-3 m-3" draggable="true">
                <div class="card-body m-1">
                    <p class="card-text">${element.texto}</p>
                    <button type="button" onclick="cardCompletada(${i})" class="btn btn-success">Completado</button>
                    <button type="button" onclick="alertaBorrar(${i})" class="btn btn-danger">Eliminar</button>
                </div>
            </div>
        `;
      // <div class="card dragCard col-3 m-3" draggable="true">

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
};

const cardCompletada = (i) => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "La tarjeta ha sido archivada",
    showConfirmButton: false,
    timer: 1500,
  });
  borrarCard(i);
};

const alertaBorrar = (i) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
      borrarCard(i);
    }
  });
};

const borrarCard = (i) => {
  // console.log(i)
  let card = JSON.parse(localStorage.getItem("cards"));
  card.splice(i, 1);
  localStorage.setItem("cards", JSON.stringify(card));
  crearCard();
};

const agregarTarea = () => {
  crearCard();
  operarTextArea();
  cancelarInput();
};


// agregarTarea();


// IMPLEMENTACIÓN PARA HACER EL DRAG AND DROP


const lista1 = document.querySelector('#lista1');
const lista2 = document.querySelector('#lista2');

new Sortable(lista1, {
  group: 'shared', // set both lists to same group
  animation: 150,
  chosenClass: "seleccionado",
});

new Sortable(lista2, {
  group: 'shared',
  animation: 150,
  chosenClass: "seleccionado",
});