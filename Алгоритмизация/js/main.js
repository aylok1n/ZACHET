window.requestAnimFrame = (function (){
    return window.requestAnimationFrame        ||
           window.webkitRequestAnimationFrame  ||
           window.mozRequestAnimationFrame     ||
           window.oRequestAnimationFrame       ||
           window.msRequestAnimationFrame      ||
           function(callback) {
               window.setTimeout(callback, 1000 / 60);
           };

})();

window.onload = function () {
    const WINDOW = {
        LEFT: -10,
        BOTTOM: -10,
        WIDTH: 20,
        HEIGHT: 20,
        P1 : new Point(-10,10,-30),//левый верхний угол
        P2 : new Point(-10,-10,-30),//левый нижний угол
        P3 : new Point(10,-10,-30),//правый нижний угол
        CENTER: new Point(0, 0, -60), // центр окошка, через которое видим мир
        CAMERA: new Point(0, 0, -20) // точка, из которой смотрим на мир
    };
    const ZOOM_OUT = 1.1;
    const ZOOM_IN = 0.9;

    const sur = new Surfaces;
    const canvas = new Canvas({ id: 'canvas', width: 800, height: 800, WINDOW, callbacks: { wheel, mousemove, mouseup, mousedown, mouseleave }});
    const graph3D = new Graph3D({ WINDOW });
    const ui = new UI({ canvas, callbacks : { move, printPoints, printEdges, printPolygons}})
    const spheraZ = sur.sphera(count = 20, R = 6, point = new Point(0, 0, 0), color = '#ff0000', animation);
    spheraZ.polygons[74].visible = 0
    spheraZ.polygons[75].visible = 0
    spheraZ.polygons[76].visible = 0
    spheraZ.polygons[64].visible = 0
    spheraZ.polygons[65].visible = 0
    spheraZ.polygons[66].visible = 0
    spheraZ.polygons[84].visible = 0
    spheraZ.polygons[85].visible = 0
    spheraZ.polygons[86].visible = 0
    spheraZ.polygons[94].visible = 0
    spheraZ.polygons[95].visible = 0
    spheraZ.polygons[96].visible = 0
    spheraZ.polygons[104].visible = 0
    spheraZ.polygons[105].visible = 0
    spheraZ.polygons[106].visible = 0
    spheraZ.polygons[114].visible = 0
    spheraZ.polygons[115].visible = 0
    spheraZ.polygons[116].visible = 0
    const SCENE = [

    
         spheraZ

        
          ]; // сцена
     const LIGHT = new Light(-20, 2, -20, 200);

     let canRotate = false;
     let canPrint = {
         points: false,
         edges: false,
         polygons: true
     }

    // about callbacks
    function wheel(event) {
        const delta = (event.wheelDelta > 0) ? ZOOM_IN : ZOOM_OUT;
        graph3D.zoomMatrix(delta);
        SCENE.forEach(subject => {
            subject.points.forEach(point => graph3D.transform(point));
            if (subject.animation ) {
                for (let key in subject.animation) {
                    graph3D.transform(subject.animation[key]);
                }
                
            }
        });
    }

    function mouseup() {
        canRotate = false;
    }

    function mouseleave() {
        mouseup();
    }

    function mousedown() {
        canRotate = true;
    }

    function mousemove(event) {
        /*if (canRotate) {
            if (event.movementX) {
                const alpha = canvas.sx(event.movementX) / WINDOW.CENTER.z;
                graph3D.rotateOyMatrix(alpha);
                SCENE.forEach(subject => {
                    subject.points.forEach(point => graph3D.transform(point));
                    if (subject.animation ) {
                        for (let key in subject.animation) {
                            graph3D.transform(subject.animation[key]);
                        }
                        
                    }       
                })
            }    
            if (event.movementY) {
                const alpha = canvas.sy(event.movementY) / WINDOW.CENTER.z;
                graph3D.rotateOxMatrix(alpha);
                SCENE.forEach(subject => {
                    subject.points.forEach(point => graph3D.transform(point));                      
                    if (subject.animation) {
                        for (let key in subject.animation) {
                            graph3D.transform(subject.animation[key]);
                        }                      
                    }
                });
            }    
        }
        if (event.movementX) {
        const alpha = canvas.sx(event.movementX) ;
        graph3D.rotateOyMatrix(alpha); 
        
        
        }
        if (event.movementY) {
            const alpha = canvas.sy(event.movementY) ;
        graph3D.rotateOxMatrix(alpha); 
        
        
        }
        graph3D.transform(WINDOW.CAMERA);
        graph3D.transform(WINDOW.CENTER);
        graph3D.transform(WINDOW.P1);
        graph3D.transform(WINDOW.P2);
        graph3D.transform(WINDOW.P3);*/
    };

    function printPoints(value) {
        canPrint.points = value;
    };

    function printEdges(value) {
        canPrint.edges = value;
    }

    function printPolygons(value) {
        canPrint.polygons = value;
        
    };


    function move(direction) {
        switch(direction){
            case 'up': graph3D.rotateOxMatrix(-Math.PI / 180); break;
            case 'down': graph3D.rotateOxMatrix(Math.PI / 180); break;
            case 'left': graph3D.rotateOyMatrix(-Math.PI / 180); break;
            case 'right': graph3D.rotateOyMatrix(Math.PI / 180); break;
        }
        graph3D.transform(WINDOW.CAMERA);
        graph3D.transform(WINDOW.CENTER);
        graph3D.transform(WINDOW.P1);
        graph3D.transform(WINDOW.P2);
        graph3D.transform(WINDOW.P3);
        /*if (direction == 'up' || direction == 'down') {
            const delta = (direction === 'up') ? 0.1 : -0.1;
            graph3D.moveMatrix(0, delta, 0);
            SCENE.forEach(subject => subject.points.forEach(point => graph3D.transform(point)));
        }
        if (direction == 'left' || direction == 'right') {
            const delta = (direction === 'right') ? 0.1 : -0.1;
            graph3D.moveMatrix(delta, 0, 0);
            SCENE.forEach(subject => subject.points.forEach(point => graph3D.transform(point)));
        }*/
    }


    function printAllPolygons(){
        // print polygons
        if (canPrint.polygons) {

            const polygons = [];
            //предварительные расчёты
            SCENE.forEach(subject => {
                // алгоритм художника
                //graph3D.calcCorner(subject, WINDOW.CAMERA);
                graph3D.calcDistance(subject, WINDOW.CAMERA, 'distance');
                graph3D.calcCenters(subject);
                graph3D.calcDistance(subject, LIGHT, 'lumen');
            });
              //расчёт освещенности и проекции на экран
            SCENE.forEach(subject => {
                // Отсечь невидимые грани
                //graph3D.calcCorner(subject, WINDOW.CAMERA);

                // алгоритм художника
                // отрисовка полигонов
                for (let i = 0; i < subject.polygons.length; i++) {
                    if (subject.polygons[i].visible) {
                        const polygon = subject.polygons[i];

                        const point1 = graph3D.getProection(subject.points[polygon.points[0]]);
                        const point2 = graph3D.getProection(subject.points[polygon.points[1]]);
                        const point3 = graph3D.getProection(subject.points[polygon.points[2]]);
                        const point4 = graph3D.getProection(subject.points[polygon.points[3]]);
                        /*const point1 = {x: graph3D.xs(subject.points[polygon.points[0]]), y: graph3D.ys(subject.points[polygon.points[0]])};
                        const point2 = {x: graph3D.xs(subject.points[polygon.points[1]]), y: graph3D.ys(subject.points[polygon.points[1]])};
                        const point3 = {x: graph3D.xs(subject.points[polygon.points[2]]), y: graph3D.ys(subject.points[polygon.points[2]])};
                        const point4 = {x: graph3D.xs(subject.points[polygon.points[3]]), y: graph3D.ys(subject.points[polygon.points[3]])};*/
                        let {r, g, b} = polygon.color;
                       const {isShadow, dark} = graph3D.calcShadow(polygon,subject,SCENE,LIGHT);
                       let lumen = (isShadow) ? dark : graph3D.calcIllumination(polygon.lumen, LIGHT.lumen);
                       
                        r = Math.round(r * lumen);
                        g = Math.round(g * lumen);
                        b = Math.round(b * lumen);
                        polygons.push({
                            points: [point1, point2, point3, point4],
                            color: polygon.rgbToHex(r, g, b),
                            distance: polygon.distance
                        });
                    }
                }
            });
            // отрисовка всех полигонов
            polygons.sort((a, b) => b.distance - a.distance);
            polygons.forEach(polygon => canvas.polygon(polygon.points, polygon.color));
        }
    }

  

    function printSubject(subject) {
        // нарисовать рёбра
        if (canPrint.edges) {
            for (let i = 0; i < subject.edges.length; i++) {
                const edge = subject.edges[i];
                const point1 = graph3D.getProection(subject.points[edge.p1]);
                const point2 = graph3D.getProection(subject.points[edge.p2]);
                canvas.line(point1.x, point1.y, point2.x, point2.y)
            }
        }

        //нарисовать точки
        if (canPrint.points) {
            for (let i = 0; i <= subject.points.length - 1; i++) {
                const points = graph3D.getProection(subject.points[i]);
                canvas.point(points.x, points.y);
            }
        }
    }


    // function animationMoon(subject, center) {
    //     subject.animation.rotateOz.x = center.x;
    //     subject.animation.rotateOz.y = center.y;
    //     subject.animation.rotateOz.z = center.z;
    //     return subject;
    // }
    
    function render() {
        canvas.clear();
        //SCENE[SCENE.length - 1] = animationMoon(SCENE[SCENE.length - 1], SCENE[3].points[SCENE[3].points.length - 1])
        printAllPolygons();
        SCENE.forEach(subject => printSubject(subject));
        canvas.text(-9, 9, "FPS: " + FPSout);  
        canvas.render();
    }

    function animation() {
        // Закрутим фигуру!!!
        SCENE.forEach(subject => {
            if (subject.animation) {
                for (let key in subject.animation) {                  
                    const { x, y, z } = subject.animation[key];
                    const xn = WINDOW.CENTER.x - x;
                    const yn = WINDOW.CENTER.y - y;
                    const zn = WINDOW.CENTER.z - z;

                    const alpha = Math.PI / 180;
                    graph3D.animateMatrix(xn, yn, zn, key, alpha, -xn, -yn, -zn);
                    subject.points.forEach(point => graph3D.transform(point));
                }
            }            
        });
    }

    setInterval(animation, 30);

    //clearInterval(interval);


    let FPS = 0;
    let FPSout = 0;
    timestamp = (new Date).getTime();
    (function animloop() {
        // Считаем FPS
        FPS++;
        const currentTimestamp = (new Date).getTime();
        if (currentTimestamp - timestamp >= 1000) {
            timestamp = currentTimestamp;
            FPSout = FPS;
            FPS = 0;

        }
         graph3D.calcPlaneEquation(); //Получить и записать плоскость экрана
         graph3D.calcWindowVectors(); //Вычислить поворот экрана
        // рисуем сцену
        render();
        requestAnimFrame(animloop);
    })();
}; 