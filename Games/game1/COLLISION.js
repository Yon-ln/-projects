function simpleCollision(objectA, objectB) { //detects collision
  return objectA.x < objectB.x + objectB.w && objectA.x + objectA.w > objectB.x && objectA.y < objectB.y + objectB.h && objectA.y > objectB.y - objectA.h;

}


function collisionResponse(objectA, objectB) {
	if(objectB.x < objectA.x + (widthS/30) * lengthS && objectB.x > objectA.x - (widthS/30) * lengthS && objectB.y < objectA.y + (widthS/30) * lengthS && objectB.y > objectA.y - (widthS/30)*lengthS){
	if (simpleCollision(objectA, objectB) === true) {
		if (objectB.collisionType === 'collide') {
			if(objectA.y+objectA.h>objectB.y&&objectA.y<objectB.y+objectB.h/(objectB.h/4) && objectA.x + objectA.w > objectB.x + objectA.w/6 && objectA.x < objectB.x + objectB.w - (objectB.w/(objectB.w/4))){//top /all
				objectA.y=objectB.y-objectA.h;
				
			}
			if(objectA.y < objectB.y + objectB.h && objectA.y + objectA.h > objectB.y + objectB.h - objectB.h/(objectB.h/4) && objectA.x + objectA.w > objectB.x + objectB.w/(objectB.w/4) && objectA.x < objectB.x + objectB.w - objectB.w/(objectB.w/4)){ //bottom
				objectA.y = objectB.y+objectB.h;
			}
			if(objectA.x + 10< objectB.x && objectA.y + objectA.h/2 > objectB.y + objectB.h/(objectB.h/3)){
				objectA.x = objectB.x - objectA.w - 3;
				objectA.canRight = false;
				objectA.onGround = false;
				objectB.c = 'blue' ; 
				if(objectA.number >= 0){
					line(objectA.x, objectA.y, objectA.x + objectA.w, objectA.y);
					objectA.left = true;
					objectA.right = false;
					objectA.collisionTimer = 3;
				}
			}
			else{
				objectA.canRight = true;
			}
			
			if(objectA.x + objectA.w - 10 > objectB.x + objectB.w && objectA.y + objectA.h/2 > objectB.y + objectB.h/(objectB.h/3)){
				objectA.x = objectB.x + objectB.w + 3;
				objectA.canLeft = false;
				objectA.onGround = false;
				objectB.c = 'blue';	
				if(objectA.number >= 0){
					objectA.right = true;
					objectA.left = false;
					objectA.collisionTimer = 3;
				}
			}
			
			else{ objectB.c = 'red'; objectA.canLeft = true;}
			if(objectA.y + objectA.h === objectB.y){ 
				objectA.onGround = true;

			}
	

		}
			if(objectA.charId === 0){
					if(objectB.blockType === 'shop' && objectB.collisionType === 'collide'){
						if(levelNumber === 0){
							shop_One.inShopParameters = true;
						}
						if(levelNumber === 2){
							shop_Two.inShopParameters = true;
						}
						
					}
					if(objectB.blockType === 'grass'){
						shop_One.inShopParameters = false;
						shop_Two.inShopParameters = false;
					}
				}
			if(objectB.blockType === 'end'){

				levelNumber +=1;
				
				for(var b = 0; b < activeLevel[levelNumber].length; b++){
					if(activeLevel[levelNumber][b].blockType === 'spawn'){
						objectA.x = activeLevel[levelNumber][b].x;
						objectA.y = activeLevel[levelNumber][b].y;	
					}
						if(levelNumber === 7){
							for(var x in enemies){
								if(enemies[x].name !== undefined){
								enemies[x].maxHealth = player.damage*10;
								enemies[x].health = enemies[x].maxHealth
								}
					
							}
						}
				}
				
			}
	}
		
		

	
	}
	
}