/**
 * Created by Adib Abud Jaso on 20/11/14.
 */
if (conectividadSCORM !== undefined) {
        if (document.readyState === "complete") {
            var conexion = conectividadSCORM.initAPI();
            conectividadSCORM.actualizarBarra();
            console.log("barraDeInfo: barra ya había cargado");
        }
		else {
            console.log("barraDeInfo: agregó barra listener");
            window.addEventListener("load", function() {
                //var conexion = conectividadSCORM.conectarYComenzar(); //comentar
                var conexion = conectividadSCORM.initAPI(); //nueva
                //console.log("barraDeInfo.js -> ", conexion);
                //conectividadSCORM.salvar();
                conectividadSCORM.actualizarBarra();
                var MiSCORM = top.document.getElementById('scorm_object');
                if (MiSCORM != null) {
                    console.log("barraDeInfo: scorm_object ok");
                }
            });
        }
	}

conectividadSCORM.actualizarBarra = function(){
    var barraDeInformacion = null;
    //si el objeto no esta en el actual documento buscarlo en el padre (in frames)
    if (document.getElementById("barraNavegacion") != null) {
        barraDeInformacion = document.getElementById("barraNavegacion");
    }
	else {
        barraDeInformacion = window.document.getElementById("barraNavegacion");
    }//fin else
    
    var datos = conectividadSCORM.obtenerDatosAvance();
    var innerBarra = "<table class='tablaInfo'>";
    console.log("actualizarBarra: % -> " + datos.porcentaje);
    var actCompletas = "", actIncompletas = "", actNoHechas = "";

    for (var i = 0; i < datos.estados.length; i++) {
        switch (datos.estados[i]) {
            case "passed":
                actCompletas += "<td class='celdaBarra realizada'> </td>";
                break;
            case "incomplete":
                actIncompletas += "<td class='celdaBarra incompleta'> </td>";
                break;
            case "not attempted":
                actNoHechas += "<td class='celdaBarra noIntentada'> </td>";
                break;
            default:
                console.log("actualizarBarra: estado no reconocido en creación celdas en: ", datos.estados[i]);
        }
    }
    innerBarra += "<tr class='celdasVacias'><td colspan='" + datos.estados.length + "'> </td><td rowspan='3' class='celdaBarra porcentaje'>" + Math.round(datos.porcentaje) + "%</td></tr>";
    innerBarra += "<tr class='lineaProgreso'>" + actCompletas + actIncompletas + actNoHechas + "</tr>";
    innerBarra += "<tr><td class='celdaTextoBarra' colspan='" + datos.estados.length + "'>Barra de Avance</td></tr></table>";
    barraDeInformacion.innerHTML = innerBarra;
    
};