// IMPLEMENTACIÓN PARA HACER EL DRAG AND DROP CON SORTABLE JS
const lista1 = document.querySelector("#lista1");
const lista2 = document.querySelector("#lista2");
const lista3 = document.querySelector("#lista3");

new Sortable(lista1, {
  group: "draggableCard", // set both lists to same group
  animation: 150,
  chosenClass: "seleccionado",
  onEnd: () => {
    console.log("Se movió un elemento de la lista 1");
  },

  store: {
    set: (sortable) => {
      const orden1 = sortable.toArray();
      localStorage.setItem("lista-1", JSON.stringify(orden1));
    },
    /*
    get: () => {
      const orden1 = localStorage.getItem("lista-1");
      return orden1 ? JSON.parse(orden1) : [];
    },
     */
  },
});

new Sortable(lista2, {
  group: "draggableCard",
  animation: 150,
  chosenClass: "seleccionado",
  onEnd: () => {
    console.log("Se movió un elemento de la lista 2");
  },

  store: {
    set: (sortable) => {
      const orden2 = sortable.toArray();
      localStorage.setItem("lista-2", JSON.stringify(orden2));
    },
    /* 
    get: () => {
      const orden2 = localStorage.getItem("lista-2");
      return orden2 ? JSON.parse(orden2) : [];
      // return orden2 ? orden2.split("|") : [];
    },
     */
  },
});

new Sortable(lista3, {
  group: "draggableCard",
  animation: 150,
  chosenClass: "seleccionado",
  onEnd: () => {
    console.log("Se movió un elemento de la lista 2");
  },
  store: {
    set: (sortable) => {
      const orden3 = sortable.toArray();
      localStorage.setItem("lista-3", JSON.stringify(orden3));
    },
    /* 
    get: () => {
      const orden3 = localStorage.getItem("lista-3");
      return orden3 ? JSON.parse(orden3) : [];
    },
    */
  },
});

// FUNCION PARA COMENZAR EDICION DE UNA CARD CON TEXTAREA
const focusCard = (e) => {
  e.classList.add("oculto");
  e.nextElementSibling.classList.remove("oculto");
  e.nextElementSibling.focus();
};

// FUNCION PARA TERMINAR EDICION DE CARD LEYENDO TECLAS 'ESC', 'ENTER' Y CLICK AFUERA
const finishEdit = (textarea) => {
  textarea.forEach((e) => {
    e.onkeydown = (event) => {
      if (event.keyCode === 13 || event.keyCode === 27) {
        saveEdit(e, event);
      }
    };
    e.onblur = (event) => {
      saveEdit(e, event);
      // console.log("HOLA");
    };
  });
};

// FUNCION PARA GUARDAR CAMBIOS DEL CARD
const saveEdit = (actual, event) => {
  let anterior = actual.previousElementSibling;
  anterior.innerHTML = event.target.value;
  anterior.classList.remove("oculto");
  actual.classList.add("oculto");
};

// FUNCION ONCLICK CARD
const editCard = (contenidoCard) => {
  contenidoCard.forEach((e) => {
    e.onclick = () => {
      focusCard(e);
    };
  });
};

// FUNCION DIBUJAR CARD
const addCard = (array) => {
  array.forEach((e) => {
    e.onclick = () => {
      getID();
      const padreCard = e.previousElementSibling;
      padreCard.innerHTML += `
      <div class="kanban__lista__container__card" data-id="card-${nextID}">
          <h4 class="eventoCard">Haz click aquí para editar</h4>
          <textarea class="eventoArea oculto"></textarea>
      </div>
      `;

      // RECORRER padre.Card PARA ENCONTRAR EL H4 Y LLAMAR LA FUNCIÓN focusCard

      // console.log(padreCard);
      // console.log(padreCard.lastChild.innerHTML);
      cards();
      upID();
    };
  });
};

// FUNCION PARA INTERACTUAR CON LOS CARDS
const cards = () => {
  let contenidoCard = document.querySelectorAll(".eventoCard");
  let textarea = document.querySelectorAll(".eventoArea");
  editCard(contenidoCard);
  finishEdit(textarea);
};

// FUNCION PARA LEER SI EXISTE DATA-ID GUARDADO EN LOCALSTORAGE AL CARGAR LA PAG.
const checkID = () => {
  if (!localStorage.getItem("next-id")) {
    nextID = 1;
    localStorage.setItem("next-id", JSON.stringify(nextID));
    console.log("no existía");
  } else {
    console.log("ya existe");
  }
};

// FUNCION PARA OBTENER DATA-ID EN LOCALSTORAGE
const getID = () => {
  nextID = JSON.parse(localStorage.getItem("next-id"));
};

// FUNCION PARA AUMENTAR EL DATA-ID EN LOCALSTORAGE +1
const upID = () => {
  nextID++;
  localStorage.setItem("next-id", JSON.stringify(nextID));
  console.log(nextID);
};

// CODIGO PRINCIPAL

let nextID; // valor a asignar en el data-id de la prox. card

let btnNewCard = document.querySelectorAll(".kanban__lista__btn");


checkID();
addCard(btnNewCard);

cards();
