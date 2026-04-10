/**
 * Dijkstra's Algorithm Implementation
 * 
 * This file implements the Dijkstra algorithm from scratch to find
 * the shortest path between departments in Peru.
 * 
 * The algorithm works by:
 * 1. Starting from the origin node
 * 2. Exploring neighbors and calculating distances
 * 3. Using a priority queue to always process the nearest unvisited node
 * 4. Building a shortest path tree from the origin
 * 5. Backtracking from destination to reconstruct the optimal path
 */

/**
 * Priority Queue Implementation
 * Used by Dijkstra to always process the node with minimum distance
 */
class PriorityQueue {
    constructor() {
        this.elements = [];
    }

    enqueue(element, priority) {
        this.elements.push({ element, priority });
        this.elements.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.elements.shift()?.element;
    }

    isEmpty() {
        return this.elements.length === 0;
    }

    contains(element) {
        return this.elements.some(e => e.element === element);
    }

    updatePriority(element, newPriority) {
        const index = this.elements.findIndex(e => e.element === element);
        if (index !== -1) {
            this.elements[index].priority = newPriority;
            this.elements.sort((a, b) => a.priority - b.priority);
        }
    }
}

/**
 * Calculate distance between two geographic points using Haversine formula
 * @param {number} lat1 - Latitude of first point
 * @param {number} lng1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lng2 - Longitude of second point
 * @returns {number} Distance in kilometers
 */
function haversineDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

/**
 * Build graph from department data
 * @param {Array} departamentos - Array of department objects
 * @returns {Object} Graph structure
 */
function buildGraph(departamentos) {
    const graph = {};
    
    departamentos.forEach(dep => {
        graph[dep.id] = {
            id: dep.id,
            nombre: dep.nombre,
            lat: dep.lat,
            lng: dep.lng,
            vecinos: {}
        };
    });
    
    departamentos.forEach(dep => {
        dep.vecinos.forEach(vecinoId => {
            const neighbor = departamentos.find(d => d.id === vecinoId);
            if (neighbor) {
                const distance = haversineDistance(
                    dep.lat, dep.lng,
                    neighbor.lat, neighbor.lng
                );
                graph[dep.id].vecinos[vecinoId] = {
                    id: neighbor.id,
                    nombre: neighbor.nombre,
                    distance: distance
                };
            }
        });
    });
    
    return graph;
}

/**
 * Get connections between departments (without weights)
 * Used for drawing all possible connections on the map
 * @param {Array} departamentos - Array of department objects
 * @returns {Array} Array of connection pairs
 */
function getConnections(departamentos) {
    const connections = [];
    const seen = new Set();
    
    departamentos.forEach(dep => {
        dep.vecinos.forEach(vecinoId => {
            const key = [dep.id, vecinoId].sort().join('-');
            if (!seen.has(key)) {
                seen.add(key);
                const neighbor = departamentos.find(d => d.id === vecinoId);
                if (neighbor) {
                    connections.push({
                        from: { id: dep.id, nombre: dep.nombre, lat: dep.lat, lng: dep.lng },
                        to: { id: neighbor.id, nombre: neighbor.nombre, lat: neighbor.lat, lng: neighbor.lng }
                    });
                }
            }
        });
    });
    
    return connections;
}

/**
 * Main Dijkstra algorithm implementation
 * @param {Object} graph - Graph structure with departments and neighbors
 * @param {string} startId - Origin department ID
 * @param {string} endId - Destination department ID
 * @returns {Object} Result with path and total distance
 */
function dijkstra(graph, startId, endId) {
    const distances = {};
    const previous = {};
    const visited = new Set();
    const pq = new PriorityQueue();
    
    Object.keys(graph).forEach(nodeId => {
        distances[nodeId] = Infinity;
        previous[nodeId] = null;
    });
    
    distances[startId] = 0;
    pq.enqueue(startId, 0);
    
    while (!pq.isEmpty()) {
        const currentId = pq.dequeue();
        
        if (currentId === endId) {
            break;
        }
        
        if (visited.has(currentId)) {
            continue;
        }
        
        visited.add(currentId);
        
        const currentNode = graph[currentId];
        const neighbors = currentNode.vecinos;
        
        Object.keys(neighbors).forEach(neighborId => {
            if (visited.has(neighborId)) {
                return;
            }
            
            const neighbor = neighbors[neighborId];
            const newDistance = distances[currentId] + neighbor.distance;
            
            if (newDistance < distances[neighborId]) {
                distances[neighborId] = newDistance;
                previous[neighborId] = currentId;
                pq.enqueue(neighborId, newDistance);
            }
        });
    }
    
    if (distances[endId] === Infinity) {
        return {
            success: false,
            message: 'No existe ruta entre los departamentos seleccionados',
            path: [],
            distance: 0
        };
    }
    
    const path = [];
    let currentId = endId;
    
    while (currentId !== null) {
        path.unshift({
            id: currentId,
            nombre: graph[currentId].nombre,
            lat: graph[currentId].lat,
            lng: graph[currentId].lng
        });
        currentId = previous[currentId];
    }
    
    return {
        success: true,
        path: path,
        distance: distances[endId],
        message: `Ruta encontrada: ${path.map(p => p.nombre).join(' → ')}`
    };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { haversineDistance, buildGraph, getConnections, dijkstra, PriorityQueue };
}