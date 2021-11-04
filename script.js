var checkboxes = document.getElementById("cb");
var items = document.getElementById("i");
var category = document.querySelectorAll(".categories")

var scrollheight = document.getElementById("s").scrollHeight;

var categories = {
"0" : [["One", "Two", "Three", "Four", "Five"], [document.createElement('div'), document.createElement('div')], ['Directory/Games/']],
"1" : [["Pixel Art","Sketches","Environment","Anisa","Hi"], [document.createElement('div'), document.createElement('div')], ['Directory/Artwork/']],
"2" : [["CV", "Contacts", "Socials"],[document.createElement('div'), document.createElement('div')], ['Directory/Info/']]

};

for(const [key, value] of Object.entries(categories)){
    for (var i = 0; i < value[0].length; i++){
        const item = document.createElement("div");
        const box = document.createElement("div");
        item.innerText = value[0][i];
        item.id = value[0][i];
        item.my = i;
        item.mystring = key;
        item.className = "hoverable";
        item.addEventListener("click", function(evt){
            for(var j = 0; j < document.querySelector("[id^='cb']").children.length; ++j){
                document.querySelector("[id^='cb']").children[j].id = "box";

            }

            document.querySelector("[id^='cb']").children[evt.currentTarget.my].id = "box-s"
            
        });

        box.id = "box";

        value[1][0].className = "items";
        value[1][0].id = "i";
        value[1][0].appendChild(item);
        value[1][1].className = "checkbox";
        value[1][1].id = "cb";
        value[1][1].appendChild(box);  
    
    }
}

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
        
        var checkboxSelected = false;

        for(var x = 0; x < categories[''+evt.currentTarget.my][1][1].children.length; ++x){
            if(categories[''+evt.currentTarget.my][1][1].children[x].id == "box-s"){
                checkboxSelected = true;
            }
        }

        if(!checkboxSelected){
            categories[''+evt.currentTarget.my][1][1].children[0].id = "box-s";
        }

    });

    category[i].my = i;
}

category[0].click();



/*if (window.matchMedia( "(hover: none)" ).matches) {

 }*/





