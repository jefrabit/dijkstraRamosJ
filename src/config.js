/**
 * Configuracion del proyecto
 * Reemplaza TU_API_KEY_AQUI con tu clave de Google Maps
 * Obtener clave: https://console.cloud.google.com/google/maps-apis
 */

const GOOGLE_MAPS_API_KEY = 'AIzaSyDY8Gbdxg03Bh604ZB-IdrrZtQLMeFTOPU';

const CONFIG = {
    MAP_CONFIG: {
        center: { lat: -10, lng: -75 },
        zoom: 5,
        mapTypeId: 'roadmap'
    },

    GEOJSON_URL: 'peru-geojson/peru_departamental_simple.geojson',

    COLORS: {
        defaultFill: '#64748b',
        defaultFillOpacity: 0.25,
        defaultStroke: '#334155',
        defaultStrokeWeight: 1.5,
        hoverFillOpacity: 0.5,
        routeStroke: '#dc2626',
        routeStrokeWeight: 4,
        routeFillOpacity: 0.55,
        originMarker: '#22c55e',
        destMarker: '#ef4444'
    }
};
