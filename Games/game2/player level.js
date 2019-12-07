function bar(c1,c2,x,y,w,h,a,b){
	fill(c1);
	rect(x,y,w,h,5);
	fill(c2);
	if(a >= 0) rect(x,y,a/b*w,h,5);	
}

character.prototype.levelHandler = function(){
	bar('white','green',this.position[0],this.position[1]-50,120,5,this.health,this.maxHealth);
	bar('white','blue',this.position[0],this.position[1]-40,120,5,this.mana,this.maxMana);
	bar('white','black',this.position[0],this.position[1]-30,120,5,this.experience,this.maxExperience);
	
	if(this.experience >= this.maxExperience){
		this.level += 1;
		this.points += 3;
		this.experience -= this.maxExperience;
		this.maxExperience *= 1.05;
		
	}
	
	this.maxHealth = this.stats[1][1] + this.stats[1][2];
	this.maxMana = this.stats[2][1] + this.stats[2][2];
	this.strength = this.stats[3][1] + this.stats[3][2];
	this.speed = this.stats[4][1] + this.stats[4][2]/50;

	if(this.health < this.maxHealth){
		if(frameCount % 60 == 0){
			this.regenHealthCount += 1;
		}
		if(this.regenHealthCount >= 15){
			this.health += (1 + (this.health / this.maxHealth)) * this.level;
		}
	} else{
		this.regenHealthCount = 0;
		this.health = this.maxHealth;
	}	
	
	if(!this.shootDown){
		if(this.mana < this.maxMana ){
			if(frameCount % 60 == 0){
				this.regenManaCount += 1;
			}
			if(this.regenManaCount >= 5){
				this.mana += (1 + (this.mana / this.maxMana)) * this.level;
			}
		} else{
			this.regenManaCount = 0;
			this.mana = this.maxMana;
		}
	}
	
	this.stats[0][1] = this.level;
}


//this.addPointTimer
character.prototype.statsHandler = function(){
	if(this.openStats){
		if(this.points > 0){
			text("POINTS", this.position[0], this.position[1] + 75);
			text(this.points, this.position[0] + 90, this.position[1] + 75);		
		}
		
		for(var y in this.stats){
			text(this.stats[y][0],this.position[0],this.position[1] + y*15); //statname
			for(var x in this.stats[y]){
				text(this.stats[y][1] + this.stats[y][2],this.position[0] + 90,this.position[1] + y*15); //currentstat
				if(this.points > 0 && this.stats[y][0] != "LEVEL"){

					// rect(this.position[0] + 113.5,this.position[1]-10 + y*15,10,10);
					text("+",this.position[0] + 115,this.position[1] + y*15); //pointadder
					var box = {x:this.position[0] + 113.5, y:this.position[1]-10 + y*15,w:10, h:10}


					if(simpleCollision(mouse,box) && mouseIsPressed && this.addPointTimer <= 0){
						// print('?');
						if(this.addPointTimer <= 0){
							this.stats[y][2] += 1;
							this.points -= 1;
							this.addPointTimer = 3;
						}
						this.addPointTimer -= int((frameCount / 5) % 8);

					}

				}
			}
		}
	} else{
		text(this.stats[0][0],this.position[0],this.position[1] + 0*15);
		text(this.stats[0][1] + this.stats[0][2],this.position[0] + 90,this.position[1] + 0*15)
	}
}