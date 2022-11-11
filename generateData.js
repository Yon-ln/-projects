const parent = document.getElementById("cardHolder")
const template = document.getElementById("template");
const scrollbar = document.getElementById("scrollbar");
let bases = [];

let index = {
    "active" : 0,
    "previous" : 0,
    "max" : 0,
};

let data = null;

$.ajax({
    'async': false,
    'global': false,
    'url': "/data.json",
    'dataType': "json",
    'success': function (d) {
        data = d;
    }
});

const keywords = {
    "{class}" : 0,
    "{data}": function(element, data ) { element.dataset[data] = index.max; element.dataset.index = index.max; },
    "{img}": function(element, img) { element.src = img; },
    "{p}" : function(element, p) { element.innerText = p; }
};

function addDiv(parent, cls, children=[]){
    let n = [100 + Math.floor(Math.random() * 15) * 10, 100 + Math.floor(Math.random() * 15) * 10,100 + Math.floor(Math.random() * 15) * 10, 0.25];

    let div = document.createElement("div");
    div.classList += cls;
    div.style.backgroundColor = "rgba(" + n.join(',') + ")";


    children.forEach((child, index) => {
        if(child.toLowerCase().indexOf(key(child).keyword) !== -1){
            let element = key(child).keyword.replace('{','').replace('}','');
            if(element){
                let elementObj = document.createElement(key(child).keyword.replace('{','').replace('}',''));
                keywords[key(child).keyword](elementObj, key(child).word);
                div.appendChild(elementObj);
            }

        }
    });
    parent.appendChild(div);
}

function key(key){
    let n = {
        "word" : "",
        "keyword" : ""
    };

    for(const [item, value] of Object.entries(keywords)){
        if(key.toLowerCase().indexOf(item) !== -1){
            n.word = key.substring(item.length, key.length);
            n.keyword = key.substring(0, item.length);
        }
    }
    return n;
}

for(n in (data.cards)) {

    let base = template.cloneNode(true);

    for (const [item, value] of Object.entries(data.cards[n])){
        if(item.toLowerCase().indexOf("{data}") === -1){
            addDiv(base.firstChild, item, value);
        } else{
            keywords["{data}"](base, key(item).word);
        }
    }

    parent.appendChild(base);
    bases.push(base);
    index.max += 1;
}

var isScrolling = false;
var dy = 0;

const start = Date.now();
let time = 0; 
let previousTime = 0;

document.getElementById("scroller").addEventListener("wheel", function (event) {
    if(isScrolling == false){
        isScrolling = true;
        dy = Math.sign(event.deltaY);
    }
});

function setIndex(){
}

var check = setInterval(loop);
var handle = null;

function loop(){
    if(time > previousTime + 300 && isScrolling)
        scrollcancel();

    scrollbar.style.height = (scrollbar.parentNode.clientHeight) / index.max + "px";
    scrollbar.style.marginTop = index.active * (scrollbar.parentNode.clientHeight / index.max) + "px";
    bases.forEach((x, i) => x.dataset.trueIndex = i );

    index.active = bases[0].dataset.index;
}

function clock(){
    const millis = Date.now() - start;
    time = Math.floor(millis);
}

setInterval(clock);

function arrayRotate(arr, reverse) {

    if (reverse) arr.unshift(arr.pop());
    else arr.push(arr.shift());
    return arr;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrollcancel() {
    previousTime = time;
    await sleep(250);
    arrayRotate(bases, dy < 0 ? true: false);
    isScrolling = false;

}









