'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Main = (function () {
    function Main(canvas) {
        _classCallCheck(this, Main);

        this.canvas = canvas;
        this.canvas.width = 449; // 16 * 28 + 1
        this.canvas.height = 449; // 16 * 28 + 1
        this.ctx = this.canvas.getContext('2d');
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.initialize();
        this.resized = document.createElement('canvas').getContext('2d');
    }

    _createClass(Main, [{
        key: 'initialize',
        value: function initialize() {
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.fillRect(0, 0, 449, 449);
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(0, 0, 449, 449);
            this.ctx.lineWidth = 0.05;
            for (var i = 0; i < 27; i++) {
                this.ctx.beginPath();
                this.ctx.moveTo((i + 1) * 16, 0);
                this.ctx.lineTo((i + 1) * 16, 449);
                this.ctx.closePath();
                this.ctx.stroke();

                this.ctx.beginPath();
                this.ctx.moveTo(0, (i + 1) * 16);
                this.ctx.lineTo(449, (i + 1) * 16);
                this.ctx.closePath();
                this.ctx.stroke();
            }
        }
    }, {
        key: 'onMouseDown',
        value: function onMouseDown(e) {
            this.canvas.style.cursor = 'default';
            this.drawing = true;
            this.prev = this.getPosition(e.clientX, e.clientY);
        }
    }, {
        key: 'onMouseUp',
        value: function onMouseUp() {
            this.drawing = false;
        }
    }, {
        key: 'onMouseMove',
        value: function onMouseMove(e) {
            var _this = this;

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
                img.onload = function () {
                    _this.resized.drawImage(img, 0, 0, img.width, img.height, 0, 0, 28, 28);
                    var inputs = [];
                    var data = _this.resized.getImageData(0, 0, 28, 28).data;
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
    }, {
        key: 'getPosition',
        value: function getPosition(clientX, clientY) {
            var rect = this.canvas.getBoundingClientRect();
            return {
                x: clientX - rect.left,
                y: clientY - rect.top
            };
        }
    }]);

    return Main;
})();

window.addEventListener('load', function () {
    var main = new Main(document.getElementById('main'));
    document.getElementById('clear').addEventListener('click', function () {
        main.initialize();
    });
}, false);