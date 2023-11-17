const searchField = document.getElementsByClassName("searchbar");
const searchIcon = document.getElementById("search");
const table = document.getElementsByClassName("sem-table-body");
const tableRow = table[0].getElementsByTagName("tr");

searchField[0].addEventListener("input", (event) => {
  searchHandler(event);
});

function searchHandler(event) {
  if (event.target.value === "") {
    searchIcon.style.display = "flex";
  } else {
    searchIcon.style.display = "none";
  }
  let filter = event.target.value.toUpperCase();
  let tableData;
  let found;
  for (i = 0; i < tableRow.length; i++) {
    tableData = tableRow[i].getElementsByTagName("td");
    for (j = 0; j < tableData.length; j++) {
      if (tableData[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
        found = true;
      }
    }
    if (found) {
      tableRow[i].style.display = "";
      found = false;
    } else {
      tableRow[i].style.display = "none";
    }
  }
}

let scrollContainer = document.getElementById("scroll-container");

scrollContainer.addEventListener("click", () => {
  tableScrollHandler();
});

table[0].onscroll = function () {
  scrollToTop();
};

function scrollToTop() {
  console.log(table[0].scrollTop);
  if (table[0].scrollTop > 300) {
    scrollContainer.style.visibility = "visible";
  } else {
    scrollContainer.style.visibility = "hidden";
  }
}

function tableScrollHandler() {
  table[0].scrollTop = 0;
  table[0].style.transition = "all 1s";
}
