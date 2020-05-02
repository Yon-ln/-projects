//find showcase
var addTo = document.getElementById("Showcase");

var work = new Array();

work['games'] = new Array();

work['games'][0] = ["Doctor Gear", "./assets/doctor gear icon.png"];
work['games'][1] = ["Dungeon Crawler", "./assets/dungeon crawler icon.png"];
work['games'][2] = ["The Last Hope", "./assets/the last hope icon.png"];
work['games'][3] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][4] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][5] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][6] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][7] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][8] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][9] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][10] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][11] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][12] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][13] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][14] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][15] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][16] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][17] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][18] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][19] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][20] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][21] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][22] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][23] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][24] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][25] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][26] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][27] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][28] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][29] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][30] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][31] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][32] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][33] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][34] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][35] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][36] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][37] = ["Romance Story", "./assets/romance story icon.png"];
work['games'][38] = ["Romance Story", "./assets/romance story icon.png"];

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