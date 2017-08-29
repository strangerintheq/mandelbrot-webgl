var mouse, centerAtDragStart;
var center = [0, 0];
var zoom = 1.0;

var shaderProgram = GL.init().program('mandelbrot.glsl').bind();
GL.buffer([-1, 1, -1, -1, 1, -1, 1, 1]).bind('xy', 2);

window.addEventListener('mousewheel', wheel, false);
window.addEventListener('mousedown', down, false);
window.addEventListener('mouseup', up, false);
window.addEventListener('mousemove', move, false);

animate();

function animate() {
    drawFrame();
    requestAnimationFrame(animate);
}

function drawFrame() {
    shaderProgram.loadFloatUniform("zoom", zoom);
    shaderProgram.loadVec2Uniform("center", center);
    shaderProgram.loadVec2Uniform("resolution", GL.resolution());
    GL.drawTriangleFan(4);
}

function wheel(e) {
    zoom *= e.wheelDelta > 0 ? 0.9 : 1.1;
}

function down(e) {
    mouse = e;
    centerAtDragStart = [center[0], center[1]];
}

function up() {
    centerAtDragStart = mouse = null;
}

function move(e) {
    if (!mouse) return;
    var r = GL.resolution();
    var x = 4 * zoom * (mouse.x - e.x) / r[0];
    var y = 4 * zoom * (mouse.y - e.y) / r[0];
    center = [centerAtDragStart[0] + x, centerAtDragStart[1] - y];
}