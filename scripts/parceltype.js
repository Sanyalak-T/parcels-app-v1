/** @format */

let addParcelTypeModal = document.getElementById(
  "parceltypemodalform"
);
let modal = document.getElementById(
  "modalcontainer"
);
let closeModal =
  document.getElementById("closemodal");

let addParcelTypeForm = document.querySelector(
  ".addparceltypeform"
);
let parcelTypeName = document.getElementById(
  "parceltypename"
);
let parcelTypeRemark = document.getElementById(
  "parceltyperemark"
);

let btnSaveDepartment = document.getElementById(
  "btnSaveParcelType"
);
let clearParcelType = document.getElementById(
  "btnClearParcelType"
);
let tbodySection =
  document.getElementById("table-body");

let parcelTypes = localStorage.getItem(
  "parcelTypes"
)
  ? JSON.parse(
      localStorage.getItem("parcelTypes")
    )
  : [];

let parcelTypeNameId;
tbodySection.addEventListener("click", (e) => {
  e.preventDefault();

  parcelTypeNameId =
    e.target.parentElement.parentElement
      .parentElement.dataset.id;
  console.log(parcelTypeNameId);
  let deletebtn = e.target.id === "deleteId";
  let editbtn = e.target.id === "editId";
  console.log(editbtn);
  // delete data by id
  // e.target.tagName can use

  if (deletebtn) {
    if (confirm("คุณจะลบข้อมูลแถวนี้หรือไม่!")) {
      fetch(
        "http://localhost:3000/parceltypes/" +
          parcelTypeNameId,
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
    let parcelTypeNameEl = parent.querySelector(
      ".parcelTypeName"
    ).textContent;
    let parcelTypeRemarkEl = parent.querySelector(
      ".parcelTypeRemark"
    ).textContent;

    parcelTypeName.value = parcelTypeNameEl;
    parcelTypeRemark.value = parcelTypeRemarkEl;

    addParcelTypeModalForm();

    btnSaveParcelType.addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        fetch(
          "http://localhost:3000/parceltypes/" +
            parcelTypeNameId,
          {
            method: "PATCH",
            headers: {
              Accept:
                "application/json, text/plain, */*",
              "Content-type":
                "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
              parceltypename:
                parcelTypeName.value,
              parceltyperemark:
                parcelTypeRemark.value,
            }),
          }
        ).then((res) => res.json());
        resetParcelType();
        location.reload();
      }
    );
  }
});

// get parcel type
function getParcelTypes() {
  fetch("http://localhost:3000/parcelTypes")
    .then((res) => res.json())
    .then((parcelTypes) => {
      let parcelTypesTable = "";
      parcelTypes.map((parceltypeList, idx) => {
        parcelTypesTable += `
            <tr data-id=${parceltypeList._id}>
              <td>${idx + 1}</td>
                <td>
                  <button class="editicon"><img id="editId" src="../images/edit-icon.svg" /></button>
                  <button class="deleteicon"><img id="deleteId" src="../images/trash-icon.svg" /></button>
                </td>
              <td class="parcelTypeName">${
                parceltypeList.parceltypename
              }</td>
              <td class="parcelTypeRemark">${
                parceltypeList.parceltyperemark
              }</td>
            </tr>`;
      });
      document.getElementById(
        "table-body"
      ).innerHTML = parcelTypesTable;
    });
}
// add parcel type
addParcelTypeForm.addEventListener(
  "submit",
  (e) => {
    e.preventDefault();

    // add organizations
    fetch("http://localhost:3000/parceltypes", {
      method: "POST",
      headers: {
        Accept:
          "application/json, text/plain, */*",
        "Content-type":
          "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        parceltypename: parcelTypeName.value,
        parceltyperemark: parcelTypeRemark.value,
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

function resetParcelType() {
  parcelTypeName.value = "";
  parcelTypeRemark.value = "";
}

// add parcel type modal form
function addParcelTypeModalForm() {
  modal.style.display = "block";
}

// close modal form
function closeModalForm() {
  modal.style.display = "none";
  resetParcelType();
}

addParcelTypeModal.addEventListener(
  "click",
  addParcelTypeModalForm
);

closeModal.addEventListener(
  "click",
  closeModalForm
);

clearParcelType.addEventListener(
  "click",
  resetParcelType
);

getParcelTypes();
