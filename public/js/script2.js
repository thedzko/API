const btn2 = document.querySelector(".c-new");
const currentFont = localStorage.getItem("font");

if (currentFont == "sans") {
    document.body.classList.add("sans")
}

btn2.addEventListener("click", function() {
    document.body.classList.toggle("sans");

    let font = "Serif";
    if (document.body.classList.contains("sans")) {
        font = "sans"
    }
    localStorage.setItem("font", font)
})