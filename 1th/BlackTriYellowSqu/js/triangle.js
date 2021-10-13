"use strict";

var gl;
var points;

//顶点着色器程序
//彩色
var VSHADER_SOURCE =
    "attribute vec4 a_Position;" +
    "attribute vec4 a_Color;" +
    "varying vec4 v_Color;" +
    "void main(){" +
    "gl_Position = a_Position;" +
    "v_Color = a_Color;" +
     "}";

//片元着色器
//彩色
var FSHADER_SOURCE =
    "precision mediump float;" +
    "varying vec4 v_Color;" +
     "void main() {" +
     "gl_FragColor = v_Color;" +
     "}";

window.onload = function init(){
	var canvas = document.getElementById( "triangle-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}
	
	// Three Vertices
	var vertices = new Float32Array([

		// 四边形+三角形	
		-0.5, 1.0, 0.0, 0.0, 0.0,
		-1.0, 0.0, 0.0, 0.0, 0.0,
		0.0, 0.0, 0.0, 0.0, 0.0,
		0.0, 0.0, 1.0, 1.0, 0.0,
		0.0, 1.0, 1.0, 1.0, 0.0,
		1.0, 1.0, 1.0, 1.0, 0.0,
		1.0, 0.0, 1.0, 1.0, 0.0,
		
		/*-0.5, -0.5,
		0.0, 0.5,
		0.5, -0.5*/
	]);
	var FSIZE = vertices.BYTES_PER_ELEMENT;

	// Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 ); 
	initShaders( gl, VSHADER_SOURCE, FSHADER_SOURCE );
	
	// Load the data into the GPU
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

	
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
 	if (a_Position < 0) {
    	console.log('Failed to get the storage location of a_Position');
    	return -1;
  	}
  	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE*5, 0);
  	gl.enableVertexAttribArray(a_Position);

	var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
	if(a_Color < 0) {
	  	console.log('Failed to get the storage location of a_Color');
	  	return -1;
	}
	gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE*5, FSIZE*2);
	gl.enableVertexAttribArray(a_Color); 
	render();
}

function render(){
	gl.clear( gl.COLOR_BUFFER_BIT );

	gl.drawArrays( gl.TRIANGLES, 0, 3 );

	gl.drawArrays( gl.TRIANGLE_FAN, 3, 4 );
	// gl.drawArrays( gl.TRIANGLE_FAN, 3, 6 );
}