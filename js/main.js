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

  /* store: {
    set: (sortable) => {
      const orden1 = sortable.toArray();
      localStorage.setItem("orden-lista-1", orden1.join("|"));
    },
    get: () => {
      const orden1 = localStorage.getItem("orden-lista-1");
      return orden1 ? orden1.split("|") : [];
    },
  }, */
});

new Sortable(lista2, {
  group: "draggableCard",
  animation: 150,
  chosenClass: "seleccionado",
  onEnd: () => {
    console.log("Se movió un elemento de la lista 2");
  },
  /* store: {
    set: (sortable) => {
      const orden2 = sortable.toArray();
      localStorage.setItem("orden-lista-2", orden2.join("|"));
    },
    get: () => {
      const orden2 = localStorage.getItem("orden-lista-2");
      return orden2 ? orden2.split("|") : [];
    },
  }, */
});

new Sortable(lista3, {
  group: "draggableCard",
  animation: 150,
  chosenClass: "seleccionado",
  onEnd: () => {
    console.log("Se movió un elemento de la lista 2");
  },
  /* store: {
    set: (sortable) => {
      const orden3 = sortable.toArray();
      localStorage.setItem("orden-lista-3", orden3.join("|"));
    },
    get: () => {
      const orden3 = localStorage.getItem("orden-lista-3");
      return orden3 ? orden3.split("|") : [];
    },
  }, */
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

// CODIGO PRINCIPAL
let textarea = document.querySelectorAll(".eventoArea");
let contenidoCard = document.querySelectorAll(".eventoCard");

const editCard = (contenidoCard) => {
  contenidoCard.forEach((e) => {
    e.onclick = () => {
      focusCard(e);
    };
  });
};

editCard(contenidoCard);
finishEdit(textarea);

// localStorage.setItem("lista","")

let btnNewCard = document.querySelectorAll(".kanban__lista__btn");

const addCard = (array) => {
  // let cantCards = localStorage.getItem("lista")
  // data-id="card-1"
  array.forEach((e, i) => {
    e.onclick = () => {
      const padreCard = e.previousElementSibling;
      console.log(padreCard);
      padreCard.innerHTML += `
                <div class="kanban__lista__container__card" data-id="card-${i}">
                    <h4 class="eventoCard">Hola</h4>
                    <textarea class="eventoArea oculto">Hola</textarea>
                </div>
      `;
    };
  });
};

addCard(btnNewCard);
