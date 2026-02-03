const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

window.addEventListener('load', function() {
    var loader = document.getElementById('page-loader');
    this.setTimeout(()=>{
      loader.classList.add('hidden');
    }, 1100)
});

//dark mode theme
const themeBtn = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("darkThemePreferences");

if (savedTheme === "true") {
  document.body.classList.add("dark");
  themeBtn.textContent = "Dark";
} else {
  document.body.classList.remove("dark");
  themeBtn.textContent = "Light";
}

themeBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  themeBtn.textContent = isDark ? "Dark" : "Light";
  localStorage.setItem("darkThemePreferences", isDark);
});