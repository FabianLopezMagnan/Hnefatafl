var selectedPiece;
window.onload = function() {
  //CARGAR REY
  const F6 = document.getElementById("F6");
  F6.innerHTML = '<div id="rey" class="pieza rojo">&#9818;</div>'
  // Obtener todas las celdas de la tabla
  var tableCells = document.querySelectorAll("td.celda");

  //Iterar sobre las celdas  FICHAS ROJAS
  for (var i = 0; i < tableCells.length; i++) {
    // Verificar si la celda tiene una ficha
    if (tableCells[i].id === "D6" || tableCells[i].id === "E5" || tableCells[i].id === "E6" || tableCells[i].id === "E7" || tableCells[i].id === "F4" || tableCells[i].id === "F5" || tableCells[i].id === "F8" || tableCells[i].id === "F7" || tableCells[i].id === "G5" || tableCells[i].id === "G6" || tableCells[i].id === "G7" || tableCells[i].id === "H6") {
      // Crear una nueva pieza y agregarla a la celda
      var newPiece = document.createElement("div");
      newPiece.classList.add("peon");
      newPiece.classList.add("pieza");
      newPiece.classList.add("rojo");
      newPiece.innerHTML = "&#9821;";
      tableCells[i].appendChild(newPiece);
    }
  }
  // Iterar sobre las celdas FICHAS AZULES
  for (var i = 0; i < tableCells.length; i++) {
    // Verificar si la celda tiene una ficha
    if (tableCells[i].id === "A4" || tableCells[i].id === "A5" || tableCells[i].id === "A6" || tableCells[i].id === "A7" || tableCells[i].id === "A8" || tableCells[i].id === "B6" || tableCells[i].id === "D1" || tableCells[i].id === "D11" || tableCells[i].id === "E1" || tableCells[i].id === "E11" || tableCells[i].id === "F1" || tableCells[i].id === "F2" || tableCells[i].id === "F10" || tableCells[i].id === "F11" || tableCells[i].id === "G1" || tableCells[i].id === "G11" || tableCells[i].id === "H1" || tableCells[i].id === "H11" || tableCells[i].id === "J6" || tableCells[i].id === "K4" || tableCells[i].id === "K5" || tableCells[i].id === "K6" || tableCells[i].id === "K7" || tableCells[i].id === "K8") {
      // Crear una nueva pieza y agregarla a la celda
      var newPiece = document.createElement("div");
      newPiece.classList.add("peon");
      newPiece.classList.add("pieza");
      newPiece.classList.add("azul");
      newPiece.innerHTML = "&#9815;";
      tableCells[i].appendChild(newPiece);
    }
  }
};

function handleClick1(event) {
  var clickedElement = event.target;

  if (clickedElement.classList.contains("pieza")) {
    selectedPiece = clickedElement;
    var currentCell = clickedElement.parentElement;
    selectedPiece.dataset.currentCell = currentCell.id;
  }
}
function handleClick2(event) {
  if (selectedPiece) {
    var clickedElement = event.target;

    if (!clickedElement.innerHTML) {
      var previousCell = document.getElementById(selectedPiece.dataset.currentCell);
      if (clickedElement !== previousCell) {
        clickedElement.appendChild(selectedPiece);
        selectedPiece.dataset.currentCell = clickedElement.id;
        selectedPiece = null;
      }
    }
  }
}
// Asignar las funciones de manejo de clicks a los elementos de la tabla
var tableCells = document.querySelectorAll("td");
for (var i = 0; i < tableCells.length; i++) {
  tableCells[i].addEventListener("click", handleClick1);
  tableCells[i].addEventListener("click", handleClick2);
}