class projectile {
	constructor(startX, y, w, h, sprite, facing, damage, speed, group, charge){
		this.startX = startX;
		this.x = startX;
		this.y = y;
		this.w = w;
		this.h = h;
		this.x_v = 0;
		
		this.sprite = sprite;
		this.facing = facing;
		
		this.damage = damage * charge/5;
		this.speed = speed;
		this.group = group;
		this.charge = charge / 10;
		this.tempGround = this.y + this.h/2;
		
		this.collisionBox = {
			x:this.x,
			y:(this.y + this.h) - 10,
			w:this.w,
			h:10,					
		}
	}
}

projectile.prototype.display = function(player, position){
	this.collisionBox = {
		x:this.x - (this.w * this.charge)/2,
		y:this.y ,
		w: this.w * this.charge,
		h:this.h,					
	}
	noStroke();
	imageMode(CENTER);
	fill(50,50,50);
	ellipse(this.x, this.y + this.h / 2, this.w * this.charge, (this.h / 3) * this.charge);
	image(this.sprite[0], this.x, this.y, this.w * this.charge, this.h* this.charge);
	// fill('yellow');
	// rect(this.collisionBox.x,this.collisionBox.y,this.collisionBox.w,this.collisionBox.h);

	imageMode(CORNER);
	this.x += this.x_v * this.charge;
	
	if(this.facing == 0){
		this.x_v = -5;
		if(this.x < this.startX - 200 * this.charge){
			this.group.splice(position, 1);
		}
	}
	if(this.facing == 1){
		this.x_v = 5;
		if(this.x > this.startX + 200 * this.charge){
			this.group.splice(position, 1);
		}
	}
}

