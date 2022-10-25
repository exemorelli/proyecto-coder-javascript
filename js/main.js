// IMPLEMENTACIÓN PARA HACER EL DRAG AND DROP CON SORTABLE JS
const lista1 = document.querySelector("#lista1");
const lista2 = document.querySelector("#lista2");

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
      localStorage.setItem("orden-lista-1", orden1.join('|'));
    },
    get: () => {
      const orden1 = localStorage.getItem("orden-lista-1");
      return orden1 ? orden1.split('|') : [];
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
      localStorage.setItem("orden-lista-2", orden2.join('|'));
    },
    get: () => {
      const orden2 = localStorage.getItem("orden-lista-2");
      return orden2 ? orden2.split('|') : [];
    },
  },
});

/* let btnNewCard = document.querySelector("#addCard-lista1");

const addCard = (list) => {}; */

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
}

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

contenidoCard.forEach((e) => {
  e.onclick = () => {
    focusCard(e);
  };
});

finishEdit(textarea);
