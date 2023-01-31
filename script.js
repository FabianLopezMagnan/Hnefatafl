var selectedPiece;
var turn = "blanca";//rojo o blanca son igual a las clases de las fichas
var tipo = null;
var inicio = null;
var tableCells = document.querySelectorAll("td");

window.onload = function() {
  //CARGAR REY
  // const F6 = document.getElementById("F6");
  // F6.innerHTML = '<div class="rey pieza negra">&#9818;</div>'
  // Obtener todas las celdas de la tabla
  var tableCells = document.querySelectorAll("td.celda");

  //Iterar sobre las celdas  FICHAS NEGRAS
  for (var i = 0; i < tableCells.length; i++) {
    // Verificar si la celda tiene una ficha
    // if (tableCells[i].id === "B1" || tableCells[i].id === "C1") {
    if (tableCells[i].id === "D6" || tableCells[i].id === "E5" || tableCells[i].id === "E6" || tableCells[i].id === "E7" || tableCells[i].id === "F4" || tableCells[i].id === "F5" || tableCells[i].id === "F8" || tableCells[i].id === "F7" || tableCells[i].id === "G5" || tableCells[i].id === "G6" || tableCells[i].id === "G7" || tableCells[i].id === "H6") {
      // Crear una nueva pieza y agregarla a la celda
      var newPiece = document.createElement("div");
      newPiece.classList.add("peon");
      newPiece.classList.add("pieza");
      newPiece.classList.add("negra");
      newPiece.innerHTML = "&#9821;";
      tableCells[i].appendChild(newPiece);
    }
  }
  // Iterar sobre las celdas FICHAS BLANCAS
  for (var i = 0; i < tableCells.length; i++) {
    // Verificar si la celda tiene una ficha
    // if (tableCells[i].id === "A2" || tableCells[i].id === "A3") {
    if (tableCells[i].id === "A4" || tableCells[i].id === "A5" || tableCells[i].id === "A6" || tableCells[i].id === "A7" || tableCells[i].id === "A8" || tableCells[i].id === "B6" || tableCells[i].id === "D1" || tableCells[i].id === "D11" || tableCells[i].id === "E1" || tableCells[i].id === "E11" || tableCells[i].id === "F1" || tableCells[i].id === "F2" || tableCells[i].id === "F10" || tableCells[i].id === "F11" || tableCells[i].id === "G1" || tableCells[i].id === "G11" || tableCells[i].id === "H1" || tableCells[i].id === "H11" || tableCells[i].id === "J6" || tableCells[i].id === "K4" || tableCells[i].id === "K5" || tableCells[i].id === "K6" || tableCells[i].id === "K7" || tableCells[i].id === "K8") {
      // Crear una nueva pieza y agregarla a la celda
      var newPiece = document.createElement("div");
      newPiece.classList.add("peon");
      newPiece.classList.add("pieza");
      newPiece.classList.add("blanca");
      newPiece.innerHTML = "&#9815;";
      tableCells[i].appendChild(newPiece);
    }
  }
}
function handleClick1(event) {
  // Obtenemos el elemento que se hizo clic
  var ficha = event.target;

  // Si el elemento clicado es una pieza de ajedrez y además pertenece al jugador que tiene el turno
  if (ficha.classList.contains("pieza") && ficha.classList.contains(turn)) {
    // Asignamos la pieza seleccionada a la variable selectedPiece
    selectedPiece = ficha;
    // definimos una variable para el tipo de ficha
    if (ficha.classList.contains("peon")) {
      tipo = "peon";
    } else {
      tipo = "rey";
    }
    // Obtenemos la celda actual de la pieza seleccionada
    var currentCell = ficha.parentElement;
    inicio = currentCell;
    // Almacenamos la ID de la celda actual en el atributo personalizado "currentCell" de la pieza seleccionada.
    selectedPiece.dataset.currentCell = currentCell.id;
  }
}
function handleClick2(event) {
  // Verificamos si hay una pieza seleccionada
  if (selectedPiece) {
    // Obtenemos el elemento que se hizo clic
    var destino = event.target;
    // Si el elemento clicado está vacío (no tiene piezas dentro)
    if (!destino.innerHTML) {
      if (tipo == "peon") {
        if (validateMovement(inicio, destino) == true) {
          console.log("Movimiento Validado");
          // Obtenemos la celda anterior de la pieza seleccionada a partir de su atributo personalizado "currentCell"
          var previousCell = document.getElementById(selectedPiece.dataset.currentCell);
          // Verificamos que la nueva celda sea diferente a la celda anterior
          if (destino !== previousCell) {
            // Movemos la pieza seleccionada a la nueva celda
            destino.appendChild(selectedPiece);
            // Actualizamos el atributo personalizado "currentCell" de la pieza seleccionada con la ID de la nueva celda.
            selectedPiece.dataset.currentCell = destino.id;
            // Limpiamos la pieza seleccionada
            selectedPiece = null;
            //validamos si se genera una captura
            validateCapture(destino, turn);
            // Cambiamos el turno entre blanco y negra
            if (turn == "negra") {
              turn = "blanca";
            }
            else {
              turn = "negra";
            }
          }
        }
        else {
          console.log("invalido");
        }
        //limpiamos el tipo de pieza seleccionado
        tipo = null;
        selectedPiece = null;
        inicio = null;
      }
      else if (tipo == "rey") { //rey
        console.log(tipo);
        // Obtenemos la celda anterior de la pieza seleccionada a partir de su atributo personalizado "currentCell"
        var previousCell = document.getElementById(selectedPiece.dataset.currentCell);
        // Verificamos que la nueva celda sea diferente a la celda anterior
        if (destino !== previousCell) {
          // Movemos la pieza seleccionada a la nueva celda
          destino.appendChild(selectedPiece);
          // Actualizamos el atributo personalizado "currentCell" de la pieza seleccionada con la ID de la nueva celda.
          selectedPiece.dataset.currentCell = destino.id;
          // Limpiamos la pieza seleccionada
          selectedPiece = null;
          // Cambiamos el turno entre blanco y negra
          // if (turn == "negra") {
          //   turn = "blanca";
          // }
          // else {
          //   turn = "negra";
          // }
        }
      }
    }
  }
}
for (var i = 0; i < tableCells.length; i++) {
  tableCells[i].addEventListener("click", handleClick1);
  tableCells[i].addEventListener("click", handleClick2);
}
//Funcion para validar movimiento de fichas
function validateMovement(ficha, destino) {
  // console.log(ficha.id);
  // console.log(destino.id);
  ficha = ficha.id;
  destino = destino.id;
  if (destino == "A1" || destino == "A11" || destino == "K11" || destino == "K1" || destino == "F6") {
    return false;
  }
  //obtener las coordenadas
  var fromRow = ficha.charAt(0);
  var fromCol = parseInt(ficha.substring(1));
  var toRow = destino.charAt(0);
  var toCol = parseInt(destino.substring(1));
  if ((fromRow != toRow && fromCol != toCol)) {
    // No es un movimiento válido de torre
    return false;
  }
  // validar movimiento horizontal
  if (fromRow === toRow) {
    // validar que el movimiento sea en la misma fila
    var row = fromRow.charCodeAt(0);
    if (fromCol < toCol) {
      // validar movimiento hacia la derecha
      for (var i = fromCol + 1; i < toCol; i++) {
        var id = String.fromCharCode(row) + i;
        // aquí deberías verificar si hay alguna otra ficha en el camino
        var element = document.getElementById(id);
        if (element === null) {
          // No hay elemento con el ID especificado
          return false;
        }
        // continuar con el código que verifica si hay ficha o no
        var hasPiece = element.innerHTML.length;
        // console.log("CELDA: " + id + "\n+" + hasPiece);
        if (hasPiece != 0) {
          // Hay una pieza en el camino
          return false;
        } else if (hasPiece = null) {
          return false;
        }
      }
    } else {
      // validar movimiento hacia la izquierda
      for (var i = fromCol - 1; i > toCol; i--) {
        var id = String.fromCharCode(row) + i;
        // aquí deberías verificar si hay alguna otra ficha en el camino
        var element = document.getElementById(id);
        if (element === null) {
          // No hay elemento con el ID especificado
          return false;
        }
        // continuar con el código que verifica si hay ficha o no
        var hasPiece = element.innerHTML.length;
        // console.log("CELDA: " + id + "\n+" + hasPiece);
        if (hasPiece != 0) {
          // Hay una pieza en el camino
          return false;
        } else if (hasPiece = null) {
          return false;
        }
      }
    }
  }
  // validar movimiento vertical
  if (fromCol === toCol) {
    // validar que el movimiento sea en la misma columna
    if (fromRow.charCodeAt(0) < toRow.charCodeAt(0)) {
      // validar movimiento hacia abajo
      for (var i = fromRow.charCodeAt(0) + 1; i < toRow.charCodeAt(0); i++) {
        var id = String.fromCharCode(i) + fromCol;
        // aquí deberías verificar si hay alguna otra ficha en el camino
        var element = document.getElementById(id).innerHTML.length;
        // console.log("CELDA: " + id + "\n+" + element);
        if (element != 0) {
          // Hay una pieza en el camino
          return false;
        }
      }
    } else {
      // validar movimiento hacia arriba
      for (var i = fromRow.charCodeAt(0) - 1; i > toRow.charCodeAt(0); i--) {
        var id = String.fromCharCode(i) + fromCol;
        // aquí deberías verificar si hay alguna otra ficha en el camino
        var element = document.getElementById(id).innerHTML.length;
        // console.log("CELDA: " + id + "\n+" + element);
        if (element != 0) {
          // Hay una pieza en el camino
          return false;
        }
      }
    }
  }
  // Si todas las verificaciones anteriores pasaron, entonces el movimiento es válido
  return true;
}
//Funcion que valida las capturas de fichas peones
function validateCapture(destino, color) {
  var position = destino.id;
  // console.log(position);
  var y = position.charAt(0);
  var x = parseInt(position.substring(1));

  //FICHA SIGUIENTE ARRIBA//////////////////////////////////////////////////////////////
  var letraAnumero = (y.charCodeAt(0) - 1)
  var idArriba = (String.fromCharCode(letraAnumero) + x);
  var elementoHTML = document.getElementById(idArriba);
  if (validateCeld(elementoHTML)) {//Verificar que sea una CELDA
    console.log("Validacion de celda");
    var elemento = elementoHTML.firstChild;
    if (elemento != null) {//CELDA VACIA
      if (elemento.classList.contains("negra")) {
        // console.log("Celda Arriba: " + idArriba + "\n" + elementoHTML.innerHTML);
        if (color == "blanca") {
          var letraAnumero2 = (y.charCodeAt(0) - 2)
          var idArriba2 = (String.fromCharCode(letraAnumero2) + x);
          var elementoHTML = document.getElementById(idArriba2);
          if (validateCeld(elementoHTML)) {//Verificar que sea una CELDA
            var elemento = elementoHTML.firstChild;
            if (elemento != null) {//CELDA NO VACIA
              if (elemento.classList.contains("blanca")) {
                console.log("CAPTURA DE PIEZA: " + idArriba);
                document.getElementById(idArriba).innerHTML = "";//Se elimina pieza
              }
            }
            else {
              if (idArriba2 == "A1") {
                console.log("Aqui estoy A1 ARRIBA");
              }
              else if (idArriba2 == "K11") {
                console.log("Aqui estoy K11 ARRIBA");
              }
              else if (idArriba2 == "F6") {
                console.log("TRONO ARRIBA");
              }
            }
          }
        }
      }
      else {
        // console.log("Celda Arriba: " + idArriba + "\n" + elementoHTML.innerHTML);
        if (color == "negra") {//preguntamos si es el turno de las negras
          var letraAnumero2 = (y.charCodeAt(0) - 2)
          var idArriba2 = (String.fromCharCode(letraAnumero2) + x);
          var elementoHTML = document.getElementById(idArriba2);
          if (validateCeld(elementoHTML)) {//Verificar que sea una CELDA
            var elemento = elementoHTML.firstChild;
            if (elemento != null) {//CELDA NO VACIA
              if (elemento.classList.contains("negra")) {// si la ficha al otro extremo es negra tambien se captura
                console.log("CAPTURA DE PIEZA: " + idArriba);
                document.getElementById(idArriba).innerHTML = "";//Se elimina pieza
              }
            }
            else {
              if (idArriba2 == "A1") {
                console.log("Aqui estoy A1 ARRIBA");
                document.getElementById(idArriba).innerHTML = ""
              }
              else if (idArriba2 == "K11") {
                document.getElementById(idArriba).innerHTML = ""
                console.log("Aqui estoy K11 ARRIBA");
              }
              else if (idArriba2 == "F6") {
                console.log("TRONO ARRIBA");
              }
            }
          }
        }
      }
    }
  }
  else {
    console.log("VACIO ARRIBA")
  }
  //FICHA SIGUIENTE ABAJO////////////////////////////////////////////////////////////////
  var letraAnumero = (y.charCodeAt(0) + 1)
  var idAbajo = (String.fromCharCode(letraAnumero) + x);
  var elementoHTML = document.getElementById(idAbajo);
  if (validateCeld(elementoHTML)) {//Verificar que sea una CELDA
    // console.log("Validacion de celda");
    var elemento = elementoHTML.firstChild;
    if (elemento != null) {//CELDA VACIA
      if (elemento.classList.contains("negra")) {
        // console.log("Celda Abajo: " + idAbajo + "\n" + elementoHTML.innerHTML);
        if (color == "blanca") {
          var letraAnumero2 = (y.charCodeAt(0) + 2)
          var idAbajo2 = (String.fromCharCode(letraAnumero2) + x);
          var elementoHTML = document.getElementById(idAbajo2);
          if (validateCeld(elementoHTML)) {//Verificar que sea una CELDA
            var elemento = elementoHTML.firstChild;
            if (elemento != null) {//CELDA NO VACIA
              if (elemento.classList.contains("blanca")) {
                console.log("CAPTURA DE PIEZA: " + idAbajo);
                document.getElementById(idAbajo).innerHTML = "";//Se elimina pieza
              }
            }
            else {
              if (idAbajo2 == "K1") {
                console.log("Aqui estoy K1 ABAJO");
                document.getElementById(idAbajo).innerHTML = ""
              }
              else if (idAbajo2 == "K11") {
                document.getElementById(idAbajo).innerHTML = ""
                console.log("Aqui estoy K11 ABAJO");
              }
              else if (idAbajo2 == "F6") {
                console.log("TRONO ABAJO");
              }
            }
          }
        }
      }
      else {
        // console.log("Celda Abajo: " + idAbajo + "\n" + elementoHTML.innerHTML);
        if (color == "negra") {//preguntamos si es el turno de las negras
          var letraAnumero2 = (y.charCodeAt(0) + 2)
          var idAbajo2 = (String.fromCharCode(letraAnumero2) + x);
          var elementoHTML = document.getElementById(idAbajo2);
          if (validateCeld(elementoHTML)) {//Verificar que sea una CELDA
            var elemento = elementoHTML.firstChild;
            if (elemento != null) {//CELDA NO VACIA
              if (elemento.classList.contains("negra")) {// si la ficha al otro extremo es negra tambien se captura
                console.log("CAPTURA DE PIEZA: " + idAbajo);
                document.getElementById(idAbajo).innerHTML = "";//Se elimina pieza
              }
            }
            else {
              if (idAbajo2 == "K1") {
                console.log("Aqui estoy K1 ABAJO");
                document.getElementById(idAbajo).innerHTML = ""
              }
              else if (idAbajo2 == "K11") {
                document.getElementById(idAbajo).innerHTML = ""
                console.log("Aqui estoy K11 ABAJO");
              }
              else if (idAbajo2 == "F6") {
                console.log("TRONO ABAJO");
              }
            }
          }
        }
      }
    }
  }
  else {
    console.log("VACIO ABAJO")
  }
  //FICHA DERECHA////////////////////////////////////////////////////////////////////
  var idDerecha = y + "" + (x + 1);
  var elementoHTML = document.getElementById(idDerecha);
  if (validateCeld(elementoHTML)) {//Verificar que sea una CELDA
    // console.log("Validacion de celda");
    var elemento = elementoHTML.firstChild;
    if (elemento != null) {//CELDA VACIA
      if (elemento.classList.contains("negra")) {
        // console.log("Celda Derecha: " + idDerecha + "\n" + elementoHTML.innerHTML);
        if (color == "blanca") {
          var idDerecha2 = y + "" + (x + 2);
          var elementoHTML = document.getElementById(idDerecha2);
          if (validateCeld(elementoHTML)) {//Verificar que sea una CELDA
            var elemento = elementoHTML.firstChild;
            if (elemento != null) {//CELDA NO VACIA
              if (elemento.classList.contains("blanca")) {
                console.log("CAPTURA DE PIEZA: " + idDerecha);
                document.getElementById(idDerecha).innerHTML = "";//Se elimina pieza
              }
            }
            else {
              if (idDerecha2 == "A11") {
                console.log("Aqui estoy A11 DERECHA");
                document.getElementById(idDerecha).innerHTML = ""
              }
              else if (idDerecha2 == "K11") {
                document.getElementById(idDerecha).innerHTML = ""
                console.log("Aqui estoy K11 DERECHA");
              }
              else if (idDerecha2 == "F6") {
                console.log("TRONO DERECHA");
              }
            }
          }
        }
      }
      else {
        // console.log("Celda Derecha: " + idDerecha + "\n" + elementoHTML.innerHTML);
        if (color == "negra") {//preguntamos si es el turno de las negras
          var idDerecha2 = y + "" + (x + 2);
          var elementoHTML = document.getElementById(idDerecha2);
          if (validateCeld(elementoHTML)) {//Verificar que sea una CELDA
            var elemento = elementoHTML.firstChild;
            if (elemento != null) {//CELDA NO VACIA
              if (elemento.classList.contains("negra")) {// si la ficha al otro extremo es negra tambien se captura
                console.log("CAPTURA DE PIEZA: " + idDerecha);
                document.getElementById(idDerecha).innerHTML = "";//Se elimina pieza
              }
            }
            else {
              if (idDerecha2 == "A11") {
                console.log("Aqui estoy A11 DERECHA " + idDerecha2);
                console.log(y + x)
                document.getElementById(idDerecha).innerHTML = ""
              }
              else if (idDerecha2 == "K11") {
                document.getElementById(idDerecha).innerHTML = ""
                console.log("Aqui estoy K11 DERECHA");
              }
              else if (idDerecha2 == "F6") {
                console.log("TRONO DERECHA");
              }
            }
          }
        }
      }
    }
  }
  else {
    console.log("VACIO Derecha")
  }
  //FICHA IZQUIERDA//////////////////////////////////////////////////////////////////////////////////////
  var idIzquierda = y + "" + (x - 1);
  var elementoHTML = document.getElementById(idIzquierda);
  if (validateCeld(elementoHTML)) {//Verificar que sea una CELDA
    // console.log("Validacion de celda");
    var elemento = elementoHTML.firstChild;
    if (elemento != null) {//CELDA VACIA
      if (elemento.classList.contains("negra")) {
        // console.log("Celda Izquierda: " + idIzquierda + "\n" + elementoHTML.innerHTML);
        if (color == "blanca") {
          var idIzquierda2 = y + "" + (x - 2);
          var elementoHTML = document.getElementById(idIzquierda2);
          if (validateCeld(elementoHTML)) {//Verificar que sea una CELDA
            var elemento = elementoHTML.firstChild;
            if (elemento != null) {//CELDA NO VACIA
              if (elemento.classList.contains("blanca")) {
                console.log("CAPTURA DE PIEZA: " + idIzquierda);
                document.getElementById(idIzquierda).innerHTML = "";//Se elimina pieza
              }
            }
            else {
              if (idIzquierda2 == "A1") {
                console.log("Aqui estoy A1 IZQUIERDA");
                document.getElementById(idIzquierda).innerHTML = ""
              }
              else if (idIzquierda2 == "K1") {
                document.getElementById(idIzquierda).innerHTML = ""
                console.log("Aqui estoy K1 IZQUIERDA");
              }
              else if (idIzquierda2 == "F6") {
                console.log("TRONO IZQUIERDA");
              }
            }
          }
        }
      }
      else {
        // console.log("Celda Izquierda: " + idIzquierda + "\n" + elementoHTML.innerHTML);
        if (color == "negra") {//preguntamos si es el turno de las negras
          var idIzquierda2 = y + "" + (x + 2);
          var elementoHTML = document.getElementById(idIzquierda2);
          if (validateCeld(elementoHTML)) {//Verificar que sea una CELDA
            var elemento = elementoHTML.firstChild;
            if (elemento != null) {//CELDA NO VACIA
              if (elemento.classList.contains("negra")) {// si la ficha al otro extremo es negra tambien se captura
                console.log("CAPTURA DE PIEZA: " + idIzquierda);
                document.getElementById(idIzquierda).innerHTML = "";//Se elimina pieza
              }
            }
            else {
              if (idIzquierda2 == "A1") {
                console.log("Aqui estoy A1 IZQUIERDA");
                document.getElementById(idIzquierda).innerHTML = ""
              }
              else if (idIzquierda2 == "K1") {
                document.getElementById(idIzquierda).innerHTML = ""
                console.log("Aqui estoy K1 IZQUIERDA");
              }
              else if (idIzquierda2 == "F6 IZQUIERDA") {
                console.log("TRONO");
              }
            }
          }
        }
      }
    }
  }
  else {
    console.log("VACIO IZQUIERDA")
  }
}
//Funcion que valida que existe una celda.
function validateCeld(elementoHTML) {
  if (elementoHTML != null) {
    return true;
  }
  return false;
}