/**
 * Main Application Controller
 * Connects the UI with the Dijkstra algorithm and Google Maps
 */

let googleMaps = null;
let graph = null;

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Inicializando aplicación...');
    
    await initializeGoogleMaps();
    initializeApp();
});

async function initializeGoogleMaps() {
    try {
        if (!CONFIG.GOOGLE_MAPS_API_KEY || CONFIG.GOOGLE_MAPS_API_KEY === 'YOUR_API_KEY_HERE') {
            showError('API Key no configurada. Edita src/config.js y reemplaza YOUR_API_KEY_HERE con tu clave de API de Google Maps.');
            return;
        }

        googleMaps = await loadGoogleMaps();
        initMapModule(googleMaps);
        
        const connections = getConnectionsCarreteras();
        drawConnections(connections);
        showAllCarreteras();
        
    } catch (error) {
        console.error('Error al inicializar Google Maps:', error);
        showError('Error al cargar Google Maps: ' + error.message);
    }
}

function initializeApp() {
    populateCarreteraSelects();
    
    const calculateBtn = document.getElementById('calcularRuta');
    calculateBtn.addEventListener('click', handleCalculateRoute);
    
    const originSelect = document.getElementById('origen');
    const destSelect = document.getElementById('destino');
    
    originSelect.addEventListener('change', handleOriginChange);
    destSelect.addEventListener('change', handleDestChange);
}

function populateCarreteraSelects() {
    const originSelect = document.getElementById('origen');
    const destSelect = document.getElementById('destino');
    
    const puntos = getPuntosCarretera();
    
    originSelect.innerHTML = '<option value="">Seleccionar punto de inicio...</option>';
    destSelect.innerHTML = '<option value="">Seleccionar destino...</option>';
    
    puntos.forEach(punto => {
        const originOption = document.createElement('option');
        originOption.value = punto.id;
        originOption.textContent = punto.nombre;
        originSelect.appendChild(originOption);
        
        const destOption = document.createElement('option');
        destOption.value = punto.id;
        destOption.textContent = punto.nombre;
        destSelect.appendChild(destOption);
    });
}

function handleOriginChange(e) {
    const originId = e.target.value;
    const destId = document.getElementById('destino').value;
    
    if (originId && destId) {
        updateOriginMarker(originId);
    }
}

function handleDestChange(e) {
    const destId = e.target.value;
    const originId = document.getElementById('origen').value;
    
    if (originId && destId) {
        updateDestMarker(destId);
    }
}

function updateOriginMarker(pointId) {
    if (!googleMaps) return;
    
    const punto = getPuntoCarretera(pointId);
    if (punto) {
        markers[pointId]?.setMap(null);
        createMarker(punto, 'origen');
        
        map.setCenter({ lat: punto.lat, lng: punto.lng });
        map.setZoom(7);
    }
}

function updateDestMarker(pointId) {
    if (!googleMaps) return;
    
    const punto = getPuntoCarretera(pointId);
    if (punto) {
        markers[pointId]?.setMap(null);
        createMarker(punto, 'destino');
    }
}

function handleCalculateRoute() {
    const originId = document.getElementById('origen').value;
    const destId = document.getElementById('destino').value;
    
    if (!originId) {
        showError('Por favor selecciona un punto de inicio');
        return;
    }
    
    if (!destId) {
        showError('Por favor selecciona un destino');
        return;
    }
    
    if (originId === destId) {
        showError('El origen y destino no pueden ser el mismo punto');
        return;
    }
    
    calculateAndShowRoute(originId, destId);
}

function calculateAndShowRoute(originId, destId) {
    clearRoute();
    
    if (!graph) {
        graph = crearGrafoCarreteras();
    }
    
    const result = dijkstra(graph, originId, destId);
    
    if (result.success) {
        drawRoute(result.path);
        displayResults(result);
        showSuccess('Ruta calculada exitosamente');
    } else {
        showError(result.message);
    }
}

function displayResults(result) {
    const resultsPanel = document.getElementById('resultados');
    const distanciaTotal = document.getElementById('distanciaTotal');
    const numPuntos = document.getElementById('numDepartamentos');
    const trayecto = document.getElementById('trayecto');
    
    distanciaTotal.textContent = `${result.distance.toFixed(2)} km`;
    numPuntos.textContent = result.path.length;
    
    trayecto.innerHTML = '';
    result.path.forEach((punto, index) => {
        const li = document.createElement('li');
        li.textContent = `${punto.nombre} (${punto.carretera || 'Carretera'})`;
        
        if (index === 0) {
            li.classList.add('origin');
        } else if (index === result.path.length - 1) {
            li.classList.add('destination');
        } else {
            li.classList.add('intermediate');
        }
        
        trayecto.appendChild(li);
    });
    
    resultsPanel.classList.remove('hidden');
}

function showError(message) {
    alert('Error: ' + message);
}

function showSuccess(message) {
    console.log('Éxito: ' + message);
}