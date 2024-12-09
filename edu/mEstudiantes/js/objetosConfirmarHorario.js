

var myurl = document.URL+"";
var urlSite = myurl.substring(0,myurl.lastIndexOf("/"))+'/';
var urlRoot = myurl.substring(0,myurl.lastIndexOf("/"))+'/';

//var urlSite = 'http://192.168.2.183:8988/Application1-source-context-root/ajaxPages/';
//var urlSite = 'http://192.168.2.181/mhe/ajaxPages/';


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function confirmarHorario(){
    
    this.respuesta = null;
    
    this.insertarConfirmacion = function(decision){
        this.respuesta = decision;
        document.getElementById("divCargando").style.display = "block";
        document.getElementById("botonYES").disabled = true;
        document.getElementById("botonNO").disabled = true;
        aleatorio = Math.random()*1000000;
        var urlx = urlSite+'ajaxPages/insertarConfirmarHorario.jsp';
        var parsx = 'desicion='+decision+'&aler='+aleatorio+'';
       /* var myAjax = new Ajax.Request(url,
            {method: 'get', parameters: pars, onSuccess : this.llenarArray.bind(this)}
        );*/
         
        jQuery.ajax({
			 url : urlx,
			type : 'POST',
			data : 'submit=&desicion='+decision+'&aler='+aleatorio+'',
			
			success : function(datosOBJ) {
				console.log("valor de decision: "+decision);
				//datosOBJ = eval(datos.responseText);
					if(datosOBJ == 1){
						if(decision == "S"){
							document.getElementById("divCargando").innerHTML = "<br><b>Se guardo satisfactoriamente tu eleccion. en 5 segundos podras ver tus notas.</b>";
							setTimeout("location.href='miNotas.jsp'",5000);
						}else{
							document.getElementById("divCargando").innerHTML = "<br><b>Se guardo satisfactoriamente su eleccion, favor dirigirse a su Direccion de Programa e informar su inconformidad con el horario de clases, la cual debera ser radicada en correspondencia y guardada por usted como soporte.</b>";
						}
					}else{
						document.getElementById("botonYES").disabled = false;
						document.getElementById("botonNO").disabled = false;
						document.getElementById("divCargando").innerHTML = "No se pudo guardar tu eleccion. vuelva a intentarlo. Si no acerquese a Admisiones Registro y Control Academico y comente esta situacion";
					}
			}
		});
    }
    
    this.llenarArray = function(oReq, oJSN){
        datosOBJ = eval(oReq.responseText);
        if(datosOBJ == 1){
            if(this.respuesta == "S"){
                document.getElementById("divCargando").innerHTML = "<br><b>Se guardo satisfactoriamente tu eleccion. en 5 segundos podras ver tus notas.</b>";
                setTimeout("location.href='miNotas.jsp'",5000);
            }else{
                document.getElementById("divCargando").innerHTML = "<br><b>Se guardo satisfactoriamente su eleccion, favor dirigirse a su Direccion de Programa e informar su inconformidad con el horario de clases, la cual debera ser radicada en correspondencia y guardada por usted como soporte.</b>";
            }
        }else{
            document.getElementById("botonYES").disabled = false;
            document.getElementById("botonNO").disabled = false;
            document.getElementById("divCargando").innerHTML = "No se pudo guardar tu eleccion. vuelva a intentarlo. Si no acerquese a Admisiones Registro y Control Academico y comente esta situacion";
        }
    }
	
}

