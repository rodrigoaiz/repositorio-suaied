var preguntas = [];
var respuestas = [];
var retro = [];
var indices = [];
var preg = [];
var respOriginales = [];
var respDesordenadas1 = [];
var respDesordenadas2 = [];
// RAAR Estas las migre de configRecurso.js
var intentos = 0;
var correctas = 0;
var totalPreguntas = 0;
var totalSegmentos = 1;
var recorreSegmentos = 1; // por lo menos existe el primer segmento o sea el unico
var esMobil = false;

jq360(document).ready(function () {//RAAR Sep 13,18: Aqui arrancamos, me traigo esto de index.html
	if (window.name == "movil") { // validacion para el portal en DIONE
		esMobil = true;
	}
	else {
		esMobil = esPortable();
	}
	if (window.parent.data_crm) { //para el portal CRM, 
		mostrarRetroIndividual = true;
		mostrarRetroFinal = true;
		elementosPorSegmento = 3;
	}

	if (esMobil) {
		elementosPorSegmento = elementosPorSegmentoMovil;
		jq360(".info").show;
		jq360(".instrucciones").addClass("estilosinstruccion");
		jq360(".instrucciones").slideUp(1);
		invPregResp = true;
		if (jq360(".instrucciones").text().trim() == "") {
			jq360(".instrucciones").remove();
			jq360(".info").remove();
			jq360("hr.separador").remove();
		}
	}
	else {
		jq360(".info").hide();
	}

	jq360(".info").click(function () {
		if (jq360(this).hasClass("hiden")) {
			jq360(".instrucciones").slideUp(300);
			jq360(this).removeClass("hiden");
		}
		else {
			jq360(".instrucciones").slideDown(300);
			jq360(this).addClass("hiden");
		}
	});

	if (flechaArriba) {
		jq360('.ir-arriba').click(function () {
			jq360('body, html').animate({
				scrollTop: '0px'
			}, 300);
		});
		jq360(window).scroll(function () {
			if (jq360(this).scrollTop() > 0) {
				jq360('.ir-arriba').slideDown(300);
			}
			else {
				jq360('.ir-arriba').slideUp(300);
			}
		});
	}
	else {
		jq360('.ir-arriba').hide();
	}
	if (mezclarPreguntas) { reactivos.sort(function (a, b) { return 0.5 - Math.random() }); }
	if (mezclarRespuestas) {
		for (i = 0; i < reactivos.length; i++) { //aqui el ciclo es hasta numreactivos(=reactivosMostrar) por que las respuestas están en un mismo arreglo, pero desde aqui la lista de respuestas puede ser mayor...
			reactivos[i].A.sort(function (a, b) { return 0.5 - Math.random() });
		}
	};
	creaIndice();
	divideReactivos(reactivosMostrar);
	crearOpcionMultiple();
	iniciar();
	iniciaToolTip();
});

function escribeArreglo(arreglo) {
	for (i = 0; i < arreglo.length; i++) {
		for (var prop in arreglo[i]) {
			if (arreglo[i].hasOwnProperty(prop)) {
				document.writeln('<p style="text-align: left">' + prop + ' || ' + arreglo[i][prop] + '</p>');
			}
		}
	}
	document.writeln('<hr>');
}

function ic(c) {
	var x = c.length;
	var ci = "";
	while (x >= 0) {
		ci += c.charAt(x);
		x--;
	}
	return ci;
}

function creaIndice() {
	var i = 0;
	for (i = 0; i < reactivos.length; i++) {
		indices.push(i)
	}
	reordenaArreglo(indices);
}

function divideReactivos(numReactivos) {
	for (i = 0; i < numReactivos; i++) { //aqui el ciclo es hasta numreactivos(=reactivosMostrar) por que las respuestas están en un mismo arreglo, pero desde aqui la lista de respuestas puede ser mayor...
		preguntas.push({ txt1: "", txt2: "", ind: 0, listaResp: "", listaFA: "" });
		preguntas[i].txt1 = reactivos[i].Q;
		preguntas[i].txt2 = reactivos[i].F;
		preguntas[i].ind = indices[i];
		preguntas[i].listaResp = reactivos[i].A;
	}
	var enlaza = '';
	for (var i = 0; i < numReactivos; i++) {  // leo todos las respuestas de reactivos y concateno, ojo q va a haber pipes "|".
		enlaza += reactivos[i].A.join("|");
		if (i < numReactivos - 1) { enlaza += "|"; }
	}
}

