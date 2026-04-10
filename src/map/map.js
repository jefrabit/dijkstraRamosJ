/**
 * Integracion con Google Maps - Departamentos del Peru
 */

let map = null;
let markers = {};
let routePolyline = null;
let departmentPolygons = {};
let infoWindow = null;

function loadGoogleMaps() {
    return new Promise((resolve, reject) => {
        if (typeof google !== 'undefined' && google.maps) {
            resolve();
            return;
        }
        if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === 'TU_API_KEY_AQUI') {
            reject(new Error('Configura tu API Key de Google Maps en src/config.js'));
            return;
        }
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMapCallback`;
        script.async = true;
        script.defer = true;
        window.initMapCallback = resolve;
        script.onerror = () => reject(new Error('Error al cargar Google Maps'));
        document.head.appendChild(script);
    });
}

function initMapModule() {
    map = new google.maps.Map(document.getElementById('map'), CONFIG.MAP_CONFIG);
    infoWindow = new google.maps.InfoWindow();
    document.getElementById('map-loading').style.display = 'none';
}

function loadDepartmentPolygons(geojsonUrl) {
    const colors = [
        '#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6',
        '#1abc9c', '#e67e22', '#34495e', '#16a085', '#c0392b',
        '#2980b9', '#27ae60', '#8e44ad', '#d35400', '#2c3e50',
        '#f1c40f', '#e84393', '#00b894', '#6c5ce7', '#fd79a8',
        '#00cec9', '#fab1a0', '#74b9ff', '#a29bfe', '#ffeaa7'
    ];

    fetch(geojsonUrl)
        .then(r => r.json())
        .then(data => {
            data.features.forEach((feature, index) => {
                const nombre = feature.properties.NOMBDEP;
                const coordinates = feature.geometry.coordinates;
                const paths = coordinates.map(ring =>
                    ring.map(c => ({ lat: c[1], lng: c[0] }))
                );

                const polygon = new google.maps.Polygon({
                    paths: paths.length === 1 ? paths[0] : paths,
                    strokeColor: CONFIG.COLORS.defaultStroke,
                    strokeOpacity: 0.8,
                    strokeWeight: CONFIG.COLORS.defaultStrokeWeight,
                    fillColor: colors[index % colors.length],
                    fillOpacity: CONFIG.COLORS.defaultFillOpacity,
                    map: map
                });

                polygon.addListener('click', function(event) {
                    infoWindow.setContent(`<div style="padding:8px"><strong>${nombre}</strong></div>`);
                    infoWindow.setPosition(event.latLng);
                    infoWindow.open(map);
                });

                polygon.addListener('mouseover', function() {
                    this.setOptions({ fillOpacity: CONFIG.COLORS.hoverFillOpacity });
                });
                polygon.addListener('mouseout', function() {
                    if (!this._highlighted) {
                        this.setOptions({ fillOpacity: CONFIG.COLORS.defaultFillOpacity });
                    }
                });

                departmentPolygons[nombre] = polygon;
            });
        })
        .catch(err => {
            console.error('Error cargando GeoJSON:', err);
            showError('No se pudo cargar el mapa de departamentos');
        });
}

function createMarker(punto, type = 'default') {
    if (!map) return null;
    if (markers[punto.id]) {
        markers[punto.id].setMap(null);
    }

    let color, radius;
    if (type === 'origen') {
        color = CONFIG.COLORS.originMarker;
        radius = 12;
    } else if (type === 'destino') {
        color = CONFIG.COLORS.destMarker;
        radius = 12;
    } else {
        color = '#64748b';
        radius = 6;
    }

    const marker = new google.maps.Marker({
        position: { lat: punto.lat, lng: punto.lng },
        map: map,
        title: punto.nombre,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: radius,
            fillColor: color,
            fillOpacity: type === 'default' ? 0.6 : 1,
            strokeColor: color,
            strokeWeight: 2
        }
    });

    markers[punto.id] = marker;
    return marker;
}

function drawRoute(path) {
    if (!map || !path || path.length === 0) return;
    clearRoute();

    const latlngs = path.map(p => ({ lat: p.lat, lng: p.lng }));
    routePolyline = new google.maps.Polyline({
        path: latlngs,
        strokeColor: CONFIG.COLORS.routeStroke,
        strokeOpacity: 1,
        strokeWeight: CONFIG.COLORS.routeStrokeWeight,
        geodesic: true,
        map: map
    });

    const bounds = new google.maps.LatLngBounds();
    path.forEach(p => bounds.extend({ lat: p.lat, lng: p.lng }));
    map.fitBounds(bounds, { top: 50, bottom: 50, left: 50, right: 50 });
}

function highlightRouteDepartments(pathIds) {
    Object.values(departmentPolygons).forEach(poly => {
        poly.setOptions({
            strokeColor: CONFIG.COLORS.defaultStroke,
            strokeWeight: CONFIG.COLORS.defaultStrokeWeight,
            fillOpacity: CONFIG.COLORS.defaultFillOpacity
        });
        poly._highlighted = false;
    });

    pathIds.forEach(id => {
        const dep = DEPARTAMENTOS.find(d => d.id === id);
        if (dep && departmentPolygons[dep.nombre]) {
            const poly = departmentPolygons[dep.nombre];
            poly.setOptions({
                strokeColor: CONFIG.COLORS.routeStroke,
                strokeWeight: 3.5,
                fillOpacity: CONFIG.COLORS.routeFillOpacity
            });
            poly._highlighted = true;
        }
    });
}

function clearRoute() {
    if (routePolyline) { routePolyline.setMap(null); routePolyline = null; }
    Object.values(departmentPolygons).forEach(poly => {
        poly.setOptions({
            strokeColor: CONFIG.COLORS.defaultStroke,
            strokeWeight: CONFIG.COLORS.defaultStrokeWeight,
            fillOpacity: CONFIG.COLORS.defaultFillOpacity
        });
        poly._highlighted = false;
    });
}

function clearMarkers() {
    Object.values(markers).forEach(m => m.setMap(null));
    markers = {};
}

function resetMapView() {
    if (!map) return;
    map.setCenter(CONFIG.MAP_CONFIG.center);
    map.setZoom(CONFIG.MAP_CONFIG.zoom);
}

function clearAll() {
    clearMarkers();
    clearRoute();
    resetMapView();
}
