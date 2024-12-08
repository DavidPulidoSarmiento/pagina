function tablas(){
    
    this.datosOBJ = null;
    this.tablaID = null;
    this.columnasNames = {};
    this.columnasAlign = {};
    this.classtd1 = "";
    this.classtd2 = "";
    
    this.desplegar = function(){
        var tbl = document.getElementById(this.tableID);
	var iMax = this.datosOBJ.length - 1;
	for(i=iMax;i>=0;i--){
            if(i%2==0){
                estilo = this.classtd1;
            }else{
                estilo = this.classtd2;
            }
            row = tbl.insertRow(1);
            row.id = "rowTableDetalle"+i;
            dato = this.datosOBJ[i];
            for(j=0;j<columnasNames.legth;j++){
                td = row.insertCell(0);
                td.innerHTML = dato[columnasNames[j]];
                td.className = estilo;
                td.align = this.columnasAlign[j];
            }
            td = row.insertCell(0);
	}
    }
}
function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}
function verificarDatos(){
	newPass = document.getElementById("newPass").value;
	confirPass = document.getElementById("confirmPass").value;
	devolver = false;
	if(newPass.indexOf("�") != -1 || newPass.indexOf("�") != -1 || newPass.indexOf("�") != -1 || newPass.indexOf("�") != -1 || newPass.indexOf("�") != -1 || newPass.indexOf("�") != -1 || newPass.indexOf("�") != -1 ||newPass.indexOf("�") != -1 || newPass.indexOf("�") != -1 || newPass.indexOf("�") != -1 || newPass.indexOf("'") != -1 || newPass.indexOf("�") != -1 || newPass.indexOf("�") != -1 || newPass.indexOf("[") != -1 || newPass.indexOf("]") != -1 || newPass.indexOf("?") != -1 || newPass.indexOf("�") != -1 || newPass.indexOf("&") != -1 || newPass.indexOf("#") != -1){
		document.getElementById("newDisplay").innerHTML = "La contrase�a no puede contener los siguientes caracteres <b style='color: red;'>[ ] � ? # & � � ' � � � � � � � � � � </b>";
		return false;
	}else{
		document.getElementById("newDisplay").innerHTML = "";
		devolver = true;
	}
	if(newPass.length < 5){
		document.getElementById("newDisplay").innerHTML = "La contrase�a debe tener minimo 5 caracteres";
		return false;
	}else{
		document.getElementById("newDisplay").innerHTML = "";	
		devolver = true;
	}
	if(verificarPassword()<2){
		alert("Las contrase�as debe estar m�nimo en el grupo regular, que se presenta en los Niveles de seguridad.\n El nivel de seguridad se consigue usando m�nimo LETRAS Y N�MEROS");
		document.getElementById("confirmDisplay").innerHTML = "Las contrase�as debe estar m�nimo en el grupo regular, que se presenta en los Niveles de seguridad.";
		return false;
	}else{
		document.getElementById("confirmDisplay").innerHTML = "";
		devolver = true;
	}
	
	if(newPass != confirPass){
		document.getElementById("confirmDisplay").innerHTML = "Las contrase�as no coinciden";
		return false;
	}else{
		document.getElementById("confirmDisplay").innerHTML = "";
		devolver = true;
	}
	
	return devolver;
}

