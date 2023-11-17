const userIdRegex = /^\d{7}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,24}$/;

let userSuccess = false;
let passwordSuccess = false;
let confirmPasswordSuccess = false;

function redirectHandler(){
  window.location.href = "/login/index.html";
}

function passwordRevealer() {
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const passwordIcons = document.querySelectorAll(".password-icon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    confirmPasswordInput.type = "text";
    passwordIcons.forEach((icon) => {
      icon.innerHTML = "visibility";
    });
  } else {
    passwordInput.type = "password";
    confirmPasswordInput.type = "password";
    passwordIcons.forEach((icon) => {
      icon.innerHTML = "visibility_off";
    });
  }
}

function userIdHandler() {
  const userId = document.getElementById("userId-container");
  const userIdError = document.getElementById("userId-error");

  const userIdValue = document.getElementById("userId").value;

  if (!userIdRegex.test(userIdValue)) {
    userId.classList.add("error");
    userId.classList.remove("verified");
    if (userIdValue.length < 7) {
      userIdError.innerHTML = "UserId must be at least 7 digits";
    } else if (userIdValue.length > 7) {
      userIdError.innerHTML = "UserId must be at most 7 digits";
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

function confirmPasswordHandler() {
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password-container");
  const confirmPasswordError = document.getElementById("confirm-password-error");

  const confirmPasswordValue = document.getElementById("confirm-password").value;

  if (confirmPasswordValue !== password.value) {
    confirmPassword.classList.add("error");
    confirmPassword.classList.remove("verified");
    if (confirmPasswordValue.length === 0) {
      confirmPasswordError.innerHTML = "Please confirm your password";
    } else {
      confirmPasswordError.innerHTML = "Passwords do not match";
    }
    confirmPasswordSuccess = false;
  } else {
    confirmPassword.classList.remove("error");
    confirmPassword.classList.add("verified");
    confirmPasswordError.innerHTML = "";
    confirmPasswordSuccess = true;
  }
}

const submitHandler = () => {
  const notification = document.getElementById("notification");

  if (userSuccess && passwordSuccess && confirmPasswordSuccess) {
    notification.innerHTML = "<span class='material-symbols-outlined'>task_alt</span> ";
    notification.innerHTML += "Password Updated";
    notification.classList.add("show", "success");
    setTimeout(() => {
      notification.classList.remove("show", "success");
    }, 2000);
    return;
  }

  notification.innerHTML = "<span class='material-symbols-outlined'>cancel</span>";
  notification.innerHTML += "Invalid Credentials";
  notification.classList.add("show", "error");
  setTimeout(() => {
    notification.classList.remove("show", "error");
  }, 2000);
};
