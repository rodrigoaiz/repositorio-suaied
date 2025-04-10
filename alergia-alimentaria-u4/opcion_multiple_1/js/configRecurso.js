/* configuracion
*/
var maxIntentos = 99;                 // número de intentos máximo para resolver el ejercicio
var siguienteIntentoBlanco = true; //

var elementosPorSegmento = 10 // elementos por segmento limita la visiblidad
var elementosPorSegmentoMovil = 10;
var reactivosMostrar = 10;            // número de reactivos a mostrar
if (reactivos.length < reactivosMostrar) {
	reactivosMostrar = reactivos.length;
}
var total = reactivosMostrar;

var mezclarPreguntas = false;         // true: mezcla preguntas; false NO mezcla preguntas, RAAR a partir de jun 12,18 mezcla todos los reactivos
var mezclarRespuestas = false;        // true: mezcla respuestas; false NO mezcla respuestas
var mezclarPorIntentos = true;

var mostrarRetroIndividual = false;  // true: muestra retro por pregunta individual; false: NO muestra retro por pregunta individual
// var mostrarRetroOpcionRespuesta = !mostrarRetroIndividual;  // Por cada arroba, true: muestra; false: NO muestra
var mostrarRetroFinal = true;       // true: muestra retro por aciertos; false: NO muestra retro

var ponerNumeral = true;     // Para poner o agregar numeros secuenciales al inicio de las las preguntas...
var ponerNumeroPreguntas = false; // cuantos preguntas son?, no necesariamente cuantas son visibles...
var numeralAlfabetico = false; //si queremos letras en vez de números, true.

var ponerNumeralRespuesta = true;     // Para poner o agregar numeros secuenciales al inicio de las las preguntas...
var numeralRespuestaAlfabetico = true; //si queremos letras en vez de números, true.

// var calificarEnTiempoReal = false; //si se quiere el despliegue de correcto/incorrecto al seleccionar...
var carruselContinuo = false; // si se quiere que los botonos previo y proximo no tengan pared TRUE, false para pared

var flechaArriba = false;          // true: muestra la flecha-arriba para moverse rápidamente al principio del recurso; false: no lo muestra

var retroCal = [
	{LimInf: 0, LimSup: 4, Mensaje: ["Revisa nuevamente la unidad.", "Insufficient"]}
	,{LimInf: 5, LimSup: 7, Mensaje: ["Hay aspectos que necesitas precisar.", "Sufficient"]},
  {LimInf: 8, LimSup: 9, Mensaje: ["¡Muy bien!", "Good"]}
	,{LimInf: 9, LimSup: 10, Mensaje: ["Excelente!", "Excellent"]}
];

var textoRetroGeneral= '';//'Texto independiente de calificacion'; no importando la calificación se puede poner un texto extra, '' para dejar en blanco

var ambSCORM = false;
var barraSCORM = false;
var idObjetivo = 0;

//Calificacion mas alta -1; Ultima calificacion 0, Calificacion de determinado intento #
var guardarCalificacion = 0;

var idioma = "ESP"; // ESP-Español, ENG-INGLES
var debug = false;

var verLongitud = false;  //true:ver longitud del texto ; false:omitir

var califXaciertos = true;   // true: se evalua por número de aciertos;  false: se evalua sobre 10
