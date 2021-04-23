// Select the button
const btn = document.querySelector(".a-new");
// Select the theme preference from localStorage
const currentTheme = localStorage.getItem("theme");
//Toggle
var tSwitcher = document.getElementById('toggle');
let element = document.body;

// If the current theme in localStorage is "dark"...
if (currentTheme == "dark") {
    // ...then use the .dark-theme class
    document.body.classList.add("dark");
}

// Listen for a click on the button 
btn.addEventListener("click", function() {
    // Toggle the .dark-theme class on each click
    document.body.classList.toggle("dark");

    // Let's say the theme is equal to light
    let theme = "light";
    // If the body contains the .dark-theme class...
    if (document.body.classList.contains("dark")) {
        // ...then let's make the theme dark
        theme = "dark";
    }
    // Then save the choice in localStorage
    localStorage.setItem("theme", theme);
});


// Toggle

let onpageLoad = localStorage.getItem("theme") || "";
if (onpageLoad != null && onpageLoad == 'dark') {
    tSwitcher.checked = true;
}
element.classList.add(onpageLoad);

function themeToggle() {
    if (tSwitcher.checked) {
        localStorage.setItem('theme', 'dark');
        element.classList.add('dark');
    } else {
        localStorage.setItem('theme', '');
        element.classList.remove('dark');
    }
}

// Active

// Get the container element
var Container = document.getElementById("container");

// Get all buttons with class="btn" inside the container
var atags = Container.getElementsByClassName("list");
// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < atags.length; i++) {
    atags[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}