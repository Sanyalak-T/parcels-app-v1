/** @format */

pdfMake.fonts = {
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-MediumItalic.ttf",
  },
  THSarabunNew: {
    normal: "THSarabunNew.ttf",
    bold: "THSarabunNew-Bold.ttf",
    italics: "THSarabunNew-Italic.ttf",
    bolditalics: "THSarabunNew-BoldItalic.ttf",
  },
};

// get id from button for addEventListener
let parcelReport = document.getElementById(
  "parcelreport"
);
// get parcel type element from html
const selectParcelType = document.getElementById(
  "selectparceltype"
);
// get parcelname element from html
const selectParcelName = document.getElementById(
  "selectparcelname"
);

// get higher section value from backend
const organization_URL =
  "http://localhost:3000/organizations/";
let higherSection = [];
fetch(organization_URL)
  .then((res) => res.json())
  .then((higherSectionData) => {
    let higherSectionArray =
      higherSectionData.map(
        (higherSectionItem) =>
          higherSectionItem.highersectionname
      );
    higherSection.push(higherSectionArray);
  });

// get organization name value from backend
let orgName = [];
fetch(organization_URL)
  .then((res) => res.json())
  .then((organizationNameData) => {
    let organizationNameArray =
      organizationNameData.map(
        (organizationNameItem) =>
          organizationNameItem.organizationname
      );
    orgName.push(organizationNameArray);
  });

// get parcel type value from backend and show in report element
async function getParcelType() {
  const parcelType_URL =
    "http://localhost:3000/parceltypes/";
  const response = await fetch(parcelType_URL);
  const parcelTypeData = await response.json();
  let allParcelTypes = parcelTypeData.map(
    (parcelType) => parcelType.parceltypename
  );
  let parcelTypeUnique = allParcelTypes.filter(
    (value, index, array) => {
      return array.indexOf(value) === index;
    }
  );
  let parcelTypeSelect = "";
  parcelTypeUnique.map((item, idx) => {
    parcelTypeSelect += `
      <option id="${idx}" value="${item}">${item}</option>
    `;
  });
  selectParcelType.innerHTML = parcelTypeSelect;
}

// get parcel name value from backend and show in report element
async function getParcelName() {
  const parcelName_URL =
    "http://localhost:3000/parcels/";
  const response = await fetch(parcelName_URL);
  const parcelNameData = await response.json();
  let allParcelName = parcelNameData.map(
    (parcelName) => parcelName.nameparcel
  );
  let parcelNameUnique = allParcelName.filter(
    (value, index, array) => {
      return array.indexOf(value) === index;
    }
  );
  let parcelNameSelect = "";
  parcelNameUnique.map((item, idx) => {
    parcelNameSelect += `
      <option id="${idx}" value="${item}">${item}</option>
    `;
  });
  selectParcelName.innerHTML = parcelNameSelect;
}

