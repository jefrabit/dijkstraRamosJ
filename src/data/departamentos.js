/**
 * Data file containing real Peru departments with geographic coordinates
 * and connections between adjacent departments
 */

const DEPARTAMENTOS = [
    {
        id: 'AM',
        nombre: 'Amazonas',
        lat: -6.2298,
        lng: -77.8089,
        vecinos: ['CA', 'LA', 'SM', 'LU']
    },
    {
        id: 'AN',
        nombre: 'Ancash',
        lat: -9.5265,
        lng: -77.5518,
        vecinos: ['LI', 'HU', 'PA', 'LA']
    },
    {
        id: 'AP',
        nombre: 'Apurímac',
        lat: -14.0684,
        lng: -72.9087,
        vecinos: ['CU', 'AY', 'IC', 'PU']
    },
    {
        id: 'AR',
        nombre: 'Arequipa',
        lat: -16.4090,
        lng: -71.5375,
        vecinos: ['MO', 'CU', 'IC', 'PA']
    },
    {
        id: 'AY',
        nombre: 'Ayacucho',
        lat: -13.1588,
        lng: -74.2036,
        vecinos: ['HU', 'JC', 'AP', 'IC']
    },
    {
        id: 'CA',
        nombre: 'Cajamarca',
        lat: -5.4200,
        lng: -78.8230,
        vecinos: ['AM', 'LA', 'SM', 'PI']
    },
    {
        id: 'CU',
        nombre: 'Cusco',
        lat: -13.5319,
        lng: -71.9675,
        vecinos: ['PA', 'AP', 'AR', 'MO', 'PU']
    },
    {
        id: 'HU',
        nombre: 'Huancavelica',
        lat: -12.7868,
        lng: -74.9728,
        vecinos: ['AN', 'JC', 'AY', 'LI']
    },
    {
        id: 'HU',
        nombre: 'Huánuco',
        lat: -9.9305,
        lng: -76.2390,
        vecinos: ['PA', 'SM', 'LA', 'AN', 'LI']
    },
    {
        id: 'IC',
        nombre: 'Ica',
        lat: -14.0667,
        lng: -75.6667,
        vecinos: ['AR', 'AY', 'AP', 'LI']
    },
    {
        id: 'JC',
        nombre: 'Junín',
        lat: -11.4958,
        lng: -75.2044,
        vecinos: ['HU', 'AY', 'LI', 'PA']
    },
    {
        id: 'LA',
        nombre: 'Lambayeque',
        lat: -6.4884,
        lng: -79.9233,
        vecinos: ['PI', 'CA', 'AM', 'AN']
    },
    {
        id: 'LI',
        nombre: 'Lima',
        lat: -12.0464,
        lng: -77.0428,
        vecinos: ['AN', 'HU', 'JC', 'IC']
    },
    {
        id: 'LO',
        nombre: 'Loreto',
        lat: -4.3833,
        lng: -73.2333,
        vecinos: ['SM', 'AM']
    },
    {
        id: 'MD',
        nombre: 'Madre de Dios',
        lat: -12.1500,
        lng: -70.7500,
        vecinos: ['CU', 'PU', 'TA']
    },
    {
        id: 'MO',
        nombre: 'Moquegua',
        lat: -17.1933,
        lng: -70.9329,
        vecinos: ['AR', 'TA', 'PU']
    },
    {
        id: 'PA',
        nombre: 'Pasco',
        lat: -10.6838,
        lng: -75.2349,
        vecinos: ['AN', 'HU', 'JC', 'CU']
    },
    {
        id: 'PI',
        nombre: 'Piura',
        lat: -5.1945,
        lng: -80.6328,
        vecinos: ['LA', 'CA']
    },
    {
        id: 'PU',
        nombre: 'Puno',
        lat: -15.8402,
        lng: -70.0219,
        vecinos: ['CU', 'AP', 'MO', 'MD']
    },
    {
        id: 'SM',
        nombre: 'San Martín',
        lat: -6.7100,
        lng: -76.3600,
        vecinos: ['AM', 'CA', 'LO', 'HU']
    },
    {
        id: 'TA',
        nombre: 'Tacna',
        lat: -18.0066,
        lng: -70.2463,
        vecinos: ['MO', 'MD']
    },
    {
        id: 'TU',
        nombre: 'Tumbes',
        lat: -3.5667,
        lng: -80.4500,
        vecinos: ['PI']
    },
    {
        id: 'UC',
        nombre: 'Ucayali',
        lat: -9.9300,
        lng: -73.7000,
        vecinos: ['HU', 'LO']
    }
];

/**
 * Creates a graph representation from department data
 * @returns {Object} Graph with departments as nodes and neighbors as edges
 */
function crearGrafo() {
    const grafo = {};
    
    DEPARTAMENTOS.forEach(dep => {
        grafo[dep.id] = {
            nombre: dep.nombre,
            lat: dep.lat,
            lng: dep.lng,
            vecinos: {}
        };
    });
    
    DEPARTAMENTOS.forEach(dep => {
        dep.vecinos.forEach(vecinoId => {
            if (grafo[vecinoId]) {
                grafo[dep.id].vecinos[vecinoId] = true;
                grafo[vecinoId].vecinos[dep.id] = true;
            }
        });
    });
    
    return grafo;
}

/**
 * Get department by ID
 * @param {string} id - Department ID
 * @returns {Object|null} Department object or null
 */
function getDepartamento(id) {
    return DEPARTAMENTOS.find(d => d.id === id) || null;
}

/**
 * Get all department names for dropdown
 * @returns {Array} Array of department names and IDs
 */
function getDepartamentosList() {
    return DEPARTAMENTOS.map(d => ({
        id: d.id,
        nombre: d.nombre
    })).sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
}