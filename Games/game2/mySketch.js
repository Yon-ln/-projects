var groundBottom = 400;
var groundTop = 200;
var n = [];
var mon = 0;
var one;
var updates = [];
var spawnNew = false;
var c = 0;
var monsterSpawn = [-400, 800]
var spawnX = -800;
var mouse;
var notSet = true;
function setup() {
	createCanvas(720,500);
	one = new character(spawnX,300,50,50, 'white', blobAni, bulletAni);
	
	for(var x = 0; x < 10; x++){
		updates.push(new monster(random(monsterSpawn[0], monsterSpawn[1]),random(150, 350), 10,10, [0, 400], enemyAni, 35,5,random(1),int(random(10,15))));
		mon += 1;
		updates.push(new block(random(-500,300),random(220 - tree.height,400 - tree.height),tree, tree.width, tree.height - 20));
		
	}
// 	for(var x = 0; x < height / 10; x++){
// 		updates.push(new block(random(-100,100),200 + x * 2.5,grass, grass.width / 3, grass.height));
// 		updates.push(new block(random(updates[updates.length - 1].x + updates[updates.length - 1].w),200 + x * 2.5,grass, grass.width / 3, grass.height));
// 		updates.push(new block(random(updates[updates.length - 1].x - updates[updates.length - 1].w),200 + x * 2.5,grass, grass.width / 3, grass.height));
		updates.push(new monster(random(900,1000),random(150, 350), 0.1, 0.1, [0, 400], enemyAni, 50000,500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,500,10000));
			

		
// 	}
	

	mapTile(ground);
	n = updates;
	updates.push(one);
	

	loadSpriteAnimation();
}

function draw() {
	background(230,250,250);
	// line(0,groundBottom,width,groundBottom);
	// line(0,groundTop,width,groundTop);
	fill(36,82,69);
	rect(0,200,width,200);
	
	for(var x = 0; x < updates.length; x++){
		updates[x].display(one, x)
		// text(updates[x].ok, updates[x].x, updates[x].y - 10);

		
	}
	mouse = {
		x:mouseX,
		y:mouseY,
		w:0,
		h:0
	}
	
	// text(mon, 250, 250);
	
	if(mon <= 10 + int(one.level/5)){
		if(random(1) > 0.9){
			updates.push(new monster(random(monsterSpawn[0], monsterSpawn[1]),random(150, 350), 10,10, [0, 400], enemyAni, 35,5,random(1),int(random(10,15))))
			mon += 1;			
		}

	}
	
	if(one.onGround){
		updates.sort((a, b) => (a.y + a.h >= b.y + b.h) ? 1: -1);
	} else{
		updates.sort((a, b) => (a.tempGround >= b.tempGround) ? 1: -1);
	}
	if(spawnNew){
		
		if(frameCount % 60 == 0){
			c+= 1;
			
		}
		if(c == 0){
			textAlign(CENTER);
			text("Respawning in", 250, 250);
		}
		text(this.c, 250, 280);
		if(c == 4){
			spawnNew = false;
			one = new character(spawnX,300,50,50, 'white', blobAni, bulletAni);
			updates.push(one);
			c = 0;
		}
		
	}
		
	

}

function keyPressed() {
	one.movement(87,65,83,68,32,77,true);
	if(one.mana > 0) one.shootit(74, true);
}

function keyReleased() {
	one.movement(87,65,83,68,900, false);
	one.shootit(74, false);
}

