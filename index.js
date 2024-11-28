const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const routes = require("./routes/index.routes");
const PORT = 4003;

app.use(express.json());
app.use(cors());

// app.use(cors({
//   origin: ' http://localhost:5174',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
// }));

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/", routes);

const db = require("./models");

try {
  db.Users.belongsTo(db.Roles, { as: "role", foreignKey: "roleId" });
  db.Roles.hasMany(db.Users, { as: "users", foreignKey: "roleId" });

  db.Books.belongsToMany(db.Users, {
    through: "UserRatings",
    foreignKey: "bookId",
    onDelete: "cascade",
  });
  db.Users.belongsToMany(db.Books, {
    through: "UserRatings",
    foreignKey: "userId",
    onDelete: "cascade",
  });

  db.Users.hasMany(db.UserRatings, {
    foreignKey: "userId",
    onDelete: "cascade",
  });
  db.UserRatings.belongsTo(db.Users, {
    foreignKey: "userId",
    onDelete: "cascade",
  });
} catch (error) {
  console.log(error);
}

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log("SERVER RUNNING ON PORT ", PORT);
  });
});