function verificarPassword(){
	var str = document.getElementById("newPass").value;
	var result = "";
	var charEspe = "\"=@-+*/_,;.:!�%{}()*$& ";
	var booMayu = false;
	var booMinu = false;
	var booMuns = false;
	var booEspe = false;
	var dificultad = 0;
	if(str.length == 0){
		dificultad = 0;
	}else if(str.length >= 5){
		booMayu = str.match(/[a-z]/);
		if(booMayu){dificultad++;}
		booMinu = str.match(/[A-Z]/);
		if(booMinu){dificultad++;}
		booMuns = str.match(/\d+/);
		if(booMuns){dificultad++;}
		booEspe = false;
		for (i = 0; i < str.length; i++) {
			for(j=0;j<charEspe.length;j++){
				if(!booEspe){
					if(charEspe.charAt(j) == str.charAt(i)){
						booEspe = true;
						break;
					}
				}else{break;}
			}
		}
		if(booEspe){dificultad++;}
	}else{
		dificultad = 1;
	}
	switch(dificultad){
		case 0:
			document.getElementById("barImg").style.width = "1%";
			document.getElementById("barName").innerHTML = "Escribe la nueva contrase�a";
			break;
		case 1:
			document.getElementById("barImg").style.width = "25%";
			document.getElementById("barName").innerHTML = "Nivel de seguridad - Mala";
			break;
		case 2:
			document.getElementById("barImg").style.width = "50%";
			document.getElementById("barName").innerHTML = "Nivel de seguridad - Regular";
			break;
		case 3:
			document.getElementById("barImg").style.width = "75%";
			document.getElementById("barName").innerHTML = "Nivel de seguridad - Buena";
			break;
		case 4:
			document.getElementById("barImg").style.width = "100%";
			document.getElementById("barName").innerHTML = "Muy buena";
			break;
	}
	return dificultad;
}

