class character { //////////////////////WORK ON THE EQUIP OF THE WEAPON/////////////
	constructor(x, y, w, h, sprite) {
		/////CHARACTER		this.speed = 6;

		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.charId = 0;
        
        
		this.sprite = sprite;
        this.frame = 0;
        this.facing;

		//movement
		this.x_v = 0;
		this.y_v = 0;
		this.left = false;
		this.canLeft = true;
		this.right = false;
		this.canRight = true;
		this.onGround = false;
		this.canJump = false;
		this.isInvincible = false;
		this.anicount = 0;
		this.still = 0

		//weaponEquipped
		this.equipped;
        this.itemEquipped;

		//INV FEATURES

		this.inventory = { //LAYOUT [NAME[0], COST[1], PAWNCOST[2], STRENGTH[3], SPEED[4]]
			'SWORDS': [
				['Training Sword', 0, 0, 2.5, 10, 1],
				['Training Sword Excalibur', 0, 0, 50, 50, 1],
			]



		}
		this.inInventory = false;
		this.invItemNumber = 0;
		this.itemSelected;
		this.itemSelectionNotifier;
		this.itemPawn;
		this.itemCost;
		this.itemStrength;
		this.inventoryTrigger = 73;
		this.equipped = false;
		this.equipChoice = false;
		this.deleted = false;
		this.deleteChoice = false;
		this.options = false;
		this.decision = 0;
		this.inShop = false;
		this.inShopParameters = false;
		

		//ACTIVE FEATURES
    this.maxHealth = 100;
		this.health = this.maxHealth;
		this.money = 0; 
		this.damage;
		this.particleSpeed;
		this.canShoot = true;

	}
	
	displayChar(){
		

	  
		if(this.isInvincible === false){
			image(this.sprite[this.frame], this.x - this.w/2, this.y-15, this.w*2, this.h*2);

			this.speed = 6;
			this.canShoot = true;
		} else{
			this.speed = 3;
			image(this.sprite[this.frame], this.x  - this.w/2	, this.y + this.h, this.w * 2, this.h/10);
			this.canShoot = false;
		}
		
		/////////////////////////////CHARACTER MOVEMENT//////////////
		this.y += this.y_v + 10;
		this.x += this.x_v;
		this.x_v *= 0;
		this.y_v *= 0.95;
		
		if(this.left === true){
			this.x_v = -this.speed;
            this.facing = 'LEFT';
            this.frame = 8 + int((frameCount / 5) % 8) ;
						this.still = 8
		}
		else if(this.right === true){
			this.x_v = this.speed;
            this.facing = 'RIGHT';
            this.frame = int((frameCount/ 5)  % 8);
						this.still = 0;
		}
        else{
            this.frame = this.still
        }

		
		////////////////////////////CHARACTER COLLISION/////////////
// 		if(this.y + this.h > height) { 
// 			this.y_v = -50;
// 			this.x_v = -50;
// 			this.health += 10;
			
// 		}	
		
	}

	display() { /////////////////////////////////////CHARACTER DISPLAY/////////////////////////////////////
 		fill('red');
		rect(20, 20, 200, 15, 15);
		fill('green');
		rect(20, 20, this.health/this.maxHealth * 200, 15, 15);
		fill('black');
		text('MONEY: ' + str(this.money), 20, 60);
		
		
		//////////////////////////////INVENTORY/////////////////////
		if (this.inInventory === true) {
			this.inventoryDisplay();
			this.canLeft = false;
			this.canRight = false;
			this.canJump = false;
		} else {
			this.canLeft = true;
			this.canRight = true;
			this.canJump = true;
			this.options = false;
			this.equipped = false;
			this.deleted = false;
			this.deleteChoice = false;
			this.decision = 0;
			this.itemInvNumber = 0;
		}
		//////////////////////////WEAPON CONFIGURATIONS///////////////////////
		for(var group in this.inventory){
			for(var weapon in this.inventory[group]){
				var currentWeapon = this.inventory[group][weapon];
				if(currentWeapon[5] === 1){
					this.damage = currentWeapon[3];
					this.projectileSpeed = currentWeapon[4];
                    this.equipped = true;
				}	
			}
		}		
		
		for(var ene = 0; ene < enemies.length; ene++){
			if(enemies[ene].number === levelNumber && this.isInvincible === false){
				if(simpleCollision(enemies[ene], player)){
					this.health -= enemies[ene].damage;
					miniFunc.push(new invincibility(player));
//					hitSound.play();
					// for(var change = 0; change < 7.5; change ++){
					// 	this.y_v -= change;
					// }
				}
			}
		}
		
		if(this.health <= 0){
			noLoop();
		}


	}

