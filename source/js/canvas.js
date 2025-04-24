// params[arcColor] = #RGB
// params[lineColor] = 'RED, GREEN, BLUE'
// params[number] = 100
function wallpaper(arcColor, lineColor, number = 100) {
    const cvs = document.querySelector('#wallpaper');
    const ctx = cvs.getContext('2d');

    function init() {
        cvs.width = window.innerWidth;
        cvs.height = window.innerHeight;
    }

    init();

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    class Point {
        constructor() {
            this.r = 3;
            this.x = getRandomInt(this.r, cvs.width - this.r);
            this.y = getRandomInt(this.r, cvs.height - this.r);
            this.vx = Math.random() * 2 - 1; // 随机水平速度
            this.vy = Math.random() * 2 - 1; // 随机垂直速度
            this.maxSpeed = 2; // 限制最大速度
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = arcColor;
            ctx.fill();
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // 限制速度
            const speed = Math.sqrt(this.vx ** 2 + this.vy ** 2);
            if (speed > this.maxSpeed) {
                this.vx = (this.vx / speed) * this.maxSpeed;
                this.vy = (this.vy / speed) * this.maxSpeed;
            }

            // 碰撞检测，防止点超出画布边界
            if (this.x - this.r < 0 || this.x + this.r > cvs.width) {
                this.vx *= -1;
            }
            if (this.y - this.r < 0 || this.y + this.r > cvs.height) {
                this.vy *= -1;
            }
        }
    }

    class Graph {
        constructor() {
            this.points = new Array(number).fill(0).map(() => new Point());
            this.maxDistance = 100; // 两点之间的极限距离
        }

        draw() {
            ctx.clearRect(0, 0, cvs.width, cvs.height); // 清除画布
            for (let i = 0; i < this.points.length; i++) {
                const p1 = this.points[i];
                p1.update();
                p1.draw();
                for (let j = i + 1; j < this.points.length; j++) {
                    const p2 = this.points[j];
                    const d = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
                    if (d > this.maxDistance) {
                        continue;
                    }
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.closePath();
                    ctx.strokeStyle = `rgba(${lineColor}, ${1 - d / this.maxDistance})`;
                    ctx.stroke();
                }
            }
        }
    }

    const graph1 = new Graph();

    function animate() {
        graph1.draw();
        requestAnimationFrame(animate);
    }

    animate();

}

// 获取视窗大小，如果小于 576px，则不显示
const width = window.innerWidth;

if (!(width <= 820)) {
    wallpaper('#2F4F4F', 'f, f, f', 50);
}


document.addEventListener('resize', () => {
    init();
    graph1.draw();
    animate();
});