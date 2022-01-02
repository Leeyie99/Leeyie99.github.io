var move_rocks_map = [];
//可移动位置
var move_rocks = [
	[3,3],
	[22,12],
	[22,14],
	[24,14]
];
//终点位置
var end_rocks = [
	[1,1],
	[16,14],
	[22,8],
	[24,18]
];
//不可移动石块位置
var fixed_rocks = [
	[20,20],
	[18,20],
	[22,20],
	[1,5],
	[4,1],
	[20,6],
	// [22,6],
	[24,6],
	[20,8],
	[24,8],
	[20,10],
	[24,10],
	[26,10],
	[28,10],
	[30,10],
	[16,12],
	[18,12],
	[20,12],
	// [14,14],
	[26,14],
	[28,14],
	[30,14],
	[14,16],
	[16,16],
	[18,16],
	[20,16],
	[22,16],
	[26,16],
	[22,18],
	[26,18],
	// [24,20]
];


function getMap() {
	getGround();
	getRock();
	get_end();
}

//生成地面
function getGround() {
	//1200,30,800
	var ground = new THREE.BoxGeometry(80,30,80);
	let cubMaterials=[
		new THREE.MeshBasicMaterial({color:'#FFFFE0',side:THREE.DoubleSide}),
		new THREE.MeshBasicMaterial({color:'#FFFFE0',side:THREE.DoubleSide}),
		new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('./ground2.jpg'),side:THREE.DoubleSide}),
		new THREE.MeshBasicMaterial({color:'#FFFFE0',side:THREE.DoubleSide}),
		new THREE.MeshBasicMaterial({color:'#FFFFE0',side:THREE.DoubleSide}),
		new THREE.MeshBasicMaterial({color:'#FFFFE0',side:THREE.DoubleSide}),
	]
	var x ,y = 0,z = -360;
	for(var i = 0;i < 10; i++) {
		x = -560;
		for(var j = 0;j < 15; j++) {
			var mesh = new THREE.Mesh(ground,cubMaterials);
			mesh.position.set(x,y,z);
			x += 80;
			scene.add(mesh);
		}
		z += 80;
	}
}

//生成墙壁
function getRock() {
	var array = [];
	for(var i = 0;i <= 58; i++) {
		array = [];
		for(var j = 0;j < 38; j++) {
			array[j] = -1;
		}
		move_rocks_map[i] = array;
	}
	getBasicRock();
	getFixedRock();
	getMoveRock();
}
//生成基础围墙
function getBasicRock() {
	
	var index_x = 20,index_y = 20;
	var rock = new THREE.BoxGeometry(40,40,40);
	let cubMaterials = [
		new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('./rock4.jpeg'),side:THREE.DoubleSide}),
		new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('./rock4.jpeg'),side:THREE.DoubleSide}),
		new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('./rock4.jpeg'),side:THREE.DoubleSide}),
		new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('./rock4.jpeg'),side:THREE.DoubleSide}),
		new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('./rock4.jpeg'),side:THREE.DoubleSide}),
		new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('./rock4.jpeg'),side:THREE.DoubleSide}),
	]
	for(var i = 0;i < 20; i++) {
		for(var j = 0;j < 30; j++) {
			if(i != 0 && j != 0 && i != 19 && j != 29){
				index_x += 40;
				continue;
			}
			var mesh_rock = new THREE.Mesh(rock,cubMaterials);
			mesh_rock.translateY(35);
			mesh_rock.translateX(index_x-600);
			mesh_rock.translateZ(index_y-400);
			scene.add(mesh_rock);
			index_x += 40;
		}
		index_x = 20;
		index_y += 40;
	}
}

//生成固定方块
function getFixedRock() {
	
	var rock = new THREE.BoxGeometry(40,40,40);
	let cubMaterials = [
		new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('./rock4.jpeg'),side:THREE.DoubleSide}),
		new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('./rock4.jpeg'),side:THREE.DoubleSide}),
		new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('./rock4.jpeg'),side:THREE.DoubleSide}),
		new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('./rock4.jpeg'),side:THREE.DoubleSide}),
		new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('./rock4.jpeg'),side:THREE.DoubleSide}),
		new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('./rock4.jpeg'),side:THREE.DoubleSide}),
	]
	for(var i = 0;i < fixed_rocks.length; i++) {
		var mesh_rock = new THREE.Mesh(rock,cubMaterials);
		mesh_rock.translateY(35);
		mesh_rock.translateX(get_indxx(fixed_rocks[i][0]));
		mesh_rock.translateZ(get_indxy(fixed_rocks[i][1]));
		move_rocks_map[fixed_rocks[i][0]][fixed_rocks[i][1]] = 1; 
		move_rocks_map[fixed_rocks[i][0]+1][fixed_rocks[i][1]] = 1;
		move_rocks_map[fixed_rocks[i][0]][fixed_rocks[i][1]+1] = 1; 
		move_rocks_map[fixed_rocks[i][0]+1][fixed_rocks[i][1]+1] = 1; 
		scene.add(mesh_rock);
	}
}

//生成可移动方块
function getMoveRock() {
	
	var rock = new THREE.BoxGeometry(40,40,40);
	let cubMaterials=[
		new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('./1.jpg'),side:THREE.DoubleSide}),
		new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('./1.jpg'),side:THREE.DoubleSide}),
		new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('./1.jpg'),side:THREE.DoubleSide}),
		new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('./1.jpg'),side:THREE.DoubleSide}),
		new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('./1.jpg'),side:THREE.DoubleSide}),
		new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('./1.jpg'),side:THREE.DoubleSide}),
	]
	
	for(var i = 0;i < move_rocks.length; i++) {
		var mesh_rock = new THREE.Mesh(rock,cubMaterials);
		mesh_rock.translateY(35);
		mesh_rock.translateX(get_indxx(move_rocks[i][0]));
		mesh_rock.translateZ(get_indxy(move_rocks[i][1]));
		move_rocks_map[move_rocks[i][0]][move_rocks[i][1]] = mesh_rock; 
		move_rocks_map[move_rocks[i][0]+1][move_rocks[i][1]] = mesh_rock;
		move_rocks_map[move_rocks[i][0]][move_rocks[i][1]+1] = mesh_rock; 
		move_rocks_map[move_rocks[i][0]+1][move_rocks[i][1]+1] = mesh_rock; 
		scene.add(mesh_rock);
	}
}

function get_end() {
	
	var rock = new THREE.BoxGeometry(40,40,40);
	let cubMaterials = [
		new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('./end1.jpg'),side:THREE.DoubleSide,transparent:true,opacity: 0.5}),
		new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('./end1.jpg'),side:THREE.DoubleSide,transparent:true,opacity: 0.5}),
		new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('./end1.jpg'),side:THREE.DoubleSide,transparent:true,opacity: 0.5}),
		new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('./end1.jpg'),side:THREE.DoubleSide,transparent:true,opacity: 0.5}),
		new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('./end1.jpg'),side:THREE.DoubleSide,transparent:true,opacity: 0.5}),
		new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('./end1.jpg'),side:THREE.DoubleSide,transparent:true,opacity: 0.5}),
	]
	for(var i = 0;i < end_rocks.length; i++) {
		var mesh_rock = new THREE.Mesh(rock,cubMaterials);
		mesh_rock.translateY(35);
		mesh_rock.translateX(get_indxx(end_rocks[i][0]));
		mesh_rock.translateZ(get_indxy(end_rocks[i][1]));
		scene.add(mesh_rock);
	}
}

function get_indxx(x) {
	return  (x*20 - 560);
}

function get_indxy(y) {
	return y*20-360;
}