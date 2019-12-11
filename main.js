class Ctx {
    constructor(c, map){
        this.c = c; // canvas element from html
        this.x = c.getContext("2d"); // convert canvas element to 2d ctx
        this.xp = 0; // x position
        this.yp = 0; // y position
        this.rangeX = document.getElementById("rangeX"); // get horizontal range
        this.rangeY = document.getElementById("rangeY"); // get vertical range   
        this.gpsX = 0;  
        this.gpsY = 0;
           

        // initiate map object from reference
        this.map = map;

        // after loading of image finished do these jobs, image in some case is huge.
        this.map.onload = () => {
            // calculate rate for further actions. to set positon of handler on range
            this.rateX = (this.map.width - this.width()) / -1000;
            this.rateY = (this.map.height - this.height()) / -1000;

            // draw image after loading of image completed
            this.draw();
        }

        this.gps = new Image();
        this.gps.src = "gps.png";
    }

    // return canvas'es width 
    width() {
        return this.c.width;
    }

    // return canvas'es height 
    height() {
        return this.c.height;
    }

    // for jumping to the special area of map. for example coordinate 1 or 2 and etc. go to the center of the canvas.
    goToCordinate = (x,y) => { 
        this.xp = -x + this.width()/2;
        this.yp = -y + this.height()/2;

        this.gpsX = x;
        this.gpsY = y;

        this.draw();
        
    }

    // go to position 0,0
    resetMap = () => {
        this.xp = this.yp = this.gpsX = this.gpsY = 0;
        this.draw();
    }

    // draw the canvas and update position of range's handler
    draw() {
        console.log(`x = ${this.xp}, y = ${this.yp} | gpsX = ${this.gpsX}, gpsY = ${this.gpsY}`);
        this.x.clearRect(0,0,ct.width(),ct.height());
        this.x.drawImage(map, this.xp, this.yp);

        this.rangeX.value = this.xp / this.rateX;
        this.rangeY.value = this.yp / this.rateY;

        // calculate gps location icon
        const gpsX = this.gpsX + this.xp - this.gps.width / 2;
        const gpsY = this.gpsY + this.yp - this.gps.height /2 - 27;
        this.x.drawImage(this.gps, gpsX, gpsY);
    }

    // use arrow keys (↑) on screen for go to up, right, down and left
    changePosition(x,y) {
        const offset = document.getElementById("ratio").value;
        this.xp -= offset * x;
        this.yp -= offset * y;
        this.draw();
        console.log(offset);
    }

    // used by range for update coordinate
    goToPercent = () => {
        this.xp = parseFloat(this.rangeX.value, 10) * this.rateX;
        this.yp = parseFloat(this.rangeY.value, 10) * this.rateY;

        this.draw();
    }

    // load new images as map
    setMap = (src) => {
        this.map.src = src;
    }
}

let map = new Image();
const ct = new Ctx(document.getElementById("map"),map);
ct.setMap("map.jpg");