// create report function
async function genPdf(event) {
  event.preventDefault();

  //   get parcel name and parcel type by user select
  let parcelTypeEl = document.getElementById(
    "selectparceltype"
  ).value;

  let parcelNameEl = document.getElementById(
    "selectparcelname"
  ).value;

  const partGovernment = `${higherSection}`;
  const organizationName = `${orgName}`;
  const parcelType = `${parcelTypeEl}`;
  const parcelName = `${parcelNameEl}`;

  const tableHeader = [
    {
      text: "วดป.ที่ได้รับ",
      alignment: "center",
      bold: true,
    },
    {
      text: "เลขที่ หรือรหัส",
      alignment: "center",
      bold: true,
    },
    {
      text: "ประเภทพัสดุ",
      alignment: "center",
      bold: true,
    },
    {
      text: "ชื่อพัสดุ",
      alignment: "center",
      bold: true,
    },
    {
      text: "ยี่ห้อ ชนิด แบบ ขนาดและลักษณะ.",
      alignment: "center",
      bold: true,
    },
    {
      text: "ราคาต่อหน่วย (บาท)",
      alignment: "center",
      bold: true,
    },
    {
      text: "วิธีการได้มา",
      alignment: "center",
      bold: true,
    },
    // { text: 'ใช้ประจำที่', alignment: 'center', bold: true },
    // { text: 'หมายเหตุ', alignment: 'center', bold: true },
  ];

  let parcels = [];

  let parcelsUrl = await fetch(
    "http://localhost:3000/parcels"
  );
  let parcelsResponse = await parcelsUrl.json();
  let parcelsData = parcelsResponse;
  console.log(parcelsData);

  let parcelFilter;
  // true 2 case
  if (parcelType && parcelName) {
    // filter with parcel type
    let parcelFilterFirst = parcelsData.filter(
      (parcel) => {
        if (parcel.parceltype === parcelType) {
          let parcelTypeCondition =
            parcel.parceltype === parcelType;
          return parcelTypeCondition;
        }
      }
    );

    // filter with parcel name
    parcelFilter = parcelFilterFirst.filter(
      (parcel) => {
        if (parcel.nameparcel === parcelName) {
          let parcelNameCondition =
            parcel.nameparcel === parcelName;
          return parcelNameCondition;
        }
      }
    );
  } else {
    if (parcelType) {
      parcelFilter = parcelsData.filter(
        (parcel) => {
          if (parcel.parceltype === parcelType) {
            let parcelTypeCondition =
              parcel.parceltype === parcelType;
            return parcelTypeCondition;
          }
        }
      );
    } else {
      parcelFilter = parcelsData.filter(
        (parcel) => {
          if (parcel.nameparcel === parcelName) {
            let parcelNameCondition =
              parcel.nameparcel === parcelName;
            return parcelNameCondition;
          }
        }
      );
    }
  }

  parcels = parcelFilter;

  let bodyTable = [];

  bodyTable = parcels.map(
    ({
      arrivaldate,
      numberorcode,
      parceltype,
      nameparcel,
      brandtypemodelsizedescrip,
      unitprice,
      howtoget,
    }) => {
      return [
        {
          text: dayjs(arrivaldate).format(
            "DD-MM-YYYY"
          ),
        },
        { text: numberorcode },
        { text: parceltype },
        { text: nameparcel },
        { text: brandtypemodelsizedescrip },
        { text: unitprice },
        { text: howtoget },
      ];
    }
  );

  bodyTable.unshift(tableHeader);

  pdfMake
    .createPdf({
      pageOrientation: "landscape",
      pageSize: "A4",
      pageMargins: 50,
      header: function (
        currentPage,
        pageCount,
        pageSize
      ) {
        //ad logic
        return {
          columns: [
            {
              text: `page ${currentPage}/${pageCount}`,
              alignment: "right",
              margin: [0, 10, 10, 0],
            },
          ],
        };
      },
      footer: function (
        currentPage,
        pageCount,
        pageSize
      ) {
        //ad logic
        return {
          columns: [
            {
              text: new Date().toLocaleString(),
              alignment: "left",
              margin: [10, 10, 0, 0],
            },
            {
              text: "createb by Admin",
              alignment: "right",
              margin: [0, 10, 10, 0],
            },
          ],
        };
      },
      content: [
        {
          text: "รายงานทะเบียนครุภัฑ์",
          bold: true,
          fontSize: 28,
          alignment: "center",
          margin: [0, 0, 0, 20],
        },
        {
          table: {
            widths: [178, 178, 178, 178],
            body: [
              [
                `ส่วนราชาการ ${partGovernment}`,
                `หน่วยงาน ${organizationName}`,
                `ประเภท ${parcelType}`,
                `ชื่อหรือชนิด ${parcelName}`,
              ],
            ],
          },
          margin: [0, 0, 0, 30],
          // bold: true,
        },
        {
          layout: "Borders",
          table: {
            headerRows: 1,
            widths: [98, 98, 98, 98, 98, 98, 98],
            body: bodyTable,
          },
        },
      ],
      defaultStyle: {
        font: "THSarabunNew",
        fontSize: 14,
      },
    })
    .open();
}

getParcelType();
getParcelName();
parcelReport.addEventListener("click", genPdf);
