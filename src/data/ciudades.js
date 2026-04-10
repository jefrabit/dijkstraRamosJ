/**
 * Red de Carreteras del Perú - Segmentos de vía real
 * Puntos a lo largo de las principales carreteras del país
 */

// Puntos a lo largo de las carreteras principales del Perú
// Cada punto representa un segmento de carretera real

const CARRETERAS = {
    // ===== PANAMERICANA NORTE (Costa) =====
    'PN1': { id: 'PN1', nombre: 'Tumbes', lat: -3.5667, lng: -80.4500, carretera: 'Panamericana Norte', vecinos: ['PN2'] },
    'PN2': { id: 'PN2', nombre: 'Pimentel', lat: -3.7500, lng: -80.4000, carretera: 'Panamericana Norte', vecinos: ['PN1', 'PN3'] },
    'PN3': { id: 'PN3', nombre: 'Mancora', lat: -4.3500, lng: -81.2000, carretera: 'Panamericana Norte', vecinos: ['PN2', 'PN4'] },
    'PN4': { id: 'PN4', nombre: 'Piura (Norte)', lat: -5.1700, lng: -80.6000, carretera: 'Panamericana Norte', vecinos: ['PN3', 'PN5', 'LN1'] },
    'PN5': { id: 'PN5', nombre: 'Sullana', lat: -4.9000, lng: -80.6833, carretera: 'Panamericana Norte', vecinos: ['PN4', 'PN6'] },
    'PN6': { id: 'PN6', nombre: 'Talara', lat: -4.5800, lng: -81.2500, carretera: 'Panamericana Norte', vecinos: ['PN5', 'PN7'] },
    'PN7': { id: 'PN7', nombre: 'Mongón', lat: -4.4000, lng: -80.8500, carretera: 'Panamericana Norte', vecinos: ['PN6', 'LN1'] },
    
    // Lambayeque - La Libertad
    'LN1': { id: 'LN1', nombre: 'Lambayeque', lat: -6.4500, lng: -79.9000, carretera: 'Panamericana Norte', vecinos: ['PN4', 'PN7', 'LN2'] },
    'LN2': { id: 'LN2', nombre: 'Chiclayo', lat: -6.7500, lng: -79.8000, carretera: 'Panamericana Norte', vecinos: ['LN1', 'LN3', 'CS1'] },
    'LN3': { id: 'LN3', nombre: 'Eten', lat: -6.9000, lng: -79.8500, carretera: 'Panamericana Norte', vecinos: ['LN2', 'LN4'] },
    'LN4': { id: 'LN4', nombre: 'Santa Rosa', lat: -6.5000, lng: -79.7500, carretera: 'Panamericana Norte', vecinos: ['LN3', 'CS1', 'LN1'] },
    
    // Cajamarca
    'CS1': { id: 'CS1', nombre: 'Cajamarca Sur', lat: -7.1000, lng: -78.5000, carretera: 'Cajamarca - Chiclayo', vecinos: ['LN2', 'LN4', 'CS2', 'SM1'] },
    'CS2': { id: 'CS2', nombre: 'Contumazá', lat: -7.8000, lng: -79.3000, carretera: 'Cajamarca - Contumazá', vecinos: ['CS1', 'CS3'] },
    'CS3': { id: 'CS3', nombre: 'San Benito', lat: -7.9000, lng: -79.1000, carretera: 'Contumazá - Trujillo', vecinos: ['CS2', 'LL1'] },
    
    // La Libertad
    'LL1': { id: 'LL1', nombre: 'Trujillo', lat: -8.1000, lng: -79.0000, carretera: 'Panamericana Norte', vecinos: ['CS3', 'LL2', 'LL3', 'CC1'] },
    'LL2': { id: 'LL2', nombre: 'Victor Larrea', lat: -8.2000, lng: -79.0000, carretera: 'Panamericana Norte', vecinos: ['LL1', 'LL3'] },
    'LL3': { id: 'LL3', nombre: 'Laredo', lat: -8.2800, lng: -79.0000, carretera: 'Panamericana Norte', vecinos: ['LL1', 'LL2', 'LL4'] },
    'LL4': { id: 'LL4', nombre: 'Chimbote', lat: -9.0800, lng: -78.5500, carretera: 'Panamericana Norte', vecinos: ['LL3', 'LL5', 'AN1'] },
    'LL5': { id: 'LL5', nombre: 'Samanco', lat: -9.2200, lng: -78.5500, carretera: 'Panamericana Norte', vecinos: ['LL4', 'LL6'] },
    'LL6': { id: 'LL6', nombre: 'Guarmey', lat: -9.4000, lng: -78.6000, carretera: 'Panamericana Norte', vecinos: ['LL5', 'LL7'] },
    'LL7': { id: 'LL7', nombre: 'Culebras', lat: -9.5200, lng: -78.2500, carretera: 'Panamericana Norte', vecinos: ['LL6', 'LM1'] },
    
    // Lima
    'LM1': { id: 'LM1', nombre: 'Barranca', lat: -10.7300, lng: -77.7500, carretera: 'Panamericana Norte', vecinos: ['LL7', 'LM2', 'LM3'] },
    'LM2': { id: 'LM2', nombre: 'Supe', lat: -10.8000, lng: -77.7000, carretera: 'Panamericana Norte', vecinos: ['LM1', 'LM3'] },
    'LM3': { id: 'LM3', nombre: 'Paramonga', lat: -10.6500, lng: -77.8000, carretera: 'Panamericana Norte', vecinos: ['LM1', 'LM2', 'LM4'] },
    
    // ===== PANAMERICANA SUR (Costa) =====
    'PS1': { id: 'PS1', nombre: 'Lima Centro', lat: -12.0000, lng: -77.0000, carretera: 'Panamericana Sur', vecinos: ['LM3', 'PS2', 'CC2', 'CC3'] },
    'PS2': { id: 'PS2', nombre: 'Cañete', lat: -12.9000, lng: -76.3500, carretera: 'Panamericana Sur', vecinos: ['PS1', 'PS3'] },
    'PS3': { id: 'PS3', nombre: 'Chilca', lat: -13.0000, lng: -76.5500, carretera: 'Panamericana Sur', vecinos: ['PS2', 'PS4'] },
    'PS4': { id: 'PS4', nombre: 'Mala', lat: -13.1500, lng: -76.6000, carretera: 'Panamericana Sur', vecinos: ['PS3', 'PS5'] },
    'PS5': { id: 'PS5', nombre: 'Asia', lat: -13.2000, lng: -76.5500, carretera: 'Panamericana Sur', vecinos: ['PS4', 'PS6'] },
    'PS6': { id: 'PS6', nombre: 'Ica Norte', lat: -14.0500, lng: -75.6500, carretera: 'Panamericana Sur', vecinos: ['PS5', 'PS7', 'IC1'] },
    'PS7': { id: 'PS7', nombre: 'Ica Sur', lat: -14.1000, lng: -75.7000, carretera: 'Panamericana Sur', vecinos: ['PS6', 'PS8'] },
    'PS8': { id: 'PS8', nombre: 'Pueblo Nuevo', lat: -13.9500, lng: -75.9000, carretera: 'Panamericana Sur', vecinos: ['PS7', 'PS9'] },
    'PS9': { id: 'PS9', nombre: 'Montegrande', lat: -14.1000, lng: -75.8000, carretera: 'Panamericana Sur', vecinos: ['PS8', 'PS10'] },
    'PS10': { id: 'PS10', nombre: 'Rosario', lat: -14.2000, lng: -75.7500, carretera: 'Panamericana Sur', vecinos: ['PS9', 'PS11'] },
    'PS11': { id: 'PS11', nombre: 'Huaya', lat: -14.2500, lng: -75.7000, carretera: 'Panamericana Sur', vecinos: ['PS10', 'PS12'] },
    'PS12': { id: 'PS12', nombre: 'Nasca', lat: -14.8200, lng: -74.9500, carretera: 'Panamericana Sur', vecinos: ['PS11', 'PS13', 'AY1'] },
    'PS13': { id: 'PS13', nombre: 'Lonas', lat: -15.0000, lng: -74.5000, carretera: 'Panamericana Sur', vecinos: ['PS12', 'PS14'] },
    'PS14': { id: 'PS14', nombre: 'Puquio', lat: -15.0500, lng: -74.1000, carretera: 'Panamericana Sur', vecinos: ['PS13', 'PS15'] },
    'PS15': { id: 'PS15', nombre: 'Cayallí', lat: -15.1500, lng: -73.8000, carretera: 'Panamericana Sur', vecinos: ['PS14', 'PS16'] },
    'PS16': { id: 'PS16', nombre: 'Chalcos', lat: -15.2000, lng: -73.5000, carretera: 'Panamericana Sur', vecinos: ['PS15', 'PS17'] },
    'PS17': { id: 'PS17', nombre: 'Pausa', lat: -15.2500, lng: -73.3000, carretera: 'Panamericana Sur', vizinhos: ['PS16', 'PS18'] },
    'PS18': { id: 'PS18', nombre: 'Quillabamba', lat: -15.1500, lng: -73.1000, carretera: 'Panamericana Sur', vecinos: ['PS17', 'AR1'] },
    
    // ===== CARRETERA CENTRAL (Sierra Central) =====
    'CC1': { id: 'CC1', nombre: 'Huaraz', lat: -9.5000, lng: -77.5000, carretera: 'Carretera Central', vecinos: ['LL1', 'CC2', 'AN1', 'CC4'] },
    'CC2': { id: 'CC2', nombre: 'Carhuaz', lat: -9.0000, lng: -77.6000, carretera: 'Carretera Central', vecinos: ['CC1', 'CC3'] },
    'CC3': { id: 'CC3', nombre: 'Yungay', lat: -9.3500, lng: -77.7000, carretera: 'Carretera Central', vecinos: ['CC2', 'CC4'] },
    'CC4': { id: 'CC4', nombre: 'Recuay', lat: -9.7000, lng: -77.3000, carretera: 'Carretera Central', vecinos: ['CC1', 'CC3', 'CC5', 'PA1'] },
    'CC5': { id: 'CC5', nombre: 'Lampa', lat: -9.8000, lng: -77.3000, carretera: 'Carretera Central', vizinhos: ['CC4', 'CC6'] },
    'CC6': { id: 'CC6', nombre: 'Pisco', lat: -9.9000, lng: -76.9500, carretera: 'Carretera Central', vecinos: ['CC5', 'CC7', 'HU1'] },
    'CC7': { id: 'CC7', nombre: 'Llata', lat: -9.2500, lng: -76.5500, carretera: 'Carretera Central', vecinos: ['CC6', 'CC8', 'HU2'] },
    'CC8': { id: 'CC8', nombre: 'Huari', lat: -9.3000, lng: -77.0500, carretera: 'Carretera Central', vecinos: ['CC7', 'CC9'] },
    'CC9': { id: 'CC9', nombre: 'Tullucana', lat: -11.7500, lng: -75.2500, carretera: 'Carretera Central', vecinos: ['CC8', 'CC10', 'JC1'] },
    'CC10': { id: 'CC10', nombre: 'Huancayo', lat: -12.0500, lng: -75.2000, carretera: 'Carretera Central', vecinos: ['CC9', 'CC11', 'HV1'] },
    'CC11': { id: 'CC11', nombre: 'La Oroya', lat: -11.3000, lng: -75.8000, carretera: 'Carretera Central', vecinos: ['CC10', 'CC12', 'PA2'] },
    'CC12': { id: 'CC12', nombre: 'Cerro de Pasco', lat: -10.6500, lng: -75.2000, carretera: 'Carretera Central', vecinos: ['CC11', 'CC13', 'PA1'] },
    'CC13': { id: 'CC13', nombre: 'Junín', lat: -11.4500, lng: -75.2000, carretera: 'Carretera Central', vecinos: ['CC12', 'CC9', 'JC1'] },
    
    // ===== CARRETERA LONGITUDINAL DE LA SIERRA =====
    // Norte - Cajamarca a Cusco
    'LS1': { id: 'LS1', nombre: 'Cajamarca', lat: -7.1500, lng: -78.5000, carretera: 'Longitudinal Sierra', vecinos: ['CS1', 'LS2', 'SM1'] },
    'LS2': { id: 'LS2', nombre: 'Jaén', lat: -5.7000, lng: -78.5500, carretera: 'Longitudinal Sierra', vecinos: ['LS1', 'LS3', 'AM1'] },
    'LS3': { id: 'LS3', nombre: 'Bagua', lat: -5.6000, lng: -78.5000, carretera: 'Longitudinal Sierra', vecinos: ['LS2', 'LS4'] },
    'LS4': { id: 'LS4', nombre: 'Chachapoyas', lat: -6.2000, lng: -77.8000, carretera: 'Longitudinal Sierra', vizinhos: ['LS3', 'LS5'] },
    'LS5': { id: 'LS5', nombre: 'Moyobamba', lat: -6.0000, lng: -76.9500, carretera: 'Longitudinal Sierra', vecinos: ['LS4', 'LS6', 'SM2'] },
    'LS6': { id: 'LS6', nombre: 'Tarapoto', lat: -6.4500, lng: -76.3500, carretera: 'Longitudinal Sierra', vecinos: ['LS5', 'LS7', 'HU3'] },
    'LS7': { id: 'LS7', nombre: 'Huánuco', lat: -9.9000, lng: -76.2000, carretera: 'Longitudinal Sierra', vecinos: ['LS6', 'CC7', 'LS8', 'CC4'] },
    'LS8': { id: 'LS8', nombre: 'Pasco', lat: -10.6500, lng: -75.2000, carretera: 'Longitudinal Sierra', vecinos: ['LS7', 'CC12', 'CU1'] },
    
    // Sur - Cusco a Tacna
    'CU1': { id: 'CU1', nombre: 'Cusco', lat: -13.5000, lng: -71.9500, carretera: 'Longitudinal Sierra', vecinos: ['LS8', 'CU2', 'AP1', 'AR2'] },
    'CU2': { id: 'CU2', nombre: 'Urubamba', lat: -13.3000, lng: -72.1000, carretera: 'Longitudinal Sierra', vecinos: ['CU1', 'CU3'] },
    'CU3': { id: 'CU3', nombre: 'Ollantaytambo', lat: -13.2500, lng: -72.2500, carretera: 'Longitudinal Sierra', vecinos: ['CU2', 'CU4'] },
    'CU4': { id: 'CU4', nombre: 'Quillabamba', lat: -12.8500, lng: -72.7000, carretera: 'Longitudinal Sierra', vecinos: ['CU3', 'CU1', 'PU1'] },
    'CU5': { id: 'CU5', nombre: 'Abancay', lat: -13.6000, lng: -72.8500, carretera: 'Longitudinal Sierra', vecinos: ['CU1', 'AP1', 'AR2'] },
    
    // Apurímac
    'AP1': { id: 'AP1', nombre: 'Apurímac', lat: -14.0500, lng: -72.9000, carretera: 'Longitudinal Sierra', vecinos: ['CU1', 'CU5', 'AP2'] },
    'AP2': { id: 'AP2', nombre: 'Andahuaylas', lat: -13.6500, lng: -73.3500, carretera: 'Longitudinal Sierra', vecinos: ['AP1', 'AY2'] },
    
    // Ayacucho
    'AY1': { id: 'AY1', nombre: 'Ayacucho', lat: -13.1500, lng: -74.2000, carretera: 'Longitudinal Sierra', vecinos: ['PS12', 'AY2', 'HV1'] },
    'AY2': { id: 'AY2', nombre: 'Abancay', lat: -13.6000, lng: -72.8500, carretera: 'Longitudinal Sierra', vecinos: ['AY1', 'AP2', 'CU5'] },
    
    // Arequipa - Moquegua - Tacna
    'AR1': { id: 'AR1', nombre: 'Arequipa', lat: -16.4000, lng: -71.5000, carretera: 'Longitudinal Sierra', vecinos: ['AR2', 'AR3', 'MO1'] },
    'AR2': { id: 'AR2', nombre: 'Cajón', lat: -15.9500, lng: -71.8000, carretera: 'Longitudinal Sierra', vecinos: ['AR1', 'CU5', 'MO1'] },
    'AR3': { id: 'AR3', nombre: 'Mollendo', lat: -17.0000, lng: -72.0000, carretera: 'Longitudinal Sierra', vecinos: ['AR1', 'PS18'] },
    
    'MO1': { id: 'MO1', nombre: 'Moquegua', lat: -17.1500, lng: -70.9000, carretera: 'Longitudinal Sierra', vecinos: ['AR1', 'MO2', 'TA1'] },
    'MO2': { id: 'MO2', nombre: 'Torata', lat: -17.1000, lng: -70.8000, carretera: 'Longitudinal Sierra', vecinos: ['MO1', 'MO3'] },
    'MO3': { id: 'MO3', nombre: 'Ilo', lat: -17.6000, lng: -71.3000, carretera: 'Longitudinal Sierra', vecinos: ['MO2', 'TA1'] },
    
    'TA1': { id: 'TA1', nombre: 'Tacna', lat: -18.0000, lng: -70.2500, carretera: 'Longitudinal Sierra', vecinos: ['MO1', 'MO3', 'TA2'] },
    'TA2': { id: 'TA2', nombre: 'Tarata', lat: -17.6500, lng: -70.0000, carretera: 'Longitudinal Sierra', vecinos: ['TA1'] },
    
    // Puno
    'PU1': { id: 'PU1', nombre: 'Puno', lat: -15.8000, lng: -70.0000, carretera: 'Longitudinal Sierra', vecinos: ['CU4', 'PU2', 'MD1'] },
    'PU2': { id: 'PU2', nombre: 'Juliaca', lat: -15.4500, lng: -70.1000, carretera: 'Longitudinal Sierra', vecinos: ['PU1', 'PU3', 'MD1'] },
    'PU3': { id: 'PU3', nombre: 'Desaguadero', lat: -16.5500, lng: -69.0000, carretera: 'Longitudinal Sierra', vecinos: ['PU2'] },
    
    // Madre de Dios
    'MD1': { id: 'MD1', nombre: 'Puerto Maldonado', lat: -12.6000, lng: -69.2000, carretera: 'Carretera Interoceánica', vecinos: ['PU1', 'PU2', 'MD2'] },
    'MD2': { id: 'MD2', nombre: 'Bambú', lat: -12.7500, lng: -69.5000, carretera: 'Carretera Interoceánica', vecinos: ['MD1', 'MD3'] },
    'MD3': { id: 'MD3', nombre: 'Tambopata', lat: -13.2000, lng: -70.3000, carretera: 'Carretera Interoceánica', vecinos: ['MD2'] },
    
    // ===== CARRETERA MARGINAL DE LA SELVA =====
    // Amazonas - San Martín
    'AM1': { id: 'AM1', nombre: 'Bagua', lat: -5.6000, lng: -78.5000, carretera: 'Marginal Selva', vecinos: ['LS2', 'AM2'] },
    'AM2': { id: 'AM2', nombre: 'Chachapoyas', lat: -6.2000, lng: -77.8000, carretera: 'Marginal Selva', vecinos: ['AM1', 'AM3', 'LS4'] },
    'AM3': { id: 'AM3', nombre: 'Moyobamba', lat: -6.0000, lng: -76.9500, carretera: 'Marginal Selva', vecinos: ['AM2', 'SM2'] },
    'SM1': { id: 'SM1', nombre: 'San Martín', lat: -6.7000, lng: -76.3500, carretera: 'Marginal Selva', vecinos: ['LS1', 'SM2', 'SM3'] },
    'SM2': { id: 'SM2', nombre: 'Moyobamba', lat: -6.0000, lng: -76.9500, carretera: 'Marginal Selva', vecinos: ['SM1', 'SM3', 'AM3', 'LS5'] },
    'SM3': { id: 'SM3', nombre: 'Tarapoto', lat: -6.4500, lng: -76.3500, carretera: 'Marginal Selva', vecinos: ['SM1', 'SM2', 'HU3'] },
    
    // Huánuco - Ucayali
    'HU1': { id: 'HU1', nombre: 'Huánuco', lat: -9.9000, lng: -76.2000, carretera: 'Marginal Selva', vecinos: ['CC6', 'HU2', 'HU3', 'LS7'] },
    'HU2': { id: 'HU2', nombre: 'Tingo María', lat: -9.2800, lng: -76.0000, carretera: 'Marginal Selva', vecinos: ['HU1', 'HU3', 'CC7'] },
    'HU3': { id: 'HU3', nombre: 'Tocache', lat: -8.1800, lng: -76.5000, carretera: 'Marginal Selva', vecinos: ['HU2', 'LS6', 'SM3', 'UC1'] },
    
    // Ucayali
    'UC1': { id: 'UC1', nombre: 'Pucallpa', lat: -8.4000, lng: -74.5500, carretera: 'Marginal Selva', vecinos: ['HU3', 'UC2'] },
    'UC2': { id: 'UC2', nombre: 'Callería', lat: -8.4000, lng: -74.5500, carretera: 'Marginal Selva', vecinos: ['UC1', 'LO1'] },
    
    // Loreto
    'LO1': { id: 'LO1', nombre: 'Nauta', lat: -4.5500, lng: -73.6000, carretera: 'Marginal Selva', vecinos: ['UC2', 'LO2'] },
    'LO2': { id: 'LO2', nombre: 'Iquitos', lat: -3.7500, lng: -73.2500, carretera: 'Marginal Selva', vecinos: ['LO1'] },
    
    // ===== CARRETERAS ADICIONALES =====
    // Lima - Callao
    'LI1': { id: 'LI1', nombre: 'Callao', lat: -12.0500, lng: -77.1000, carretera: 'Costanera', vecinos: ['PS1', 'LI2'] },
    'LI2': { id: 'LI2', nombre: 'Lima Centro', lat: -12.0000, lng: -77.0000, carretera: 'Costanera', vecinos: ['LI1', 'PS1'] },
    
    // Huancavelica
    'HV1': { id: 'HV1', nombre: 'Huancavelica', lat: -12.7500, lng: -74.9500, carretera: 'Huancayo - Huancavelica', vecinos: ['CC10', 'AY1', 'HV2'] },
    'HV2': { id: 'HV2', nombre: 'Pampas', lat: -12.5500, lng: -74.5000, carretera: 'Huancavelica - Pampas', vecinos: ['HV1', 'HV3'] },
    'HV3': { id: 'HV3', nombre: 'Acobamba', lat: -12.8000, lng: -75.2000, carretera: 'Huancavelica - Acobamba', vecinos: ['HV2', 'CC10'] },
    
    // Pasco
    'PA1': { id: 'PA1', nombre: 'Cerro de Pasco', lat: -10.6500, lng: -75.2000, carretera: 'Pasco - Huánuco', vecinos: ['CC4', 'CC12', 'PA2'] },
    'PA2': { id: 'PA2', nombre: 'La Oroya', lat: -11.3000, lng: -75.8000, carretera: 'Pasco - La Oroya', vecinos: ['PA1', 'CC11'] },
    
    // Junín
    'JC1': { id: 'JC1', nombre: 'Junín', lat: -11.4500, lng: -75.2000, carretera: 'Junín - Lima', vecinos: ['CC9', 'CC13', 'JC2'] },
    'JC2': { id: 'JC2', nombre: 'San Ramón', lat: -11.8000, lng: -75.3000, carretera: 'Junín - Chanchamayo', vecinos: ['JC1', 'JC3'] },
    'JC3': { id: 'JC3', nombre: 'Pichana', lat: -11.4000, lng: -75.3500, carretera: 'Pichana - La Oroya', vecinos: ['JC2', 'CC11'] }
};

