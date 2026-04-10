/**
 * Controlador principal de la aplicacion
 */

let graph = null;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadGoogleMaps();
        initMapModule();
        loadDepartmentPolygons(CONFIG.GEOJSON_URL);
        initializeApp();
    } catch (err) {
        showError(err.message);
    }
});

function initializeApp() {
    populateDepartmentSelects();
    document.getElementById('calcularRuta').addEventListener('click', handleCalculateRoute);
    document.getElementById('origen').addEventListener('change', handleOriginChange);
    document.getElementById('destino').addEventListener('change', handleDestChange);
}

function populateDepartmentSelects() {
    const originSelect = document.getElementById('origen');
    const destSelect = document.getElementById('destino');
    const departamentos = getDepartamentosList();

    originSelect.innerHTML = '<option value="">Seleccionar departamento de inicio...</option>';
    destSelect.innerHTML = '<option value="">Seleccionar departamento destino...</option>';

    departamentos.forEach(dep => {
        const o1 = document.createElement('option');
        o1.value = dep.id;
        o1.textContent = dep.nombre;
        originSelect.appendChild(o1);

        const o2 = document.createElement('option');
        o2.value = dep.id;
        o2.textContent = dep.nombre;
        destSelect.appendChild(o2);
    });
}

function handleOriginChange(e) {
    const id = e.target.value;
    if (!id) return;
    const dep = getDepartamento(id);
    if (dep) {
        clearAll();
        createMarker(dep, 'origen');
        map.setCenter({ lat: dep.lat, lng: dep.lng });
        map.setZoom(7);
    }
}

function handleDestChange(e) {
    const id = e.target.value;
    if (!id) return;
    const dep = getDepartamento(id);
    if (dep) createMarker(dep, 'destino');
}

function handleCalculateRoute() {
    const originId = document.getElementById('origen').value;
    const destId = document.getElementById('destino').value;
    if (!originId) { showError('Selecciona un punto de inicio'); return; }
    if (!destId) { showError('Selecciona un destino'); return; }
    if (originId === destId) { showError('El origen y destino no pueden ser iguales'); return; }
    calculateAndShowRoute(originId, destId);
}

function calculateAndShowRoute(originId, destId) {
    clearAll();
    if (!graph) graph = crearGrafo();
    const result = dijkstra(graph, originId, destId);

    if (result.success) {
        drawRoute(result.path);
        highlightRouteDepartments(result.path.map(p => p.id));
        const o = getDepartamento(originId);
        const d = getDepartamento(destId);
        if (o) createMarker(o, 'origen');
        if (d) createMarker(d, 'destino');
        displayResults(result);
        showSuccess('Ruta calculada exitosamente');
    } else {
        showError(result.message);
    }
}

function displayResults(result) {
    const panel = document.getElementById('resultados');
    document.getElementById('distanciaTotal').textContent = `${result.distance.toFixed(1)}km`;
    document.getElementById('numDepartamentos').textContent = result.path.length;

    const trayecto = document.getElementById('trayecto');
    trayecto.innerHTML = '';
    result.path.forEach((dep, i) => {
        const li = document.createElement('li');
        li.textContent = dep.nombre;
        li.className = i === 0 ? 'origin' : i === result.path.length - 1 ? 'destino' : 'intermedio';
        trayecto.appendChild(li);
    });
    panel.classList.remove('hidden');
}

function showError(msg) { showNotification(msg, 'error'); }
function showSuccess(msg) { showNotification(msg, 'success'); }

function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    if (!container) return;
    const notif = document.createElement('div');
    notif.className = `notification ${type}`;
    notif.textContent = message;
    notif.onclick = () => notif.remove();
    container.appendChild(notif);
    setTimeout(() => { if (notif.parentNode) notif.remove(); }, 4000);
}