function reordenaArreglo(arreglo) {
	arreglo.sort(function (a, b) { return 0.5 - Math.random() }); // es un funcion de comparacion, math. produce valores -1 a 1, y provoca azar...
}

function crearOpcionMultiple() {
	var palomita = "<i class='palomita fas fa-check-circle'></i>";
	var tache = "<i class='tache fas fa-times-circle'></i>";

	var cuentaPreguntasSegmento = 0;
	// var maxOpc = 0;

	var mapa = [];
	for (var i = 0; i < preguntas.length; i++) {
		mapa.push(preguntas[i].listaResp.length);
	}
	var maxOpc = Math.max.apply(Math, mapa);
	for (var i = 0; i < preguntas.length; i++) { // Armo las preguntas.....
		var preg = preguntas[i].txt1.split("@");
		var numeralPregunta = '';
		if (numeralAlfabetico) {
			numeralPregunta = (ponerNumeral ? String.fromCharCode(i + 65) : '') + ((ponerNumeral) ? '.&nbsp;&nbsp;' : '');  // JLBG, 2019, feb 21: ajusté espacios separadores cuando ponerNumeral es true		
		}
		else {
			numeralPregunta = (ponerNumeral ? (i + 1) : '') + (ponerNumeroPreguntas ? '/' + reactivosMostrar : '') + ((ponerNumeral) ? '.&nbsp;&nbsp;' : '');  // JLBG, 2019, feb 21: ajusté espacios separadores cuando ponerNumeral es true		
		}
		if (cuentaPreguntasSegmento == elementosPorSegmento) {
			cuentaPreguntasSegmento = 1;
			totalSegmentos++;
		}
		else {
			cuentaPreguntasSegmento++;
		}
		var textoRetroReactivoCorrecta = preguntas[i].txt2[0];
		var textoRetroReactivoIncorrecta = preguntas[i].txt2[1];
		var rCorrecta = '<div class="pulso OK" data-toggle="tooltip" data-placement="auto left" data-type="success" title="' + tam(textoRetroReactivoCorrecta, 1) + '">' + palomita + '</div>';
		var rIncorrecta = '<div class="pulso noOK" data-toggle="tooltip" data-placement="auto left" data-type="danger" title="' + tam(textoRetroReactivoIncorrecta, 1) + '">' + tache + '</div>';
		jq360('.reactivos').append('<div>');
		jq360('.reactivos div').last()
			.addClass('reactivo')
			.addClass('segmento' + totalSegmentos)
			.append(rCorrecta)
			.append(rIncorrecta)
			.append('<div class="pregunta">' + numeralPregunta + tam(preg[0], 1) + '</div>');

		var cuentaResp = preguntas[i].listaResp.length;
		if (cuentaResp > maxOpc) {
			maxOpc = cuentaResp;
		}
		if (maxOpc == 2) {
			nCol = 6;
		}
		else {
			if (maxOpc == 3) {
				nCol = 4;
			}
			else {
				nCol = 3;
			}
		}

		var numeralRespuesta = '';
		for (var j = 0; j < cuentaResp; j++) {
			var textoRetro = (preguntas[i].listaResp[j] == undefined ? '' : preguntas[i].listaResp[j].retro);
			if (preguntas[i].listaResp[j].correcta) {
				var retroCasilla = '<div class="pulso OK" data-toggle="tooltip" data-placement="auto left" data-type="success" title="' + tam(textoRetro, 1) + '">' + palomita + '</div>';
			}
			else {
				var retroCasilla = '<div class="pulso noOK" data-toggle="tooltip" data-placement="auto left" data-type="danger" title="' + tam(textoRetro, 1) + '">' + tache + '</div>';
			}

			var debugRespuesta = (debug ? ((preguntas[i].listaResp[j].correcta) ? '* ' : '') : '')
			if (numeralRespuestaAlfabetico) {
				numeralRespuesta = (ponerNumeralRespuesta ? String.fromCharCode(j + 97) : '') + ((ponerNumeralRespuesta) ? ')&nbsp;' : '');  // JLBG, 2019, feb 21: ajusté espacios separadores cuando ponerNumeral es true		
			}
			else {
				numeralRespuesta = (ponerNumeralRespuesta ? (j + 1) : '') + ((ponerNumeralRespuesta) ? ')&nbsp;' : '');  // JLBG, 2019, feb 21: ajusté espacios separadores cuando ponerNumeral es true		
			}

			if (j == 0) {
				jq360('.reactivos .reactivo').last()
					.append('<div>');
				jq360('.reactivos .reactivo div').last()
					.addClass('opciones')
					.addClass('row col-12 container grupo btn-group')
					.attr('role', 'group')
					.attr('aria-label', 'Basic radio toggle button group')
					;
			}
			jq360('.reactivos .reactivo .opciones').last()
				.append('<div>');
			jq360('.reactivos .reactivo .opciones div').last()
				.addClass('opcion');

			jq360('.reactivos .reactivo .opciones .opcion').last()
				// .addClass('col-12 col-sm-6 col-md-6 col-lg-3')
				.addClass('col-12 col-sm-6 col-md-6 col-lg-' + nCol)
				.append(retroCasilla + '<input type="radio" class="btn-check" name="opcion' + i + '" id="opcion' + i + j + '" autocomplete="off"/>')
				.append('<label>')
				// .append('<label class="texto-respuesta btn btn-outline-primary" for="opcion' + i + j + '" data-respuesta="' + preguntas[i].listaResp[j].correcta + '">' + debugRespuesta + numeralRespuesta + tam(reactivos[i].A[j].opcion, 1) + '</label>')
				;
			jq360('.reactivos .reactivo .opciones .opcion label').last()
				.addClass('texto-respuesta')
				.addClass('btn')
				.addClass('btn-outline-primary')
				.attr('for', 'opcion' + i + j)
				.attr('data-respuesta', preguntas[i].listaResp[j].correcta)
				.append(debugRespuesta + numeralRespuesta + tam(reactivos[i].A[j].opcion, 1))

		}
	}
	jq360(':root').css('--num-opciones', maxOpc);
	jq360('.pulso').hide();
	recorreSegmentos = 1; // el primer segmento a desplegar...

	jq360('.reactivo').hide();
	jq360(".segmento" + recorreSegmentos).show();

	if (totalSegmentos > recorreSegmentos) { // si solo hay una pagina no desplegamos paginador
		jq360("#btnPaginador").text("" + recorreSegmentos + " / " + totalSegmentos);
		jq360("#btnPaginador").removeClass("ocultar").addClass("mostrar");
	}
}

