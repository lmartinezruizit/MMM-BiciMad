Module.register("MMM-BiciMad",{
    // Default module config.
    defaults: {
        apikey: 'your_api_key',
        baseurl: 'http://maps.googleapis.com/maps/api/js?extension=.js&output=embed&callback=initMap&libraries=geometry&key=',
	},
getDom: function (){
    var wrapper = document.createElement("div");
    wrapper.setAttribute("id", "map");

    wrapper.style.height = this.config.height;
    wrapper.style.width = this.config.width;

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = this.config.baseurl + this.config.key;
    script.setAttribute('defer','');
    script.setAttribute('async','');
    document.body.appendChild(script);

    var self = this;

    script.onload = function initMap() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var xmlHttp = new XMLHttpRequest(),
                    cURL = 'http://127.0.0.1:8081/';
                xmlHttp.onreadystatechange = function() {
                    var datos = {};
                    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                        datos = JSON.parse(xmlHttp.responseText);
                        // Estaciones Info
                        var puntos = [];
                        var infoPuntos = [];
                        datos = datos;
                        // Posición usuario
                        puntos.push(["usuario", position.coords.longitude, position.coords.latitude, 0]);
                        infoPuntos.push(['<div class="info_content">' +
                            '<h3>Aqui estás!</h3>' +
                            '<p>Precisión: ' + position.coords.accuracy + 'm' +
                            '<br>Longitud: ' + position.coords.longitude +
                            '<br>Latitud: ' + position.coords.latitude + '</p>' +
                            '</div>'
                        ]);
                        // Posición usuario (fIN)                         
                        for (var i = 1; i < datos.length; i++) {
                            var longitud = parseInt(datos[i].longitude, 10).toFixed(4);
                            var latitud = parseInt(datos[i].latitude, 10).toFixed(4);
                            puntos.push([datos[i].name, parseFloat(datos[i].longitude, 10), parseFloat(datos[i].latitude, 10), i]);
                            var distancia = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(puntos[0][2], puntos[0][1]),new google.maps.LatLng(puntos[i][2], puntos[i][1]));
                            infoPuntos.push(['<div class="info_content">' +
                                '<h3>' + datos[i].name + '</h3>' +
                                '<p>Dirección: ' + datos[i].addres +
                                '<br>Libres: ' + datos[i].dock_bikes +
                                '<br>Distancia: ' + distancia + 'm' +
                                '<br>ID Estación: ' + datos[i].id +
                                '<br>Longitud: ' + longitud +
                                '<br>Latitud: ' + latitud + '</p>' +
                                '</div>'
                            ]);
                        }
                        // Estaciones Info (Fin)
                        // GMaps
                        var map = new google.maps.Map(document.getElementById('mapa'), {
                            zoom: 15,
                            center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        });
                        var infowindow = new google.maps.InfoWindow();
                        var marker, i;
                        // Gmap usuario  
                        marker = new google.maps.Marker({
                            position: {lat:puntos[0][2], lng:puntos[0][1]},
                            map: map,
                        });
                        google.maps.event.addListener(marker, 'click', (function(marker, i) {
                            return function() {
                                infowindow.setContent(infoPuntos[0][0]);
                                infowindow.open(map, marker);
                            }
                        })(marker, i));
                        // Gmap usuario  (fin)
                        for (i = 1; i < puntos.length; i++) {
                            marker = new google.maps.Marker({
                                position: new google.maps.LatLng(puntos[i][2], puntos[i][1]),
                                map: map,
                                icon: "img/bike.png"
                            });
                            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                                return function() {
                                    infowindow.setContent(infoPuntos[i][0]);
                                    infowindow.open(map, marker);
                                }
                            })(marker, i));
                        }
                        // GMaps (Fin)
                    } else if (xmlHttp.readyState === 4 && xmlHttp.status === 404) {
                        datos = JSON.parse(xmlHttp.responseText);
                        document.getElementById('mapa').innerHTML('<h1>Error 404 al conectar con la API.</h1>');
                    }
                };
                xmlHttp.open("GET", cURL, true);
                xmlHttp.send();
            }, function() {
                document.getElementById('mapa').innerHTML('<h1>Error: El Servicio de Geolocalización esta fallando.</h1>');
            });
        } else {
            document.getElementById('mapa').innerHTML('<h1>Error: Tu navegador no soporta la Geolocalización.</h1>');
        }
    };
    return wrapper;
    },
});