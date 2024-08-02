const { getAllRoads } = require("../controller/road.controller");

const dijakstra = async (start_location, end_location) => {
    const graph = {};
    const allRoads = await getAllRoads();
    //Create Graph with distance and estimated time based on distance and traffic conditopn

    allRoads.forEach((road) => {
        if (!graph[road.start_location_id]) {
            graph[road.start_location_id] = {};
        }
        if (!graph[road.end_location_id]) {
            graph[road.end_location_id] = {};
        }

        //I am assuming that if not traffic average speed is 60km/h , if traffic is moderate then average speed is 30km/h and if traffic is low then average speed is 15km/h
        graph[road.start_location_id][road.end_location_id] = {
            dist: road.distance,
            time: road.traffic_condition == 1 ? road * distance : road.traffic_condition == 5 ? road.distance * 2 : road.distance * 3
        };
        graph[road.end_location_id][road.start_location_id] = {
            dist: road.distance,
            time: road.traffic_condition == 1 ? road * distance : road.traffic_condition == 5 ? road.distance * 2 : road.distance * 3
        };
    });

    const visited = {};
    const distance = {};
    const time = {};
    const path = {};

    const allLocations = Object.keys(graph);
    allLocations.forEach((location) => {
        distance[location] = Infinity;
        time[location] = Infinity;
    });

    distance[start_location] = 0;
    time[start_location] = 0;

    for (let i = 0; i < allLocations.length; i++) {
        const current = findMinDistance(distance, visited);
        if (!current) {
            return -1;
        }
        visited[current] = true;
        for (const neighbor in graph[current]) {
            const newDistance = distance[current] + graph[current][neighbor].dist;
            const newTime = time[current] + graph[current][neighbor].time;
            if (newDistance < distance[neighbor]) {
                distance[neighbor] = newDistance;
                time[neighbor] = newTime;
                path[neighbor] = current;
            }
        }
    }
    const shortestDistance = 0;
    const shortestTime = 0;

    const shortestPath = [end_location];
    let current = end_location;
    while (current !== start_location) {
        current = path[current];
        shortestDistance += distance[current];
        shortestTime += time[current];
        shortestPath.push(current);
    }
    return { path: shortestPath.reverse(), total_distance: shortestDistance, estimated_time: shortestTime };
}

const findMinDistance = (distance, visited) => {
    let min = Infinity;
    let minNode = null;
    for (const node in distance) {
        if (distance[node] < min && !visited[node]) {
            min = distance[node];
            minNode = node;
        }
    }
    return minNode;
}

module.exports = { dijakstra }