function crearGrafoCarreteras() {
    const grafo = {};
    
    Object.values(CARRETERAS).forEach(punto => {
        grafo[punto.id] = {
            id: punto.id,
            nombre: punto.nombre,
            lat: punto.lat,
            lng: punto.lng,
            carretera: punto.carretera,
            vecinos: {}
        };
    });
    
    Object.values(CARRETERAS).forEach(punto => {
        (punto.vecinos || []).forEach(vecinoId => {
            const neighbor = CARRETERAS[vecinoId];
            if (neighbor) {
                const distancia = haversineDistance(
                    punto.lat, punto.lng,
                    neighbor.lat, neighbor.lng
                );
                grafo[punto.id].vecinos[vecinoId] = {
                    id: neighbor.id,
                    nombre: neighbor.nombre,
                    distance: distancia,
                    carretera: neighbor.carretera
                };
            }
        });
    });
    
    return grafo;
}

function haversineDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function getPuntosCarretera() {
    return Object.values(CARRETERAS).map(p => ({
        id: p.id,
        nombre: `${p.nombre} (${p.carretera})`
    })).sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
}

function getPuntoCarretera(id) {
    return CARRETERAS[id] || null;
}

function getConnectionsCarreteras() {
    const connections = [];
    const seen = new Set();
    
    Object.values(CARRETERAS).forEach(punto => {
        (punto.vecinos || []).forEach(vecinoId => {
            const key = [punto.id, vecinoId].sort().join('-');
            if (!seen.has(key)) {
                seen.add(key);
                const neighbor = CARRETERAS[vecinoId];
                if (neighbor) {
                    connections.push({
                        from: { id: punto.id, nombre: punto.nombre, lat: punto.lat, lng: punto.lng, carretera: punto.carretera },
                        to: { id: neighbor.id, nombre: neighbor.nombre, lat: neighbor.lat, lng: neighbor.lng, carretera: neighbor.carretera }
                    });
                }
            }
        });
    });
    
    return connections;
}