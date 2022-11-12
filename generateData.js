const parent = document.getElementById("cardHolder")
const template = document.getElementById("template");
const scrollbar = document.getElementById("scrollbar");
let bases = [];

var index = {
    "active" : 0,
    "previous" : 0,
    "max" : 0,
};


let data = { "cards" : [
    {
        "header" : [
          "{img}home.svg",
          "{p}Doanh Luu Nguyen"
          ],
  
        "main" : [
          "{p}Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  
          ],
        
        "footer" : [
          "{img}instagram.svg",
          "{img}twitch.svg",
          "{img}twitter.svg",
          "{img}linkedin.svg",
          "{index}1"
          ],
  
        "{data}trueIndex" : ""
    },
    {
      "header" : [
        "{img}python.png",
        "{p}Python"
        ],
  
      "main" : [
        ],
      
      "footer" : [
        "{index}2"
        ],
  
        "{data}trueIndex" : ""
    },
    {
      "header" : [
        "{img}unity.png",
        "{p}Unity"
        ],
  
      "main" : [
        "{class}of-wrapper",
        ],
      
      "footer" : [
        "{index}3"
        ],
        
        "{data}trueIndex" : ""
    },
    {
      "header" : [
        "{img}c-.png",
        "{p} Shaders & Physics"
        ],
  
      "main" : [
        ],
      
      "footer" : [
        "{index}4"
        ],
        
        "{data}trueIndex" : ""
    },
    {
      "header" : [
        "{img}pixel.png",
        "{p}Pixel Art"
        ],
  
      "main" : [
  
        ],
      
      "footer" : [
        "{index}5"
        ],
        
        "{data}trueIndex" : ""
    },
    {
      "header" : [
        "{img}mail.svg",
        "{p}Email me!"
        ],
  
      "main" : [
        ],
      
      "footer" : [
        "{index}6"
        ],
        
        "{data}trueIndex" : ""
    }
  
  ]};

let video = [
  "https://i.gyazo.com/79f60cdba62f8dbab7b9171606a9db46.mp4",
  "https://i.gyazo.com/61f7a467af0619eff9d189949dd62a10.mp4",
  "https://i.gyazo.com/131ad2d134bf12d75a9c82544a81d93e.mp4",
  "https://i.gyazo.com/79f60cdba62f8dbab7b9171606a9db46.mp4",
  "https://i.gyazo.com/79f60cdba62f8dbab7b9171606a9db46.mp4",
  "https://i.gyazo.com/79f60cdba62f8dbab7b9171606a9db46.mp4",
  "https://i.gyazo.com/79f60cdba62f8dbab7b9171606a9db46.mp4",
];

// let data = null;

// $.ajax({
//     'async': false,
//     'global': false,
//     'url': "/data.json",
//     'dataType': "json",
//     'success': function (d) {
//         data = d;
//     }
// });

const keywords = {
    "{class}" : function(element, data) {
      if(data == "of-wrapper"){
        video.forEach((x, i) => {
          let h = document.createElement("video");
          let s = document.createElement("source");

          h.controls = "none";
          s.src = x;
          s.type = "video/mp4";

          h.appendChild(s)
          element.appendChild(h);
        });
      }
     },
    "{data}": function(element, data ) { element.dataset[data] = index.max; element.dataset.index = index.max; },
    "{img}": function(element, img) { element.src = "icons/" + img; },
    "{p}" : function(element, p) { element.innerText = p; },
    "{index}" : function(element, data) { element.classList.add("page"); element.innerText = data; }
};

function addDiv(parent, cls, children=[]){
    let n = [100 + Math.floor(Math.random() * 15) * 10, 100 + Math.floor(Math.random() * 15) * 10,100 + Math.floor(Math.random() * 15) * 10, 0.25];

    let div = document.createElement("div");
    div.classList += cls;
    div.style.backgroundColor = "rgba(" + n.join(',') + ")";


    children.forEach((child, index) => {
        if(child.toLowerCase().indexOf(key(child).keyword) !== -1){
            let element = key(child).keyword.replace('{','').replace('}',''); // {data} = data
            if(element){
                let elementObj = null;
                if(element == "class") {
                  elementObj = document.createElement("div");
                  elementObj.classList.add(key(child).word)
                }
                else elementObj = document.createElement(key(child).keyword.replace('{','').replace('}',''));
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


for(n in data.cards) {

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

var check = setInterval(loop, 100);
var handle = null;

function loop(){
    if(time > previousTime + 275 && isScrolling)
        scrollcancel();

    scrollbar.style.height = (scrollbar.parentNode.clientHeight) / index.max + "px";
    scrollbar.style.marginTop = index.active * (scrollbar.parentNode.clientHeight / index.max) + "px";

    bases.forEach((x, i) => x.dataset.trueIndex = i );
    rotate(bases, index.active);
}

function clock(){
    const millis = Date.now() - start;
    time = Math.floor(millis);
}

setInterval(clock);

function rotate(arr, ind) {
    if(bases[0].dataset.index != index.active)
      if (bases[0].dataset.index > index.active) arr.unshift(arr.pop());
      else arr.push(arr.shift());
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrollcancel() {
    if(dy < 0) index.active += 1;
    else index.active -= 1;

    if(index.active > index.max - 1) index.active = index.max - 1;
    else if(index.active < 0) index.active = 0;

    previousTime = time;
    await sleep(250);
    isScrolling = false;

}

let hasClickedBar = false;
let initialBarPosition = [0,0];

["mousedown","touchdown"].forEach( evt =>
  scrollbar.addEventListener(evt, function moving(event){
    hasClickedBar = true;
}), false);

let bounds = scrollbar.parentElement.getBoundingClientRect();
let barBounds = scrollbar.getBoundingClientRect();
let h = bounds.bottom - bounds.top;


["mousemove","touchmove"].forEach( evt =>
document.addEventListener(evt, function moving(event){

  if(hasClickedBar){
    let barIndex = (event.clientY / (h/ index.max) >> 0) - 1;
    index.active = barIndex;

    if(index.active > index.max - 1) index.active = index.max - 1;
    else if(index.active < 0) index.active = 0;
  }

}), false);

["mouseup","touchup"].forEach( evt =>
  document.addEventListener(evt, function moving(event){
  hasClickedBar = false;
  isScrolling = false;
}),false);







