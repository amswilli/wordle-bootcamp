const palabra = generarPalabraAleatoria();
const intentosMaximos = 6;
let intentosRestantes = intentosMaximos;

window.addEventListener('load', init);

function init() {
  console.log('La página se cargó correctamente.');
  const button = document.getElementById("guess-button");
  button.addEventListener("click", intentar);
}

function generarPalabraAleatoria() {
  const diccionario = ["APPLE", "HURLS", "WINGS", "YOUTH"];
  return diccionario[Math.floor(Math.random() * diccionario.length)];
}

function intentar() {
  const intento = leerIntento();
  if (intento.length !== 5) {
    alert("Por favor, ingresa exactamente 5 letras.");
    return;
  }
  console.log("Intento:", intento);
  evaluarIntento(intento);
}

function leerIntento() {
  return document.getElementById("guess-input").value.toUpperCase();
}

function evaluarIntento(intento) {
  let resultado = "";
  for (let i = 0; i < palabra.length; i++) {
    if (intento[i] === palabra[i]) {
      resultado += "<span class='correct-box'><span class='correct'>" + intento[i] + "</span></span>";
    } else if (palabra.includes(intento[i])) {
      resultado += "<span class='close-box'><span class='close'>" + intento[i] + "</span></span>";
    } else {
      resultado += "<span class='incorrect-box'><span class='incorrect'>" + intento[i] + "</span></span>";
    }
  }

  const grid = document.getElementById("grid");
  const row = document.createElement('div');
  row.className = 'row';
  row.innerHTML = resultado;

  grid.appendChild(row);

  intentosRestantes--;

  if (intento === palabra) {
    terminarJuego("<h1>¡GANASTE! 😃</h1>");
  } else if (intentosRestantes === 0) {
    terminarJuego("<h1>¡PERDISTE! 😔</h1>");
  }
}

function terminarJuego(mensaje) {
  const input = document.getElementById("guess-input");
  const button = document.getElementById("guess-button");

  input.disabled = true;
  button.disabled = true;

  const contenedor = document.getElementById('grid');
  const mensajeResultado = document.createElement('div');
  mensajeResultado.innerHTML = mensaje;
  contenedor.appendChild(mensajeResultado);
}
