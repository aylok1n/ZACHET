class Light extends Point{
    constructor(x, y, z, lumen = 1000) {
        super(x,y,z);
        this.lumen = lumen;
    }
}