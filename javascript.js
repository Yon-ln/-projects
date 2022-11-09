let activeIndex = 0;
let previousIndex = activeIndex;
const maxDist = 60;
let distance = 0;
const groups = document.getElementsByClassName("main-card");
const bar = document.getElementsByClassName("bar");
bar[0].style.height = (1/groups.length) * 100 + "%";

let g = [groups[0], groups[1], groups[2]].sort((a, b) => parseFloat(a.dataset.trueIndex) - parseFloat(b.dataset.trueIndex));

function returnIndex(dist){
    const multiplier = 1/groups.length;

    if(dist > multiplier * 2 * maxDist)
        return 2;
    else if(dist > multiplier * maxDist)
        return 1;

    return 0;
}

function setIndex(index){
    const currentGroup = document.querySelector("[data-index=" + CSS.escape(activeIndex) + "]");
    const nextGroup = document.querySelector("[data-index=" + CSS.escape(index) + "]");

    if(previousIndex != index){
        let n = g.shift();
        g.push(n);
    }

    for(let i = 0; i < g.length; ++i){
        g[i].dataset.trueIndex = i;
    }
    
    previousIndex = activeIndex;
    bar[0].style.marginTop = 1.85 * (index/groups.length) * 100 + "px";

    activeIndex = index;

}

function getToIndex(index){
    while (activeIndex != index){
        setIndex(index);
    }
}

window.addEventListener("wheel", function (event) {
    distance = distance + Math.sign(event.deltaY) <= maxDist - 1 ? distance + Math.sign(event.deltaY) : 0;
    if(distance < 0) distance = maxDist;

    getToIndex(returnIndex(distance));

}, false);
