var calificaciones = [];
var maxCalif = 0;
var intCalif = 0;
var tempCalif = guardarCalificacion;

function iniciar() {
	identificaPlataforma();
	switch (idioma) {
		case "ENG":
			jq360("#btnRevisar").text("Check"); //ic("Check"
			jq360("#btnReiniciar").text("Next attempt"); //ic("Next attempt")
			break;
		default:
			jq360("#btnRevisar").text("Revisar"); //ic("Revisar")
			jq360("#btnReiniciar").text("Siguiente intento"); //ic("Próximo intento"
	}
	jq360('#btnRevisar').show();
	jq360('#btnReiniciar').hide();
	if (elementosPorSegmento < reactivosMostrar) { // los botones de paginas...
		if (carruselContinuo) {
			jq360(".cPaginador.cProximo").removeClass("invisible").addClass("visible");
			jq360(".cPaginador.cPrevio").removeClass("invisible").addClass("visible");
		}
		else {
			jq360(".cPaginador.cProximo").removeClass("invisible").addClass("visible");
		}
	}
	totalPreguntas = reactivosMostrar;
	seleccion();
}

function seleccion() {
	jq360('.opciones > .opcion > label').click(function () {
		var padre = jq360(this).parent().parent();
		jq360(padre).find('label').removeClass('elegida');
		jq360(this).addClass('elegida');
		jq360(padre).parent().addClass('contestada');
	});
}
function revisar() {
	var reactivos = jq360('.reactivos > .reactivo');
	jq360(reactivos).removeClass('vacio');
	var numReactivos = jq360(reactivos).length;
	var elegidas = jq360('.reactivos > .reactivo .opciones > .opcion label.elegida');
	var numElegidas = jq360(elegidas).length;
	if (numReactivos == numElegidas) {
		jq360("input[type='radio']").prop('disabled', true);
		calificar();
		revisaBuenas();
	}
	else {
		jq360('.reactivos > .reactivo:not(.contestada)').addClass('vacio');
		mostrarMensaje(2, 3);
	}
}

function calificar() {
	jq360('#btnRevisar').hide();
	jq360('#btnReiniciar').show();
	jq360('.reactivos > .reactivo').each(function (i, reactivo) {
		var elegida = jq360(reactivo).find('label.elegida');
		var resp = jq360(elegida).attr('data-respuesta');
		if (resp == "true") {
			jq360(elegida).addClass('bien');
		}
		else {
			jq360(elegida).addClass('mal');
		}
		if (mostrarRetroIndividual) {
			console.log('RETRO ESPECIFICA POR RESPUESTA');
			jq360(elegida).prevAll('.pulso').show();
		}
		else {
			console.log('MOSTRAR RETRO GENERICA ACIERTO/ERROR');
			if (resp == 'true') {
				jq360(reactivo).find('> .OK').show();
			}
			else {
				jq360(reactivo).find('> .noOK').show();
			}
		}
	});
	intentos++;
}

function revisaBuenas() {
	correctas = jq360(".bien").length;
	// var res = Math.floor(10 * correctas / totalPreguntas);
	// var res = correctas;


	var res = 0;
	if (typeof (califXaciertos) === 'undefined') { califXaciertos = true; }
	res = (califXaciertos) ? correctas : Math.floor(10 * correctas / totalPreguntas);


	switch (idioma) {
		case "ENG":
			var txtResp = (correctas == 1) ? "right answer" : "right answers";
			mostrarEval((esMobil ? "" : "info"), "Result", "You have gotten " + correctas + " " + txtResp + " of " + totalPreguntas + ".<br/><br/>" + asignarEvaluacion(correctas));
			break;
		default:
			mostrarEval("", "Resultado", "Obtuviste " + correctas + "/" + totalPreguntas + " respuestas correctas." + "<br/><br/>" + asignarEvaluacion(res));
	}
	console.log("evaluacion " + correctas + " " + txtResp + " :--: " + totalPreguntas);
	calificaciones.push(correctas);
	intCalif = calificaciones[tempCalif];
	iniciaAmbienteScorm(ambSCORM, barraSCORM, idObjetivo);
	console.log("Int Calif: " + intCalif)
	for (var i = 0, len = calificaciones.length; i < len; i++) {
		if (maxCalif < calificaciones[i]) {
			maxCalif = calificaciones[i];
		}
	}

	if (guardarCalificacion == 0) { //ultimo intento
		guardaCalificacionScorm(ambSCORM, barraSCORM, idObjetivo, correctas, total);
	}

	if (guardarCalificacion == -1) { //intento mas alto
		guardaCalificacionScorm(ambSCORM, barraSCORM, idObjetivo, maxCalif, total);
	}

	if (guardarCalificacion > 0) {
		guardaCalificacionScorm(ambSCORM, barraSCORM, idObjetivo, intCalif, total);
	}
}