function ayreMaeAjax(){
	
	this.infoColumns = [];
	this.infoData = [];
	this.parienteRes = "";
	this.parienteUid = 0;

    this.sessinesIniciadas = function(){
        aleatorio = Math.random()*1000000;
        var url = 'ajaxPages/visitasHoy.jsp';
        var pars = '&alea='+aleatorio;
        var myAjax = new Ajax.Request(url,
            {method: 'post', parameters: pars, onSuccess : this.afterSessinesIniciadas.bind(this)}
        );
    }
	
	this.afterSessinesIniciadas = function(oReq, oJSN){
        jdatosDia = eval('('+oReq.responseText+')');
		this.infoColumns = [];
		this.infoData = [];
		//alert(jdatosDia.length+"");
		for(i=0;i<jdatosDia.length;i++){
			rowData = jdatosDia[i];
			//alert(rowData["HORA"]+ ": "+rowData["ESTU"]);
			this.infoColumns.push(rowData["HORA"]);
			this.infoData.push(parseInt(rowData["ESTU"]));
		}
		//alert(this.infoData+"");
		graficarArea(this.infoColumns,this.infoData,"Total de accesos al modulo del dia de hoy","chartDivSessionDia",[30,0,20,50],["A las: ","estudiantes entraron"],[536,198],"Entradas al modulo",false);
    }
	
	this.tendenciasDia = function(oop){
        aleatorio = Math.random()*1000000;
        var url = 'ajaxPages/tendenciasAcceso.jsp';
        var pars = 'op='+oop+'&alea='+aleatorio;
        var myAjax = new Ajax.Request(url,
            {method: 'post', parameters: pars, onSuccess : this.afterTendenciasDia.bind(this)}
        );
    }
	
	this.afterTendenciasDia = function(oReq, oJSN){
		var aa = 0;
        var jdatosDia = eval('('+oReq.responseText+')');
		infoColumns = [];
		infoData = [];
		var i = 0;
		for(i=0;i<jdatosDia.length;i++){
			var rowData = jdatosDia[i];
			infoColumns.push(rowData["HORA"]);
			infoData.push(parseInt(rowData["ESTU"]));
		}
		graficarColumms(infoColumns,infoData,"Accesos al modulo por dia","chartDivPerDia",[30,0,20,50],"accesos",[420,200],"Accesos",false);
    }
	
	this.tendenciasMes = function(oop){
        aleatorio = Math.random()*1000000;
        var url = 'ajaxPages/tendenciasAcceso.jsp';
        var pars = 'op='+oop+'&alea='+aleatorio;
        var myAjax = new Ajax.Request(url,
            {method: 'post', parameters: pars, onSuccess : this.afterTendenciasMes.bind(this)}
        );
    }
	
	this.afterTendenciasMes = function(oReq, oJSN){
		var aa = 0;
        var jdatosDia = eval('('+oReq.responseText+')');
		infoColumns = [];
		infoData = [];
		var i = 0;
		for(i=0;i<jdatosDia.length;i++){
			var rowData = jdatosDia[i];
			infoColumns.push(rowData["HORA"]);
			infoData.push(parseInt(rowData["ESTU"]));
		}
		graficarColumms(infoColumns,infoData,"Accesos al modulo por mes","chartDivPerMes",[30,0,20,50],"accesos",[420,200],"Accesos",false);
    }
	
	this.tendenciasHora = function(oop){
        aleatorio = Math.random()*1000000;
        var url = 'ajaxPages/tendenciasAcceso.jsp';
        var pars = 'op='+oop+'&alea='+aleatorio;
        var myAjax = new Ajax.Request(url,
            {method: 'post', parameters: pars, onSuccess : this.afterTendenciasHora.bind(this)}
        );
    }
	
	this.afterTendenciasHora = function(oReq, oJSN){
		var aa = 0;
        var jdatosDia = eval('('+oReq.responseText+')');
		infoColumns = [];
		infoData = [];
		var i = 0;
		for(i=0;i<jdatosDia.length;i++){
			var rowData = jdatosDia[i];
			infoColumns.push(rowData["HORA"]);
			infoData.push(parseInt(rowData["ESTU"]));
		}
		graficarColumms(infoColumns,infoData,"Accesos al modulo por hora","chartDivPerHora",[30,0,20,50],"accesos",[850,300],"Accesos",false);
    }
	
	this.recordarContrasena = function(){
        aleatorio = Math.random()*1000000;
		var codtt = document.getElementById("codText").value;
		if(codtt.length != 8 && codtt.length != 10 && codtt.length != 11){
			alert("Escriba el codigo completo");
			return;
		}
		document.getElementById('divRecordarClave').innerHTML = "<img src='/imagenes/loading2.gif'>"
        var url = 'autoCorreo/claveEstudiante.jsp';
        var pars = 'cod='+codtt+'&alea='+aleatorio;
        var myAjax = new Ajax.Updater('divRecordarClave',url,
            {method: 'post', parameters: pars, encoding: 'ISO-8859-1'}
        );
    }
	this.recordarContrasena2 = function(){
        aleatorio = Math.random()*1000000;
		var codtt = document.getElementById("codText").value;
		var doctt = document.getElementById("docText").value;
		if(codtt.length != 8 && codtt.length != 9 && codtt.length != 10 && codtt.length != 11){
			alert("Escriba el codigo completo");
			return;
		}
		if(doctt === 'escribe tu documento' || doctt === ''){
			alert("Escriba su n�mero de documento que presenta registrado en el sistema");
			return;
		}
		document.getElementById('divRecordarClave').innerHTML = "<img src='/imagenes/loading2.gif'>"
        var url = 'autoCorreo/linkClaveEstudiante.jsp';
        var pars = 'cod='+codtt+'&doc='+doctt+'&alea='+aleatorio;
		
		
		jQuery.ajax({
			url : url,		        
			type:'POST',
			data: { cod:codtt,doc : doctt, alea:aleatorio} ,
			success : function(datos) {
				mensaje = datos.trim();
				document.getElementById('divRecordarClave').innerHTML = mensaje;
			}
		});
    }
	
	this.respoderSolicitud = function(uid,res){
        aleatorio = Math.random()*1000000;	
		this.parienteRes = res;
		this.parienteUid = uid;
        var url = 'ajaxPages/responderPariente.jsp';
        var pars = 'uid='+uid+'&res='+res+'&alea='+aleatorio;
		
		jQuery.ajax({
			type: 'GET',
			url: 'ajaxPages/responderPariente.jsp?uid='+uid+'&res='+res+'&alea='+aleatorio,
			success: function(msg){
				//resp = oReq.responseText;
				if(msg == 1){
					jQuery("#tr"+this.parienteUid).show();//Effect.toggle('tr'+this.parienteUid, 'appear', { delay: 0.5 });			
				}else{
					alert(msg+"");
				}
			}
		});
		
        /*var myAjax = new Ajax.Request(url,
            {method: 'post', parameters: pars, onSuccess : this.afterRespoderSolicitud.bind(this)}
        );*/
    }
	
	this.afterRespoderSolicitud = function(oReq, oJSN){
        resp = oReq.responseText;
		if(resp == 1){
			Effect.toggle('tr'+this.parienteUid, 'appear', { delay: 0.5 });			
		}else{
			alert(resp+"");
		}
    }
}

