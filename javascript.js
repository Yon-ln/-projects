let activeIndex = 0;
let previousIndex = activeIndex;
const maxDist = 40;
let distance = 0;
const groups = document.getElementsByClassName("main-card");
const bar = document.getElementsByClassName("bar");
let _1vh = Math.round(window.innerHeight / (groups.length * 100));

bar[0].style.height = (0.95*bar[0].parentNode.clientHeight) / groups.length + "px";

let g = [groups[0], groups[1], groups[2]].sort((a, b) => parseFloat(a.dataset.trueIndex) - parseFloat(b.dataset.trueIndex));

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
    activeIndex = index;
    previousIndex = activeIndex;
}

function getToIndex(index, dy){
    while (activeIndex != index){
        setIndex(index, dy);
    }
}

window.addEventListener("wheel", function (event) {
    distance = distance + Math.sign(event.deltaY) <= maxDist - 1 ? distance + Math.sign(event.deltaY) : 0;
    if(distance < 0) distance = maxDist;

    let dy = event.deltaY < 0 ? -1 : 1;

    getToIndex(returnIndex(distance), dy);

}, false);

document.getElementsByClassName("bar")[0].addEventListener('click', function (event){

});
