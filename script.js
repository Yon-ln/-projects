var checkboxes = document.getElementById("cb");
var items = document.getElementById("i");
var category = document.querySelectorAll(".categories")
var selected;
var switching = false;
const isMobile = navigator.userAgentData.mobile;

var scrollheight = document.getElementById("s").scrollHeight;

var categories = {
"0" : [["Dungeon Crawler", "Specter", "Doctor Gear", "The Last Hope", "Five"], [document.createElement('div'), document.createElement('div')], ['Directory/Games/']],
"1" : [[""], [document.createElement('div'), document.createElement('div')], ['Directory/Artwork/']],
"2" : [["CV", "Contacts", "Privacy Policy"],[document.createElement('div'), document.createElement('div')], ['Directory/Info/']]

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

            document.querySelector("[id^='cb']").children[evt.currentTarget.my].id = "box-s"
            var documentName = evt.currentTarget.id + '.html';
            selected = evt.currentTarget.id;


            document.getElementById("ani").classList.remove("showcase_border-switched");
            document.getElementById("ani").classList.remove("showcase_border-down");
            document.getElementById("ani").style.top = "6em";
            document.getElementById("ani").removeEventListener("animationend", endDown, true);
            document.getElementById("ani").dataset.mystring = evt.currentTarget.mystring;

            setTimeout(function(){
                document.getElementById("ani").classList.add("showcase_border-switched");

                setTimeout(function(){
                    document.getElementById(''+document.getElementById("ani").dataset.mystring).querySelector("iframe").src = categories[''+document.getElementById("ani").dataset.mystring][2][0] + documentName;
                }, 1075);
            })

        }



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
        var n = document.getElementById(''+evt.currentTarget.my);
        var f = evt.currentTarget.my;


        if(!switching){
        setTimeout(function(){
            for(var j = 0; j < category.length; ++j){
                document.getElementById(''+j).style.display = "none";
                category[j].id = "unselected";

            }
            n.style.display = 'block';

            document.querySelector("[id^='i']").replaceWith(categories[''+f][1][0]);
            document.querySelector("[id^='cb']").replaceWith(categories[''+f][1][1]);
        }, 1075)

        category[evt.currentTarget.my].id = "selected";

        var checkboxSelected = false;

        for(var x = 0; x < categories[''+evt.currentTarget.my][1][1].children.length; ++x){
            if(categories[''+evt.currentTarget.my][1][1].children[x].id == "box-s"){
                checkboxSelected = true;
            }
        }

        if(!checkboxSelected) categories[''+evt.currentTarget.my][1][1].children[0].id = "box-s";

        if(document.getElementById("ani").classList.contains("showcase_border-down")||document.getElementById("ani").classList.contains("showcase_border-switched")){
            document.getElementById("ani").classList.remove("showcase_border-switched");
            document.getElementById("ani").classList.remove("showcase_border-down");
            document.getElementById("ani").style.top = "6em";
            document.getElementById("ani").dataset.mystring = evt.currentTarget.my;
            document.getElementById("ani").removeEventListener("animationend", endDown, true);

            switching = false;

            setTimeout(function(){
                document.getElementById("ani").classList.add("showcase_border-switched");
                switching = true;
                setTimeout(function(){
                    document.getElementById(''+document.getElementById("ani").dataset.mystring).querySelector("iframe").src = categories[''+document.getElementById("ani").dataset.mystring][2][0] + categories[''+document.getElementById("ani").dataset.mystring][0][0] + '.html';
                    switching = false;

                }, 1075);
            })
        } else{
            document.getElementById(''+evt.currentTarget.my).querySelector("iframe").src = categories[''+evt.currentTarget.my][2][0] + categories[''+evt.currentTarget.my][0][0] + '.html';
            document.getElementById("ani").classList.add("showcase_border-down");
            document.getElementById("ani").addEventListener("animationend", endDown, true);

        }



    }


    });

    category[i].my = i;



}

function endDown(){
    document.getElementById("ani").style.top = "-43.5em";
}

function endSwitch(){

}

category[0].click();



/*if (window.matchMedia( "(hover: none)" ).matches) {

 }*/














// const dataResponse = (_data) =>{
//     data = _data;
// }

// let data;
// var dictionary = {"Games" : {}, "ArtWork" : {}, "Information" : {}};

// (() => {
//     var raw = new XMLHttpRequest();
//     raw.open("GET", "data.txt", false);
//     raw.onreadystatechange = () =>{
//         if(raw.readyState === 4){
//             if(raw.status === 200 || raw.status === 0){
//                 dataResponse(raw.responseText.split("\n").map(e=>e.trim("r")).map(e=>e.trim("\\")));
//                 console.log("Data Loaded");
//             }
//         }
//     }

//     raw.send(null);
// })()

// for(var item of data){ //item = "{"Category", "Name", "Date"}"
//     var currentArray = item.split(",");
//     dictionary[item[0][]]

// }


// const dictionary = {
//     "Games" : {
//         "Elements" : [],
//         "Directory" : "",

//         "Items" : {
//             0 : {
//                 "Text" : "Dungeon Crawler",
//                 "Date" : "",

//             },
//             1 : {
//                 "Text" : "Doctor Gear",
//                 "Date" : "",
//             },

//         },

//     },
//     "ArtWork" : {},
//     "Information" : {}
// }


// const readTextFile = (file) =>{
//     var array;
//     var raw = new XMLHttpRequest();
//     raw.open("GET", file, true);
//     raw.onreadystatechange = () =>{
//         if(raw.readyState === 4){
//             if(raw.status === 200 || raw.status === 0){
//                 array = raw.responseText.split("\n").map(e=>e.trim("r"));
//                 alert(array);
//                 return array;
//             }
//         }
//     }
//     raw.send(null);
// };
