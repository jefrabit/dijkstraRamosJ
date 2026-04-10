/**
 * Google Maps Integration Module
 * Handles map initialization, markers, polylines, and route visualization
 */

let map = null;
let markers = {};
let connectionPolylines = [];
let routePolyline = null;
let infoWindow = null;

/**
 * Initialize Google Maps centered on Peru
 * @param {Object} googleMaps - Google Maps API object
 */
function initMapModule(googleMaps) {
    map = new googleMaps.Map(document.getElementById('map'), CONFIG.MAP_CONFIG);
    infoWindow = new googleMaps.InfoWindow();
    
    document.getElementById('map-loading').style.display = 'none';
    console.log('Mapa inicializado correctamente');
}

/**
 * Create marker for a road point
 * @param {Object} punto - Road point data
 * @param {string} type - Marker type: 'default', 'origen', 'destino'
 */
function createMarker(punto, type = 'default') {
    if (!map || !google.maps) return null;
    
    let icon = null;
    let title = punto.nombre;
    
    if (type === 'origen') {
        icon = {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: '#22c55e',
            fillOpacity: 1,
            strokeColor: '#166534',
            strokeWeight: 3
        };
    } else if (type === 'destino') {
        icon = {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: '#ef4444',
            fillOpacity: 1,
            strokeColor: '#991b1b',
            strokeWeight: 3
        };
    }
    
    const marker = new google.maps.Marker({
        position: { lat: punto.lat, lng: punto.lng },
        map: map,
        title: title,
        icon: icon,
        animation: google.maps.Animation.DROP
    });
    
    marker.addListener('click', () => {
        infoWindow.setContent(`
            <div style="padding: 8px; max-width: 250px;">
                <strong style="font-size: 14px;">${punto.nombre}</strong><br>
                <span style="color: #666;">${punto.carretera || 'Carretera'}</span><br>
                <span style="color: #888; font-size: 12px;">
                    Lat: ${punto.lat.toFixed(4)}, Lng: ${punto.lng.toFixed(4)}
                </span>
            </div>
        `);
        infoWindow.open(map, marker);
    });
    
    markers[punto.id] = marker;
    return marker;
}

/**
 * Draw all connections between neighboring road points
 * @param {Array} connections - Array of connection objects
 */
function drawConnections(connections) {
    if (!map || !google.maps) return;
    
    clearConnections();
    
    connections.forEach(conn => {
        const polyline = new google.maps.Polyline({
            path: [
                { lat: conn.from.lat, lng: conn.from.lng },
                { lat: conn.to.lat, lng: conn.to.lng }
            ],
            ...CONFIG.POLYLINE_CONFIG.conexiones,
            map: map
        });
        connectionPolylines.push(polyline);
    });
}

/**
 * Draw the optimal route on the map
 * @param {Array} path - Array of road point objects representing the path
 */
function drawRoute(path) {
    if (!map || !google.maps || !path || path.length === 0) return;
    
    clearRoute();
    
    const routePath = path.map(p => ({ lat: p.lat, lng: p.lng }));
    
    routePolyline = new google.maps.Polyline({
        path: routePath,
        ...CONFIG.POLYLINE_CONFIG.rutaOptima,
        map: map
    });
    
    const bounds = new google.maps.LatLngBounds();
    path.forEach(p => bounds.extend({ lat: p.lat, lng: p.lng }));
    map.fitBounds(bounds);
}

/**
 * Clear all connection lines from the map
 */
function clearConnections() {
    connectionPolylines.forEach(polyline => polyline.setMap(null));
    connectionPolylines = [];
}

/**
 * Clear the optimal route from the map
 */
function clearRoute() {
    if (routePolyline) {
        routePolyline.setMap(null);
        routePolyline = null;
    }
}

/**
 * Highlight origin and destination markers
 * @param {string} originId - Origin road point ID
 * @param {string} destId - Destination road point ID
 */
function highlightMarkers(originId, destId) {
    Object.keys(markers).forEach(id => {
        const marker = markers[id];
        if (id === originId) {
            createMarker(CARRETERAS[id], 'origen');
        } else if (id === destId) {
            createMarker(CARRETERAS[id], 'destino');
        }
    });
}

/**
 * Clear all markers from the map
 */
function clearMarkers() {
    Object.values(markers).forEach(marker => marker.setMap(null));
    markers = {};
}

/**
 * Reset map to initial view
 */
function resetMapView() {
    if (!map) return;
    map.setCenter(CONFIG.MAP_CONFIG.center);
    map.setZoom(CONFIG.MAP_CONFIG.zoom);
}

/**
 * Clear all map elements
 */
function clearAll() {
    clearMarkers();
    clearConnections();
    clearRoute();
    resetMapView();
}

/**
 * Show all road points as markers on the map
 */
function showAllCarreteras() {
    clearMarkers();
    Object.values(CARRETERAS).forEach(punto => createMarker(punto, 'default'));
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initMapModule,
        createMarker,
        drawConnections,
        drawRoute,
        clearConnections,
        clearRoute,
        clearMarkers,
        resetMapView,
        clearAll,
        showAllCarreteras
    };
}