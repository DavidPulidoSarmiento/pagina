function validarEps(codigoEst){
	
	var valEps = jQuery('#selectEPS').val();
	console.log("valores :"+valEps);
	
	jQuery.ajax({
		url: 'ajaxPages/saveEps.jsp',
		type: "POST",
		data: "submit=&codigo="+codigoEst+"&valEps="+valEps,
		beforeSend: function(objeto){
			jQuery('#showMsg').hide();
			jQuery('#loading').show();
		},
		success: function(datos){
			console.log('respuesta: '+datos);		
			if(datos == 1){
				jQuery('#box2').animate({'top':'-300px'},500,function(){
					jQuery('#overlay2').fadeOut('fast');					
				});
			}else{
				jQuery('#loading').hide();
				alert('WE HAVE PROBLEMS, TRY AGAIN OR CONSULT WITH THE MANAGER');	
			}						
		},
		error: function(xml,datos){
			console.log("xml>>> "+xml);
			console.log("datos<<< "+datos);
			jQuery('#loading').hide();
			alert('******** ********* ******* WE HAVE PROBLEMS, TRY AGAIN OR CONSULT WITH THE MANAGER');
		}
	});
}



