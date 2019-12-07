//shop



var shopOne = { //NAME, COST, PAWN_COST, STRENGTH, SPEED, EQUIPPED STATE
	'SWORDS': [
		['Training Sword', 0, 0, 50, 1.5, 0],
		['Wooden Sword', 6, 1, 2, 1.6, 0],
		['Steel Sword', 10, 2, 4, 1.7, 0],
		['DarkSteel Sword', 15, 3, 8, 2.5, 0],
		['Phaser Sword', 25, 5, 13, 1.5, 0],
		['Plasma Sword', 30, 10, 18, 1.5, 0],
		['Legendary Sword', 100, 20, 30, 1.5, 0],
		['Chicken Sword', -1000, 200, 100, 1.5, 0]
	]
}

var shopTwo = { //NAME, COST, PAWN_COST, STRENGTH, SPEED, EQUIPPED STATE
	'SWORDS': [
		['Phaser Sword', 25, 5, 13, 1.5, 0],
		['Plasma Sword', 30, 10, 18, 1.5, 0],
		['Legendary Sword', 100, 20, 30, 1.5, 0],
		['Chicken Sword', -1000, 200, 100, 1.5, 0]
	]
}

var shopThree = { //NAME, COST, PAWN_COST, STRENGTH, SPEED, EQUIPPED STATE
	'SWORDS': [
		['', 25, 5, 13, 1.5, 0],
		['', 30, 10, 18, 1.5, 0],
		['', 100, 20, 30, 1.5, 0],
		['', -1000, 200, 100, 1.5, 0]

	]
}
class shop {
	constructor(number, shop, player, up, down, right, left, selected){
		
		//shop features
		this.itemNumber = 0;
		this.itemSelected = this.itemNumber;
		this.itemSelectionNotifier = this.itemSelected;
		this.itemCost;
		this.itemStrength;
		this.itemPawn;
		this.isBuying = false;
		this.brought = false;
		this.shop = shop;
		this.inShopParameters = false;
		
		this.group;
		this.decision = 0;
		
		this.isSelling = false;
		this.sold = false;
		
		this.state = 'buy'
		this.player = player;
		//controls
		this.up = up;
		this.down = down;
		this.right = right;
		this.left = left;
		this.selected = selected;
		
		//shop Identifier
		this.number = number;

	}
	
	display() {
		
		if(this.inShopParameters === true){
			if(this.player.inShop !== true){
				fill(0);
				textFont(arcade);
				textAlign(CENTER);
				text('press ENTER to open shop', width/2, height/2 - 100);
				textAlign(LEFT);
			}
			else{
				if(this.state === 'buy'){
					this.buy();
				} else if(this.state === 'sell'){
					text('Sell your items!', width - 250, 20);
					if(this.player.inventory['SWORDS'].length > 0){
						this.sell();	
					} else{
						text('EMPTY', 20, 40);
						this.sold = false;
						this.isSelling = false;

					}
				}
			}
		}
		

	}
	
	buy(){/////////////////////////////////////////////////////////////////////////BUY//////////////////////////////

		if(this.player.inShop === true){
			text('Buy items!', width - 250, 20);
			for(var group in this.shop){
				this.group = group;
				for(var item = 0; item < this.shop[group].length; item++){
					if(this.itemNumber === item){
						this.itemSelected = this.shop[group][item]
						this.itemSelectionNotifier = '[ ' + this.itemSelected[0] + ' ]';
						this.itemCost = this.shop[group][item][1];
						this.itemStrength = this.shop[group][item][3];
						this.itemPawn = this.shop[group][item][2];
						text('Name: ' + this.itemSelected[0], width - 250, 220);
						text('Cost: ' + this.itemCost, width - 250, 240);
						text('Strength: ' + this.itemStrength, width - 250, 260);
						
						if(this.player.money - this.itemCost < 0){
							this.isBuying = false;	
						}
					}
					
					else{
						this.itemSelectionNotifier = this.shop[group][item][0];
					}
					
					//text
					text(this.itemSelectionNotifier, width - 250, 40 + item * 15);
					
				}
				
			}
			//are they buying it?
			if(this.isBuying === true && this.player.money - this.itemCost >= 0){
				text('BUYING?', width/2, height/2 - 20);
				if(this.decision === 0){
					text('YES', width/2, height/2);
					text('NO', width/2, height/2 + 20);					
				}
				if(this.decision === 1){
					text('>YES<', width/2, height/2);
					text('NO', width/2, height/2 + 20);
				} else if(this.decision === 2){
					text('YES', width/2, height/2);
					text('>NO<', width/2, height/2 + 20);				
				}
				if(this.brought === true){
					this.player.money -= this.itemCost;
					this.player.inventory['SWORDS'][this.player.inventory['SWORDS'].length] = this.itemSelected;
					this.isBuying = false;			
					this.brought = false;
					this.decision = 0;
					
				}

			}
		}		
		
	}
	
