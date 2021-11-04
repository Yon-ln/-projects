var checkboxes = document.getElementById("cb");
var items = document.getElementById("i");
var category = document.querySelectorAll(".categories")

var scrollheight = document.getElementById("s").scrollHeight;


var categories = {
"Games" : [["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"], [document.createElement('div'), document.createElement('div')]],
"Artwork" : [["Dragon","Models","Pixel Art","Sketches","Boats","Environment","Anisa","Hi"], [document.createElement('div'), document.createElement('div')]],
"Info" : [[],[document.createElement('div'), document.createElement('div')]]

};

document.getElementById("2").style.display = "block";

for(var i = 0; i < category.length; ++ i){
    category[i].addEventListener("click", function(evt){
        for(var j = 0; j < category.length; ++j){
            document.getElementById(''+j).style.display = "none";
            category[j].id = "unselected";
        }   
        document.getElementById(''+evt.currentTarget.my).style.display = 'block';
        category[evt.currentTarget.my].id = "selected";
    });

    category[i].my = i;
}

for (var i = 0; i < categories["Games"][0].length; i++){
    const game = document.createElement("div");
    const box = document.createElement("div");
    game.innerText = categories["Games"][0][i];
    game.className = "hoverable";
    box.id = "box";

    items.appendChild(game);
    checkboxes.appendChild(box);
    
}

category[0].click();
/*if (window.matchMedia( "(hover: none)" ).matches) {

 }*/





