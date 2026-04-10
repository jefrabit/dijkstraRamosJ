# Algoritmo de Dijkstra - Departamentos del Peru

Implementacion del algoritmo de Dijkstra para encontrar la ruta mas corta entre departamentos del Peru, con visualizacion en Google Maps.

## Requisitos

- Google Maps API Key
- Navegador web

## Configuracion

1. Obtener API Key en https://console.cloud.google.com/google/maps-apis
2. Abrir `src/config.js` y reemplazar `TU_API_KEY_AQUI` con tu clave

## Uso

1. Abrir `index.html` en un navegador
2. Seleccionar departamento de inicio
3. Seleccionar departamento destino
4. Clic en "Encontrar camino"

## Estructura

```
├── index.html
├── src/
│   ├── config.js
│   ├── main.js
│   ├── algorithms/dijkstra.js
│   ├── data/departamentos.js
│   ├── map/map.js
│   └── styles/style.css
└── peru-geojson/
    └── peru_departamental_simple.geojson
```

## Detalles tecnicos

- Algoritmo de Dijkstra con Min-Heap binario
- Distancias calculadas con formula de Haversine
- Poligonos de departamentos cargados desde GeoJSON
- Mapa visual con Google Maps API
- 25 departamentos con conexiones entre vecinos

## Proyecto Universitario
