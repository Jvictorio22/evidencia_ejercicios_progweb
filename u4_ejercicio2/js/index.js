const botonRojo = document.querySelector(".botones-rojo");
const botonVerde = document.querySelector(".botones-verde");
const botonAzul = document.querySelector(".botones-azul");
const botonReset = document.querySelector(".botones-reset");
const body = document.body;

botonRojo.addEventListener("click", function () {
    body.style.backgroundColor = "red";
});

botonVerde.addEventListener("click", function () {
    body.style.backgroundColor = "green";
});

botonAzul.addEventListener("click", function () {
    body.style.backgroundColor = "blue";
});

botonReset.addEventListener("click", function () {
    body.style.backgroundColor = "white";
});
