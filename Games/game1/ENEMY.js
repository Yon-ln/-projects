var enemies = [];
class enemy { 
	constructor(levelN, x, y, w, h, money, health, sprite){
		//display
		this.x = x;
		this.y = y;
		this.w = w ;
		this.h = h ;
		this.sprite = sprite;
		this.frame = 0;
		this.number = levelN;
		this.name = 'enemy'
		this.damage = 10;
		
		//movement
		this.x_speed = 5;
		this.x_v = this.x_speed;
		this.y_v = 0;
		this.onGround = false;
		this.turn = 1;
		this.left = false;
		this.right = true;
		
		//money
		this.money = money;
		
		//alive
		this.maxHealth = health;
		this.health = this.maxHealth;
		this.died = false;
		this.enraged = false;
		this.counter = 0;
		this.collisionTimer = 0;
		this.waitTime = 45;
		
		//animation
		this.soon = false;
		
	}
}

enemy.prototype.display = function(x){
		//HEALTH and IMAGE
	rectMode(CENTER);
	fill('red');
	rect(this.x + this.w/2, this.y - 20, this.w, 8, 15);
	fill('green');
	rect(this.x + this.w/2, this.y - 20, this.health/this.maxHealth * this.w, 8, 15);
	rectMode(CORNER);
	fill('white');
	image(this.sprite[this.frame],this.x, this.y, this.w, this.h);
		
	if(this.x_v < 0){
		if(this.enraged === true){
			this.frame = 2;
		}else{
			this.frame = 0;
		}

	}else if(this.x_v === 0){
		this.frame = 4;
	}
	else{
		if(this.enraged === true){
			this.frame = 3;
		}else{
			this.frame = 1;
		}

	}		
		
		//movement
		
	
	this.x += this.x_v;
	this.y += this.y_v + 10;
	this.y_v *= 0.9;
	this.x_v *= 0.934;
	// text(this.left, this.x, this.y - 110);
	// text(this.right, this.x, this.y - 80);
	// text(this.x_v, this.x, this.y - 50);
	if(this.onGround === true){
		if(frameCount % int(random(this.waitTime,this.waitTime + 15)) === 0){
			if(this.x > player.x - 600 && this.x < player.x + 600 ){
//				jumpSound.play();
			}
			this.y_v = -24;
			if(this.left){
				this.x_v = -10;
			}
			if(this.right){
				this.x_v = 10;
			}
			
			this.onGround = false;
		}
	}

	if(this.health/ this.maxHealth < 0.5){
		if(this.enraged == false){
			this.x_v = 0;
			this.y_v = 0;
		}
		if(frameCount % 60 == 0){
			this.counter += 1;
			if(this.collisionTimer > 0){
				this.collisionTimer -= 1;
			}
		}
		if(this.counter > 3){
			this.waitTime = 15;
			if(int(this.w) > 50 || int(this.h) > 50){
				this.enraged = true;
				this.c = 'red';
			} else{
				this.w *= 1.1;
				this.h *= 1.1;	
			}
		}				
	}

	if(this.health / this.maxHealth <= 0){
		this.x_v = 0;
		this.y_v = 0;
		this.health = 0;
		this.h *= 0.97;
		if(this.h < 0.1){
			this.y = -10000;
		}
	}
		
		
		//if particles(bullets hit enemies)
		particleHIT(enemies, enemies[x], x);
		
		for(var block in currentLevel){
			if(currentLevel[block].x < this.x + (width/150) * lengthS && currentLevel[block].x > this.x - (width/150) * lengthS && currentLevel[block].y < this.y + (width/150) * lengthS && currentLevel[block].y > this.y - (width/150)*lengthS){
				collisionResponse(enemies[x], currentLevel[block]);
			}
		}
}