	sell(){//////////////////////////////////////////////////////////////////////////////SELL//////////////////////////
		this.itemN;
		for (var group in this.player.inventory) {
			this.group = group;
			for (var item = 0; item < this.player.inventory[group].length; item++) {
				if(this.itemNumber === item){
					this.itemSelected = this.player.inventory[group][item];
					this.itemSelectionNotifier = '[ ' + this.itemSelected[0] + ' ]';
					this.itemPawn = this.itemSelected[2];
					this.itemStrength = this.itemSelected[3];
					this.itemN = item;
					text('Name: ' + this.itemSelected[0], width - 250, 220);
					text('Pawn Cost: ' + this.itemPawn, width - 250, 240);
					text('Strength: ' + this.itemStrength, width - 250, 260);
				}
				else{
					this.itemSelectionNotifier = this.player.inventory[group][item][0];
				}
				
				text(this.itemSelectionNotifier, width - 250, 40 + item * 15);
			}
			
		}
		// are they selling it?
		
		if(this.isSelling === true){
				text('SELLING?', width/2, height/2 - 20);
				if(this.decision === 0){
					text('YES', width/2, height/2);
					text('NO', width/2, height/2 + 20);					
				}
				if(this.decision === 1){
					text('>YES<', width/2, height/2);
					text('NO', width/2, height/2 + 20);
				} else if(this.decision === 2){
					text('YES', width/2, height/2);
					text('>NO<', width/2, height/2 + 20);				
				}
			
			if(this.sold === true){
				this.player.money += this.itemPawn;
				this.player.inventory['SWORDS'].splice(this.itemN - 1, 1);
				this.decision = 0;
				this.isSelling = false;
				this.sold = false;
				
			}
		}
	}
	
	selectItem() { //buy
		var g;
		if(this.player.inInventory !== true){
			if(this.player.inShop === true ){
				if(this.isBuying !== true && this.isSelling !== true){
					if(keyCode === this.up && this.itemNumber > 0){
						this.itemNumber -= 1;
					}
					if(this.state === 'buy') g = this.shop;
					if(this.state === 'sell') g = this.player.inventory;
					if(keyCode === this.down && this.itemNumber < g[this.group].length - 1){
						this.itemNumber += 1;
					}
					if(keyCode === this.selected){
						if(this.state === 'buy'){
							this.isBuying = true;
						} else{
							this.isSelling = true;
						}
						
					}
				}
		  if(this.state === 'buy'){
			if(this.isBuying === true){
			  if(keyCode === this.up && this.decision > 0){
				this.decision -= 1;
			  }
			  if(keyCode === this.down && this.decision < 2){
				this.decision += 1;
			  }
			  if(keyCode === this.selected){
				if(this.decision === 1){
				  this.brought = true;
				  this.decision = 0;
				  
				}
				if(this.decision === 2){
				  this.brought = false;
				  this.isBuying = false;
				  this.decision = 0;
				}
				
			  }	
			}
		  }
		  if(this.state === 'sell'){
			if(this.isSelling === true){
			  if(keyCode === this.up && this.decision > 0){
				this.decision -= 1;
			  }
			  if(keyCode === this.down && this.decision < 2){
				this.decision += 1;
			  }
			  if(keyCode === this.selected){
				if(this.decision === 1){
				  this.sold = true;
				  this.decision = 0;
				  this.itemNumber = this.player.inventory[this.group].length -1;
				  
				}
				if(this.decision === 2){
				  this.sold = false;
				  this.isSelling = false;
				  this.decision = 0;
				}
				
			  }	
			}


		  }
		  
			if(this.isBuying !== true && this.isSelling !== true){
				if(keyCode === this.right){
					this.state = 'sell';
					g = this.player.inventory;
					this.decision = 0;
					this.itemNumber = 0;
					this.isBuying = false;
					this.brought = false;

				} else if(keyCode === this.left){
					this.state = 'buy';
					g = this.shop
					this.decision = 0;
					this.itemNumber = 0;
					this.isBuying = false;
					this.brought = false;

				}
			}
			}
			
			if(keyCode === 27){
				this.player.inShop = false;
				
			}
			else if(keyCode === this.selected && this.player.inShop === false && this.inShopParameters === true){
				this.player.inShop = true;
				this.brought = false;
				this.isBuying = false;
			}
			

			
		}
	}
}