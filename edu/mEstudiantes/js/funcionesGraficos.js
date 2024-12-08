infoData = [];
infoColumns = [];
function calcularDatosToPie(culumna,pref,condicion){
	infoTemp = {};
	infoColumns = [];
	infoData = [];
	for(i=0;i<datosEnviar["DATOS"].length;i++){
		rowData = datosEnviar["DATOS"][i];
		//alert(rowData["ESTADO"]);
		if(condicion != null){
			switch(condicion["CONDICION"]){
				case "==":
					if(rowData[condicion["CAMPO"]] == condicion["DATO"]){
						if(infoTemp[pref+rowData[culumna]] == null){
							infoTemp[pref+rowData[culumna]] = 1;
							infoColumns.push(pref+rowData[culumna]);
						}else{
							infoTemp[pref+rowData[culumna]] = infoTemp[pref+rowData[culumna]]+1;
						}
					}
					break;
				case "!=":
					if(rowData[condicion["CAMPO"]] != condicion["DATO"]){
						if(infoTemp[pref+rowData[culumna]] == null){
							infoTemp[pref+rowData[culumna]] = 1;
							infoColumns.push(pref+rowData[culumna]);
						}else{
							infoTemp[pref+rowData[culumna]] = infoTemp[pref+rowData[culumna]]+1;
						}
					}
					break;
				case ">=":
					if(rowData[condicion["CAMPO"]] >= condicion["DATO"]){
						if(infoTemp[pref+rowData[culumna]] == null){
							infoTemp[pref+rowData[culumna]] = 1;
							infoColumns.push(pref+rowData[culumna]);
						}else{
							infoTemp[pref+rowData[culumna]] = infoTemp[pref+rowData[culumna]]+1;
						}
					}
					break;
			}
		}else{
			if(infoTemp[pref+rowData[culumna]] == null){
				infoTemp[pref+rowData[culumna]] = 1;
				infoColumns.push(pref+rowData[culumna]);
			}else{
				infoTemp[pref+rowData[culumna]] = infoTemp[pref+rowData[culumna]]+1;
			}
		}
		
	}
	infoColumns.sort();
	for(i=0;i<infoColumns.length;i++){
		infoData.push([ infoColumns[i],infoTemp[infoColumns[i]] ])
	}
}

function calcularDatosToColumn(culumna,pref,condicion){
	infoTemp = {};
	infoColumns = [];
	infoData = [];
	for(i=0;i<datosEnviar["DATOS"].length;i++){
		rowData = datosEnviar["DATOS"][i];
		if(condicion != null){
			switch(condicion["CONDICION"]){
				case "==":
					if(rowData[condicion["CAMPO"]] == condicion["DATO"]){
						if(infoTemp[pref+rowData[culumna]] == null){
							infoTemp[pref+rowData[culumna]] = 1;
							infoColumns.push(pref+rowData[culumna]);
						}else{
							infoTemp[pref+rowData[culumna]] = infoTemp[pref+rowData[culumna]]+1;
						}
					}
					break;
				case "!=":
					if(rowData[condicion["CAMPO"]] != condicion["DATO"]){
						if(infoTemp[pref+rowData[culumna]] == null){
							infoTemp[pref+rowData[culumna]] = 1;
							infoColumns.push(pref+rowData[culumna]);
						}else{
							infoTemp[pref+rowData[culumna]] = infoTemp[pref+rowData[culumna]]+1;
						}
					}
					break;
				case ">=":
					if(rowData[condicion["CAMPO"]] >= condicion["DATO"]){
						if(infoTemp[pref+rowData[culumna]] == null){
							infoTemp[pref+rowData[culumna]] = 1;
							infoColumns.push(pref+rowData[culumna]);
						}else{
							infoTemp[pref+rowData[culumna]] = infoTemp[pref+rowData[culumna]]+1;
						}
					}
					break;
			}
		}else{
			if(infoTemp[pref+rowData[culumna]] == null){
				infoTemp[pref+rowData[culumna]] = 1;
				infoColumns.push(pref+rowData[culumna]);
			}else{
				infoTemp[pref+rowData[culumna]] = infoTemp[pref+rowData[culumna]]+1;
			}
		}
		
	}
	infoColumns.sort();
	for(i=0;i<infoColumns.length;i++){
		infoData.push(infoTemp[infoColumns[i]])
	}
}


