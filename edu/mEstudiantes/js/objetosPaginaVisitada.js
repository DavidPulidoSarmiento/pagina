var myurlvisit = document.URL+"";

//var urlSite = 'http://192.168.2.183:8988/Application1-source-context-root/ajaxPages/';
//var urlSite = 'http://192.168.2.181/mhe/ajaxPages/';

function pageVisit(){
    	
    this.insertarPaginaVisitada = function(){
        aleatorio = Math.random()*1000000;
        var url = 'ajaxPages/insertarPaginaVisitada.jsp';
        pagina = myurlvisit;
        pagina = pagina.replace("&", "%26");
        pagina = pagina.replace("?", "%3F");
        pagina = pagina.replace("=", "%3D");
        
        var pars = 'pagina='+pagina+'&aler='+aleatorio+'';
		jQuery.ajax({
			url : url,		        
			type:'POST',
			data: { pagina:pagina,aler:aleatorio} ,
			success : function(datos) {
			}
		});    
        
    }
	
	this.consultarSillenoEncuenstaAca = function(){
        aleatorio = Math.random()*1000000;
        var url = 'ajaxPages/encuenstaAcaRealizada.jsp';
        var pars = 'aler='+aleatorio+'';
        var myAjax = new Ajax.Request(url,
            {method: 'post', parameters: pars, onSuccess : this.afterConsultarSillenoEncuenstaAca.bind(this)}
        );
    }
	
	this.afterConsultarSillenoEncuenstaAca = function(oReq, oJSN){
		if(oReq.responseText == 0){
			document.getElementById("msjGeneric").innerHTML = "Se�or(a) estudiante lo invitamos a llenar "+
			"la encuesta del proceso de registro academico.<br><br>"+
			"<a href='/encuestas/encuestaAcademica.jsp'>Click aqui para llenar la encuesta</a>"+
			"<br><br><a href='javascript:' onclick='document.getElementById(\"msjGeneric\").style.display = \"none\";'>Cerrar</a>"; 
			document.getElementById("msjGeneric").style.display = "block";
		}
	}
}

