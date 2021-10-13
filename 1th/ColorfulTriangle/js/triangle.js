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

  // 纯色
  //    var VSHADER_SOURCE =
  // 'attribute vec4 a_Position;\n' + // attribute variable
  // 'void main() {\n' +
  // '  gl_Position = a_Position;\n' + // Set the vertex coordinates of the point
  // '}\n';



//片元着色器
//彩色
var FSHADER_SOURCE =
    "precision mediump float;" +
    "varying vec4 v_Color;" +
     "void main() {" +
     "gl_FragColor = v_Color;" +
     "}";

  // 纯色
  //   var FSHADER_SOURCE =
  // 'precision mediump float;\n' +
  // 'uniform vec4 u_FragColor;\n' +  // uniform変数
  // 'void main() {\n' +
  // '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  // '}\n';



window.onload = function init(){
	var canvas = document.getElementById( "triangle-canvas" );
	//获取webGL渲染上下文
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}
	// Three Vertices
	var vertices = new Float32Array([
		// 三角形
		// gl.drawArrays( gl.TRIANGLES, 0, 3 );
		// -1.0, -1.0, 
		// 0.0, 1.0, 
		// 1.0, -1.0, 
		
		// 彩色三角形
		-1.0, -1.0, 1.0, 0.0, 0.0, 
		0.0, 1.0, 0.0, 1.0, 0.0,
		1.0, -1.0, 0.0, 0.0, 1.0,	

		//四边形 
		// gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
		// -1.0, -1.0,
		// 1.0, -1.0,
		// 1.0, 1.0,
		// -0.5, 1,0,
		

		// 四边形+三角形
		// gl.drawArrays( gl.TRIANGLES, 0, 3 );
		// gl.drawArrays( gl.TRIANGLE_FAN, 3, 6 );
		// 0.0, -1.0,
		// 1.0, -1.0,
		// 1.0,  1.0,
		// 0.0, -1.0,
		// -1.0,  -1.0,
		// -1.0,  1.0,

		/*-0.5, -0.5,
		0.0, 0.5,
		0.5, -0.5*/
	]);
	var FSIZE = vertices.BYTES_PER_ELEMENT;

	// Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 ); 

	// Load shaders and initialize attribute buffers
	// var program;
	// program = initShaders( gl, "vertex-shader", "fragment-shader" );
	// gl.useProgram(program);
	initShaders( gl, VSHADER_SOURCE, FSHADER_SOURCE );
	// Load the data into the GPU
	// 创建缓冲区对象
	var bufferId = gl.createBuffer();
	// 将缓冲区对象绑定到目标
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	// 向缓冲区对象写入数据
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

	// Associate external shader variables with data buffer
	// var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	// if (a_Position < 0) {
	// 	console.log('Failed to get the storage location of a_Position');
	// 	return -1;
	// }
	// // 将缓冲区对象分配给a_Position变量
	// gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
	// // 连接a_Position变量与分配给它的缓冲区对象
	// gl.enableVertexAttribArray(a_Position);
	
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
 	if (a_Position < 0) {
    	console.log('Failed to get the storage location of a_Position');
    	return -1;
  	}
  	// 将缓冲区对象分配给a_Position变量
  	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 5*FSIZE, 0);
  	// 连接a_Position变量与分配给它的缓冲区对象
  	gl.enableVertexAttribArray(a_Position);

	var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
	if(a_Color < 0) {
	  	console.log('Failed to get the storage location of a_Color');
	  	return -1;
	}
	// 将缓冲区对象分配给a_Color变量
	gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
	// 连接a_Color变量与分配给它的缓冲区对象
	gl.enableVertexAttribArray(a_Color); 
	render();
}

function render(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	// gl.drawArrays( gl.TRIANGLE_FAN, 0, 7 );
	gl.drawArrays( gl.TRIANGLES, 0, 3 );

	// gl.drawArrays( gl.TRIANGLE_FAN, 3, 6 );
	// gl.drawArrays( gl.TRIANGLE_FAN, 3, 6 );
}