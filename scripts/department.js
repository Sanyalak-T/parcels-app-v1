/** @format */

let addDepartmentModal = document.getElementById(
  "departmentmodalform"
);
let modal = document.getElementById(
  "modalcontainer"
);
let closeModal =
  document.getElementById("closemodal");

let addDepartmentForm = document.querySelector(
  ".adddepartmentform"
);
let departmentName = document.getElementById(
  "departmentname"
);
let departmentRemark = document.getElementById(
  "departmentremark"
);

let btnSaveDepartment = document.getElementById(
  "btnSaveDepartment"
);
let clearDepartment = document.getElementById(
  "btnClearDepartment"
);
let tbodySection =
  document.getElementById("table-body");

let departmentNameId;
tbodySection.addEventListener("click", (e) => {
  e.preventDefault();

  departmentNameId =
    e.target.parentElement.parentElement
      .parentElement.dataset.id;
  console.log(departmentNameId);
  let deletebtn = e.target.id === "deleteId";
  let editbtn = e.target.id === "editId";
  console.log(editbtn);
  // delete data by id
  // e.target.tagName can use

  if (deletebtn) {
    if (confirm("คุณจะลบข้อมูลแถวนี้หรือไม่!")) {
      fetch(
        "http://localhost:3000/departments/" +
          departmentNameId,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: null,
        }
      );
      location.reload();
    }
  }

  // edit data by id
  if (editbtn) {
    const parent =
      e.target.parentElement.parentElement
        .parentElement;
    let departmentNameEl = parent.querySelector(
      ".departmentName"
    ).textContent;
    let departmentRemarkEl = parent.querySelector(
      ".departmentRemark"
    ).textContent;

    departmentName.value = departmentNameEl;
    departmentRemark.value = departmentRemarkEl;

    addDepartmentModalForm();

    btnSaveDepartment.addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        fetch(
          "http://localhost:3000/departments/" +
            departmentNameId,
          {
            method: "PATCH",
            headers: {
              Accept:
                "application/json, text/plain, */*",
              "Content-type":
                "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
              departmentname:
                departmentName.value,
              departmentremark:
                departmentRemark.value,
            }),
          }
        ).then((res) => res.json());
        resetDepartment();
        location.reload();
      }
    );
  }
});

function getDepartments() {
  fetch("http://localhost:3000/departments")
    .then((res) => res.json())
    .then((departments) => {
      let departmentTable = "";
      departments.map((departmentList, idx) => {
        departmentTable += `
          <tr data-id=${departmentList._id}>
            <td>${idx + 1}</td>
            <td>
              <button class="editicon"><img id="editId" src="../images/edit-icon.svg" /></button>
              <button class="deleteicon"><img id="deleteId" src="../images/trash-icon.svg" /></button>
            </td>
            <td class="departmentName">${
              departmentList.departmentname
            }</td>
            <td class="departmentRemark">${
              departmentList.departmentremark
            }</td>
          </tr>`;
      });
      document.getElementById(
        "table-body"
      ).innerHTML = departmentTable;
    });
}

addDepartmentForm.addEventListener(
  "submit",
  (e) => {
    e.preventDefault();

    // add organizations
    fetch("http://localhost:3000/departments", {
      method: "POST",
      headers: {
        Accept:
          "application/json, text/plain, */*",
        "Content-type":
          "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        departmentname: departmentName.value,
        departmentremark: departmentRemark.value,
      }),
    })
      .then((res) => res.json)
      .then((data) => console.log(data));
    location.reload();
  }
);

function closeModalDepartmentList() {
  let modal = document.getElementById(
    "modalcontainer"
  );
  modal.style.display = "none";
}

function resetDepartment() {
  departmentName.value = "";
  departmentRemark.value = "";
}

// add department modal form
function addDepartmentModalForm() {
  modal.style.display = "block";
}

// close modal form
function closeModalForm() {
  modal.style.display = "none";
  resetDepartment();
}

addDepartmentModal.addEventListener(
  "click",
  addDepartmentModalForm
);

closeModal.addEventListener(
  "click",
  closeModalForm
);

clearDepartment.addEventListener(
  "click",
  resetDepartment
);

getDepartments();
