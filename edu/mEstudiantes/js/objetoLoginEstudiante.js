var loginOBJ = new loginObjeto();

var myurl = document.URL+"";
var urlSite = myurl.substring(0,myurl.lastIndexOf("/"))+'/ajaxPages/';
var urlRoot = myurl.substring(0,myurl.lastIndexOf("/"))+'/';

//var urlSite = 'http://192.168.2.181/mhe/ajaxPages/';
//var urlRoot = 'http://192.168.2.181/mhe/';
var folderImagenes = "imagenes/";


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function loginObjeto(){
    
    this.validarLogin = function(cod, pass){
        aleatorio = Math.random()*75452;
        var url = urlSite+'validarLoginEst.jsp';
		pass = encode(pass);
        var pars = 'user='+cod+'&password='+pass+'&alea='+aleatorio;
		jQuery.ajax({
			url : url,		        
			type:'POST',
			data: { user:cod,password : pass, alea:aleatorio} ,
			success : function(datos) {
				mensaje = datos.trim();
        
				if(mensaje != 1){
					if(mensaje == 2){
						alert("Estimado estudiante, por el momento solo se encuentra disponible para el ingreso al m\xf3dulo,\n a los estudiantes que pueden realizar el horario de clases el d\xeda de hoy");
						document.getElementById("divCargando").style.display = "none";
						document.getElementById("entrarButton").disabled = false;
					}else if(mensaje == 3){
						alert("Lo sentimos, usted ya tiene m\xe1s de 19 cr\xe9ditos registrados.\n Podr\xe1 volver a ingresar al m\xf3dulo en fechas de ajuste al registro acad\xe9mico");
						document.getElementById("divCargando").style.display = "none";
						document.getElementById("entrarButton").disabled = false;
					}else if(mensaje == 4){
						document.location.href="/mEstudiantes/encuestaPISIS.html";
					}else{
						alert("Mensaje: "+mensaje);
						document.getElementById("divCargando").style.display = "none";
						document.getElementById("entrarButton").disabled = false;
					}					
				}else{
					document.location.href=afterLogin;
				}
			}
		});
      
    }  
}

function consultarDatosNormal(){
    document.getElementById("entrarButton").disabled = "disabled";
    cod = document.getElementById("user").value;
	/*if(cod.substring(0,5) == 20101){
		alert("Usted es un estudiante nuevo, los estudiantes nuevos no pueden hacer registro academico");
		return false;
	}*/
    pass = document.getElementById("password").value;
    document.getElementById("divCargando").style.display = "block";
    loginOBJ.validarLogin(cod,pass);
}

function consultarDatos(){
    document.getElementById("entrarButton").disabled = "disabled";
    cod = document.getElementById("user").value;
	if(cod == ''){
		alert("Ingrese su Código..");
		document.getElementById("entrarButton").disabled = false;
		return false;
	}
	pass = document.getElementById("password").value;
	if(pass == ''){
		alert("Ingrese su Clave..");
		document.getElementById("entrarButton").disabled = false;
		return false;
	}
	pass = trim(pass);
    pass = hex_md5(pass).toUpperCase();//encript
	document.getElementById("divCargando").style.display = "block";
    loginOBJ.validarLogin(cod,pass);
}



function encode(str) {
	var result = "";
	for (i = 0; i < str.length; i++) {
		if (str.charAt(i) == " ") result += " ";
		else result += str.charAt(i);
	}
	result = escape(result);
	while(result.indexOf("%F1") != -1 || result.indexOf("%D1") != -1 || result.indexOf("%A1") != -1){
		result = result.replace("%F1","�");
		result = result.replace("%D1","�");
		result = result.replace("%A1","�");
		
	}
	return result;
} 
function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}