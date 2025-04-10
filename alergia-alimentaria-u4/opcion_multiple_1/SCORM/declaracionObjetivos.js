/**
 * Created by adib on 13/11/14.
 */

var numObjetivosIniciar = 1;  //Aquí va el número de actividades

window.addEventListener("load", function(){
    var conexion = conectividadSCORM.initAPI();
    var totalDefinidos = conectividadSCORM.numDefinidos();
    if ( totalDefinidos > 0) {
    	//nda
    	console.log("declaracionObjetivos: definidos son " + totalDefinidos);
    }
	else {
    	var conexion = conectividadSCORM.iniciarScorm();
    	console.log("declaracionObjetivos: ", conexion);
    	if (conectividadSCORM.crearObjetivos(numObjetivosIniciar)) {
			conectividadSCORM.salvar();
			console.log("declaracionObjetivos: objetivos nuevos creados");
    	}
    }
    console.log("declaracionObjetivos: user: " + conectividadSCORM.getUsuario());//nueva
});
