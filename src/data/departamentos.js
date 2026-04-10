/**
 * Departamentos del Perú con coordenadas y conexiones entre vecinos
 */

const DEPARTAMENTOS = [
    { id: 'TUMBES', nombre: 'Tumbes', lat: -3.8639, lng: -80.5273, vecinos: ['PIURA'] },
    { id: 'PIURA', nombre: 'Piura', lat: -5.0512, lng: -80.2822, vecinos: ['TUMBES', 'LAMBAYEQUE', 'CAJAMARCA'] },
    { id: 'LAMBAYEQUE', nombre: 'Lambayeque', lat: -6.3221, lng: -79.6655, vecinos: ['PIURA', 'CAJAMARCA', 'LA LIBERTAD'] },
    { id: 'CAJAMARCA', nombre: 'Cajamarca', lat: -6.3878, lng: -78.8061, vecinos: ['PIURA', 'LAMBAYEQUE', 'LA LIBERTAD', 'AMAZONAS', 'SAN MARTIN'] },
    { id: 'AMAZONAS', nombre: 'Amazonas', lat: -5.2118, lng: -77.9848, vecinos: ['CAJAMARCA', 'SAN MARTIN', 'LORETO'] },
    { id: 'LA LIBERTAD', nombre: 'La Libertad', lat: -7.8460, lng: -78.2532, vecinos: ['LAMBAYEQUE', 'CAJAMARCA', 'SAN MARTIN', 'HUANUCO', 'ANCASH'] },
    { id: 'SAN MARTIN', nombre: 'San Martín', lat: -6.9943, lng: -76.7510, vecinos: ['CAJAMARCA', 'AMAZONAS', 'LORETO', 'LA LIBERTAD', 'HUANUCO', 'UCAYALI'] },
    { id: 'ANCASH', nombre: 'Ancash', lat: -9.4984, lng: -77.6608, vecinos: ['LA LIBERTAD', 'HUANUCO', 'PASCO', 'LIMA'] },
    { id: 'LORETO', nombre: 'Loreto', lat: -4.5464, lng: -73.9955, vecinos: ['AMAZONAS', 'SAN MARTIN', 'UCAYALI', 'MADRE DE DIOS'] },
    { id: 'HUANUCO', nombre: 'Huánuco', lat: -9.3238, lng: -75.9653, vecinos: ['LA LIBERTAD', 'SAN MARTIN', 'UCAYALI', 'PASCO', 'ANCASH'] },
    { id: 'PASCO', nombre: 'Pasco', lat: -10.4560, lng: -75.4048, vecinos: ['ANCASH', 'HUANUCO', 'UCAYALI', 'JUNIN', 'LIMA'] },
    { id: 'UCAYALI', nombre: 'Ucayali', lat: -9.5495, lng: -73.5397, vecinos: ['SAN MARTIN', 'LORETO', 'HUANUCO', 'PASCO', 'MADRE DE DIOS'] },
    { id: 'LIMA', nombre: 'Lima', lat: -11.5657, lng: -76.7389, vecinos: ['ANCASH', 'PASCO', 'JUNIN', 'HUANCAVELICA', 'ICA', 'CALLAO'] },
    { id: 'CALLAO', nombre: 'Callao', lat: -11.9370, lng: -77.1343, vecinos: ['LIMA'] },
    { id: 'JUNIN', nombre: 'Junín', lat: -11.4889, lng: -74.9362, vecinos: ['PASCO', 'LIMA', 'HUANCAVELICA', 'AYACUCHO'] },
    { id: 'HUANCAVELICA', nombre: 'Huancavelica', lat: -13.0832, lng: -75.0036, vecinos: ['LIMA', 'JUNIN', 'AYACUCHO', 'ICA'] },
    { id: 'ICA', nombre: 'Ica', lat: -14.1774, lng: -75.5265, vecinos: ['LIMA', 'HUANCAVELICA', 'AYACUCHO', 'APURIMAC', 'AREQUIPA'] },
    { id: 'AYACUCHO', nombre: 'Ayacucho', lat: -13.9953, lng: -74.0497, vecinos: ['JUNIN', 'HUANCAVELICA', 'ICA', 'APURIMAC', 'CUSCO'] },
    { id: 'APURIMAC', nombre: 'Apurímac', lat: -14.0687, lng: -73.0142, vecinos: ['ICA', 'AYACUCHO', 'CUSCO', 'AREQUIPA'] },
    { id: 'CUSCO', nombre: 'Cusco', lat: -13.3716, lng: -72.0757, vecinos: ['AYACUCHO', 'APURIMAC', 'AREQUIPA', 'MADRE DE DIOS', 'PUNO'] },
    { id: 'MADRE DE DIOS', nombre: 'Madre de Dios', lat: -11.8171, lng: -70.9707, vecinos: ['LORETO', 'UCAYALI', 'CUSCO', 'PUNO'] },
    { id: 'AREQUIPA', nombre: 'Arequipa', lat: -15.6580, lng: -72.6717, vecinos: ['ICA', 'APURIMAC', 'CUSCO', 'PUNO', 'MOQUEGUA'] },
    { id: 'PUNO', nombre: 'Puno', lat: -16.3417, lng: -68.8767, vecinos: ['CUSCO', 'MADRE DE DIOS', 'AREQUIPA', 'MOQUEGUA', 'TACNA'] },
    { id: 'MOQUEGUA', nombre: 'Moquegua', lat: -16.8002, lng: -70.7766, vecinos: ['AREQUIPA', 'PUNO', 'TACNA'] },
    { id: 'TACNA', nombre: 'Tacna', lat: -17.5475, lng: -70.2611, vecinos: ['MOQUEGUA', 'PUNO'] }
];

let _grafoCache = null;

function crearGrafo() {
    if (_grafoCache) return _grafoCache;

    const byId = {};
    DEPARTAMENTOS.forEach(d => { byId[d.id] = d; });

    const grafo = {};
    for (const id in byId) {
        const dep = byId[id];
        grafo[id] = { id: dep.id, nombre: dep.nombre, lat: dep.lat, lng: dep.lng, vecinos: {} };
    }

    for (const id in byId) {
        const dep = byId[id];
        for (let i = 0; i < dep.vecinos.length; i++) {
            const vecinoId = dep.vecinos[i];
            const vecino = byId[vecinoId];
            if (vecino) {
                grafo[id].vecinos[vecinoId] = {
                    id: vecino.id,
                    nombre: vecino.nombre,
                    distance: haversineDistance(dep.lat, dep.lng, vecino.lat, vecino.lng)
                };
            }
        }
    }

    _grafoCache = grafo;
    return grafo;
}

function haversineDistance(lat1, lng1, lat2, lng2) {
    const TO_RAD = Math.PI / 180;
    const R = 6371;
    const dLat = (lat2 - lat1) * TO_RAD;
    const dLng = (lng2 - lng1) * TO_RAD;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * TO_RAD) * Math.cos(lat2 * TO_RAD) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getDepartamentosList() {
    return DEPARTAMENTOS.map(d => ({ id: d.id, nombre: d.nombre }))
        .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
}

const _depMap = (() => {
    const m = new Map();
    DEPARTAMENTOS.forEach(d => m.set(d.id, d));
    return m;
})();

function getDepartamento(id) {
    return _depMap.get(id) || null;
}
