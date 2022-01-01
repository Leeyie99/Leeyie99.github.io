$(document).ready(function() {
    var a = 1;
    $(renderer.domElement).click(function(event) {
        var c = renderer.domElement;
        var rect = c.getBoundingClientRect();
        var x = event.clientX - rect.left * (c.width / rect.width);
        var y = event.clientY - rect.top * (c.height / rect.height);
        if (a == 1) getTraingle(x, y);
        if (a == 2) getCube(x, y);
        if (a == 3) getBox(x, y);
        if (a == 4) getCircle(x, y);
    });
    $("#1").click(function() {
        a = 1;
    });
    $("#2").click(function() {
        a = 2;
    });
    $("#3").click(function() {
        a = 3;
    });
    $("#4").click(function() {
        a = 4;
    });
    $("#5").click(function() {
        clearAll();
    });
    $("#minR").change(function() {
        min1 = parseFloat($("#minR").val());
        min1 = parseFloat(min1);
        $("#tm").text("缩小：" + min1);
        if (max1 < min1) {
            max1 = min1;
            $("#tm1").text("放大：" + min1);
            document.getElementById("maxR").value = min1;
        }
    });
    $("#maxR").change(function() {
        max1 = parseFloat($("#maxR").val());
        max1 = parseFloat(max1);
        $("#tm1").text("放大：" + max1);
        if (min1 > max1) {
            min1 = max1;
            $("#tm").text("缩小：" + max1);
            document.getElementById("minR").value = max1;
        }
    });

    $("#minCube").change(function() {
        $("#tmCube1").text("大小：" + parseInt($("#minCube").val()));
        kk = parseInt($("#minCube").val());
        for (var i = 0; i < cubes.length; i++) {
            cubes[i].scale.set(kk, kk, 0);
        }
    });
    $("#maxCube").change(function() {
        $("#tmCube2").text("速度：" + parseInt($("#maxCube").val()));
        speed = 105 - parseInt($("#maxCube").val()) * 10;
        clearInterval(sc);
        sc = setInterval(changeCubes, speed);
    });

    $("#minCircle").change(function() {
        $("#tmCircle1").text("速度：" + parseInt($("#minCircle").val()));
        speed2 = 105 - parseInt($("#minCircle").val()) * 10;
        clearInterval(sci);
        console.log(speed2);
        sci = setInterval(changeCircles, speed2);

    });
    $("#maxCircle").change(function() {
        $("#tmCircle2").text("位移值：" + parseInt($("#maxCircle").val()));
        lgh = parseInt($("#maxCircle").val()) * 15;
    });
})

var s;
var sc;
var sb;
var sci;
var traingles = [];
var fTraingles = [];
var cubes = [];
var boxs = [];
var circles = [];
var indexCircles = [];
var fCircles = [];
var max1 = 2.0;
var min1 = 0.5;
var kk = 1;
var f = 1;
var speed = 85;
var speed2 = 95;
var lgh = 45;

function getTraingle(x, y) {
    x -= 500;
    x /= 500;
    x *= 110;
    y = 256 - y;
    y /= 256;
    y *= 55;
    console.log(y);
    var geometry = new THREE.Geometry();
    var p1 = new THREE.Vector3(x - 5, y - 4.6, 0);
    var p2 = new THREE.Vector3(x + 5, y - 4.6, 0);
    var p3 = new THREE.Vector3(x, y + 4.05, 0);


    geometry.vertices.push(p1, p2, p3);

    var material = new THREE.MeshPhongMaterial({
        color: 0xB9D3FF,
        specular: 0x4488ee,
        shininess: 12
    });
    var mesh = new THREE.Mesh(geometry, material)

    var material = new THREE.PointsMaterial({
        color: 0xB9D3FF,
        size: 0.1
    });
    var points = new THREE.Points(geometry, material);
    scene.add(points);
    scene.add(mesh);
    traingles.push(mesh);
    fTraingles.push(1);
    clearInterval(s);
    s = setInterval(changeTraingle, 200);
}

function changeTraingle() {
    for (var i = 0; i < traingles.length; i++) {
        var k = fTraingles[i];
        if (k > max1) f = -1;
        else if (k <= min1) f = 1;
        k += f * 0.01;
        traingles[i].scale.set(k, k, 0);
        fTraingles[i] = k;
    }
}

function getCube(x, y) {
    x -= 500;
    x /= 500;
    x *= 110;
    y = 256 - y;
    y /= 256;
    y *= 55;
    console.log(y);
    var geometry = new THREE.PlaneGeometry(12, 12);
    const material = new THREE.MeshBasicMaterial({
        color: 0x35589A,
        side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(geometry, material);
    plane.position.x = x;
    plane.position.y = y;
    scene.add(plane);
    cubes.push(plane);
    plane.scale.set(kk, kk, 0);
    clearInterval(sc);
    sc = setInterval(changeCubes, speed);
}

function changeCubes() {
    for (var i = 0; i < cubes.length; i++) {
        cubes[i].rotateZ(Math.PI / 120);
    }
}

function getBox(x, y) {
    x -= 500;
    x /= 500;
    x *= 110;
    y = 256 - y;
    y /= 256;
    y *= 55;
    var geometry = new THREE.BoxGeometry(10, 10, 10);
    var material = new THREE.MeshPhongMaterial({
        color: 0x778899,
        specular: 0x4488ee,
        shininess: 12
    });
    var plane = new THREE.Mesh(geometry, material);
    plane.position.x = x;
    plane.position.y = y;
    scene.add(plane);
    boxs.push(plane);
    clearInterval(sb);
    sb = setInterval(changeBoxs, 100);
}

function changeBoxs() {
    for (var i = 0; i < boxs.length; i++) {
        boxs[i].rotateX(Math.PI / 8);
        boxs[i].rotateY(Math.PI / 8);
    }
}

function getCircle(x, y) {
    x -= 500;
    x /= 500;
    x *= 110;
    y = 256 - y;
    y /= 256;
    y *= 55;
    const geometry = new THREE.CircleGeometry(8, 32);
    var material = new THREE.MeshPhongMaterial({
        color: 0x778899,
        specular: 0x4488ee,
        shininess: 12
    });
    const circle = new THREE.Mesh(geometry, material);
    circle.position.x = x;
    circle.position.y = y;
    scene.add(circle);
    circles.push(circle);
    fCircles.push(1);
    indexCircles.push(x);
    clearInterval(sci);
    sci = setInterval(changeCircles, speed2);
}

function changeCircles() {
    if (lgh == 0) return;
    for (var i = 0; i < circles.length; i++) {
        var f = fCircles[i];
        if (circles[i].position.x > indexCircles[i]) f = 1;
        if (indexCircles[i] - circles[i].position.x > lgh) f = -1;
        circles[i].position.x = circles[i].position.x - f * 1;
        fCircles[i] = f;
    }
}

function clearAll() {
    clearInterval(s);
    clearInterval(sc);
    clearInterval(sb);
    clearInterval(sci);
    for (var i = 0; i < traingles.length; i++) scene.remove(traingles[i]);
    for (var i = 0; i < cubes.length; i++) scene.remove(cubes[i]);
    for (var i = 0; i < boxs.length; i++) scene.remove(boxs[i]);
    for (var i = 0; i < circles.length; i++) scene.remove(circles[i]);
    cubes = [];
    boxs = [];
    circles = [];
    indexCircles = [];
    fCircles = [];
    traingles = [];
    fTraingles = [];
}