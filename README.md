# MMM-BiciMad
This a module for the MagicMirror² to show all BiciMad bikes available in each station. To use this module you need a ID_KEY and a PASS_KEY from https://opendata.emtmadrid.es/Servicios-web/BICIMAD.

## Installation

1. Navigate into your MagicMirror's `~/MagicMirror/modules` folder and execute `git clone https://github.com/lmartinezruizit/MMM-BiciMad.git`. A new folder will appear navigate into it.
2. Execute `npm install` in `~/MagicMirror/modules/MMM-BiciMad` to install the node dependencies.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'mmmbicimad',
            position: 'top_left',
            config: {
                text: "Hello Bicimad!",
                key: '',
                lat: '40.3925321',
                lng: '-3.7004556',
                height: "800px",
                width: "1400px",
                zoom: 5,
                mapTypeId: 'roadmap',
            },
        }
    ]
}
```

## Configuration options

| Option               | Description
|--------------------- |-----------
| `key`                | *Required* Google api key. See below for help.
| `lat`                | *Required* Latitude used to center the map. See below for help. <br><br>**Type:** `float`
| `lng`                | *Required* Longitude used to center the map. See below for help. <br><br>**Type:** `float`
| `height`             | Height of the map. <br><br>**Type:** `string` (pixels) <br> **Default value:** `300px`
| `width`              | Width of the map. <br><br>**Type:** `string` (pixels) <br> **Default value:** `300px`
| `zoom`               | Zoom value to display from lat/lng. <br><br>**Type:** `integer` <br> **Default value:** `10`
| `mapTypeId`          | The map type to display (roadmap, satellite, hybrid, terrain).  <br><br>**Type:** `string` <br> **Default value:** `roadmap`


## Google API Key

Obtain an api at [Google Developer's page](https://developers.google.com/maps/documentation/javascript/).

## Coordinates

The easiest way to obtain latitude and longitude coordinates is via [Google Maps](https://maps.google.com). Type an address, location, or center the map where you'd like it centered. The coordinates will appear in the address bar as seen below.

![Alt text](/img/coordinates.png "Google Maps coordinates.")
