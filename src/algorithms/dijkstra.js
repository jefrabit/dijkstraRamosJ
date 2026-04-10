/**
 * Algoritmo de Dijkstra - Implementación con Min-Heap
 * Encuentra la ruta más corta entre departamentos del Perú.
 */

class MinHeap {
    constructor() {
        this.heap = [];
        this.posMap = {};
    }

    _swap(i, j) {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
        this.posMap[this.heap[i].id] = i;
        this.posMap[this.heap[j].id] = j;
    }

    _bubbleUp(idx) {
        while (idx > 0) {
            const parent = (idx - 1) >> 1;
            if (this.heap[idx].priority >= this.heap[parent].priority) break;
            this._swap(idx, parent);
            idx = parent;
        }
    }

    _bubbleDown(idx) {
        const len = this.heap.length;
        while (true) {
            let smallest = idx;
            const left = (idx << 1) + 1;
            const right = left + 1;
            if (left < len && this.heap[left].priority < this.heap[smallest].priority) smallest = left;
            if (right < len && this.heap[right].priority < this.heap[smallest].priority) smallest = right;
            if (smallest === idx) break;
            this._swap(idx, smallest);
            idx = smallest;
        }
    }

    push(id, priority) {
        this.heap.push({ id, priority });
        this.posMap[id] = this.heap.length - 1;
        this._bubbleUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) {
            const node = this.heap.pop();
            delete this.posMap[node.id];
            return node;
        }
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.posMap[this.heap[0].id] = 0;
        delete this.posMap[min.id];
        this._bubbleDown(0);
        return min;
    }

    decreaseKey(id, newPriority) {
        const idx = this.posMap[id];
        if (idx === undefined) return;
        this.heap[idx].priority = newPriority;
        this._bubbleUp(idx);
    }

    has(id) {
        return this.posMap[id] !== undefined;
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

function dijkstra(graph, startId, endId) {
    if (!graph[startId] || !graph[endId]) {
        return { success: false, message: 'Origen o destino no válidos', path: [], distance: 0 };
    }
    if (startId === endId) {
        const node = graph[startId];
        return {
            success: true,
            path: [{ id: startId, nombre: node.nombre, lat: node.lat, lng: node.lng }],
            distance: 0,
            message: `Origen y destino son el mismo: ${node.nombre}`
        };
    }

    const distances = {};
    const previous = {};
    const visited = new Set();
    const pq = new MinHeap();

    for (const nodeId in graph) {
        distances[nodeId] = nodeId === startId ? 0 : Infinity;
        previous[nodeId] = null;
    }

    pq.push(startId, 0);

    while (!pq.isEmpty()) {
        const { id: currentId } = pq.pop();
        if (visited.has(currentId)) continue;
        visited.add(currentId);
        if (currentId === endId) break;

        const neighbors = graph[currentId].vecinos;
        for (const neighborId in neighbors) {
            if (visited.has(neighborId)) continue;
            const newDist = distances[currentId] + neighbors[neighborId].distance;
            if (newDist < distances[neighborId]) {
                distances[neighborId] = newDist;
                previous[neighborId] = currentId;
                if (pq.has(neighborId)) {
                    pq.decreaseKey(neighborId, newDist);
                } else {
                    pq.push(neighborId, newDist);
                }
            }
        }
    }

    if (distances[endId] === Infinity) {
        return { success: false, message: 'No existe ruta entre los departamentos seleccionados', path: [], distance: 0 };
    }

    const path = [];
    let curr = endId;
    while (curr !== null) {
        const node = graph[curr];
        path.push({ id: curr, nombre: node.nombre, lat: node.lat, lng: node.lng });
        curr = previous[curr];
    }
    path.reverse();

    return {
        success: true,
        path: path,
        distance: distances[endId],
        message: `Ruta encontrada: ${path.map(p => p.nombre).join(' → ')}`
    };
}
