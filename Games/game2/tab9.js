function mapTile(levelSprite){
		for(var y = 0; y < levelSprite.height; y++){
			for(var x = 0; x < levelSprite.width; x++){
				var colour = levelSprite.get(x, y, 1, 1);
				if(colour[0] == 255 && colour[1] == 255 && colour[2] == 255 && colour[3] < 255){
				}
				else{
					// createBlocks(colour,x,y,0,0,0,grass);

	

					

					
				}
			}
		}
}

function createBlocks(c,x,y,r,g,b,sprite){
	print("?");
	if(c[0] == r && c[1] == g && c[2] == b){
		
		updates.push(new block(x * 5, y * 5, sprite, 5,5));
		
	}
}

