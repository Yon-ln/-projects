//find showcase
var addTo = document.getElementById("Showcase");

var work = new Array();

var clicked = false;



work['games'] = new Array();

work['games'][0] = ["Doctor Gear", "./assets/doctor gear icon.png", false];
work['games'][1] = ["Dungeon Crawler", "./assets/dungeon crawler icon.png", false];
work['games'][2] = ["The Last Hope", "./assets/the last hope icon.png", false];
work['games'][3] = ["Romance Story", "./assets/romance story icon.png", false];


function showGame(index, game){

}



for(var i = 0; i < Object.keys(work['games']).length; i++){

	(function (){

		var div = document.createElement("div");
		div.className = "box";
		div.style.backgroundImage = "url('" + work['games'][i][1] + "')";

		var game = document.createElement("iframe");
		game.style.position = "relative";
		game.src = "./" + work['games'][i][0] + "/index.html";

		div.height = "";
		var text = document.createElement("div");
		text.className += "category";
		var textString = document.createElement("h1");
		textString.innerHTML = work['games'][i][0];
		var category = document.createElement("h2");
		category.innerHTML = "GAME"
		text.append(textString);
		text.append(category);


		work['games'][i].push(game);

		div.addEventListener('click',(function (i) {
          return function () {
			
			for(var x = 0; x < Object.keys(work['games']).length; x++){
				
				if(work['games'][x] != work['games'][i]){
					console.log(x);
					work['games'][x][3].style.opacity = "0";
					work['games'][x][3].style.zIndex = "-1";
					work['games'][x][3].style.transition = "opacity .25s";
				} 
			}

			game.style.opacity = "1";
			game.style.zIndex = "1";
			game.style.transition = "opacity .25s";
          }
        }(i)));

		div.append(game);
		div.append(text);
		addTo.append(div);

	}());
}



