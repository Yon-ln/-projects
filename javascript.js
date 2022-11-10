let activeIndex = 0;
let previousIndex = activeIndex;
let distance = 0;
const groups = document.getElementsByClassName("main-card");
const maxDist = 15 * groups.length;

const bar = document.getElementsByClassName("bar");
let _1vh = Math.round(window.innerHeight / (groups.length * 100));
let sound = new Audio("mixkit-sand-swish-1494.wav");

bar[0].style.height = (bar[0].parentNode.clientHeight) / groups.length + "px";
let n =[]
for(let i = 0; i < groups.length; ++i){
    n.push(groups[i]);
}

let g = n.sort((a, b) => parseFloat(a.dataset.trueIndex) - parseFloat(b.dataset.trueIndex));

function returnIndex(dist){
    for(let i = groups.length-1; i >= 0; i--)
        if(dist >= (1/groups.length) * i * maxDist)
            return i;
}

function setIndex(index, dy){
    const currentGroup = document.querySelector("[data-index=" + CSS.escape(activeIndex) + "]");
    const nextGroup = document.querySelector("[data-index=" + CSS.escape(index) + "]");

    if(dy == -1){
        let f = g.pop();
        g.splice(g, 0, f);
    }
    else if(dy == 1){
        let l = g.shift();
        g.push(l);

    }

    for(let i = 0; i < g.length; ++i) g[i].dataset.trueIndex = i;
    
    bar[0].style.marginTop = index * (bar[0].parentNode.clientHeight / groups.length) + "px";
    
    currentGroup.dataset.status = "inactive";
    nextGroup.dataset.status = "active;";
    
    activeIndex = index;
    previousIndex = activeIndex;
}

function getToIndex(index, dy){
    while(activeIndex!=index)
    setIndex(index, dy);
}

document.getElementById("scroller").addEventListener("wheel", function (event) {
    distance = distance + Math.sign(event.deltaY) <= maxDist - 1 ? distance + Math.sign(event.deltaY) : 0;
    if(distance < 0) distance = maxDist;

    let dy = event.deltaY < 0 ? -1 : 1;

    getToIndex(returnIndex(distance), dy);

}, false);

document.getElementsByClassName("bar")[0].addEventListener('click', function (event){

});

window.addEventListener('resize', function(event){
    bar[0].style.height = (bar[0].parentNode.clientHeight) / groups.length + "px";
    bar[0].style.marginTop = activeIndex * (bar[0].parentNode.clientHeight / groups.length) + "px";

});
