class block{
	constructor(x, y, sprite,w, h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.sprite = sprite;
		this.ok = false;
		this.objects = 'block';
		this.tempGround = y + this.h;
	}
	display(player){

		image(this.sprite, this.x, this.y);
	
	

		if(player.x_v > 0){
			this.x -= player.speed/2 + player.mod;
		}
		else if(player.x_v){
			this.x += player.speed/2 + player.mod;
		}
	
		

		
	


	}
}


