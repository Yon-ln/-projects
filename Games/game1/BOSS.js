class boss {
	constructor(x, y, w, h){
		
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;

		this.x_v = 0;
		this.y_v = 0;
		this.x_s = 0;
		this.y_s = 0;
		this.number = 7;
		this.name = 'boss'
		this.damage = 25;

		this.offx = 0;
		this.onGround = false;

		this.maxHealth = 1000;
		this.health = this.maxHealth;

		this.enraged = false;

		this.colour = 'white';

		this.jumpMulti = 0;
		this.shockwave = false;
		this.dropForce = 0;
		this.amount = 3;
		this.money = 1000;
			
		}

}

boss.prototype.display = function(x){
	camera.off()
	fill('red');
	rect(width/2 - 150, height - 30, 300 , 20, 5);
	fill('green');
	rect(width/2 - 150, height - 30, (this.health/this.maxHealth) * 300, 20, 5);
	camera.on();
	


	



	fill(this.colour);
	image(bosss, this.x, this.y, this.w, this.h);
	
	
	this.x = this.movement() + this.x_v + this.x_s;
	this.jump();
	this.y += this.y_v + this.x_s + 10 + this.dropForce;
	this.x_v *= 0.1
	this.y_v *= 0.9;
	

	
	particleHIT(enemies, enemies[x], x);
	for(var block in currentLevel){
		if(currentLevel[block].x < this.x + (width/150) * lengthS && currentLevel[block].x > this.x - (width/150) * lengthS && currentLevel[block].y < this.y + (width/150) * lengthS && currentLevel[block].y > this.y - (width/150)*lengthS){
			collisionResponse(enemies[x], currentLevel[block]);
		}
	}	

	
	if(this.health < this.maxHealth/2){
		this.enraged = true;	
	}
}

boss.prototype.movement = function(){

	if(!this.enraged){
		this.colour = 'white';
		this.offx += 0.005;
		var m = noise(this.offx) * 1000;
		
	} else{
		this.colour = 'red';
		this.offx += 0.01;
		var m = noise(this.offx) * 1000;
		
		if(this.w <= 150){
			this.w *= 1.1;
			this.h *= 1.1;
		}
		
	}

	return m
	
}

boss.prototype.jump = function(){
	
	if(random(1) < 0.005 && this.enraged === true && this.shockwave === false && this.amount > 0){
	
	}
	
	if(this.onGround == true){

		this.y_v = -50 + (-50 * this.jumpMulti);

		
		this.onGround = false;
	}

		if(player.x < this.x){
			this.x_v = (this.x - player.x);
		} else{
			this.x_v = (player.x - this.x);
		}

}

function particleHIT(group, monster, number){
	for(var slash in projectiles){
		if(simpleCollision(projectiles[slash], monster) === true){
			if(monster.health - projectiles[slash].damage >= 0){
				monster.health -= projectiles[slash].damage;
				projectiles.splice(slash, 1);
				hitSound.playMode('untilDone');
			} else{
				group.splice(number, 1);
				player.money += monster.money;
			}
		}
	}
}