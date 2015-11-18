class Main {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width  = 449; // 16 * 28 + 1
        this.canvas.height = 449; // 16 * 28 + 1
        this.ctx = this.canvas.getContext('2d');
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mouseup',   this.onMouseUp.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.initialize();
        this.resized = document.createElement('canvas').getContext('2d');
    }
    initialize() {
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect(0, 0, 449, 449);
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(0, 0, 449, 449);
        this.ctx.lineWidth = 0.05;
        for (var i = 0; i < 27; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo((i + 1) * 16,   0);
            this.ctx.lineTo((i + 1) * 16, 449);
            this.ctx.closePath();
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(  0, (i + 1) * 16);
            this.ctx.lineTo(449, (i + 1) * 16);
            this.ctx.closePath();
            this.ctx.stroke();
        }
    }
    onMouseDown(e) {
        this.canvas.style.cursor = 'default';
        this.drawing = true;
        this.prev = this.getPosition(e.clientX, e.clientY);
    }
    onMouseUp() {
        this.drawing = false;
    }
    onMouseMove(e) {
        if (this.drawing) {
            var curr = this.getPosition(e.clientX, e.clientY);
            this.ctx.lineWidth = 16;
            this.ctx.lineCap = 'round';
            this.ctx.beginPath();
            this.ctx.moveTo(this.prev.x, this.prev.y);
            this.ctx.lineTo(curr.x, curr.y);
            this.ctx.stroke();
            this.ctx.closePath();
            this.prev = curr;

            var img = new Image();
            img.onload = () => {
                this.resized.drawImage(img, 0, 0, img.width, img.height, 0, 0, 28, 28);
                var inputs = [];
                var data = this.resized.getImageData(0, 0, 28, 28).data;
                for (var i = 0; i < 28; i++) {
                    for (var j = 0; j < 28; j++) {
                        var n = i * 28 + j;
                        inputs[n] = (255 - (data[4 * n + 0] + data[4 * n + 1] + data[4 * n + 2]) / 3) / 255;
                    }
                }
                console.log(JSON.stringify(inputs));

            };
            img.src = this.canvas.toDataURL();
        }
    }
    getPosition(clientX, clientY) {
        var rect = this.canvas.getBoundingClientRect();
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }
}

window.addEventListener('load', () => {
    var main = new Main(document.getElementById('main'));
    document.getElementById('clear').addEventListener('click', () => {
        main.initialize();
    });
}, false);
