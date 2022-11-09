let activeIndex = 0;
let previousIndex = activeIndex;
const maxDist = 100;
let distance = 0;
let scrolling = false;
const groups = document.getElementsByClassName("main-card");
let g = [groups[0], groups[1], groups[2]];

let locked = false;
let lastCall = false;

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

        for(let i = 0; i < g.length; ++i){
            g[i].dataset.trueIndex = i;
        }
    }

    activeIndex = index;
    previousIndex = activeIndex;

}


window.addEventListener("wheel", function (event) {
    distance = distance + Math.sign(event.deltaY) <= maxDist - 1 ? distance + Math.sign(event.deltaY) : 0;
    if(distance < 0) distance = maxDist;

    setIndex(returnIndex(distance));

}, false);