function tam(cad, n) {// 1T, 0ele.esc.ord Es para imprimir la longitud del texto indicado, crm=var global de impresion, n para apagar en caso particular...
	var txt = "";
	if (verLongitud == false) { txt = (n == 1) ? cad : "" } // i n diferente de 1 pone nada
	else {
		txt = "&nbsp;<sup>" + cad.length + "</sup>";
		if (n == 1) { txt = cad + txt }
	}
	return txt;
}

function mostrarMensaje(clase, recurso) { //RAAR ago 18,18: Pongo funcion reversa
	if (!recurso) { recurso = -1 }
	var msgs = [,
		["Arrastra todas las respuestas a los espacios correspondientes.", "Please, drag all answers to appropriate spaces"],  // completar arrastrando
		["Llena todos los campos de texto.", "Please, fill out all text fields"],                  // completar escribiendo
		["Contesta todas las preguntas.", "Please, answer all questions"],                         // verdadero-falso, opcion-multiple
		["Ordena todos los reactivos para conocer tu resultado.", "Please, sort all sentences"],   // ordenar enunciados
		["Elige una respuesta para cada recuadro.", "Please, choose an answer for each list"],     // completar eligiendo
		["Contesta todas las preguntas.", "Please, drag all answers to appropriate spaces"]  // lista de verificación, antes CAEsquema
	];
	var tipo = "";
	var tit = "";
	var msg = "";
	var btnOK = "";
	switch (clase) {
		case 1: // intentos;
			switch (idioma) {
				case "ENG":
					tit = "Warning";
					msg = "You have reached maximum number of attempts: " + maxIntentos + "."; // empiezo a quitar los espejos....abril 26 2018

					btnOK = "OK";
					break;
				default:
					tit = "Atención";
					msg = "Has alcanzado el máximo número de intentos: " + maxIntentos + ".";
					btnOK = "Aceptar";
			}
			break;
		case 2: // Contestar TODO
			//tipo = "warning";
			switch (idioma) {
				case "ENG":
					tit = "Warning";
					msg = msgs[recurso][1]; //recurso,1
					btnOK = "OK";
					break;
				default:
					tit = "Atención";
					msg = msgs[recurso][0];  //recurso,0
					btnOK = "Aceptar";
			}
			break;
		default:
			//tipo = "error";
			tit = "Error de sistema";
			msg = "Condición desconocida";
			btnOK = "Aceptar";
	}

	swal({ title: tit, text: msg, type: tipo, confirmButtonText: btnOK, closeOnConfirm: true, html: true });
}

