// var currentLevel;
var lengthS = 100; // how far the block is from the player
var inMenu = true;
var gameover = false;
var widthS = 1000;
var heightS = 500;

function setup(){
    createCanvas(720, 500);
    player = new character(100,0,widthS/40-5, heightS/20- 5,blobAni);
		LEVELS();
		shop_Two = new shop(2, shopTwo, player, UP_ARROW, DOWN_ARROW, RIGHT_ARROW, LEFT_ARROW, 13);
		shop_One = new shop(1, shopOne, player, UP_ARROW, DOWN_ARROW, RIGHT_ARROW, LEFT_ARROW, 13);
    loadSpriteAnimation();

//		backgroundMusic.setVolume(0.8);
}

function draw(){
	textFont(arcade);
	if(inMenu === true){
		menu()
	}else{
		play()
//		backgroundMusic.play();
//		backgroundMusic.playMode('UntilDone');

		
		gameOver(player);
	}
	

}

function menu(){
	background(0,100);
	textAlign(CENTER);
	fill('white');
	textSize(40);
	text('EMOJI QUEST', width/2, height/2 - 150);
	if(mouseX > width/2 - 60 && mouseX < width/2 + 60 && mouseY > height/2 - 35 && mouseY < height/2 + 35){
		textSize(35);
		if(mouseIsPressed){
			inMenu = false;	
		}
	} else{
		textSize(30);	
	}
	text('PLAY', width/2, height/2);
	

	textSize(10);
	text('How to play: \n\nLeft: Left_Arrow key \n\nRight: Right_Arrow key \n\nJump: Up_Arrow key \n\nShoot: Space \n\nOpen/Close Inv: I \n\nOpen shop: ENTER \n\nClose shop: ESC ', width/2, height - 200);
}


function gameOver(player){
	if(player.health <= 0){
		gameover = true;
	}
	
	if(gameover === true){
		fill('black');
		rect(0,0,width,height);
		textAlign(CENTER);
		textSize(45);
		fill('white');
		text('GAMEOVER', width/2, height/2);
		player.health = player.maxHealth
		
		if(keyIsDown(32)){
			gameover = false;
			for(var x in activeLevel){
				activeLevel[x] = reserveLevel[0][x]	
			}
		}
		
	}
}