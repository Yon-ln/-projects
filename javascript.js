let activeIndex = 0;
let previousIndex = activeIndex;
let distance = 0;
let dy = 0;
let scrolling = false;
const groups = document.getElementsByClassName("main-card");
const maxDist = groups.length;

const bar = document.getElementsByClassName("bar");
let _1vh = Math.round(window.innerHeight / (groups.length * 100));

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
    
    currentGroup.dataset.status = "unknown";
    nextGroup.dataset.status = "active;";
    
    activeIndex = index;
    previousIndex = activeIndex;
}

function getToIndex(index, dy){
    while(activeIndex!=index)
    setIndex(index, dy);
}

document.getElementById("scroller").addEventListener("wheel", function (event) {
    if(scrolling)
        setTimeout(function(){
            scrolling = false;
        }, 1000)

    if (!scrolling){
        console.log(activeIndex);
        distance = distance + Math.sign(event.deltaY) <= maxDist - 1 ? distance + Math.sign(event.deltaY) : 0;
        if(distance < 0) distance = maxDist;

        dy = event.deltaY < 0 ? -1 : 1;
        let n = activeIndex + dy < maxDist ? activeIndex + dy : 0;
        if(n < 0) n = maxDist
        getToIndex(returnIndex(n), dy);
        scrolling = true;
    }

});

document.getElementsByClassName("bar")[0].addEventListener('click', function (event){

});

window.addEventListener('resize', function(event){
    bar[0].style.height = (bar[0].parentNode.clientHeight) / groups.length + "px";
    bar[0].style.marginTop = activeIndex * (bar[0].parentNode.clientHeight / groups.length) + "px";

});
