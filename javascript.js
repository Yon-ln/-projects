//find showcase
var addTo = document.getElementById("Showcase");

var work = new Array();

work['games'] = new Array();

work['games'][0] = ["Doctor Gear", "./assets/doctor gear icon.png"];
work['games'][1] = ["Dungeon Crawler", "./assets/dungeon crawler icon.png"];
work['games'][2] = ["The Last Hope", "./assets/the last hope icon.png"];
work['games'][3] = ["Romance Story", "./assets/romance story icon.png"];


for(var i = 0; i < Object.keys(work['games']).length; i++){

	(function (){

		var div = document.createElement("div");
		div.className = "box";
		div.style.backgroundImage = "url('" + work['games'][i][1] + "')";
		var text = document.createElement("div");
		text.className += "category";
		var textString = document.createElement("h1");
		textString.innerHTML = work['games'][i][0];
		var category = document.createElement("h2");
		category.innerHTML = "GAME"
		text.append(textString);
		text.append(category);
		var button = document.createElement("button");
		button.onclick = "gotoPage(textString)";

		div.append(button);
		div.append(text);
		addTo.append(div);

		work['games'][i].push(div);
		work['games'][i].push(text);
		work['games'][i].push(textString);
		work['games'][i].push(category);
		work['games'][i].push(button);	

	}());


	

}

function gotoPage(id){
	console.log(id);

}