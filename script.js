var checkboxes = document.getElementById("cb");
var items = document.getElementById("i");
var category = document.querySelectorAll(".categories")

var scrollheight = document.getElementById("s").scrollHeight;

var categories = {
"0" : [["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"], [document.createElement('div'), document.createElement('div')]],
"1" : [["Dragon","Models","Pixel Art","Sketches","Boats","Environment","Anisa","Hi"], [document.createElement('div'), document.createElement('div')]],
"2" : [["CV", "Contacts", "Socials"],[document.createElement('div'), document.createElement('div')]]

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

        document.querySelector("[id^='i']").replaceWith(categories[''+evt.currentTarget.my][1][0]);
        document.querySelector("[id^='cb']").replaceWith(categories[''+evt.currentTarget.my][1][1]);

    });

    category[i].my = i;
}

for(const [key, value] of Object.entries(categories)){
    for (var i = 0; i < value[0].length; i++){
        const item = document.createElement("div");
        const box = document.createElement("div");
        item.innerText = value[0][i];
        item.className = "hoverable";
        // item.addEventListener("click", function(evt){

        // });

        box.id = "box";

        value[1][0].className = "items";
        value[1][0].id = "i";
        value[1][0].appendChild(item);
        value[1][1].className = "checkbox";
        value[1][1].id = "cb";
        value[1][1].appendChild(box);       
    }
}

// for (var i = 0; i < categories["0"][0].length; i++){
//     const game = document.createElement("div");
//     const box = document.createElement("div");
//     game.innerText = categories["0"][0][i];
//     game.className = "hoverable";
//     box.id = "box";

//     categories["0"][1][0].className = "items";
//     categories["0"][1][0].id = "i";
//     categories["0"][1][0].appendChild(game);
//     categories["0"][1][1].className = "checkbox";
//     categories["0"][1][1].id = "cb";
//     categories["0"][1][1].appendChild(box);
    
// }

category[0].click();
/*if (window.matchMedia( "(hover: none)" ).matches) {

 }*/





