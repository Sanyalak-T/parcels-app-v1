/** @format */

let addMaterialTypeModal = document.getElementById('materialtypemodalform');
let modal = document.getElementById('modalcontainer');
let closeModal = document.getElementById('closemodal');

let addMaterialTypeForm = document.querySelector('.addmaterialtypeform');
let materialTypeName = document.getElementById('materialtypename');
let materialTypeRemark = document.getElementById('materialtyperemark');

let btnSaveMaterialType = document.getElementById('btnSaveMaterialType');
let clearMaterialType = document.getElementById('btnClearMaterailType');
let tbodySection = document.getElementById('table-body');

let materialTypeNameId;
tbodySection.addEventListener('click', (e) => {
  e.preventDefault();

  materialTypeNameId =
    e.target.parentElement.parentElement.parentElement.dataset.id;

  let editbtn = e.target.id === 'editId';
  let deletebtn = e.target.id === 'deleteId';

  // delete data by id
  // e.target.tagName can use

  if (deletebtn) {
    if (confirm('คุณจะลบข้อมูลแถวนี้หรือไม่!')) {
      fetch('http://localhost:3000/materialtypes/' + materialTypeNameId, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      location.reload();
    }
  }

  // edit data by id
  if (editbtn) {
    const parent = e.target.parentElement.parentElement.parentElement;
    let materialTypeNameEl =
      parent.querySelector('.equipmentTypeName').textContent;
    let materialTypeRemarkEl = parent.querySelector(
      '.equipmentTypeNameRemark'
    ).textContent;

    materialTypeName.value = materialTypeNameEl;
    materialTypeRemark.value = materialTypeRemarkEl;

    addMaterialTypeModalForm();

    btnSaveMaterialType.addEventListener('click', (e) => {
      e.preventDefault();
      fetch('http://localhost:3000/materialtypes/' + materialTypeNameId, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          materialtypename: materialTypeName.value,
          materialtyperemark: materialTypeRemark.value,
        }),
      }).then((res) => res.json());
      resetMaterialType();
      location.reload();
    });
  }
});

function getMaterialTypes() {
  fetch('http://localhost:3000/materialtypes')
    .then((res) => res.json())
    .then((materialTypes) => {
      let materialTypesTable = '';
      materialTypes.map((materialTypesList, idx) => {
        materialTypesTable += `
          <tr data-id=${materialTypesList._id}>
            <td>${idx + 1}</td>
            <td>
              <button ><i id="editId" class="far fa-edit"></i></button> |
              <button ><i id="deleteId" class="far fa-trash-alt"></i></button>
            </td>
            <td class="equipmentTypeName">${
              materialTypesList.materialtypename
            }</td>
            <td class="equipmentTypeNameRemark">${
              materialTypesList.materialtyperemark
            }</td>
          </tr>`;
      });
      document.getElementById('table-body').innerHTML = materialTypesTable;
    });
}

addMaterialTypeForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // add materialtypes
  fetch('http://localhost:3000/materialtypes', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      materialtypename: materialTypeName.value,
      materialtyperemark: materialTypeRemark.value,
    }),
  })
    .then((res) => res.json)
    .then((data) => console.log(data));
  location.reload();
});

function closeModalMaterialTypeList() {
  let modal = document.getElementById('modalcontainer');
  modal.style.display = 'none';
}

function resetMaterialType() {
  materialTypeName.value = '';
  materialTypeRemark.value = '';
}

// add department modal form
function addMaterialTypeModalForm() {
  modal.style.display = 'block';
}

// close modal form
function closeModalForm() {
  modal.style.display = 'none';
  resetMaterialType();
}

addMaterialTypeModal.addEventListener('click', addMaterialTypeModalForm);
closeModal.addEventListener('click', closeModalForm);

clearMaterialType.addEventListener('click', resetMaterialType);

getMaterialTypes();