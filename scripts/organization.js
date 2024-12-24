/** @format */

let addOrgModal = document.getElementById(
  "orgmodalform"
);
let modal = document.getElementById(
  "modalcontainer"
);
let closeModal =
  document.getElementById("closemodal");

let addOrgForm = document.querySelector(
  ".addorgform"
);
let higherSectionName = document.getElementById(
  "highersection"
);
let organizationName = document.getElementById(
  "organizationname"
);
let organizationRemark = document.getElementById(
  "organizationremark"
);

let clearOrg = document.getElementById(
  "btnClearCompany"
);
let btnSaveCompany = document.getElementById(
  "btnSaveCompany"
);
let tbodySection =
  document.getElementById("table-body");

let organizationnameId;
tbodySection.addEventListener("click", (e) => {
  e.preventDefault();

  organizationnameId =
    e.target.parentElement.parentElement
      .parentElement.dataset.id;

  let editbtn = e.target.id === "editId";
  let deletebtn = e.target.id === "deleteId";

  // delete data by id
  // e.target.tagName can use

  if (deletebtn) {
    if (confirm("คุณจะลบข้อมูลแถวนี้หรือไม่!")) {
      fetch(
        "http://localhost:3000/organizations/" +
          organizationnameId,
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
    let higherSectionNameEl =
      parent.querySelector(
        ".higherSectionName"
      ).textContent;
    let organizationNameEl = parent.querySelector(
      ".organizationName"
    ).textContent;
    let organizationRemarkEl =
      parent.querySelector(
        ".organizationRemark"
      ).textContent;

    higherSectionName.value = higherSectionNameEl;
    organizationName.value = organizationNameEl;
    organizationRemark.value =
      organizationRemarkEl;

    addOrgModalForm();

    btnSaveCompany.addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        fetch(
          "http://localhost:3000/organizations/" +
            organizationnameId,
          {
            method: "PATCH",
            headers: {
              Accept:
                "application/json, text/plain, */*",
              "Content-type":
                "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
              highersectionname:
                higherSectionName.value,
              organizationname:
                organizationName.value,
              organizationremark:
                organizationRemark.value,
            }),
          }
        ).then((res) => res.json());
        resetOrganization();
        location.reload();
      }
    );
  }
});

function getOrganizations() {
  fetch("http://localhost:3000/organizations")
    .then((res) => res.json())
    .then((organizations) => {
      let organizationTable = "";
      organizations.map(
        (organizationList, idx) => {
          organizationTable += `
          <tr data-id=${organizationList._id}>
            <td>${idx + 1}</td>
              <td>
                <button class="editicon"><img id="editId" src="../images/edit-icon.svg" /></button>
                <button class="deleteicon"><img id="deleteId" src="../images/trash-icon.svg" /></button>
              </td>
            <td class="higherSectionName">${
              organizationList.highersectionname
            }</td>
            <td class="organizationName">${
              organizationList.organizationname
            }</td>
            <td class="organizationRemark">${
              organizationList.organizationremark
            }</td>
          </tr>`;
        }
      );
      document.getElementById(
        "table-body"
      ).innerHTML = organizationTable;
    });
}

addOrgForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // add organizations
  fetch("http://localhost:3000/organizations", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type":
        "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      highersectionname: higherSectionName.value,
      organizationname: organizationName.value,
      organizationremark:
        organizationRemark.value,
    }),
  })
    .then((res) => res.json)
    .then((data) => console.log(data));
  location.reload();
});

function closeModalOrgList() {
  let modal = document.getElementById(
    "modalcontainer"
  );
  modal.style.display = "none";
}

function resetOrganization() {
  higherSectionName.value = "";
  organizationName.value = "";
  organizationRemark.value = "";
}

// add org modal form
function addOrgModalForm() {
  modal.style.display = "block";
}

// close modal form
function closeModalForm() {
  modal.style.display = "none";
  resetOrganization();
}

addOrgModal.addEventListener(
  "click",
  addOrgModalForm
);
closeModal.addEventListener(
  "click",
  closeModalForm
);

clearOrg.addEventListener(
  "click",
  resetOrganization
);

getOrganizations();
