var childrens;
var net=[
	[0,-20],
	[0,20],
	[-20,0],
	[20,0],
];
var netForward = [
	[
		0,
		Math.PI,
		Math.PI/-2,
		Math.PI/2
	],
	[
		Math.PI,
		0,
		Math.PI/2,
		Math.PI/-2
	],
	[
		Math.PI/2,
		Math.PI/-2,
		0,
		Math.PI
	],
	[
		Math.PI/-2,
		Math.PI/2,
		Math.PI,
		0
	],
];
var OBJLoader = new THREE.OBJLoader();
var MTLLoader = new THREE.MTLLoader();
function getCharacter() {
	loadMTLL();
	loadOBJ();
	
	var index_x = 29;
	var index_y = 19;
	
	var forward = 1;

	$(document).keydown(function(event){
	　　　　if(event.keyCode == 87){
				if(forward == 0) {
					if(check(childrens.position.x+net[forward][0],childrens.position.z+net[forward][1]) == 1) {
						index_y --;
						if(move_rock(index_x,index_y,0)) {
							index_y ++;
						}else{
							if(move_rocks_map[index_x][index_y] != -1) {
								var msh = move_rocks_map[index_x][index_y];
								msh.position.z -= 20;
								move_rocks_map[index_x][index_y-2] = msh;
								if(move_rocks_map[index_x+1][index_y] == move_rocks_map[index_x][index_y]) {
									move_rocks_map[index_x+1][index_y-2] = msh;
									move_rocks_map[index_x+1][index_y] = -1;
								}else{
									move_rocks_map[index_x-1][index_y-2] = msh;
									move_rocks_map[index_x-1][index_y] = -1;
								}
								move_rocks_map[index_x][index_y] = -1;
							}
							childrens.position.x += net[forward][0];
							childrens.position.z += net[forward][1];
						}
					}
				}else{
					childrens.rotateZ(-netForward[forward][0]);
				}
				forward = 0;
	　　　　}else if(event.keyCode == 83){
				if(forward == 1) {
					if(check(childrens.position.x+net[forward][0],childrens.position.z+net[forward][1]) == 1) {
						index_y ++;
						if(move_rock(index_x,index_y,1)) {
							index_y --;
						}else{
							if(move_rocks_map[index_x][index_y] != -1) {
								var msh = move_rocks_map[index_x][index_y];
								msh.position.z += 20;
								move_rocks_map[index_x][index_y+2] = msh;
								if(move_rocks_map[index_x+1][index_y] == msh) {
									move_rocks_map[index_x+1][index_y+2] = msh;
									move_rocks_map[index_x+1][index_y] = -1;
								}else{
									move_rocks_map[index_x-1][index_y+2] = msh;
									move_rocks_map[index_x-1][index_y] = -1;
								}
								move_rocks_map[index_x][index_y] = -1;
							}
							childrens.position.x += net[forward][0];
							childrens.position.z += net[forward][1];
						}
					}
				}else{
					childrens.rotateZ(-netForward[forward][1]);
				}
				forward = 1;
	　　　　}else if(event.keyCode == 65){
				if(forward == 2) {
					if(check(childrens.position.x+net[forward][0],childrens.position.z+net[forward][1]) == 1) {
						index_x --;
						if(move_rock(index_x,index_y,2)) {
							index_x ++;
						}else{
							if(move_rocks_map[index_x][index_y] != -1) {
								var msh = move_rocks_map[index_x][index_y];
								msh.position.x -= 20;
								move_rocks_map[index_x-2][index_y] = msh;
								if(move_rocks_map[index_x][index_y+1] == msh) {
									move_rocks_map[index_x-2][index_y+1] = msh;
									move_rocks_map[index_x][index_y+1] = -1;
								}else{
									move_rocks_map[index_x-2][index_y-1] = msh;
									move_rocks_map[index_x][index_y-1] = -1;
								}
								move_rocks_map[index_x][index_y] = -1;
							}
							childrens.position.x += net[forward][0];
							childrens.position.z += net[forward][1];
						}
					}
				}else{
					childrens.rotateZ(-netForward[forward][2]);
				}
				forward = 2;
	　　　　}else if(event.keyCode == 68){
				if(forward == 3) {
					if(check(childrens.position.x+net[forward][0],childrens.position.z+net[forward][1]) == 1) {
						index_x ++;
						if(move_rock(index_x,index_y,3)) {
							index_x --;
						}else{
							if(move_rocks_map[index_x][index_y] != -1) {
								var msh = move_rocks_map[index_x][index_y];
								msh.position.x += 20;
								move_rocks_map[index_x+2][index_y] = msh;
								if(move_rocks_map[index_x][index_y+1] == msh) {
									move_rocks_map[index_x+2][index_y+1] = msh;
									move_rocks_map[index_x][index_y+1] = -1;
								}else{
									move_rocks_map[index_x+2][index_y-1] = msh;
									move_rocks_map[index_x][index_y-1] = -1;
								}
								move_rocks_map[index_x][index_y] = -1;
							}
							
							childrens.position.x += net[forward][0];
							childrens.position.z += net[forward][1];
						}
					}
				}else{
					childrens.rotateZ(-netForward[forward][3]);
				}
				forward = 3;
	　　　　}
	// console.log(index_x+" "+index_y + " "+move_rocks_map[index_x][index_y]);
			checkAC();
	});
}
function loadMTLL() {
	MTLLoader.load('./obj/6/Robot_v1_L2.123c15d8bae1-9297-4131-9548-a26f04f08c31/12211_Robot_l2.mtl', function (materials) {
			// OBJ模型会和MaterialCreator包含的材质相对应
			materials.preload();
			OBJLoader.setMaterials(materials);  
			var materialsDetail = materials.materials;
			for (var item in materialsDetail) {
				materialsDetail[item].opacity = 1;
			}
			// loadOBJ(materials);
		}, function () {
		console.log('import MTL success!');
		}, function (err) {
			console.log('MTL error!', err);
	});
}

