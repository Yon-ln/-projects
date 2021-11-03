var checkboxes = document.getElementById("cb");
var items = document.getElementById("i");
var category = document.getElementById("c");

var scrollheight = document.getElementById("s").scrollHeight;
var f = setInterval(t, 1000);


var categories = {
"Games" : ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"],
"Artwork" : [],
"Info" : []

};


for (var i = 0; i < categories["Games"].length; i++){
    const game = document.createElement("div");
    const box = document.createElement("div");
    game.innerText = categories["Games"][i];
    game.className = "hoverable";
    box.id = "box";



    items.appendChild(game);
    checkboxes.appendChild(box);

}

function t(){
    console.log(items.offsetTop);
}





