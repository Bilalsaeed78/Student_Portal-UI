fetch(document.getElementById("secondary-navigation").dataset.include)
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("secondary-navigation").innerHTML = data;

    const menuBar = document.getElementById("menu-bar");

    document.querySelector(".menu").addEventListener("click", function () {
      this.classList.toggle("clicked");
      menuBar.classList.toggle("appear");
    });
  });
