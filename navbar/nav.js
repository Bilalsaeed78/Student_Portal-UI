function showCourseCollapse() {
  document.getElementById("course-show-more1").classList.toggle("rotate-icon");
  document.getElementById("course-collapse").classList.toggle("hide");
}

function showAccountCollapse() {
  document.getElementById("course-show-more2").classList.toggle("rotate-icon");
  document.getElementById("account-collapse").classList.toggle("hide");
}

fetch(document.getElementById("navigation").dataset.include)
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navigation").innerHTML = data;

    const menuBar = document.getElementById("menu-bar");

    document.querySelector(".menu").addEventListener("click", function () {
      this.classList.toggle("clicked");
      menuBar.classList.toggle("appear");
    });
  });
