const express = require("express");
const db = require("./data/database");
const enableCors = require("./middlewares/cors");

const app = express();
app.use(enableCors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const organizationRoutes = require("./routes/organization.routes");
const departmentRoutes = require("./routes/department.routes");
const equipmentRoutes = require("./routes/equipmenttype.routes");
const materialTypeRoutes = require("./routes/materialtype.routes");
const parcelTypeRoutes = require("./routes/parceltype.routes");
const parcelRoutes = require("./routes/parcel.routes");

app.use(organizationRoutes);
app.use(departmentRoutes);
app.use(equipmentRoutes);
app.use(materialTypeRoutes);
app.use(parcelTypeRoutes);
app.use(parcelRoutes);

db.initDb()
  .then(function () {
    // old version port on 3000, change to real app use port: 3000
    app.listen(3000);
    console.log(
      "connecting database successfully"
    );
  })
  .catch(function (error) {
    console.log(
      error + "connecting database failed!"
    );
  });
