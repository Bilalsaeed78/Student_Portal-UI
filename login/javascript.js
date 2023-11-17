let userSuccess = false;
let passwordSuccess = false;

function passwordRevealer() {
  const passwordInput = document.getElementById("password");
  const passwordLogo = document.getElementById("password-logo");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    passwordLogo.innerHTML = "visibility";
  } else {
    passwordInput.type = "password";
    passwordLogo.innerHTML = "visibility_off";
  }
}

function userIdHandler() {
  const userId = document.getElementById("userId-container");
  const userIdError = document.getElementById("userId-error");

  const userIdValue = document.getElementById("userId").value;
  const userIdRegex = /^\d{7}$/; // regular expression

  if (!userIdRegex.test(userIdValue)) {
    userId.classList.add("error");
    userId.classList.remove("verified");
    if (userIdValue.length < 7) {
      userIdError.innerHTML = "UserId must be at least 7 characters";
    } else if (userIdValue.length > 7) {
      userIdError.innerHTML = "UserId must be at most 7 characters";
    } else {
      userIdError.innerHTML = "UserId can only contain numbers";
    }
    userSuccess = false;
  } else {
    userId.classList.remove("error");
    userId.classList.add("verified");
    userIdError.innerHTML = "";
    userSuccess = true;
  }
}

function passwordHandler() {
  const password = document.getElementById("password-container");
  const passwordError = document.getElementById("password-error");

  const passwordValue = document.getElementById("password").value;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z@#$%^&+=]{8,24}$/;    // regular expression

  if (!passwordRegex.test(passwordValue)) {
    password.classList.add("error");
    password.classList.remove("verified");
    if (passwordValue.length === 0) {
      passwordError.innerHTML = "Password is required";
    } else if (passwordValue.length < 8) {
      passwordError.innerHTML = "Password must be at least 8 characters long";
    } else if (passwordValue.length > 24) {
      passwordError.innerHTML = "Password must be at most 24 characters long";
    } else if (!/(?=.*[a-z])/.test(passwordValue)) {
      passwordError.innerHTML = "Password must contain at least one lowercase letter";
    } else if (!/(?=.*[A-Z])/.test(passwordValue)) {
      passwordError.innerHTML = "Password must contain at least one uppercase letter";
    } else if (!/(?=.*\d)/.test(passwordValue)) {
      passwordError.innerHTML = "Password must contain at least one number";
    }
    passwordSuccess = false;
  } else {
    password.classList.remove("error");
    password.classList.add("verified");
    passwordError.innerHTML = "";
    passwordSuccess = true;
  }
}

const submitHandler = () => {
  const notification = document.getElementById("notification");

  if (userSuccess && passwordSuccess) {
    notification.innerHTML = "<span class='material-symbols-outlined'>task_alt</span> ";
    notification.innerHTML += "Logged-in Successfully";
    notification.classList.add("show", "success");
    setTimeout(() => {
      notification.classList.remove("show", "success");
    }, 2000);
    window.location.href = "/home/index.html";
    return;
  }

  notification.innerHTML = "<span class='material-symbols-outlined'>cancel</span>";
  notification.innerHTML += "Invalid Credentials";
  notification.classList.add("show", "error");
  setTimeout(() => {
    notification.classList.remove("show", "error");
  }, 2000);
};