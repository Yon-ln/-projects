let activeIndex = 0;
const maxDist = 40;
let distance = 0;
const groups = document.getElementsByClassName("main-card");

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

window.addEventListener("wheel", event => {
    distance = distance + Math.sign(event.deltaY) <= maxDist - 1 ? distance + Math.sign(event.deltaY) : 0;
    if(distance < 0) distance = maxDist;

    const nextIndex = returnIndex(distance);
    const currentGroup = document.querySelector("[data-index=" + CSS.escape(activeIndex) + "]");
    const nextGroup = document.querySelector("[data-index=" + CSS.escape(nextIndex) + "]");

    currentGroup.dataset.status = "after";
    nextGroup.dataset.status = "active";

    activeIndex = nextIndex;
    console.log(nextIndex);
});
