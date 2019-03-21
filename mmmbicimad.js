Module.register("mmmbicimad", {
	// Default module config.
	defaults: {
		text: "Hello Bicimad!",
		key: '',
		lat: '40.4167',
		lng: '-3.70325',
		height: '600px',
		width: '600px',
		zoom: 5,
		mapTypeId: 'roadmap',
	},

	getTemplate: function () {
		return "mmmbicimad.njk"
	},

	getTemplateData: function () {
		return this.config
	},

	getDom: function () {
		var wrapper = document.createElement("div");
		wrapper.setAttribute("id", "map");
		wrapper.style.height = this.config.height;
		wrapper.style.width = this.config.width;

		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "http://maps.googleapis.com/maps/api/js?extension=.js&output=embed&libraries=geometry&key=" + this.config.key;
		script.setAttribute('defer', '');
		script.setAttribute('async', '');
		document.body.appendChild(script);


		var self = this;

		script.onload = function () {
			var xmlHttp = new XMLHttpRequest();
			var cURL = 'http://127.0.0.1:8081/';
			xmlHttp.open("GET", cURL, true);
			xmlHttp.onreadystatechange = function() {
				var datos = {};
				if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
					datos = JSON.parse(xmlHttp.responseText);
					// Estaciones Info
					var puntos = [];
					var infoPuntos = [];
					datos = datos;
					// Posición usuario
					puntos.push(["usuario", -3.70325, 40.4167, 0]);
					// Posición usuario (fIN)                         
					for (var i = 1; i < datos.length; i++) {
						//var longitud = parseInt(datos[i].longitude, 10).toFixed(4);
						//var latitud = parseInt(datos[i].latitude, 10).toFixed(4);
						puntos.push([datos[i].name, parseFloat(datos[i].longitude, 10), parseFloat(datos[i].latitude, 10), i]);
						//var distancia = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(puntos[0][2], puntos[0][1]),new google.maps.LatLng(puntos[i][2], puntos[i][1]));

					}
					// Estaciones Info (Fin)
					// GMaps
					var map = new google.maps.Map(document.getElementById('map'), {
						zoom: 15,
						center: new google.maps.LatLng(40.4167, -3.70325),
						mapTypeId: google.maps.MapTypeId.ROADMAP
					});
					var infowindow = new google.maps.InfoWindow();
					var marker, i;
					// Gmap usuario  
					marker = new google.maps.Marker({
						position: {lat:puntos[0][2], lng:puntos[0][1]},
						map: map,
					});
					// Gmap usuario  (fin)
					for (i = 1; i < puntos.length; i++) {
						var color = 'red';
						if (datos[i].dock_bikes>1) {
							color = 'green';
						} else if (datos[i].dock_bikes===1) {
							color = 'orange';
						}

						marker = new google.maps.Marker({
							position: new google.maps.LatLng(puntos[i][2], puntos[i][1]),
							map: map,
							label: datos[i].dock_bikes,
							icon: {
								path: 'M11 2c-3.9 0-7 3.1-7 7 0 5.3 7 13 7 13 0 0 7-7.7 7-13 0-3.9-3.1-7-7-7Zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5 0-1.4 1.1-2.5 2.5-2.5 1.4 0 2.5 1.1 2.5 2.5 0 1.4-1.1 2.5-2.5 2.5Z',
								scale: 1,
								anchor: new google.maps.Point(11, 22),
								fillOpacity: 1,
								fillColor: 'red',
								strokeOpacity: 0
							}
						});
					}
					// GMaps (Fin)
				} else if (xmlHttp.readyState === 4 && xmlHttp.status === 404) {
					datos = JSON.parse(xmlHttp.responseText);
					document.getElementById('map').innerHTML('<h1>Error 404 al conectar con la API.</h1>');
				}
			};
			//xmlHttp.open("GET", cURL, true);
			xmlHttp.send();
		}
		return wrapper;
	},

	init: function () {
		Log.log('hola');
	}
});

