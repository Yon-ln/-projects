class monster {
	constructor(x, y, w, h, bound, sprite, maxHealth, experience, damage, level){
		this.x = x;
		this.y = y;
		this.w = w * (level/5);
		this.h = h * (level/5);
		this.bound = bound;
		this.bound[0] = x + 300;
		this.sprite = sprite;
		this.tempGround = y + h;
		this.n = x;
		this.collisionBox;
		this.level = level;
		this.ran = int(random(0,3));
		
		//movement
		this.x_v = 0;
		this.y_v = 0;
		this.moving = false;
		this.point = createVector(0,0);
		
		//state
		this.state = 0; //0 = idle, 1 = chase;
		this.frame = 0;
		
		//stats
		this.maxHealth = maxHealth;
		this.health = this.maxHealth;
		this.experience = this.level;
		this.dam = damage;
		
	}
}


monster.prototype.display = function(player, position){
	noStroke();
	this.collisionBox = {
			x:this.x,
			y:(this.y + this.h) - this.h*0.25,
			w:this.w,
			h:this.h*0.25,
		}
	
	fill('red');
	rect(this.x, this.y - 20, this.w, 8, 15);
	fill('green');
	rect(this.x, this.y - 20, this.health/this.maxHealth * this.w, 8, 15);
	text(this.level, this.x, this.y - 20);

	this.tempGround = this.y + this.h;
	fill(50,50,50);
	ellipse(this.x + this.w / 2, this.tempGround - 5, this.w, 20);
	image(this.sprite[this.frame],this.x,this.y, this.w, this.h);
	this.x += this.x_v;
	this.y += this.y_v;
	// rect(this.collisionBox.x,this.collisionBox.y,this.collisionBox.w,this.collisionBox.h);
	
	
	
	if(player.x_v > 0){
		this.point.sub(player.speed/2 + player.mod,0);
		this.n -= player.speed/2 + player.mod;
		this.bound[0] -= player.speed/2 + player.mod;
		this.x -= player.speed/2 + player.mod;
		
	}
	else if(player.x_v){
		this.point.add(player.speed/2 + player.mod,0);
		this.n += player.speed/2 + player.mod;
		this.bound[0] += player.speed/2 + player.mod;
		this.x += player.speed/2 + player.mod;
	}
	if(simpleCollision(this.collisionBox, player.collisionBox)){
		this.state = 1;
		
		if(player.health <= 0){
			player.health = 0;
		}
		else{
			player.health -= this.dam;
		}
	}
	
	if(this.state == 0){
		this.idleMovement();
	}
	else{
		this.chaseMovement(player);	
	}
	if(this.x_v !== 0){
		this.frame = int((frameCount / 10) % 6);
	} else{
		this.frame = 0;
	}
	

	for(var n in updates){
		if(updates[n].damage > 0){
			if(simpleCollision(this.collisionBox, updates[n].collisionBox)){
				if(this.health - updates[n].damage >= 0){
					this.health -= updates[n].damage;
					this.state = 1;
					updates.splice(n, 1);
					
				} else{
					this.health = 0;
					mon -= 1;
				}
			}
		}
			
	}
	
	if(this.health <= 0){
		player.experience += this.experience;
		updates.splice(position, 1);

		updates.push(new drops(this.x, this.y, 20, 20, potion, item[this.ran][0],player));
	}

	
}



monster.prototype.idleMovement = function(){
	if(!this.moving && frameCount % 120 == 0 && random(1) > 0.3){
		this.point.set(random(this.n,this.bound[0] - 50),random(groundTop,this.bound[1] - 50));
		this.moving = true;
		this.x_v = (this.point.x - this.collisionBox.x) * 0.01;
		this.y_v = (this.point.y - this.collisionBox.y) * 0.01;
	}

	

	if(this.collisionBox.x < this.point.x + 10 && this.collisionBox.x + this.collisionBox.w > this.point.x && this.collisionBox.y < this.point.y + 10&& this.collisionBox.y > this.point.y - this.collisionBox.h){
		 this.moving = false;
		 this.x_v = 0;
		 this.y_v = 0;
	}
	

}

monster.prototype.chaseMovement = function(player){
	
	this.x_v = (player.collisionBox.x - this.collisionBox.x) * 0.02;
	this.y_v = (player.collisionBox.y - this.collisionBox.y) * 0.02;
	
	if(this.collisionBox.x < this.n - 300 || this.collisionBox.x + this.collisionBox.w > this.bound[0]){
		this.state = 0;	
		this.moving = false;
	}
}