Surfaces.prototype.ellipsoid = (count = 40, color = '#7B6800') => {
    let points = [];
    let edges = [];
    let polygons = [];
    const PI = Math.PI;
    let delta = 2 * PI / count;
    let R = 7;
    let a = 3, b = 5;
    // Расставить точки
    for (let i = 0; i <= 2 * PI; i += delta) {
        for (let j = 0; j < 2 * PI; j += delta) {
            const x = Math.cos(i) * Math.cos(j) * a;
            const y = Math.sin(j) * b;
            const z = a * Math.sin(i) * Math.cos(j);
            points.push(new Point(x, y, z));
        }
    }
    //Провести рёбра и полигоны
    for (let i = 0; i < points.length; i++) {
        if ((i + 1) < points.length && (i + 1) % count !== 0) {
            edges.push(new Edge(i, i + 1))
        }
        if (i + count < points.length) {
            edges.push(new Edge(i, i + count))
        }
    }
       //Полигоны
       for (let i = 0; i < points.length; i++) {
        if ((i + 1 + count) < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color))
        } else if ((i + count) < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color))
        }
    }


    return new Subject(
        points, edges, polygons
    );

}