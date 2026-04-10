/**
 * Configuration file for the Dijkstra Project
 * Contains global settings and API configuration
 */

const CONFIG = {
    GOOGLE_MAPS_API_KEY: 'AIzaSyDY8Gbdxg03Bh604ZB-IdrrZtQLMeFTOPU',
    
    MAP_CONFIG: {
        center: { lat: -9.19, lng: -75.015 },
        zoom: 5,
        mapTypeId: 'roadmap',
        styles: [
            {
                featureType: 'administrative.country',
                elementType: 'labels',
                stylers: [{ visibility: 'on' }]
            }
        ]
    },
    
    MARKER_CONFIG: {
        defaultIcon: null,
        origenColor: '#22c55e',
        destinoColor: '#ef4444'
    },
    
    POLYLINE_CONFIG: {
        conexiones: {
            strokeColor: '#94a3b8',
            strokeOpacity: 0.5,
            strokeWeight: 2
        },
        rutaOptima: {
            strokeColor: '#2563eb',
            strokeOpacity: 1,
            strokeWeight: 5
        }
    },
    
    DEPARTAMENTO_MARCADOR: {
        icon: null,
        title: ''
    }
};

function loadGoogleMaps() {
    if (typeof google !== 'undefined' && google.maps) {
        return Promise.resolve(google.maps);
    }
    
    return new Promise((resolve, reject) => {
        if (!CONFIG.GOOGLE_MAPS_API_KEY || CONFIG.GOOGLE_MAPS_API_KEY === 'YOUR_API_KEY_HERE') {
            reject(new Error('API Key no configurada. Edita src/config.js'));
            return;
        }
        
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${CONFIG.GOOGLE_MAPS_API_KEY}&callback=initMap`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve(google.maps);
        script.onerror = () => reject(new Error('Error al cargar Google Maps API'));
        document.head.appendChild(script);
    });
}

window.initMap = function() {
    console.log('Google Maps cargado correctamente');
};