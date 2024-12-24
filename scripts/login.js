/** @format */

const userLogin = "admin";
const passwordLogin = "123456";
const loginbtn = document.getElementById("login");
let userName =
  document.getElementById("username");
let password =
  document.getElementById("password");

function goToHomePage() {
  let userNameInput = userName.value;
  let passwordInput = password.value;

  if (
    userNameInput === userLogin &&
    passwordInput === passwordLogin
  ) {
    userName.value = "";
    password.value = "";
    location.href = "view/home.html";
  }

  if (
    userNameInput === "" &&
    passwordInput === ""
  ) {
    alert("โปรดใส่ชื่อผู้ใช้และรหัสผ่าน");
    userName.value = "";
    password.value = "";
    return;
  }

  if (!(userNameInput === userLogin)) {
    alert("โปรดใส่ชื่อผู้ใช้ที่ถูกต้อง");
    userName.value = "";
    password.value = "";
    return;
  }

  if (!(passwordInput === passwordLogin)) {
    alert("โปรดใส่ชื่อรหัสผ่านที่ถูกต้อง");
    userName.value = "";
    password.value = "";
    return;
  }

  if (userNameInput === "") {
    alert("โปรดใส่ชื่อผู้ใช้");
    userName.value = "";
    password.value = "";
    return;
  }

  if (passwordInput === "") {
    alert("โปรดใส่รหัสผ่าน");
    userName.value = "";
    password.value = "";
    return;
  }
}

loginbtn.addEventListener("click", goToHomePage);
