let L = 40.0;
let number_of_cars = 20;
let cars_x = new Array(number_of_cars);
let cars_v = new Array(number_of_cars);
let car_img = new Image();
let c = 2.0;
let a = 1.0;
let dt = 0.005;
car_img.src = "car_red.png";
let timer;

window.onload = function () {
    init();
    timer = setInterval(draw, 50);
}

function V(dx) {
    return Math.tanh(dx - c) + Math.tanh(c);
}

function stop() {
    clearInterval(timer);
}

function start() {
    clearInterval(timer);
    timer = setInterval(draw, 50);
}

function restart() {
    init();
    draw();
}

function init() {
    let dx = L / number_of_cars;
    let x = 0.0;
    let iv = V(dx);
    for (let i = 0; i < number_of_cars; i++) {
        cars_x[i] = x;
        cars_v[i] = iv;
        x += dx;
        x += (Math.random() - 0.5) * 0.01;
    }
}

function draw_cars(size, ctx) {
    let cx = size * 0.5;
    let cy = size * 0.5;
    let r = size * 0.4;
    let cr = size * 0.02;
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.arc(cx, cy, r - cr, 0, Math.PI * 2, false);
    ctx.stroke();

    for (let i = 0; i < number_of_cars; i++) {
        let theta = 2.0 * Math.PI / L * cars_x[i];
        let x = r * Math.cos(theta) + cx;
        let y = r * Math.sin(theta) + cy;
        ctx.beginPath();
        //ctx.arc(x, y, cr, 0, Math.PI * 2, false);
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(theta);
        ctx.translate(0, -r * 1.1);
        ctx.drawImage(car_img, 0, 0, 20, 20);
        ctx.stroke();
        ctx.restore();
    }
}

function step() {
    for (let i = 0; i < number_of_cars; i++) {
        let dx = 0;
        if (i != number_of_cars - 1) {
            dx = cars_x[i + 1] - cars_x[i];
        } else {
            dx = cars_x[0] - cars_x[i];
        }
        if (dx < 0.0) dx += L;
        if (dx > L) dx -= L;

        cars_v[i] += a * (V(dx) - cars_v[i]) * dt;
        cars_x[i] += cars_v[i] * dt;
        if (cars_x[i] > L) {
            cars_x[i] -= L;
        }
    }
}

function draw_dx(size, ctx) {
    let cx = size * 0.5;
    let cy = size * 0.5;
    let asize = size * 0.3;
    let idx = L / number_of_cars;
    let iv = V(idx);
    ctx.strokeStyle = "#000";
    ctx.beginPath()
    ctx.moveTo(cx - asize, cy);
    ctx.lineTo(cx + asize, cy);
    ctx.stroke();
    ctx.moveTo(cx, cy - asize);
    ctx.lineTo(cx, cy + asize);
    ctx.stroke();
    ctx.closePath();
    ctx.strokeStyle = "#0F0";
    for (let i = 0; i < number_of_cars; i++) {
        let dx = 0;
        if (i != number_of_cars - 1) {
            dx = cars_x[i + 1] - cars_x[i];
        } else {
            dx = cars_x[0] - cars_x[i];
        }
        if (dx < 0.0) dx += L;
        if (dx > L) dx -= L;
        let x = (dx - idx) * 30;
        let y = (cars_v[i] - iv) * 30;
        ctx.beginPath();
        ctx.arc(cx + x, cy - y, 4, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.closePath();
    }
}

function draw() {
    let canvas = document.getElementById('mycanvas');
    let h = canvas.height;
    let w = canvas.width;
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, w, h);
    draw_cars(h, ctx);
    for (let i = 0; i < 50; i++) {
        step();
    }
    draw_dx(h, ctx);
}