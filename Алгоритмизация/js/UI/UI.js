class UI{
    constructor({callbacks = {}}){
        //callbacks
    this.move = (callbacks.move instanceof Function) ? callbacks.move : function  () {};
    const printPoints = (callbacks.printPoints instanceof Function)
    ? callbacks.printPoints
    : function () {};
    const printEdges = (callbacks.printPoints instanceof Function)
    ? callbacks.printEdges
    : function () {};
    const printPolygons = (callbacks.printPoints instanceof Function)
    ? callbacks.printPolygons
    : function () {};
    //events
    document.addEventListener('keydown', event => this.keydown(event));
    document.getElementById('printPoints')
    .addEventListener('click', function(){ printPoints(this.checked); });
    document.getElementById('printEdges')
    .addEventListener('click', function(){ printEdges(this.checked); });
    document.getElementById('printPolygons')
    .addEventListener('click', function(){ printPolygons(this.checked); });

}
 keydown(event){
     switch(event.keyCode){
       case 37: return this.move('left');
       case 38: return this.move('up');
       case 39: return this.move('right');
       case 40: return this.move('down');
     }
 }
}