function reiniciar() {
	jq360('#btnRevisar').show();
	jq360('#btnReiniciar').hide();

	if (intentos < maxIntentos) {
		if (mezclarPorIntentos) {
			preguntas = [];
			respuestas = [];
			retro = [];
			indices = [];
			preg = [];
			respOriginales = [];
			respDesordenadas1 = [];
			respDesordenadas2 = [];
			totalSegmentos = 1;
			jq360(".row.reactivos").empty();
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
			if (elementosPorSegmento < reactivosMostrar) {
				paginar("cPrevio");
			}
			iniciaToolTip();
		}
		jq360('.pulso').hide();
		jq360('.reactivos > .reactivo').each(function (i, reactivo) {
			if (jq360(reactivo).find('.texto-respuesta.mal').length > 0) {
				jq360(reactivo).find('.texto-respuesta').removeClass('mal elegida');
				jq360(reactivo).find('input').prop('disabled', false)
				jq360(reactivo).removeClass('contestada');
			}
			if (siguienteIntentoBlanco) {
				jq360(reactivo).find('.texto-respuesta').removeClass('bien elegida');
				jq360(reactivo).find('input').prop('disabled', false)
				jq360(reactivo).removeClass('contestada');
			}
		});
	}
	else {
		mostrarMensaje(1);
	}
}

function quitarAcentos(str) {
	str = str.replace(/^\s+|\s+$/g, ''); // trim
	str = str.toLowerCase();
	// remove accents, swap ñ for n, etc
	var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;"; //Le tengo que quitar que elimine la coma, para que la comparacion funcione	var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;"; 
	var to = "aaaaeeeeiiiioooouuuunc------"; // RAAR, Ago13,18, le agrego de nuevo la coma, funcionara?, por las clases para las casillas de respuesta....
	for (var i = 0, l = from.length; i < l; i++) {
		str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}
	str = str.replace(/[^a-z0-9 -|]/g, '') // remove invalid chars
		.replace(/\s+/g, '-') // collapse whitespace and replace by -
		.replace(/-+/g, '-'); // collapse dashes
	return str;
}//

