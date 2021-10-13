"use strict";

const { vec3 } = glMatrix;

var canvas;
var gl;

var points = [];
var ss;
var numTimesToSubdivide;

function initTriangles(){

	points=[];
	canvas = document.getElementById( "gl-canvas" );
	numTimesToSubdivide = parseInt(document.getElementById("weihe").value);
	gl = WebGLUtils.setupWebGL( canvas );

	if( !gl ){
		alert( "WebGL isn't available" );
	}

	var vertices = [
		-1, -1, 0,
		 0,  1, 0,
		 1, -1, 0
	];

	var u = vec3.fromValues( vertices[0], vertices[1], vertices[2] );
	var v = vec3.fromValues( vertices[3], vertices[4], vertices[5] );
	var w = vec3.fromValues( vertices[6], vertices[7], vertices[8] );

	divideTriangle( u, v, w, numTimesToSubdivide );
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );
	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( points ), gl.STATIC_DRAW );
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	renderTriangles();
};

function triangle( a, b, c ){
	points.push( a[0], a[1], a[2] );
	points.push( b[0], b[1], b[2] );
	points.push( b[0], b[1], b[2] );
	points.push( c[0], c[1], c[2] );
	points.push( a[0], a[1], a[2] );
	points.push( c[0], c[1], c[2] );
}


function divideTriangle( a, b, c, count ){
	if( count == 0 ){
		triangle( a, b, c );
	}else{
		var ab = vec3.create();
		vec3.lerp( ab, a, b, 0.5 );
		var bc = vec3.create();
		vec3.lerp( bc, b, c, 0.5 );
		var ca = vec3.create();
		vec3.lerp( ca, c, a, 0.5 );
		--count;
		divideTriangle( ab, bc, ca, count );
		divideTriangle( a, ab, ca, count );
		divideTriangle( b, bc, ab, count );
		divideTriangle( c, ca, bc, count );
	}
}
function start() {
	ss = setInterval(solve,1000);
}
function draw() {
	clearInterval(ss);
	initTriangles();
}
function renderTriangles(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.LINES, 0, points.length/2 );
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
		draw();
	}else if(re == 2){
		window.location.replace("../demos/chap2-demo-2.html")
	}else if(re == 3){
		window.location.replace("../demos/chap2-demo-4.html")
	}
}