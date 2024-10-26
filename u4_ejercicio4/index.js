const listaHistorial = document.getElementById("historial");
const tarea = document.getElementById("agregarTarea");
let historial = JSON.parse(localStorage.getItem("Historial")) || [];

// Funcion para agregar la tarea
function agregarTarea () {
    const nuevoTexto = tarea.value.trim();

    if (nuevoTexto !== "") {
        const nuevaTarea = {
            texto: nuevoTexto, completado: false
        };
        actualizarHistorial();
        guardarHistorial(nuevaTarea);
        tarea.value = "";
    } else {
        alert ("Por favor, ingresa una tarea")
    }
}

// Funcion para agregar la tarea a la lista con boton y checkbox
function agregarTareaLista (tareaAgregar) {
    const nuevaTarea = document.createElement("li");
        nuevaTarea.className = "list-group-item d-flex justify-content-between align-items-center mb-0"

        //Añadir el checkbox y el boton a las tareas
        const añadirCheckbox = document.createElement
        ("input");
        añadirCheckbox.type = "checkbox";
        añadirCheckbox.classList.add("me-1");
        añadirCheckbox.checked = tareaAgregar.completado;
        
        
        const label = document.createElement("label");
        label.textContent = tareaAgregar.texto;
        label.classList.add("form-check-label");
        label.classList.toggle("text-decoraration-line-through", tareaAgregar.completado);

        añadirCheckbox.addEventListener ("change", () => {
            tareaAgregar.completado = añadirCheckbox.checked;
            label.classList.toggle("text-decoration-line-through", añadirCheckbox.checked);
            guardarHistorial();
        });


        const eliminar = document.createElement("button");
        eliminar.className = "btn btn-outline-danger btn-sm";
        eliminar.textContent = "Eliminar"
        eliminar.addEventListener("click", () => eliminarTarea(nuevaTarea, tareaAgregar));

        nuevaTarea.appendChild(añadirCheckbox);
        nuevaTarea.appendChild(label);
        nuevaTarea.appendChild(eliminar);

        if (tareaAgregar.completado) {
            label.classList.add("text-decoration-line-through");
        }
        listaHistorial.appendChild(nuevaTarea);
}

// Funcion para eliminar la tarea, haciendo que se tambien del arreglo
function eliminarTarea (tareaEliminar, tareaAgregar) {
    listaHistorial.removeChild(tareaEliminar)
   
    // El filter sirve para filtrar el array y devuelve únicamente los resultados que se quieran, es este caso eliminando del historial los que no esten en el arreglo de lista de tareas
    historial = historial.filter(t => t.texto !== tareaAgregar.texto);
    guardarHistorial();
    actualizarHistorial();
}

// Funcion para guardar el historial cuando se agregue un nuevo elemento
function guardarHistorial (nuevaTarea) {
    if (nuevaTarea) {
        historial.push(nuevaTarea);
        agregarTareaLista(nuevaTarea);
    }
    localStorage.setItem("Historial", JSON.stringify(historial));
} 

// funcion para actualizar el historial
function actualizarHistorial () {
    listaHistorial.innerHTML = "";
    historial.forEach(agregarTareaLista);
}

window.onload = function() {
    actualizarHistorial();
}