// IMPLEMENTACIÓN PARA HACER EL DRAG AND DROP CON SORTABLE JS
const lista1 = document.querySelector("#lista1");
const lista2 = document.querySelector("#lista2");
const lista3 = document.querySelector("#lista3");

class Tarea {
  constructor(nombre, texto) {
    this.nombre = nombre;
    this.texto = texto;
  }
}

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
      localStorage.setItem("lista1", JSON.stringify(orden1));
    },
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
      localStorage.setItem("lista2", JSON.stringify(orden2));
    },
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
      localStorage.setItem("lista3", JSON.stringify(orden3));
    },
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
        e.blur();
      }
    };
    e.onblur = (event) => {
      // event.target.value !== "" ? saveEdit(e, event) : e.parentNode.remove();
      if (event.target.value !== "") {
        saveEdit(e, event);
      } else {
        e.parentNode.remove();
        downID();
      }
    };
  });
};

// FUNCION PARA GUARDAR CAMBIOS DEL CARD
const saveEdit = (actual, event) => {
  let anterior = actual.previousElementSibling;
  anterior.innerHTML = event.target.value;
  anterior.classList.remove("oculto");
  actual.classList.add("oculto");

  // GUARDO DATOS DE LOS CARDS
  checkStorage();
  let cardsArray = JSON.parse(localStorage.getItem("cards"));
  let encontrado = cardsArray.find(
    (e) => e.nombre === actual.parentNode.getAttribute("data-id")
  );

  // CONDICIONAL PARA EVITAR GUARDADO DUPLICADO EN EL LOCAL STORAGE
  if (!encontrado) {
    cardsArray.push(
      new Tarea(actual.parentNode.getAttribute("data-id"), anterior.innerHTML)
    );
    localStorage.setItem("cards", JSON.stringify(cardsArray));

    // GUARDO LAS LISTAS DE CARDS
    let lista = actual.parentNode.parentNode.getAttribute("id");
    checkList(lista);
    let listaArray = JSON.parse(localStorage.getItem(lista));
    listaArray.push(actual.parentNode.getAttribute("data-id"));
    localStorage.setItem(lista, JSON.stringify(listaArray));
  } else {
    // console.log(cardsArray);
    // cardsArray
  }
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
const addCard = (arrayBtn) => {
  arrayBtn.forEach((e) => {
    e.onclick = () => {
      checkID();
      getID();
      const padreCard = e.previousElementSibling;
      padreCard.innerHTML += `
      <div class="kanban__lista__container__card" data-id="card-${nextID}">
          <h4 class="eventoCard"></h4>
          <textarea class="eventoArea oculto"></textarea>
      </div>
      `;
      let tarjeta = padreCard.querySelector(`[data-id=card-${nextID}]`);
      focusCard(tarjeta.firstElementChild);
      cards();
      upID();
    };
  });
};

// DIBUJAR CARDS EN LOCAL STORAGE
const drawOnLoad = (columna1, columna2, columna3) => {
  let list1 = JSON.parse(localStorage.getItem("lista1"));
  let list2 = JSON.parse(localStorage.getItem("lista2"));
  let list3 = JSON.parse(localStorage.getItem("lista3"));
  let cards = JSON.parse(localStorage.getItem("cards"));

  if (list1 !== null) {
    // console.log(list1);
    drawList(columna1, list1, cards);
  }
  if (list2 !== null) {
    // console.log(list2);
    drawList(columna2, list2, cards);
  }
  if (list3 !== null) {
    // console.log(list3);
    drawList(columna3, list3, cards);
  }
  // drawList(columna1, lista1, cards);
  // drawList(columna2, lista2, cards);
  // drawList(columna3, lista3, cards);
};

// DIBUJAR CARDS DE CADA LISTA
const drawList = (columnaID, listaLS, cardsLS) => {
  for (const lista of listaLS) {
    const card = cardsLS.find((e) => e.nombre === lista);
    columnaID.innerHTML += `
    <div class="kanban__lista__container__card" data-id="${card.nombre}">
        <h4 class="eventoCard">${card.texto}</h4>
        <textarea class="eventoArea oculto">${card.texto}</textarea>
    </div>
    `;
    cards();
  }
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
};

// FUNCION PARA REDUCIR EL DATA-ID EN LOCALSTORAGE -1
const downID = () => {
  nextID--;
  localStorage.setItem("next-id", JSON.stringify(nextID));
};

// FUNCION PARA INICIALIZAR ARRAY DE CARDS EN LS
const checkStorage = () => {
  if (!localStorage.getItem("cards")) {
    cardsArray = [];
    localStorage.setItem("cards", JSON.stringify(cardsArray));
  }
};

// FUNCION PARA INICIALIZAR ARRAY DE LISTAS EN LS
const checkList = (lista) => {
  if (!localStorage.getItem(`${lista}`)) {
    listaArray = [];
    localStorage.setItem(lista, JSON.stringify(listaArray));
  }
};

// CODIGO PRINCIPAL

let nextID; // valor a asignar en el data-id de la prox. card

// let mainContainer = document.querySelector("#mainContainer");
let btnNewCard = document.querySelectorAll(".kanban__lista__btn");
// checkStorage();
// checkList();

checkStorage();
checkList("lista1");
checkList("lista2");
checkList("lista3");

addCard(btnNewCard);

drawOnLoad(lista1, lista2, lista3);
