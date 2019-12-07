function preload(){
    tileSprites();
    characterSprites();
    project();
    enemySprites();
    levelSprites();
		textTTFS();
		sounds();
		UI();
    
    
}

var arcade;

function textTTFS(){
	arcade = loadFont('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual614405/hf13f5109063ef7b37526c4b218fbd2b6/PressStart2P.ttf');
	
}


var grassBlock;
var grassTileSet = [];
var woodBlock;
var signBlock;
var shopBlock;
var enemyBlock;
var enemyAni = [];
var spawnBlock;
var endBlock;

function tileSprites(){
    grassBlock = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual614405/hf13f5109063ef7b37526c4b218fbd2b6/grass.png');
		woodBlock = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual614405/hf13f5109063ef7b37526c4b218fbd2b6/WoodTiles2.png');
		signBlock = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual614405/hf13f5109063ef7b37526c4b218fbd2b6/signpost.png');
		shopBlock = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual614405/hf13f5109063ef7b37526c4b218fbd2b6/shop.png');
		enemyBlock = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual607970/h25840866ed61bebfc21b6588bfc91519/slimy.png');
}

var blob;
var blobAni = [];
var bosss;
function characterSprites(){
    blob = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual614405/hf13f5109063ef7b37526c4b218fbd2b6/template.png');
    bosss = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual614405/hf13f5109063ef7b37526c4b218fbd2b6/boss.png');
}

var crescent;
var crescentAni = [];

function project(){
    crescent = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual614405/hf13f5109063ef7b37526c4b218fbd2b6/no_u.png');

}

var inventoryDis;

function UI(){
	inventoryDis = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual614405/hf13f5109063ef7b37526c4b218fbd2b6/inventorydisplay.png');
}

function enemySprites(){


}

var slashSound;
var backgroundMusic;
var jumpSound;
var hitSound;
var laugh;

function sounds(){
	slashSound = loadSound('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual614405/hf13f5109063ef7b37526c4b218fbd2b6/shoot.mp3');
	backgroundMusic = loadSound('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual614405/hf13f5109063ef7b37526c4b218fbd2b6/speck_-_Anywhere_Apricot.mp3');
	jumpSound = loadSound('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual614405/hf13f5109063ef7b37526c4b218fbd2b6/167045__drminky__slime-jump.wav');
	hitSound = loadSound('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual614405/hf13f5109063ef7b37526c4b218fbd2b6/167074__drminky__slime-death-1.wav');
	laugh = loadSound('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual614405/hf13f5109063ef7b37526c4b218fbd2b6/undertale_sans_laugh.mp3');
	
	jumpSound.setVolume(4);
	hitSound.setVolume(5);
	laugh.setVolume(100);
	
	backgroundMusic.setVolume(2.5);

	
}


function levelSprites(){
    levelOneBlocks = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual614405/hf13f5109063ef7b37526c4b218fbd2b6/levelone.png');
		b = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual614405/hf13f5109063ef7b37526c4b218fbd2b6/levelonebackground.png');
		levelTwoBlocks = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual614405/hf13f5109063ef7b37526c4b218fbd2b6/leveltwo.png');
		levelThreeBlocks = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual614405/hf13f5109063ef7b37526c4b218fbd2b6/levelthree.png');
		levelFourBlocks = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual614405/hf13f5109063ef7b37526c4b218fbd2b6/levelfour.png');
		levelFiveBlocks = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual614405/hf13f5109063ef7b37526c4b218fbd2b6/levelfive.png');
		levelSixBlocks = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual614405/hf13f5109063ef7b37526c4b218fbd2b6/levelsix.png');
		levelSevenBlocks = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual614405/hf13f5109063ef7b37526c4b218fbd2b6/levelseven.png');
		levelEightBlocks = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user141277/visual614405/hf13f5109063ef7b37526c4b218fbd2b6/level8.png');
}

function loadSpriteAnimation(){
	sprite(crescent, crescentAni, 49, 72);
	sprite(blob, blobAni, 50, 50);
	sprite(grassBlock, grassTileSet, 16, 16);
	sprite(enemyBlock, enemyAni, 451.8, 348);
    //LEVELS
    
}

function sprite(spriteSheet, spriteList, width, height){
	for(var y = 0; y < spriteSheet.height; y+= height){
		for(var x = 0; x < spriteSheet.width; x+= width){
			let frames = spriteSheet.get(x, y, width, height);
			spriteList.push(frames);
		}
	}
}