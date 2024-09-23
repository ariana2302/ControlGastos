let listaNombreGastos = []; //los corchetes señalan que es una lista
let listaValorGastos = [];
let listaTipoGastos = [];

let posicionModificacion = null;

//esta funcion se invoca cada vez que el usuario hace click en el boton Agregar Gasto
function clickBoton(){
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = parseFloat(document.getElementById('valorGasto').value);
    let tipoGasto = document.getElementById('tipoGasto').value;
    if (posicionModificacion !== null) {
        // Actualizar el gasto existente
        listaNombreGastos[posicionModificacion] = nombreGasto;
        listaValorGastos[posicionModificacion] = valorGasto;
        listaTipoGastos[posicionModificacion] = tipoGasto;
        
        // Cambiar el botón de nuevo a "Agregar Gasto" después de la actualización
        document.getElementById('botonFormulario').innerHTML = 'Agregar Gasto';
        
        // Reiniciar el índice de modificación
        posicionModificacion = null;
    } else {
        // Agregar nuevo gasto
        listaNombreGastos.push(nombreGasto);
        listaValorGastos.push(valorGasto);
        listaTipoGastos.push(tipoGasto);
    }

    mensajeAlerta(valorGasto);
    actualizarListaGastos();
}

function actualizarListaGastos(){
    const listaElementos= document.getElementById('listaDeGastos');
    const totalElementos= document.getElementById('totalGastos');
    let htmlLista='';
    let totalGastos=0;
    listaNombreGastos.forEach((elemento, posicion)=>{
        const valorGasto= listaValorGastos[posicion];
        const tipoGasto = listaTipoGastos[posicion];
        htmlLista += `<li>${elemento} - USD ${valorGasto.toFixed(2)} - Tipo: ${tipoGasto}
        <button id="boton2Formulario" onclick="ant_modificarGasto(${posicion})">Modificar</button>
        <button id="boton1Formulario" onclick="eliminarGasto(${posicion})">Eliminar</button>        
        </li>`
        //Calculamos el total de gastos
        totalGastos += valorGasto;

    }) 

    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML=totalGastos.toFixed(2);
    limpiar();

}

function mensajeAlerta(valor){
    if (valor>150){
        alert("¡Alerta! El gasto ingresado supera los 150 dolares");
    }
}

function eliminarGasto(posicion){
    listaNombreGastos.splice(posicion,1);
    listaValorGastos.splice(posicion,1);
    listaTipoGastos.splice(posicion,1);
    actualizarListaGastos();
}

function ant_modificarGasto(posicion){
    document.getElementById('nombreGasto').value = listaNombreGastos[posicion];
    document.getElementById('valorGasto').value = listaValorGastos[posicion];
    document.getElementById('tipoGasto').value = listaTipoGastos[posicion];
    
    // Guardar la posición del gasto a modificar
    posicionModificacion = posicion;

    // Cambiar el texto del botón a "Actualizar Gasto"
    document.getElementById('botonFormulario').innerHTML = 'Actualizar Gasto';
}

function limpiar(){
    document.getElementById('nombreGasto').value='';
    document.getElementById('valorGasto').value='';
    document.getElementById('tipoGasto').value = '';
}

