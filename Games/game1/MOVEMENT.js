function keyPressed(){
    player.control(LEFT_ARROW, UP_ARROW, DOWN_ARROW, RIGHT_ARROW, 32, 73);
		shop_One.selectItem();
		shop_Two.selectItem();
	
		//68,79,65,78,72
	
// 	if(keyCode === 68 && keyCode === 79 && keyCode === 65 && keyCode === 78 && keyCode === 72){
		
// 	}
    

}


function keyReleased(){
    player.stopCharacter(LEFT_ARROW, RIGHT_ARROW);
    
}