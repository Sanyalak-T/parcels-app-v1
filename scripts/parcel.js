/** @format */

// add modal
let addParcelModal = document.getElementById(
  "parcelmodalform"
);
let parcelModal = document.getElementById(
  "modalcontainer"
);
let closeparcelModal =
  document.getElementById("closemodal");

// add form
let addParcelForm = document.querySelector(
  ".addparcelform"
);
let arrivalDate = document.getElementById(
  "arrivaldate"
);
let parcelType =
  document.getElementById("parceltype");
let nameParcel =
  document.getElementById("nameparcel");
let numberOrCode = document.getElementById(
  "numberorcode"
);
let brandTypeModelSizeDescrip =
  document.getElementById(
    "brandtypemodelsizedescrip"
  );
let unitPrice =
  document.getElementById("unitprice");
let howToGet =
  document.getElementById("howtoget");
let stationary =
  document.getElementById("stationary");
let parcelRemark = document.getElementById(
  "parcelremark"
);
let saveParcel =
  document.getElementById("saveparcel");
let resetParcel = document.getElementById(
  "resetparcel"
);

function getParcels() {
  fetch("http://localhost:3000/parcels")
    .then((res) => res.json())
    .then((parcels) => {
      let parcelsTable = "";
      parcels.map((parcel, idx) => {
        parcelsTable += `
          <tr data-id=${parcel._id}>
            <td>${idx + 1}</td>
              <td>
                <button class="editicon"><img id="editId" src="../images/edit-icon.svg" /></button>
                <button class="deleteicon"><img id="deleteId" src="../images/trash-icon.svg" /></button>
              </td>
            <td class="arrivalDate">${dayjs(
              parcel.arrivaldate
            ).format("DD-MM-YYYY")}</td>
            <td class="numberOrCode">${
              parcel.numberorcode
            }</td>
            <td class="parcelType">${
              parcel.parceltype
            }</td>
            <td class="nameParcel">${
              parcel.nameparcel
            }</td>
            <td class="brandTypeModelSizeDescrip">${
              parcel.brandtypemodelsizedescrip
            }</td>
            <td class="unitPrice">${
              parcel.unitprice
            }</td>
            <td class="howToGet">${
              parcel.howtoget
            }</td>
          </tr>`;
      });

      document.getElementById(
        "table-body"
      ).innerHTML = parcelsTable;
    });
}

// data show
let tbodySection =
  document.getElementById("table-body");

let parcelId;
tbodySection.addEventListener("click", (e) => {
  e.preventDefault();

  parcelId =
    e.target.parentElement.parentElement
      .parentElement.dataset.id;

  let deletebtn = e.target.id === "deleteId";
  let editbtn = e.target.id === "editId";

  // delete data by id
  if (deletebtn) {
    if (confirm("คุณจะลบข้อมูลแถวนี้หรือไม่!")) {
      fetch(
        "http://localhost:3000/parcels/" +
          parcelId,
        {
          method: "DELETE",
          headers: {
            Accept:
              "application/json, text/plain, */*",
            "Content-type":
              "application/json; charset=UTF-8",
          },
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
    let getDate = async () => {
      const res = await fetch(
        "http://localhost:3000/parcels/" +
          parcelId
      );
      const data = await res.json();
      const oldDate = new Date(data.arrivaldate);
      const oldDateRightForm = oldDate
        .toISOString()
        .split("T")[0];
      arrivalDate.value = oldDateRightForm;
    };

    getDate();

    let arrivalDateEl = new Date(
      arrivalDate.value
    );
    let numberOrCodeEl = parent.querySelector(
      ".numberOrCode"
    ).textContent;
    let parcelTypeEl = parent.querySelector(
      ".parcelType"
    ).textContent;
    let nameParcelEl = parent.querySelector(
      ".nameParcel"
    ).textContent;
    let brandTypeModelSizeDescripEl =
      parent.querySelector(
        ".brandTypeModelSizeDescrip"
      ).textContent;
    let unitPriceEl =
      parent.querySelector(
        ".unitPrice"
      ).textContent;
    let howToGetEl =
      parent.querySelector(
        ".howToGet"
      ).textContent;

    arrivalDate.value = arrivalDateEl;
    parcelType.value = parcelTypeEl;
    nameParcel.value = nameParcelEl;
    numberOrCode.value = numberOrCodeEl;
    brandTypeModelSizeDescrip.value =
      brandTypeModelSizeDescripEl;
    unitPrice.value = unitPriceEl;
    howToGet.value = howToGetEl;
    // stationary.value = stationaryEl;
    // parcelRemark.value = parcelRemarkEl;

    addParcelModalForm();

    saveParcel.addEventListener("click", (e) => {
      e.preventDefault();

      fetch(
        "http://localhost:3000/parcels/" +
          parcelId,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json, */*",
            "Content-type":
              "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            arrivaldate: arrivalDate.value,
            parceltype: parcelType.value,
            nameparcel: nameParcel.value,
            numberorcode: numberOrCode.value,
            brandtypemodelsizedescrip:
              brandTypeModelSizeDescrip.value,
            unitprice: unitPrice.value,
            howtoget: howToGet.value,
            // stationary: stationary.value,
            // parcelremark: parcelRemark.value,
          }),
        }
      ).then((res) => res.json());
      resetParcels();
      location.reload();
    });
  }
});

// get parcel type value from backend
const url = "http://localhost:3000/parceltypes/";
fetch(url)
  .then((res) => res.json())
  .then((parcelTypeData) => {
    let dataObj = parcelTypeData.map(
      (parcelType) => parcelType.parceltypename
    );
    // return dataObj;
    let parcelTypeArray = dataObj;
    let parcelTypeSelect = "";
    parcelTypeArray.map((parceltype, index) => {
      parcelTypeSelect += `
        <option id="${index}" value="${parceltype}">${parceltype}</option>
    `;
    });
    parcelType.innerHTML = parcelTypeSelect;
  });

// add parcel
addParcelForm.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch("http://localhost:3000/parcels", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type":
        "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      arrivaldate: arrivalDate.value,
      numberorcode: numberOrCode.value,
      parceltype: parcelType.value,
      nameparcel: nameParcel.value,
      brandtypemodelsizedescrip:
        brandTypeModelSizeDescrip.value,
      unitprice: unitPrice.value,
      howtoget: howToGet.value,
      // stationary: stationary.value,
      // parcelremark: parcelRemark.value,
    }),
  })
    .then((res) => res.json)
    .then((data) => console.log(data));
  location.reload();
});

function resetParcels() {
  arrivalDate.value = "";
  numberOrCode.value = "";
  parcelType.value = "";
  nameParcel.value = "";
  brandTypeModelSizeDescrip.value = "";
  unitPrice.value = "";
  howToGet.value = "";
  // stationary.value = '';
  // parcelRemark.value = '';
}

//add org modal form
function addParcelModalForm() {
  parcelModal.style.display = "block";
}

//close modal form
function closeParcelModalForm() {
  parcelModal.style.display = "none";
  resetParcels();
}

addParcelModal.addEventListener(
  "click",
  addParcelModalForm
);
closeparcelModal.addEventListener(
  "click",
  closeParcelModalForm
);

resetParcel.addEventListener(
  "click",
  resetParcels
);

getParcels();
