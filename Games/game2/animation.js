var grass;
var blob;
var enemyBlock;
var enemyAni = [];
var blobAni = [];
var bullet;
var bulletAni = [];
var tree;
var ground;
var potion = [];
var potionSheet;

function preload(){
		
    characterSprites();
 	
    
}

function loadSpriteAnimation(){
	
	sprite(blob, blobAni, 50, 50); 
	sprite(enemyBlock, enemyAni, 76, 52);
	sprite(bullet, bulletAni, 64,64);
	sprite(potionSheet, potion, 120,144);
}

function sprite(spriteSheet, spriteList, width, height){
	
	for(var y = 0; y < spriteSheet.height; y+= height){
		for(var x = 0; x < spriteSheet.width; x+= width){
			let frames = spriteSheet.get(x, y, width, height);
			spriteList.push(frames);
		}
	}
	
}

function characterSprites(){
    blob = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual614405/hf13f5109063ef7b37526c4b218fbd2b6/template.png');
		grass = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual710081/h0844cc8c626b1f265dc790a132472dbb/500.png');
		enemyBlock = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual710081/h0844cc8c626b1f265dc790a132472dbb/c_vruf.png');
		bullet = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual710081/h0844cc8c626b1f265dc790a132472dbb/1rqox1f1q3o11_1.png');
		tree = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual710081/h0844cc8c626b1f265dc790a132472dbb/oh.png');
		ground = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual710081/h0844cc8c626b1f265dc790a132472dbb/Untitled-1.png');
		potionSheet = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual710081/h0844cc8c626b1f265dc790a132472dbb/never.png');
}