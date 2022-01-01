$(document).ready(function(){
	var scene = new THREE.Scene();
	var box = new THREE.SphereGeometry(60,40,40);
	
	var material = new THREE.MeshPhongMaterial({
		color:0x778899,
		specular:0x4488ee,
		shininess:12
	});
	var mesh = new THREE.Mesh(box,material);
	scene.add(mesh);
	//光源设置
	//点光源
	var point = new THREE.PointLight(0xffffff);
	point.position.set(100,100,60);//点光源位置
	point.intensity = 1;
	scene.add(point);
	//环境光
	var ambient = new THREE.AmbientLight(0xffffff);
	scene.add(ambient);
	
	//相机设置
	//创建相机对象
	//窗口宽度
	var width = window.innerWidth;
	//窗口高度
	var height = window.innerHeight;
	//窗口宽高比
	var k = width / height; 
	//三维场景显示范围控制系数，系数越大，显示的范围越大
	// var s = 200;
	//创建相机对象
	var camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
	//设置相机位置
	camera.position.set(0,0,300);
	//设置相机位置
	camera.lookAt(scene.position);
	//创建渲染器对象
	var renderer = new THREE.WebGLRenderer({
		antialias: true,
	});
	//设置渲染区域尺寸
	renderer.setSize(width,height);
	//设置背景颜色
	renderer.setClearColor(0xb9d3ff,1);
	document.body.appendChild( renderer.domElement );
	function animate() {
		requestAnimationFrame( animate );
		renderer.render( scene, camera );
	};
	animate();
	var controls = new THREE.OrbitControls(camera,renderer.domElement);
})