function loadOBJ() {
	OBJLoader.load('./obj/6/Robot_v1_L2.123c15d8bae1-9297-4131-9548-a26f04f08c31/12211_Robot_l2.obj', function (obj) {
		childrens = obj;
		// 初始化模型坐标值（根据需要自行调整）
		childrens.position.x = 10;
		childrens.position.y = 18;
		childrens.position.z = 10;
		childrens.rotateX(Math.PI/-2);
		// 设置模型缩放比例
		childrens.scale.set(3, 3, 3);
		// 把模型添加到场景里面
	
		childrens.traverse(function(child) {
			if (child instanceof THREE.Mesh) {
				//设置模型皮肤
				child.material.map = THREE.ImageUtils.loadTexture( './obj/6/Robot_v1_L2.123c15d8bae1-9297-4131-9548-a26f04f08c31/12211_Robot_diffuse.jpg');
			}
		})
		scene.add(childrens);
	}, function () {
		console.log('import OBJ success!');
	}, function (err) {
		console.log('OBJ error!', err);
	});
}

function check(a,b) {
	//地图越界
	if(a < -560 || a > 560 || b < -360 || b > 360) return 0;
	return 1;
}

function move_rock(x,y,k) {
	if(move_rocks_map[x][y] == 1) return 1;
	if(move_rocks_map[x][y] == -1) return 0;
	if(k == 0) {
		if(y-3 < 0) return 1;
		if(move_rocks_map[x][y-2] != -1) return 1;
		if(move_rocks_map[x+1][y] == move_rocks_map[x][y]) {
			if(move_rocks_map[x+1][y-2] != -1) return 1;
		}else{
			if(move_rocks_map[x-1][y-2] != -1) return 1;
		}
	}else if(k == 1) {
		// console.log(x+" "+y);
		if(y+2 > 36) return 1;
		if(move_rocks_map[x][y+2] != -1) return 1;
		if(move_rocks_map[x+1][y] == move_rocks_map[x][y]) {
			if(move_rocks_map[x+1][y+2] != -1) return 1;
		}else{
			if(move_rocks_map[x-1][y+2] != -1) return 1;
		}
	}else if(k == 2) {
		if(x-3 < 0) return 1;
		if(move_rocks_map[x-2][y] != -1) return 1;
		if(move_rocks_map[x][y+1] == move_rocks_map[x][y]) {
			if(move_rocks_map[x-2][y+1] != -1) return 1;
		}else{
			if(move_rocks_map[x-2][y-1] != -1) return 1;
		}
	}else if(k == 3) {
		if(x+2 > 56) return 1;
		if(move_rocks_map[x+2][y] != -1) return 1;
		if(move_rocks_map[x][y+1] == move_rocks_map[x][y]) {
			if(move_rocks_map[x+2][y+1] != -1) return 1;
		}else{
			if(move_rocks_map[x+2][y-1] != -1) return 1;
		}
	}
	return 0;
}

function checkAC() {
	for(var i = 0;i < end_rocks.length; i++) {
		var xx = end_rocks[i][0];
		var yy = end_rocks[i][1];
		if(move_rocks_map[xx][yy] == -1) {
			$("#bt").css("display","none");
			return ;
		}
		if(move_rocks_map[xx+1][yy] == -1){
			$("#bt").css("display","none");
			return ;
		}
		if(move_rocks_map[xx][yy+1] == -1){
			$("#bt").css("display","none");
			return ;
		}
		if(move_rocks_map[xx+1][yy+1] == -1){
			$("#bt").css("display","none");
			return ;
		}
	}
	ac();
}

function ac() {
	$("#bt").css("display","block");
}