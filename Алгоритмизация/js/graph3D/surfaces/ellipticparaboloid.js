Surfaces.prototype.ellipticparaboloid = (count = 30, point = new Point(0, 0, 0), R = 5) => {
    const points = [];
    const edges = [];
    const polygons = [];
    const size = 10;
    const delta = Math.PI  * 2 / count;

    for (let i = 0; i <= Math.PI * 2; i+=delta) {
        for (let j = 0; j <= Math.PI * 2; j+=delta) {
            const x = point.x +  Math.sin(i) * Math.cos(j) ;
            const y = point.y +  Math.sin(i) * Math.sin(j) ;
            const z = point.z + x * x   + y * y; 

            points.push(new Point(x, y, z));
        }  
    }
    //Дно
    for (let i = 0; i <= Math.PI * 2; i+=delta) {
        for (let j = 0; j <= Math.PI * 2; j+=delta) {
            const a =   Math.sin(i) * Math.cos(j) ;
            const b =   Math.sin(i) * Math.sin(j) ;
            const c = 1;

            points.push(new Point(a, b, c));
        }
    }

    for (let i = 0; i < points.length; i++) {
        if (i + 1 < points.length && (i + 1 % count !== 0)) {
            edges.push(new Edge(i, i + 1));
        }

        if (i + count < points.length) {
            edges.push(new Edge(i, i + 1));
        }
        if (i + 1 + count < points.length && (i + 1 % count !== 0)){
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]));
        }
    }
    return new Subject(points, edges, polygons);
}