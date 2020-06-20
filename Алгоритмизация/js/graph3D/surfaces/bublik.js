Surfaces.prototype.bublick = (count = 40, R = 7, point = new Point(0, 0, 0), color = '#ff0000', animation) => {
    let points = [];
    let edges = [];
    let polygons = [];
    const PI = Math.PI;
    let delta = 2 * PI / count;

    // Расставить точки
    for (let i = 1; i <= 2; i++) {
        for (let j = 0; j < 2 * PI; j += delta) {
            const x = point.y;;
            const y = point.x + R * Math.cos(j) / i
            const z = point.z + R * Math.sin(j) / i;
            points.push(new Point(x, y, z));
        }
    }

    for (let i = 2; i >= 1; i--) {
        for (let j = 0; j < 2 * PI; j += delta) {
            const x = point.y + 0.2;
            const y = point.x + R * Math.cos(j) / i;
            const z = point.z + R * Math.sin(j) / i;
            points.push(new Point(x, y, z));
        }
    }

    //Провести рёбра
    for (let i = 0; i < points.length; i++) {
        //вдоль
        if ((i + 1) < points.length && (i + 1) % count !== 0) {
            edges.push(new Edge(i, i + 1))
        } else if ((i + 1) % count === 0) {
            edges.push(new Edge(i, i + 1 - count));
        }
        //поперёк
        if (i + count < points.length) {
            edges.push(new Edge(i, i + count))
        }
        if (i + 3 * count < points.length) {
            edges.push(new Edge(i, i + 3 * count))

        }
    }
    //Полигоны
    for (let i = 0; i < points.length; i++) {
        if ((i + 1 + count) < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color))
        } else if ((i + count) < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color))
        }
        if (i + 3 * count < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 3 * count + 1, i + 3 * count], color))
        }
    }

    return new Subject(
        points, edges, polygons, animation
    );

}