class character{
	constructor(x, y, w, h, colour, sprite, bulletImage){
		this.x = x;
		this.x_v = 0;
		this.y = y;
		this.y_v = 0;
		this.y_vs = 0;
		this.w = w;
		this.h = h;
		this.colour = colour;
		
		this.frame = 0;
		this.currentFrameStop = 0;
		this.facing = 0;
		this.anicount = 0;
		this.still = 0;
		this.left = false;
		this.right = false;
		this.up = false;
		this.down = false;
		this.speed = 2;
		this.sprite = sprite;
		
		this.onGround = true;
		this.objects = 'player';
		this.impGrav = 0;
		this.jumpMod = 0
		this.tempGround = this.y + this.h;
		this.groundCounterTemp = 0;
		this.jumpTime = 0;
		this.shadowTemp = 0;
		this.collisionBox = {
			x:this.x,
			y:(this.y + this.h) - 10,
			w:this.w,
			h:10,		
		}
		
		this.shootDown = false;
		this.shot = false;
		this.shotFrame = 0;
		this.bulletImage = bulletImage;
		this.charge = 0;
		
		this.name = names[int(random(names.length -1))]
		this.money = 0;
		
		this.level = 1;
		this.points = 3;
		this.addPointTimer = 0;
		this.position = [10,60]
		this.stats = [
			["LEVEL",this.level,0],
			["HEALTH",10,0], //health,mana,strength,speed
			["MANA",10,0],
			["STRENGTH",10,0],
			["SPEED",2,0]
		]
		
		this.maxHealth = this.stats[1][1] + this.stats[1][2];
		this.health = this.maxHealth;
		this.regenHealthCount = 0;
		
		this.maxMana = this.stats[2][1] + this.stats[2][2];
		this.mana = this.maxMana;
		this.regenManaCount = 0;
		this.currentManaUsage = 0;
		
		this.maxExperience = 10;
		this.experience = 0;
		
		this.openStats = false;
		
		this.strength = 0;
		
	}
	
	display(wow, oh){
		this.levelHandler();
		this.statsHandler();
		this.collisionBox = {
			x:this.x,
			y:(this.y + this.h) - 10,
			w:this.w,
			h:10,		
		}
		
		noStroke();
		fill(30,30,30);
		ellipse(this.x + this.w / 2 + 5, this.shadowTemp, 50, 20);
		image(this.sprite[this.frame], this.x, this.y, this.w * 1.2,  this.h * 1.2);
		fill('white');
		stroke(0);
		
		textAlign(CENTER);
		text(this.name, this.x + this.w/2, this.y - 10);
		textAlign(LEFT);
		
		
		this.y += this.y_v + this.y_vs;

		this.x += this.x_v;
		this.x_v *= 0;
		
		// text(this.tempGround, 50, 50);
		// text(this.groundCounterTemp, 50, 80);
		// text(this.y + this.h, 50, 110);
		
		// line(0,this.tempGround,500,this.tempGround);
	
		if(this.groundCounterTemp == 0){
			this.y_vs *= 0;
			this.shadowTemp = this.y + this.h;
			this.y_v *= 0;
			if(this.y + this.h > groundBottom && this.onGround){
				this.y = groundBottom - this.h;
				this.onGround = true;
				
			}
			else if (this.y + this.h < groundTop && this.onGround){
					this.y = groundTop - this.h;
					this.onGround = true;
			}
		}
		else if(this.groundCounterTemp == 1){
				if(this.tempGround < groundTop){
					this.up = false;	
				} else if(this.tempGround > groundBottom){
					this.down = false;
	
				}
				this.y_v += 0.15;
				this.y_v /= 1.02;			
				this.jumpTime ++;
				if(this.jumpTime < 45) {
					this.y_v -= 0.4 / (this.jumpTime/3);
					

			}
	
			this.shadowTemp = this.tempGround;
			this.tempGround += this.y_vs;
			
			if(this.y + this.h > this.tempGround){
				this.y = this.tempGround - this.h;
				this.onGround = true;
				this.groundCounterTemp = 0;
				this.impGrav = 0;
				this.jumpMod = 0;
				this.jumpTime = 0;
		
				
				
			}

		}

		
		if(this.x < 50){
			this.x = 50;
			this.mod = 5;
		}
		else if(this.x + this.w > width - 50){
			this.x = width - 50 - this.w;
			this.mod = 5;
		}
		else{
			this.mod = 2;
		}
		
		// text(this.jumpTime, 300, 50);
		
		

		if(this.health <= 0){
			this.health = 0;
			updates.splice(oh, 1);	
			spawnNew = true;
			this.speed = 0;
		}
		

		
		if(this.left){
			this.x_v = -this.speed;
			monsterSpawn[0] += 5;
			monsterSpawn[1] += 5;
			spawnX += 5;
			this.facing = 0;
			this.frame = 8 + int((frameCount / 5) % 8);
			this.still = 8;
		}
		else if(this.right){ 
			this.x_v = this.speed;
			monsterSpawn[0] -= 5;
			monsterSpawn[1] -= 5;
			spawnX -= 5;
			this.facing = 1;
			this.frame = int((frameCount/ 5)  % 8);
			this.still = 0;		
		}
		else{
			this.frame = this.still;
		}
		if(this.up){

			this.y_vs = -this.speed;
			if(this.facing == 0){
				this.frame = 8 + int((frameCount / 5) % 8);
			}
			else{
				this.frame = int((frameCount/ 5)  % 8);
			}
				
		} 
		else if(this.down){
			this.y_vs = this.speed;
			if(this.facing == 0){
				this.frame = 8 + int((frameCount / 5) % 8);
			}
			else{
				this.frame = int((frameCount/ 5)  % 8);
			}
			
		} else{
			this.y_vs = 0;	
		}
		// text(this.down, 200, 50);
		// text(this.y_v, 200, 100);
		
		this.bulletDisplay();
	}

