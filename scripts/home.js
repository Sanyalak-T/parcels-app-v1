/** @format */

const logoutbtn =
  document.getElementById("logout");

function goToLoginPage() {
  let check = confirm(
    "คุณกำลังจะออกจากโปรแกรมพัสดุ?"
  );
  if (check === true) {
    location.href =
      "http://localhost/parcels-app-v1/index.html";
  }
}

logoutbtn.addEventListener(
  "click",
  goToLoginPage
);