function versionBrowser() {
	var nVer = navigator.appVersion;
	var nAgt = navigator.userAgent;
	var browserName = navigator.appName;
	var fullVersion = '' + parseFloat(navigator.appVersion);
	var majorVersion = parseInt(navigator.appVersion, 10);
	var platform = navigator.platform;
	var minorVersion, nameOffset, verOffset, ix, cad1, cad2;

	//	nAgt = "Mozilla/5.0 (iPad; CPU OS 9_3_5 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) OPiOS/14.0.0.104835 Mobile/13G36 Safari/9537.53";  //OPERA
	//	nAgt = "Mozilla/5.0 (iPad; CPU OS 9_3_5 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) FxiOS/8.1.1b4948 Mobile/13G36 Safari/601.1.46";  //Firefox
	//	nAgt = "Mozilla/5.0 (iPad; CPU OS 9_3_5 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) CriOS/60.0.3112.89 Mobile/13G36 Safari/601.1.46";  //Chrome
	//	
	//	platform = "iPad";
	if (platform == "iPad") {
		// firefox - FxiOS substring de userAgent FxiOS/8.1.1b4948
		// chrome  - CriOS substring de userAgent CriOS/60.0.3112.89
		// opera   - OPiOS substring de userAgent OPiOS/14.0.0.104835
		cad1 = nAgt.substring(nAgt.lastIndexOf("iOS") - 2);
		cad2 = cad1.split(" ");
		browserName = cad2[0].substring(0, cad2[0].lastIndexOf("/"));
		if (browserName == "CriOS") { browserName = "Chrome" };
		if (browserName == "FxiOS") { browserName = "Firefox" };
		if (browserName == "OPiOS") { browserName = "Opera" };
		fullVersion = cad2[0].substring(cad2[0].lastIndexOf("/") + 1);
	}
	else {
		cad1 = nAgt.substring(nAgt.lastIndexOf(" ") + 1);
		// Edge, Firefox, Opera
		if (((cad1.indexOf("Edge")) != -1) || ((cad1.indexOf("Firefox")) != -1) || ((cad1.indexOf("OPR")) != -1)) {
			browserName = cad1.substring(0, cad1.indexOf("/"));
			if (browserName == "OPR") browserName = "Opera";
			fullVersion = cad1.substring(cad1.indexOf("/") + 1);
		}
		else {
			// Safari
			cad2 = nAgt.substring(nAgt.indexOf("Version"));
			if (((cad2.indexOf("Version")) != -1)) {
				browserName = cad2.substring(cad2.lastIndexOf(" ") + 1, cad2.lastIndexOf("/"));
				fullVersion = cad2.substring(cad2.indexOf("/") + 1, cad2.lastIndexOf(" "));
			}
			else {
				// Chrome
				cad2 = nAgt.substring(nAgt.indexOf("Chrome"));
				if (((cad2.indexOf("Chrome")) != -1)) {
					browserName = cad2.substring(cad2.indexOf("Chrome"), cad2.indexOf("/"));
					fullVersion = cad2.substring(cad2.indexOf("/") + 1, cad2.lastIndexOf(" "));
				}
				else {
					// Internet Explorer
					browserName = "Internet Explorer";
					fullVersion = cad2.substring(cad2.indexOf("rv") + 3, cad2.lastIndexOf(")"));
				}
			}
		}

		majorVersion = parseInt('' + fullVersion, 10);
		minorVersion = fullVersion.substring(fullVersion.indexOf(".") + 1);
		if (isNaN(majorVersion)) {
			fullVersion = '' + parseFloat(navigator.appVersion);
			majorVersion = parseInt(navigator.appVersion, 10);
			minorVersion = "";
		}
	}

	//	document.write(''
	//	 + '<p align="left">'
	//	 + browserName + '&nbsp' + fullVersion
	////	 + '<b>Browser name</b>  = ' + browserName + '<br>'
	////	 + '<b>Full version</b>  = ' + fullVersion + '<br>'
	////	 + '<b>Major version</b> = ' + majorVersion + '<br>'
	////	 + '<b>Minor version</b> = ' + minorVersion + '<br>'
	////	 + '<b>navigator.appVersion</b> = ' + nVer + '<br>'
	////	 + '<b>navigator.userAgent</b> = ' + nAgt + '<br>'
	////	 + '<b>Ultima cadena en userAgent</b> = ' + cad1 + '<br>'
	////	 + '<b>navigator.appName</b> = ' + navigator.appName + '<br>'
	//	)
	//	var OSName = "Unknown OS";
	//	if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
	//	if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
	//	if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
	//	if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";
	//	
	////	document.write('<b>OS:</b> ' + OSName + '<br>');
	////	document.write('<b>Platform:</b> ' + platform + '</p>');
	////document.title = browserName + ' ' + fullVersion;
	//	 + '</p><br>';
	var objSalida = { name: browserName, version: fullVersion };
	return objSalida;
}
function identificaPlataforma() {
	var nVer = navigator.appVersion;
	var nAgt = navigator.userAgent;
	var browserName = navigator.appName;
	var fullVersion = '' + parseFloat(navigator.appVersion);
	var majorVersion = parseInt(navigator.appVersion, 10);
	var platform = navigator.platform;/*
	jq360("#watermark").append("<b>appVersion:</b> " + nVer);
	jq360("#watermark").append("<br><b>userAgent:</b> " + nAgt);
	jq360("#watermark").append("<br><b>appName:</b> " + browserName);
	jq360("#watermark").append("<br><b>fullVersion:</b> " + fullVersion);
	jq360("#watermark").append("<br><b>majorVersion:</b> " + majorVersion);
	jq360("#watermark").append("<br><b>platform:</b> " + platform + "<br>");*/
	vBrowser = versionBrowser(); // la declaro global
	//alert (vBrowser.name + " " + vBrowser.version);
	if ("ontouchstart" in document.documentElement) {
		jq360("#watermark").append(vBrowser.name + " " + vBrowser.version + "<br>Dispositivo es Touch Screen<br>");
	}
	else {
		jq360("#watermark").append(vBrowser.name + " " + vBrowser.version + "<br>Dispositivo NO es Touch Screen<br>");
	}
}