var opc = -1;

function mostrarCertificacion(){
	if(opc == -1){
		jQuery("#divCertifico").modal();
		//document.getElementById("divCertifico").style.display = "block";
		document.getElementById("user").blur();
	}
}
function mostrarIns(){
		document.getElementById("divIns").style.display = "block";
}
function cerrar(){
	document.getElementById("divIns").style.display = "none";
}
function certifico(op){
	opc = op;
	if(op==1){
		document.getElementById("password").readOnly = false;
		jQuery("#divCertifico").modal("hide");
		jQuery("#user").focus();
	}else{
		document.getElementById("password").readOnly = true;
		jQuery("#divCertifico").modal("hide");		
		VKI_show(document.getElementById("password"));
	}
}

////////////////////////////////////////////////////////////////////////////////
// permite cambiar el contenido de un textBox y el estilo
function cambiarValorEstiloTextBox(idtextBox,op,msj){
    textBox = document.getElementById(idtextBox);
    switch(op){
        case 1:
            if(textBox.value == msj)
            textBox.value = "";
            textBox.className = "textBox1n";
            break;
        case 2:
            if(textBox.value.length == 0){
                textBox.className = "textBox1i";
                textBox.value = msj;
            }
            break;
    }
}

divMenuActivo = 1;

function changeCat(mod){
	if(divMenuActivo == mod){
		return;
	}
	vectorTdMenu = ["","td-","tdA","tdN"];
	vectorWinMenuDiv = ["","h-","hA","hN"];
	
	divOcultar = document.getElementById(vectorWinMenuDiv[divMenuActivo]);
	divMostrar = document.getElementById(vectorWinMenuDiv[mod]);
	divOcultar.style.display = "none";
	divMostrar.style.display = "block";
	
	tdApagar = document.getElementById(vectorTdMenu[divMenuActivo]);
	tdEncender = document.getElementById(vectorTdMenu[mod]);
	tdApagar.className = "parientesCatOff";
	tdEncender.className = "parientesCatOn";
	divMenuActivo = mod;
}

function changeCatFoto(mod){
	if(divMenuActivo == mod){
		return;
	}
	vectorTdMenu = ["","td-","tdA","tdN","tdC"];
	vectorWinMenuDiv = ["","h-","hA","hN", "hC"];
	
	divOcultar = document.getElementById(vectorWinMenuDiv[divMenuActivo]);
	divMostrar = document.getElementById(vectorWinMenuDiv[mod]);
	divOcultar.style.display = "none";
	divMostrar.style.display = "block";
	
	//tdApagar = document.getElementById(vectorTdMenu[divMenuActivo]);
	//tdEncender = document.getElementById(vectorTdMenu[mod]);
	//tdApagar.className = "parientesCatOff";
	//tdEncender.className = "parientesCatOn";
	divMenuActivo = mod;
}

function no_imagen(imgE){
	imgE.src = "imagenes/nofoto.jpg";
} 

function removeAllChilds(a){
	var a = document.getElementById(a);
	while(a.hasChildNodes()){
		a.removeChild(a.firstChild);
	}
}