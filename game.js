/**
 * Created by Joy on 2017/6/10.
 */
(function () {
    var ctx = null;
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60)
            }
    })();
    var Game = {
        canvas: document.getElementById('canvas'),
        setup: function () {
            if (this.canvas.getContext) {
                ctx = this.canvas.getContext('2d');
                this.width = this.canvas.width;
                this.height = this.canvas.height;
                this.init();
            }
        },
        init: function () {
            //Background.init();
            this.animate();
        },
        draw: function () {
            //Background.draw();
            ctx.clearRect(0, 0, this.width, this.height); //这句话如果不写图像的运动会连起来形成一个整体
            Tree.prototype.update();
        },
        animate: function () {
            Game.play = requestAnimFrame(Game.animate);
            Game.draw();
        }
    };

    function Tree() {
        this.w = 25;
        this.h = 10;
        this.speed = 2;
        this.x = 600;
        this.y = 380;
        this.remove = false;
    };
    Tree.prototype = {
        obstacles: [],
        update: function () {

            var obstacles_f = this.obstacles.slice(0);

            for (var i = 0; i < this.obstacles.length; i++) {
                var obstacle = this.obstacles[i];
                obstacle.draw();
                if (obstacle.remove) {
                    obstacles_f.shift();
                }
            }
            this.obstacles = obstacles_f;

            if (this.obstacles.length > 0) {
                var lastItem = this.obstacles[this.obstacles.length - 1];
                if (lastItem && lastItem.isVisible() && (lastItem.x + lastItem.w + 200 < 600)) {
                    this.obstacles.push(new Tree());
                }
            } else {
                this.obstacles.push(new Tree());
            }
        },
        draw: function () {
            if (!this.remove) {
                this.move();
                ctx.fillStyle = 'green';
                ctx.fillRect(this.x, this.y, this.w, this.h);
                if (!this.isVisible()) {
                    this.remove = true;
                }
            }
        },
        move: function () {
            this.x -= this.speed;
        },
        isVisible: function () {
            return this.x + this.w > 0;
        }
    };
    var Trex={

    };
    var Background = {
        init: function () {
            this.readyState = false;
            this.img = new Image();
            this.img.src = 'background.jpg';
            this.img.onload = function () {
                Background.readyState = true;
            }
        },
        draw: function () {
            if (this.readyState == true) {
                ctx.drawImage(this.img, 10, 10);
            }

        }
    };
    window.onload = function () {
        Game.setup();
    }
})();