	inventoryDisplay() { /////////////////////////////////INVENTORY DISPLAY//////////////////////////////
		fill('black');
		textAlign(CENTER);
		var itemNumber;
		var equipNumber;
		text('INVENTORY [' + str(this.inventory['SWORDS'].length) + '/5]', width - 100, 40);
		for (var group in this.inventory) {
			for (var item = 0; item < this.inventory[group].length; item++) {
				if (this.invItemNumber === item) {
					this.itemSelected = this.inventory[group][item];
					this.itemSelectionNotifier = '[ ' + this.itemSelected[0] + ' ' + str(this.itemSelected[5]) + ' ]';
					this.itemCost = this.itemSelected[1];
					this.itemPawn = this.itemSelected[2];
					this.itemStrength = this.itemSelected[3];
					this.itemEquipped = this.itemSelected[5];
					itemNumber = item;
					this.invItemNumber = itemNumber;
					//displaying inventory
					text('' + this.itemSelected[0], width - 100, 360);
					text('Original Cost: ' + this.itemCost, width - 100, 400);
					text('Retail price: ' + this.itemPawn, width - 100, 420);
					text('Strength: ' + this.itemStrength, width - 100, 440);

				} else {
					this.itemSelectionNotifier = this.inventory[group][item][0];
				}

				text(this.itemSelectionNotifier, width - 100, 60 + item * 15);
			}

		}
		

		if (this.options === true && this.deleteChoice === false) {
			if (this.decision === 0) {
				text('EQUIP ?', width / 2, height / 2);
				text('EXIT', width / 2, height / 2 + 20);
				text('DELETE', width / 2, height / 2 + 40)
			}
			if (this.decision === 1) {
				text('EQUIP', width / 2, height / 2);
				text('EXIT ?', width / 2, height / 2 + 20);
				text('DELETE', width / 2, height / 2 + 40)
			}
			if (this.decision === 2) {
				text('EQUIP', width / 2, height / 2);
				text('EXIT', width / 2, height / 2 + 20);
				text('DELETE ?', width / 2, height / 2 + 40)
			}

		}
		if (this.options === true && this.deleteChoice === true) {
			if (this.decision === 0) {
				text('YES ?', width / 2 + 60, height / 2);
				text('NO', width / 2 + 60, height / 2 + 20);
			}
			if (this.decision === 1) {
				text('YES', width / 2 + 60, height / 2);
				text('NO ?', width / 2 + 60, height / 2 + 20);
			}
		}
		
		if(this.delete === true){
			this.inventory['SWORDS'].splice(itemNumber, 1);
			this.delete = false;
			this.options = false;
			this.equipped = false;
		}


	}

	control(LEFT, UP, DOWN, RIGHT, SPACE, OPEN) {

		if (this.inInventory === false  && this.inShop === false) {
				///////////////MOVEMENT OUTSIDE INV
			if(keyCode === LEFT && this.canLeft === true){
				this.left = true;
			}
			if(keyCode === RIGHT && this.canRight === true){
				this.right = true;
			}
			if(keyCode === UP && this.onGround === true && this.canJump === true){
				this.onGround = false;
				this.y_v = -26.5;
//				jumpSound.play();
			}
			if(keyCode === SPACE && this.inShop === false && this.equipped === true && this.canShoot === true){
				projectiles.push(new projectile(this.x - this.w/2, this.y - this.h/2, this.w, this.h, crescentAni, this.facing, this.damage, this.projectileSpeed));
			}
			if(keyCode === DOWN_ARROW){
				// laugh.play();
			}

			if (keyCode === OPEN && this.inInventory === false) {
				this.inInventory = true;
			}
 
		} else { ///////////////////////////////////IF PLAYER IS IN INVENTORY//////////////////////////////////////////////////////////////////
			if (keyCode === OPEN && this.inInventory === true){
                this.inInventory = false;
                
            }
            
            
            if (this.options !== true) {
				if (keyCode === UP && this.invItemNumber > 0) {
					this.invItemNumber -= 1;
					this.equipped = false;
				}
				if (keyCode === DOWN && this.invItemNumber < this.inventory['SWORDS'].length - 1) {
					this.invItemNumber += 1;
					this.equipped = false;
				}
				if (keyCode === 13) {
					this.options = true;
				}
			} else {
				var del = 1;
				if (this.deleteChoice === true) del = 1;
				if (this.deleteChoice === false) del = 2;
				if (keyCode === UP && this.decision > 0) {
					this.decision -= 1;
					this.equipped = false;
				}
				if (keyCode === DOWN && this.decision < del) {
					this.decision += 1;
			
					this.equipped = false;
				}
				if (keyCode === 13) {
					if (this.decision === 0 ) {
						if(this.deleteChoice === false){
		
							this.equipped = true;
							this.options = false;
							if (this.equipped === true) {
							for (var x = 0; x < this.inventory['SWORDS'].length; x++) {
								this.inventory['SWORDS'][x][5] = 0;
							}
								this.inventory['SWORDS'][this.invItemNumber][5] = 1;
							this.equipped = false;
						}
							
						}
						else{
							this.delete = true;
							this.deleteChoice = false;
						}
					}
					if (this.decision === 1) {
						if(this.deleteChoice === false){
						this.options = false;
						}
						else{
							this.deleteChoice = false;
						}
					}
					if (this.decision === 2) {
						this.deleteChoice = true;
						this.decision = 0;
					}


				} 

			}

		}

		if (keyCode === 27) {
			if(this.options === true){
				this.options = false;
			}
			if(this.inInventory === true){
				this.inInventory = false;
			}	
		}

	}
	
	stopCharacter(left,right){
		if(keyCode === left && this.left === true){
			this.left = false;
		}
		if(keyCode === right && this.right === true){
			this.right = false;
		}
		
	}
}