Module.register("mmmbicimad", {
	// Default module config.
	defaults: {
		text: "Hello Bicimad!",
		key: '',
		lat: '40.3925321',
		lng: '-3.7004556',
		height: "800px",
		width: "600px",
		zoom: 5,
		mapTypeId: 'roadmap',
	},

	start: function () {
		console.log(this.name + ' started.')
		var self = this;
		setInterval(function () {
				self.updateDom(0);
		}, 120000);
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

		latitude_user = parseFloat(this.config.lat,7)
		longitude_user = parseFloat(this.config.lng,7)

		//var self = this;

		script.onload = function () {
			var xmlHttp = new XMLHttpRequest();
			var cURL = 'http://127.0.0.1:8081/';
			xmlHttp.open("GET", cURL, true);
			xmlHttp.onreadystatechange = function() {
				var datos = {};
				if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
					datos = JSON.parse(xmlHttp.responseText);
					// Stations Info
					var puntos = [];
					datos = datos;
					// GoogleMaps User Position
					puntos.push(["usuario", longitude_user, latitude_user, 0]);                         
					for (var i = 1; i < datos.length; i++) {
						puntos.push([datos[i].name, parseFloat(datos[i].longitude, 10), parseFloat(datos[i].latitude, 10), i]);
						//var distancia = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(puntos[0][2], puntos[0][1]),new google.maps.LatLng(puntos[i][2], puntos[i][1]));
					}
					var map = new google.maps.Map(document.getElementById('map'), {
						zoom: 15,
						center: new google.maps.LatLng(latitude_user, longitude_user),
						//mapTypeId: google.maps.MapTypeId.ROADMAP
						styles: 
						[
							{
								elementType: "geometry",
								stylers: [
									{
										color: "#212121"
									}
								]
							},
							{
								elementType: "labels",
								stylers: [
									{
										visibility: "off"
									}
								]
							},
							{
								elementType: "labels.icon",
								stylers: [
									{
										visibility: "off"
									}
								]
							},
							{
								elementType: "labels.text.fill",
								stylers: [
									{
										color: "#757575"
									}
								]
							},
							{
								elementType: "labels.text.stroke",
								stylers: [
									{
										color: "#212121"
									}
								]
							},
							{
								featureType: "administrative",
								elementType: "geometry",
								stylers: [
									{
										color: "#757575"
									},
									{
										visibility: "off"
									}
								]
							},
							{
								featureType: "administrative.country",
								elementType: "labels.text.fill",
								stylers: [
									{
										color: "#9e9e9e"
									}
								]
							},
							{
								featureType: "administrative.land_parcel",
								stylers: [
									{
										visibility: "off"
									}
								]
							},
							{
								featureType: "administrative.locality",
								elementType: "labels.text.fill",
								stylers: [
									{
										color: "#bdbdbd"
									}
								]
							},
							{
								featureType: "administrative.neighborhood",
								stylers: [
									{
										visibility: "off"
									}
								]
							},
							{
								featureType: "landscape",
								stylers: [
									{
										color: "#000000"
									}
								]
							},
							{
								featureType: "poi",
								stylers: [
									{
										visibility: "off"
									}
								]
							},
							{
								featureType: "poi",
								elementType: "labels.text.fill",
								stylers: [
									{
										color: "#757575"
									}
								]
							},
							{
								featureType: "poi.park",
								elementType: "geometry",
								stylers: [
									{
										color: "#181818"
									}
								]
							},
							{
								featureType: "poi.park",
								elementType: "labels.text.fill",
								stylers: [
									{
										color: "#616161"
									}
								]
							},
							{
								featureType: "poi.park",
								elementType: "labels.text.stroke",
								stylers: [
									{
										color: "#1b1b1b"
									}
								]
							},
							{
								featureType: "road",
								elementType: "geometry.fill",
								stylers: [
									{
										color: "#2c2c2c"
									}
								]
							},
							{
								featureType: "road",
								elementType: "labels.icon",
								stylers: [
									{
										visibility: "on"
									}
								]
							},
							{
								featureType: "road",
								elementType: "labels.text.fill",
								stylers: [
									{
										color: "#8a8a8a"
									}
								]
							},
							{
								featureType: "road.arterial",
								elementType: "geometry",
								stylers: [
									{
										color: "#373737"
									}
								]
							},
							{
								featureType: "road.highway",
								elementType: "geometry",
								stylers: [
									{
										color: "#3c3c3c"
									}
								]
							},
							{
								featureType: "road.highway.controlled_access",
								elementType: "geometry",
								stylers: [
									{
										color: "#4e4e4e"
									}
								]
							},
							{
								featureType: "road.local",
								elementType: "labels.text.fill",
								stylers: [
									{
										color: "#616161"
									}
								]
							},
							{
								featureType: "transit",
								stylers: [
									{
										visibility: "off"
									}
								]
							},
							{
								featureType: "transit",
								elementType: "labels.text.fill",
								stylers: [
									{
										color: "#757575"
									}
								]
							},
							{
								featureType: "water",
								elementType: "geometry",
								stylers: [
									{
										color: "#aeaeae"
									}
								]
							},
							{
								featureType: "water",
								elementType: "labels.text.fill",
								stylers: [
									{
										color: "#3d3d3d"
									}
								]
							}
						]
					});
					var infowindow = new google.maps.InfoWindow();
					var marker, i;
					// Gmap usuario  
					marker = new google.maps.Marker({
						position: {lat:puntos[0][2], lng:puntos[0][1]},
						map: map,
					});
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
							animation: google.maps.Animation.DROP,
							icon: 'http://localhost:8081/images/bike_' + color + '.png'
						});
					}

				// Conection API error 
				} else if (xmlHttp.readyState === 4 && xmlHttp.status === 404) {
					datos = JSON.parse(xmlHttp.responseText);
					document.getElementById('map').innerHTML('<h1>Error 404 al conectar con la API.</h1>');
				}
			};
			xmlHttp.send();
		}
		return wrapper;
	},

	/*init: function () {
		Log.log('hola');
	}*/
});
