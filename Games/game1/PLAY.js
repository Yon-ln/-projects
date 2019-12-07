function play() {
	background(0);
	noStroke();


	camera.off(); /////////////////

	fill(100, 100, 255);
	rect(0, 0, width, heightS);

	camera.on(); /////////////////

	camera.position.x = player.x;
	camera.position.y = player.y;
	camera.zoom = 1.5;



	//PROJECTILES
	for (var bullet in projectiles) {
		projectiles[bullet].display(bullet);
	}

	//MAP
	currentLevel = activeLevel[levelNumber]
	for (var block in currentLevel) {
		if (currentLevel[block].x < player.x + (width / 30) * lengthS && currentLevel[block].x > player.x - (width / 30) * lengthS && currentLevel[block].y < player.y + (width / 30) * lengthS / 1.5 && currentLevel[block].y > player.y - (width / 30) * lengthS / 1.5) {

			currentLevel[block].display();
			collisionResponse(player, currentLevel[block]);
		}
	}
	
	
	//PLAYER
	player.displayChar();

	//ENEMIES
	for (var entity in enemies) {
		if (enemies[entity].number === levelNumber) {
			// if (enemies[entity].x < player.x + (width / 30) * lengthS && enemies[entity].x > player.x - (width / 30) * lengthS && enemies[entity].y < player.y + (width / 30) * lengthS / 1.5 && enemies[entity].y > player.y - (width / 30) * lengthS / 1.5) {
				enemies[entity].display(entity);
			// }
		}
	}


	camera.off(); /////////////////

	//STATUS
	if (miniFunc.length > 0) {
		for (var fn in miniFunc) {
			miniFunc[fn].show(fn);
		}
	}

	fill(0);
	text('FPS: ' + str(int(frameRate())), width - 80, 20);
	shop_One.display();
	shop_Two.display();
	player.display();
	fill(0);
	textSize(10);
	textFont(arcade);


	textAlign(CENTER);
	text('Level: ' + str(levelNumber + 1), width/2, 20);
	textAlign(LEFT);
	

}