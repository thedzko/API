var themes = {
    light: {
        "accent-color": "#3035e8",
        "accent-contrast": "white",
        "accent-border": "#161cca",
        "background-color": "#f3f3f3",
        "background-color-header": "white",
        "background-items-header": "#f8f8f8",
        "background-footer": "black",
        "color-footer": "white",
        "description-footer": "#929292",
        "text-color": "black",
        "h2-color": "#A3A3A3",
        "h2-background": "#EBEBEB",
        "button-background": "#3035e8",
        "button-background-hover": "#161cca",
        "background-span": "rgba(0, 0, 0, 0.90)",
        "text-navigation": "#A3A3A3",
        "text-description": "#141414",
        "transition-dark-delay": ".5s",
        "logo": "url(/img/logos/logo.svg)",
        "broken-icon-news": "url(/img/logos/icon_news_light.svg)",
        "text-color-list": "#3035e8",
        "background-color-list": "#EDEDFD",
        "background-color-card": "white",
        "box-shadow-card": "rgba(100, 100, 100, 0.3)",
        "linear-gradient-latest": "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))"
    },
    dark: {
        "accent-color": "#A3A6F5",
        "accent-contrast": "#A3A6F5",
        "accent-border": "#7E82F1",
        "background-color": "#121417",
        "background-color-header": "#15171A",
        "background-items-header": "#14161a",
        "background-footer": "#090A0B",
        "color-footer": "#c2c2c2",
        "description-footer": "#B0B0B0",
        "text-color": "#c2c2c2",
        "h2-color": "#B0B0B0",
        "h2-background": "#1B1E22",
        "button-background": "#1B1E22",
        "button-background-hover": "#090A0B",
        "background-span": "#121417",
        "text-navigation": "#24282E",
        "text-description": "#B0B0B0",
        "logo": "url(/img/logos/logoD.svg)",
        "broken-icon-news": "url(/img/logos/icon_news_dark.svg)",
        "text-color-list": "#A3A6F5",
        "background-color-list": "#14161a",
        "background-color-card": "#15171A",
        "box-shadow-card": "rgba(37, 26, 26, 0.1)",
        "linear-gradient-latest": "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))"
    }
};

// Get root <html> node style interface
var root = document.documentElement.style;
var darkMatcher = window.matchMedia("(prefers-color-scheme: dark)");
var prefersColorScheme = darkMatcher.matches ? "dark" : "light";
/*
 * You can overwrite this function from within your React app.
 * eg: window.__onSetTheme = (themeName) => setThemeName(themeName)
 */
window.__onSetTheme = function() {};
window.__setTheme = function(themeName) {
    var theme = themes[themeName];
    Object.keys(theme).forEach(function(key) {
        // Set global custom properties on root element
        root.setProperty("--" + key, theme[key]);
        window.__onSetTheme(theme)
    });
}
window.__setTheme(prefersColorScheme);

window.__setTheme(themeName) {
    window.localStorage.setItem("themeName", themeName);
    ...
}