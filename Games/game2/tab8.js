var item = [
	["health",1,2,1],
	["mana",2,2,2],
	["strength",3,2,0],
	["speed",4,2,3],
	]

class drops{
	constructor(x, y, w, h, sprite, name, player){
		this.x = x;
		this.y = y;
		this.w = w;
		this.wn = w;
		this.h = h;
		this.sprite = sprite;
		this.name = name;
		for(var x in item){
			if(item[x][0] == this.name){

				this.frame = item[x][3];
				
			}
		}
		
		this.en = false;
		this.size = 0;
		
	}
}

drops.prototype.display = function(player, position){
	image(this.sprite[this.frame],this.x, this.y, this.w, this.h);
	
	
	if(player.x_v > 0){
		this.x -= player.speed/2 + player.mod;
	}
	else if(player.x_v){
		this.x += player.speed/2 + player.mod;
	}
	
	
	if(frameCount % 3 == 0){
		if(!this.en){
			this.wn -= 1;
			this.y -= 0.5;
			if(this.wn == 10) this.en = true;
		}
		else{
			this.wn += 1;
			this.y += 0.5;
			if(this.wn == 20) this.en = false;
		}
		

	}
		
	
	if(simpleCollision(this, player)){
		for(var x in item){
			if(item[x][0] == this.name){
				player.stats[item[x][1]][item[x][2]] += 1;
				this.frame = item[x][3];
				
			}
		}
		updates.splice(position, 1);
		// if(random(1) > 0.8){
		// 	player.strength *= 3;
		// }
	}
}