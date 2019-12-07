var miniFunc = [];

function invincibility(player){
	this.frameC = frameCount;
	this.player = player;
	this.player.isInvincible = true;
	
	this.show = (x) => {
		if(frameCount > this.frameC + 120){
			this.player.isInvincible = false;
			miniFunc.splice(x, 1);
		}
	}
}