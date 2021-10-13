"use strict";

const { vec3 } = glMatrix;

var canvas;
var gl;
var re;
var points = [];
var ss;
var numTimesToSubdivide;
var colors=[];
var color1;
var R,G,B;

String.prototype.colorRgb = function () {
	// 16进制颜色值的正则
	var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
	// 把颜色值变成小写
	var color = this.toLowerCase();
	if (reg.test(color)) {
		// 如果只有三位的值，需变成六位，如：#fff => #ffffff
		if (color.length === 4) {
			var colorNew = "#";
			for (var i = 1; i < 4; i += 1) {
				colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
			}
			color = colorNew;
		}
		// 处理六位的颜色值，转为RGB
		var colorChange = [];
		for (var i = 1; i < 7; i += 2) {
			colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
		}
		return "RGB(" + colorChange.join(",") + ")";
	} else {
		return color;
	}
};

function getRGB(str){
	var cnt = 1;
	R = G = B = 0;
	for(var i = 0;i < str.length; i++) {
		if(str[i] == 'R' || str[i] == 'G' || str[i] == 'B' || str[i] == '(') continue;
		if(str[i] == ',') cnt++;
		else if(str[i] == ')') break;
		else if(cnt == 1) {
			R = R*10+(str[i]-'0');
		}else if(cnt == 2) {
			G = G*10+(str[i]-'0');
		}else{
			B = B*10+(str[i]-'0');
		}
	}
}

function initTriangles(){

	points = [];
	canvas = document.getElementById( "gl-canvas" );
	numTimesToSubdivide = parseInt(document.getElementById("weihe").value);
	gl = WebGLUtils.setupWebGL( canvas );

	if( !gl ){
		alert( "WebGL isn't available" );
	}

	var vertices = [
		-1, -1, 0,
		 0,  1, 0,
		 1, -1, 0,
	];
	colors = [];

	color1 = document.getElementById("color").value;
	getRGB(color1.colorRgb());

	console.log(R);
	console.log(G);
	console.log(B);

	var u = vec3.fromValues( vertices[0], vertices[1], vertices[2] );
	var v = vec3.fromValues( vertices[3], vertices[4], vertices[5] );
	var w = vec3.fromValues( vertices[6], vertices[7], vertices[8] );

	divideTriangle( u, v, w, numTimesToSubdivide );
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );
	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( points ), gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	var cBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW );
	var a_Color = gl.getAttribLocation(program,"a_Color");
	gl.vertexAttribPointer( a_Color, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( a_Color );
	console.log(colors);
	renderTriangles();
};

function triangle( a, b, c){
	points.push( a[0], a[1], a[2] );
	points.push( b[0], b[1], b[2] );
	points.push( c[0], c[1], c[2] );
	for(var i = 0;i < 3; i++) {
		colors.push(R/255.0,G/255.0,B/255.0);
	}
}

function divideTriangle( a, b, c,count ){
	if( count == 0 ){
		triangle( a, b,c);
	}else{
		var ab = vec3.create();
		vec3.lerp( ab, a, b, 0.5 );
		var bc = vec3.create();
		vec3.lerp( bc, b, c, 0.5 );
		var ca = vec3.create();
		vec3.lerp( ca, c, a,  0.5 );
		--count;
		divideTriangle( a, ab, ca, count );
		divideTriangle( b, bc, ab, count );
		divideTriangle( c, ca, bc, count );
	}
}
function draw2() {
	initTriangles();
}


function start() {
	ss = setInterval(solve,1000);
}

function renderTriangles(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.TRIANGLES, 0, points.length/2 );
}

function tong(){
	var temp=document.getElementsByName("dimensional");
	
	for(var i=0;i<temp.length;i++){
		if(temp[i].checked){
			var re = temp[i].value;
			break;
		}
	};
	
	if(re == 1){
		window.location.replace("../demos/chap2-demo-5.html")
	}else if(re == 2){
		draw2();
	}else if(re == 3){
		window.location.replace("../demos/chap2-demo-4.html")
	}
}