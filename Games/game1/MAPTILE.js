function mapTile(level, levelSprite) {
	var widthpoint = 20;
	var heightpoint = 10;
	
	for(var y = 0; y<levelSprite.height; y++){
        for(var x = 0; x<levelSprite.width; x++){
			var colour = levelSprite.get(x, y, 1, 1);
			if(colour[0] === 255 && colour[1] === 255 && colour[2] === 255 && colour[3] < 255){
			} 
			else{
				if(colour[0] === 26 && colour[1] === 132 && colour[2] === 57){ ///////////////////////GRASS
					level.push(new tileBlocks(x * widthS / widthpoint, y * height / heightpoint, widthS / widthpoint, height / heightpoint, 'collide', 'green', 'grass'));
				}
				// if(colour[0] === 0 && colour[1] === 0 && colour[2] === 0){ ///////////////////////DIRT
				// 	level.push(new tileBlocks(x * widthS / widthpoint, y * height / heightpoint, widthS / widthpoint, height / heightpoint, 'walkthrough', 'brown', 'dirt'));
				// }
				if(colour[0] === 104 && colour[1] === 53 && colour[2] === 0){ ///////////////////////WOOD
					level.push(new tileBlocks(x * widthS / widthpoint, y * height / heightpoint, widthS / widthpoint, height / heightpoint, 'collide', 'brown', 'wood'));
				}
				if(colour[0] === 134 && colour[1] === 67 && colour[2] === 0){ ///////////////////////SIGNS
					level.push(new tileBlocks(x * widthS / widthpoint, y * height / heightpoint, widthS / widthpoint, height / heightpoint, 'walkthrough', signBlock, 'sign'));
				}
				if(colour[0] === 255 && colour[1] === 85 && colour[2] === 85){ ///////////////////////SHOP
					level.push(new tileBlocks(x * widthS / widthpoint, y * height / heightpoint, widthS / widthpoint, height / heightpoint, 'walkthrough', 'gray', 'shop'));
				}
				if(colour[0] === 255 && colour[1] === 84 && colour[2] === 84){ ///////////////////////SHOP
					level.push(new tileBlocks(x * widthS / widthpoint, y * height / heightpoint, widthS / widthpoint, height / heightpoint, 'collide',  'gray', 'shop'));
				}
				if(colour[0] === 237 && colour[1] === 28 && colour[2] === 36){ ///////////////////////ENEMY
					var start = x * width/ widthpoint;
					if(level === levelOne) enemies.push(new enemy(0, start, y * height/ heightpoint, width/ widthpoint - 5, height/ heightpoint- 5, 1, 10, enemyAni));
					if(level === levelTwo) enemies.push(new enemy(1, start, y * height/ heightpoint, width/ widthpoint - 5, height/ heightpoint- 5, 3, 20, enemyAni));
					if(level === levelThree) enemies.push(new enemy(2, start, y * height/ heightpoint, width/ widthpoint - 5, height/ heightpoint- 5, 5, 30, enemyAni));
					if(level === levelFour) enemies.push(new enemy(3, start, y * height/ heightpoint, width/ widthpoint - 5, height/ heightpoint- 5, 10, 60, enemyAni));
					if(level === levelFive) enemies.push(new enemy(4, start, y * height/ heightpoint, width/ widthpoint - 5, height/ heightpoint- 5, 15, 100, enemyAni));
					if(level === levelSix) enemies.push(new enemy(5, start, y * height/ heightpoint, width/ widthpoint - 5, height/ heightpoint- 5, 20, 150, enemyAni));
					if(level === levelSeven) enemies.push(new enemy(6, start, y * height/ heightpoint, width/ widthpoint - 5, height/ heightpoint- 5, 35, 250, enemyAni));
					if(level === levelEight) enemies.push(new boss(start, y * height/ heightpoint, 70, 70));
				}
				if(colour[0] === 10 && colour[1] === 166 && colour[2] === 24){ ///////////////////////PLAYER SPAWN
					if(level === levelOne){
						player.x = x * widthS / widthpoint;
						player.y = y * height/ heightpoint;
					} else{
						level.push(new tileBlocks(x * widthS / widthpoint, y * height / heightpoint, widthS / widthpoint, height / heightpoint, 'walkthrough', 'white', 'spawn'));
					}

				}
				if(colour[0] === 97 && colour[1] === 251 && colour[2] === 38){ ///////////////////////END LEVEL
					level.push(new tileBlocks(x * widthS / widthpoint, y * height / heightpoint, widthS / widthpoint, height / heightpoint, 'walkthrough', 'blue', 'end'));
				}
			}
		}		
	}
	enemies.push(new enemy(0213112, start - (100 + random(150)), start, y * height/ heightpoint, width/ widthpoint - 5, height/ heightpoint- 5, 1, 10, enemyAni))
}		

var backgroundTiles = [];



class tileBlocks {
	constructor(x, y, w, h, collisionType, sprite, blockType) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.collisionType = collisionType;
		this.sprite = sprite;
		this.blockType = blockType;
	}
	
	display(){

		
	}
}

tileBlocks.prototype.display = function (){
		if(this.sprite === str(this.sprite)){
			fill(this.sprite);
			stroke(this.sprite);
			rect(this.x, this.y, this.w, this.h)	
		}else{
			image(this.sprite, this.x, this.y, this.w, this.h);
		}	
		// noFill();
		// stroke('red');
		// rect(this.x,this.y,this.w,this.h);
		// rect(this.x,this.y,this.w,(this.h/(this.h/4)));	
		// rect(this.x,this.y,this.w,this.h - (this.h/(this.h/4)) );	
		// rect(this.x,this.y,this.w/(this.w/4),this.h);
		// rect(this.x,this.y,this.w - (this.w/(this.w/4)),this.h);
}
var activeLevel = [];
var levelNumber = 0;

var levelOne = [];
var levelOneBlocks;

var levelTwo = [];
var levelTwoBlocks;

var levelThree = [];
var levelThreeBlocks;

var levelFour = [];
var levelFourBlocks;

var levelFive = [];
var levelFiveBlocks;

var levelSix = [];
var levelSixBlocks;

var levelSeven = [];
var levelSevenBlocks;

var levelEight = [];
var levelEightBlocks;

function LEVELS(){

    mapTile(levelOne, levelOneBlocks);
		mapTile(levelTwo, levelTwoBlocks);
		mapTile(levelThree, levelThreeBlocks);
		mapTile(levelFour, levelFourBlocks);
		mapTile(levelFive, levelFiveBlocks);
		mapTile(levelSix, levelSixBlocks);
		mapTile(levelSeven, levelSevenBlocks);
		mapTile(levelEight, levelEightBlocks);
	
	
		activeLevel.push(levelOne);
		activeLevel.push(levelTwo);
		activeLevel.push(levelThree);
		activeLevel.push(levelFour);
		activeLevel.push(levelFive);
    activeLevel.push(levelSix);
		activeLevel.push(levelSeven);
		activeLevel.push(levelEight);
    
		reserveLevel.push(activeLevel);
}

var reserveLevel = [];