	displayInventory(){
		
	}

	movement(UP,LEFT,DOWN,RIGHT,SPACE,openSTAT,key){

			if(keyCode == LEFT){
			this.left = key;
		}
			if(keyCode == DOWN){
			this.down = key;
		}
			if(keyCode == RIGHT){
			this.right = key;
		}
		if(keyCode == UP){
			this.up = key;
		}
		if(keyCode == openSTAT){
			this.openStats = !this.openStats;
	
		}
			if(keyCode == SPACE && this.groundCounterTemp == 0 ){
				

				this.onGround = false;
				this.tempGround = this.y + this.h;
				this.groundCounterTemp += 1;
				this.y_v = 0;


			}
	}
	
	shootit(button, key){
		if(keyCode == button){
			this.shootDown = key;
			
		}
	}
	

	
	bulletDisplay(){
		if(this.shootDown && notSet){
			this.currentManaUsage = this.mana;

			notSet = false;
		}

		if(this.shootDown ){
			imageMode(CENTER);
			var ds = (this.currentManaUsage - this.mana) * 0.1;
			
			if(this.facing == 0){
				image(this.bulletImage[this.shotFrame], (this.x - 10) - ds, this.y + this.h/2, 64 * ds, 64 * ds);
				this.shotFrame = 12 + int((frameCount / 5) % 6);
			}
			else{
				image(this.bulletImage[this.shotFrame], this.x + this.w + 10 + ds, this.y + this.h/2, 64* ds, 64 * ds);
				this.shotFrame = 0 + int((frameCount / 5) % 6);	
			}
			imageMode(CORNER);
			
			if(this.mana > 0){
				if(this.currentManaUsage - this.mana <= 100){
					this.mana -= 1;
				}
				
			} else{
				this.mana = 0;
			}
			this.charge = 5;
		} else{
			if(this.charge > 0){
				updates.push(new projectile(this.x , this.y + this.w/2, this.w, this.h, bulletAni, this.facing, this.strength, 1, updates, this.currentManaUsage - this.mana));
				this.charge = 0;
				notSet = true;
			}
		}
		
	}
	
	
	
}



function simpleCollision(objectA, objectB) { //detects collision
	
  return objectA.x < objectB.x + objectB.w && objectA.x + objectA.w > objectB.x && objectA.y < objectB.y + objectB.h && objectA.y > objectB.y - objectA.h;
	
}