function asignarEvaluacion(calificacion) {
	var mensaje = "";
	if (mostrarRetroFinal) {
		jq360.each(retroCal, function (indice) {
			if ((calificacion >= retroCal[indice].LimInf) && (calificacion <= retroCal[indice].LimSup)) {
				mensaje = (idioma == "ENG") ? retroCal[indice].Mensaje[1] : retroCal[indice].Mensaje[0];
			}
		});
	}
	mensaje = mensaje + '<br>' + textoRetroGeneral;
	return mensaje;
}

function mostrarEval(tipo, titulo, cadena) {
	switch (idioma) {
		case "ENG":
			//var btnOK = ic("KO");
			var btnOK = "OK";
			break;
		default:
			//var btnOK = ic("ratpecA");
			var btnOK = "Aceptar";
	}
	swal({ title: titulo, text: cadena, type: tipo, confirmButtonText: btnOK, closeOnConfirm: true, html: true });
}

function esPortable() {
	if (navigator.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/iPhone/i)
		// || navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i)
		|| navigator.userAgent.match(/Opera Mini/i)
		|| navigator.userAgent.match(/IEMobile/i)
	) {
		return true;
	}
	else {
		return false;
	}
}

function paginar(boton) {
	self = jq360("." + boton);
	jq360(".segmento" + recorreSegmentos).hide();
	if (jq360(self).hasClass('cProximo')) {
		if (carruselContinuo) {
			recorreSegmentos = (recorreSegmentos < totalSegmentos ? ++recorreSegmentos : 1);
		}
		else {
			recorreSegmentos = (recorreSegmentos < totalSegmentos ? ++recorreSegmentos : recorreSegmentos);
			if (recorreSegmentos < totalSegmentos) {
				jq360(".cPaginador.cPrevio").removeClass("invisible").addClass("visible");
			}
			else {
				jq360(self).removeClass("visible").addClass("invisible");
				jq360(".cPrevio").removeClass("invisible").addClass("visible");
			}
		}
	}
	else {
		if (carruselContinuo) {
			recorreSegmentos = (recorreSegmentos > 1 ? --recorreSegmentos : totalSegmentos);
		}
		else {
			recorreSegmentos = (recorreSegmentos > 1 ? --recorreSegmentos : 1);
			if (recorreSegmentos > 1) {
				jq360(".cPaginador.cProximo").removeClass("invisible").addClass("visible");
			}
			else {
				jq360(self).removeClass("visible").addClass("invisible");
				jq360(".cProximo").removeClass("invisible").addClass("visible");
			}
		}
	}
	jq360(".segmento" + recorreSegmentos).show();
	jq360("#btnPaginador").text(recorreSegmentos + " / " + totalSegmentos);
};

function iniciaToolTip() {
	jq360('[data-toggle="tooltip"]').each(function () {
		var options = {
			html: true,
		};

		if (jq360(this)[0].hasAttribute("data-type")) {
			options["template"] =
				'<div class="tooltip ' +
				jq360(this).attr("data-type") +
				'" role="tooltip">' +
				'	<div class="tooltip-arrow"></div>' +
				'	<div class="tooltip-inner"></div>' +
				"</div>";
		}
		jq360(this).tooltip(options);
	});
}
