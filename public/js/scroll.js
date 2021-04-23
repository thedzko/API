const activeList = document.querySelectorAll("div .center-content h2");
const activeNav = document.querySelectorAll("div .content-list a");

window.addEventListener("scroll", () => {
    let current = "";
    console.log(pageYOffset)
    activeList.forEach((h2) => {
        const sectionTop = h2.offsetTop;
        const sectionHeight = h2.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = h2.getAttribute("id");
        }
    });
    activeNav.forEach((a) => {
        a.classList.remove("active");
        if (a.classList.contains(current)) {
            a.classList.add("active");
        }
    });
});