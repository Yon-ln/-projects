let activeIndex = 0;
const groups = document.getElementsByClassName("card-group");



window.addEventListener("wheel", event => {
    const delta = Math.abs(Math.sign(event.deltaY));

    const nextIndex = activeIndex + delta <= groups.length - 1 ? activeIndex + delta : 0;
    // const currentGroup = document.querySelector('[data-index="${activeIndex}"]');
    // const nextGroup = document.querySelector('[data-index="${nextIndex}"]');

    // currentGroup.dataset.status = "after";
    // nextGroup.dataset.status = "active";

    activeIndex = nextIndex;
    console.log(activeIndex);
});
