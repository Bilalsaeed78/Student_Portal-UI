const notification = document.getElementById("notification");

const storedImage = localStorage.getItem("user-image");
// const avatarElement = document.getElementById("user-avatar");
// const profileElement = document.getElementById("user-image");
// const profileElement = document.getElementById("user-image");
const profileModallement = document.getElementById("modal-image");

// storedImage
//   ? ((avatarElement.src = storedImage), (profileElement.src = storedImage))
//   : ((avatarElement.src = "../assets/default-avatar.jpg"), (profileElement.src = "../assets/default-avatar.jpg"));

storedImage
  ? (profileModallement.src = storedImage)
  : (profileModallement.src = "../assets/default-avatar.jpg");

function changeImage() {
  const file = event.target.files[0];
  if (file.type === "image/jpeg") {
    profileModallement.src = URL.createObjectURL(file);
    return;
  }

  notification.innerHTML =
    "<span class='material-symbols-outlined'>cancel</span>";
  notification.innerHTML += "Invalid Image Type";
  notification.classList.add("show", "error");
  setTimeout(() => {
    notification.classList.remove("show", "error");
  }, 2000);
}

const uploadImage = () => {
  notification.innerHTML =
    "<span class='material-symbols-outlined'>task_alt</span> ";
  notification.innerHTML += "Image Uploaded";
  notification.classList.add("show", "success");
  setTimeout(() => {
    notification.classList.remove("show", "success");
    toggleModal();
  }, 2000);
};

const toggleModal = () => {
  document.getElementById("modal").classList.toggle("show-modal");
  document.getElementById("modal-overlay").classList.toggle("show-backdrop");
};

//////////// CGPA

const data = [3.7, 3.93, 3.6, 3.84, 3.95];

const current_cgpa_value = (
  data.reduce((a, b) => a + b, 0) / data.length
).toFixed(3);
const max_cgpa_value = 4.0;

let cgpa = document.getElementById("cgpa");
let c_gpa = document.getElementById("c_gpa");

let highestGPA = document.getElementById("highest-gpa");
highestGPA.innerHTML += Math.max.apply(Math, data);

let currentSemesterNo = document.getElementById("current-semester-no");
currentSemesterNo.innerHTML = data.length + 1 > 8 ? 8 : data.length + 1;

// Calculate the CGPA progress
let cgpa_progress = (current_cgpa_value / max_cgpa_value) * 100;

// Set the CGPA value and stroke dash offset
cgpa.innerHTML = current_cgpa_value;
c_gpa.style.strokeDashoffset = (440 * (100 - cgpa_progress)) / 100;

////////// CGPA CHART

document.addEventListener("DOMContentLoaded", function () {
  const labels = [
    "1st sem",
    "2nd sem",
    "3rd sem",
    "4th sem",
    "5th sem",
    "6th sem",
    "7th sem",
    "8th sem",
  ];

  const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "GPA",
          data: data,
          backgroundColor: "rgba(88, 136, 190, 0.9)",
          borderColor: "rgba(88, 136, 190, 0.9)",
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: "rgb(12, 84, 163)",
          pointBorderColor: "rgb(12, 84, 163)",
          lineTension: 0.5, // Adjust the line tension to make curves more or less pronounced
          fill: false, // Remove the fill color under the curve
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 4,
          ticks: {
            stepSize: 0.5,
          },
        },
      },
    },
  });
});

////////// Assignment

const assignment_data = [
  {
    course: "User Interface",
    task: "Test",
    due: "2023-06-04",
    status: "Pending",
  },
  {
    course: "Linear Algebra",
    task: "Assignment",
    due: "2023-06-30",
    status: "Missing",
  },
  {
    course: "Artificial Intelligence",
    task: "Assignment",
    due: "2023-06-05",
    status: "Submitted",
  },
  {
    course: "Numerical Computing",
    task: "Assignment",
    due: "2023-06-10",
    status: "Pending",
  },
  {
    course: "Ojbect Oriented Programming",
    task: "Quiz",
    due: "2023-06-23",
    status: "Submitted",
  },
  {
    course: "Final Year Project",
    task: "Presentation",
    due: "2023-08-01",
    status: "Pending",
  },
  // Add more data items as needed
];

document.addEventListener("DOMContentLoaded", function () {
  const table = document.getElementById("myTable");
  const tbody = table.querySelector("tbody");

  assignment_data.forEach((item, index) => {
    const row = document.createElement("tr");
    const courseCell = document.createElement("td");
    const taskCell = document.createElement("td");
    const dueCell = document.createElement("td");
    const statusCell = document.createElement("td");

    courseCell.textContent = item.course;
    taskCell.textContent = item.task;
    dueCell.textContent = formatDate(item.due);

    if (item.status === "Missing") {
      statusCell.innerHTML = `<div class="icon-box"><span class="material-icons icon icon-alert">warning</span> ${item.status} </div>`;
    } else if (item.status === "Pending") {
      statusCell.innerHTML = `<div class="icon-box"><span class="material-icons icon icon-info">info</span> ${item.status} </div>`;
    } else if (item.status === "Submitted") {
      statusCell.innerHTML = `<div class="icon-box"><span class="material-icons icon icon-success">check_circle</span> ${item.status} </div>`;
    }

    row.appendChild(courseCell);
    row.appendChild(taskCell);
    row.appendChild(dueCell);
    row.appendChild(statusCell);

    tbody.appendChild(row);

    if (index % 2 === 0) {
      row.style.backgroundColor = "var(--primary-text-color)";
    } else {
      row.style.backgroundColor = "var(--primary-color)";
    }
  });

  // Function to format the date
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });

    return `${day}${getOrdinalSuffix(day)} ${month}`;
  }

  // Function to get the ordinal suffix for a day
  function getOrdinalSuffix(day) {
    const suffixes = ["th", "st", "nd", "rd"];
    const digit = day % 10;
    return suffixes[
      day % 100 > 10 && day % 100 < 14 ? 0 : digit <= 3 ? digit : 0
    ];
  }
});

////////// Assignment Calender

const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const renderCalendar = () => {
  let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
  let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
  let lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
  let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();
  let liTag = "";

  for (let i = firstDayOfMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateOfMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    let hasAssignment = assignment_data.some(
      (item) =>
        new Date(item.due).getDate() === i &&
        currMonth === new Date(item.due).getMonth() &&
        currYear === new Date(item.due).getFullYear()
    );
    let assignmentClass = hasAssignment ? "active" : "";

    liTag += `<li class="${isToday} ${assignmentClass}">${i}</li>`;
  }

  for (let i = lastDayOfMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
  }

  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;
};

renderCalendar();

prevNextIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }
    renderCalendar();
  });
});