function desplegarGrafico(idDivs){
	document.getElementById("generarDiv"+idDivs).style.display = 'none';
	document.getElementById("contentDiv"+idDivs).style.display = 'block';
}
function cerrarGrafico(idDivs){
	document.getElementById("contentDiv"+idDivs).style.display = 'none';
	document.getElementById("generarDiv"+idDivs).style.display = 'block';
}

function graficarPie(jsdata,jstitle,jsDiv,jsmargin,jsDesctip,jswh){
	var chart;
	jQuery(document).ready(function() {
		chart = new Highcharts.Chart({
			chart: {
				renderTo: jsDiv,
				margin: jsmargin,
				width: jswh[0],
				height: jswh[1]
			},
			title: {
				text: jstitle
			},
			plotArea: {
				shadow: null,
				borderWidth: null,
				backgroundColor: null
			},
			tooltip: {
				formatter: function() {
					return '<b>'+ this.point.name +'</b>: '+ this.y +' '+jsDesctip;
				}
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						formatter: function() {
							if (this.y > 5) return this.point.name;
						},
						color: 'white',
						style: {
							font: '12px Verdana'
						}
					}
				}
			},
			legend: {
				layout: 'vertical',
				labelFormatter: function() {
					return this.name+' '+ this.y;
				},
				style: {
					left: 'auto',
					bottom: 'auto',
					right: '20px',
					top: '20px'
				}
			},
			credits: {
				enabled: false
			},
			series: [{
				type: 'pie',
				name: 'Browser share',
				data: jsdata
			}]
		});
	});
}

function graficarColumms(jsCategoris,jsdata,jstitle,jsDiv,jsmargin,jsDesctip,jswh,jsyTitle,jsShowLegend){
	var chart;
	jQuery(document).ready(function() {
		chart = new Highcharts.Chart({
			chart: {
				renderTo: jsDiv,
				margin: jsmargin,
				width: jswh[0],
				height: jswh[1],
				defaultSeriesType: 'column'
			},
			title: {
				text: jstitle
			},
			plotArea: {
				shadow: null,
				borderWidth: null,
				backgroundColor: null
			},
			tooltip: {
				formatter: function() {
					return '<b>'+ this.x +'</b>: '+ this.y +' '+jsDesctip;
				}
			},
			xAxis: {
				categories: jsCategoris
			},
			yAxis: {
				min: 0,
				title: {
					text: jsyTitle
				}
			},
			plotOptions: {
				column: {
					pointPadding: 0.2,
					borderWidth: 0
				}
			},
			legend: {
				layout: 'vertical',
				backgroundColor: '#FFFFFF',
				align: 'left',
				verticalAlign: 'top',
				enabled:jsShowLegend,
				x: 100,
				y: 70
			},
			credits: {
				enabled: false
			},
			series: [{
				name: jstitle,
				data: jsdata
			}]
		});
	});
}

function graficarArea(jsCategoris,jsdata,jstitle,jsDiv,jsmargin,jsDesctip,jswh,jsyTitle,jsShowLegend){
	var chart;
	jQuery(document).ready(function() {
		chart = new Highcharts.Chart({
			chart: {
				renderTo: jsDiv,
				margin: jsmargin,
				width: jswh[0],
				height: jswh[1],
				defaultSeriesType: 'area',
				borderWidth: 0,
				plotBorderWidth: 0
			},
			title: {
				text: jstitle
			},
			plotArea: {
				shadow: null,
				borderWidth: null,
				backgroundColor: null
			},
			tooltip: {
				formatter: function() {
					return jsDesctip[0]+'<b>'+ this.x +'</b>: '+ this.y +' '+jsDesctip[1];
				}
			},
			xAxis: {
				categories: jsCategoris
			},
			yAxis: {
				min: 0,
				title: {
					text: jsyTitle
				}
			},
			plotOptions: {
				area: {
					pointStart: 0,
					marker: {
						enabled: false,
						symbol: 'circle',
						radius: 2,
						states: {
							hover: {
								enabled: true
							}
						}
					}
				}
			},
			legend: {
				layout: 'vertical',
				backgroundColor: '#FFFFFF',
				align: 'left',
				verticalAlign: 'top',
				enabled:jsShowLegend,
				x: 100,
				y: 70
			},
			credits: {
				enabled: false
			},
			series: [{
				name: jstitle,
				data: jsdata
			}]
		});
	});
}
