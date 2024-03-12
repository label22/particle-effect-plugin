// particle-effect-plugin.js
function ParticleEffectPlugin(options) {
    options = options || {};
    
    var u = document.createElement("canvas"),
        s = {
            l: options.particleCount || 240,
            z: options.zIndex || -2,
            o: options.opacity || 0.8,
            c: options.color || "255,255,255"
        },
        e = u.getContext("2d"),
        delay = 0,
        r, n, m = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(i) {
            window.setTimeout(i, 1000 / 45);
        },
        a = Math.random,
        f = {
            x: null,
            y: null,
            max: 20000
        };

    function initialize() {
        u.id = "c_n" + s.l;
        u.style.cssText = "position:fixed;top:0;left:0;z-index:" + s.z + ";opacity:" + s.o;
        document.body.appendChild(u);
        updateCanvasSize();
        window.onresize = updateCanvasSize;
        window.onmousemove = function(i) {
            i = i || window.event;
            f.x = i.clientX;
            f.y = i.clientY;
        };
        window.onmouseout = function() {
            f.x = null;
            f.y = null;
        };
        var t = [];
        for (var p = 0; s.l > p; p++) {
            var h = a() * r,
                g = a() * n,
                q = 2 * a() - 1,
                d = 2 * a() - 1;
            t.push({
                x: h,
                y: g,
                xa: q,
                ya: d,
                max: 6000
            });
        }
        setTimeout(function() {
            animate();
        }, 100);
    }

    function updateCanvasSize() {
        r = u.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        n = u.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }

    function animate() {
        delay = delay + 1;
        if (delay < 5) {
            m(animate);
        } else {
            delay = 0;
            e.clearRect(0, 0, r, n);
            var w = [f].concat(t);
            var x, v, A, B, z, y;
            t.forEach(function(i) {
                i.x += i.xa;
                i.y += i.ya;
                i.xa *= i.x > r || i.x < 0 ? -1 : 1;
                i.ya *= i.y > n || i.y < 0 ? -1 : 1;
                e.fillRect(i.x - 0.5, i.y - 0.5, 2, 2);
                e.fillStyle = "#FFFFFF";
                for (v = 0; v < w.length; v++) {
                    x = w[v];
                    if (i !== x && null !== x.x && null !== x.y) {
                        B = i.x - x.x;
                        z = i.y - x.y;
                        y = B * B + z * z;
                        if (y < x.max) {
                            if (x === f && y >= x.max / 2) {
                                i.x -= 0.03 * B;
                                i.y -= 0.03 * z;
                            }
                            A = (x.max - y) / x.max;
                            e.beginPath();
                            e.lineWidth = A / 2;
                            e.strokeStyle = "rgba(" + s.c + "," + (A + 0.2) + ")";
                            e.moveTo(i.x, i.y);
                            e.lineTo(x.x, x.y);
                            e.stroke();
                        }
                    }
                }
                w.splice(w.indexOf(i), 1);
            });
            m(animate);
        }
    }

    initialize();
}

module.exports = ParticleEffectPlugin;

// Example Usage
ParticleEffectPlugin({
    particleCount: 240,
    zIndex: -2,
    opacity: 0.8,
    color: "255,255,255"
});
