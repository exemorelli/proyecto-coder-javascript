/* let boton = document.getElementById("prueba")
boton.onclick = () => {console.log("Click")}
boton.onmousemove = () => {console.log("Move")}
boton.onmousedown = () => {console.log("Down")}
boton.onmouseout = () => {console.log("Out")}
boton.onmouseover = () => {console.log("Over")}
boton.onmouseup = () => {console.log("Up")} */


let input1 = document.getElementById("nombre")
let input2 = document.getElementById("edad")
/* input1.onkeyup = () => {console.log("keyUp")}
input2.onkeydown = () => {console.log("keyDown")} */

/* input1.onchange = () => {console.log("valor1")};
input2.onchange = () => {console.log("valor2")}; */

/* input1.oninput = () => {console.log("tipeando")}
input2.addEventListener ('input', () => {console.log(input2.value)} ) */

let miFormulario = document.getElementById("formulario");
miFormulario.addEventListener("submit", validarFormulario);

/* function validarFormulario(e) {
    e.preventDefault();
    console.log("Formulario Enviado");
} */

/* miFormulario.onsubmit = (e) => {
    e.preventDefault();
    console.log("Formulario Enviado");
} */

function validarFormulario(e) {
    //Cancelamos el comportamiento del evento
    e.preventDefault();
    //Obtenemos el elemento desde el cual se disparó el evento
    let formulario = e.target;
    //Obtengo el valor del primero hijo <input type="text">
    console.log(formulario.children[0].value);
    //Obtengo el valor del segundo hijo <input type="number"> 
    console.log(formulario.children[1].value);
}

