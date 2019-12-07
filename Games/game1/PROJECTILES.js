var projectiles = [];

class projectile {
	constructor(x, y, w, h, sprite, facing, damage, speed){
		
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		
		this.sprite = crescent;
		this.facing = facing;
		this.frame = 0;
		
		this.damage = damage;
		this.speed = speed;
		
		this.startFrame = frameCount;
//		slashSound.setVolume(0.005);
//		slashSound.play();
		
	}
	
	display(x){
		
		
		if(this.facing === 'LEFT'){
			this.x -= 15 + this.speed;
			this.frame = 0;
		}
		if(this.facing === 'RIGHT'){
			this.x += 15 + this.speed;
			this.frame = 1;
		}
		imageMode(CENTER);
		if(player.isInvincible === false){
			image(crescentAni[this.frame], this.x, this.y, this.w, this.h);
		} else {
			image(crescentAni[this.frame], this.x, this.y + this.h, this.w, this.h/10);
		}
		
		imageMode(CORNER);
		
		//delete bullets if it's more than a few or less seconds,
		if(frameCount > this.startFrame + 20){
			projectiles.splice(x, 1);
		}
		
	}
}