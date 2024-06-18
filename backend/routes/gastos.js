const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

router.get("/api/gastos", async function (req, res) {
  // consulta de articulos con filtros y paginacion

  let where = {};
  if (req.query.nombre != undefined && req.query.nombre !== "") {
    where.Nombre = {
      [Op.like]: "%" + req.query.nombre + "%",
    };
  }
  if (req.query.activo != undefined && req.query.activo !== "") {
    // true o false en el modelo, en base de datos es 1 o 0
    // convierto el string a booleano
    where.Activo = req.query.activo === "true";
  }
  let items = await db.articulos.findAndCountAll({
    attributes: [
      "IdArticulo",
      "Nombre",
      "Precio",
      "Stock",
      "FechaAlta",
      "Activo",
    ],
    order: [["Nombre", "ASC"]],
    where,
  });

  res.json(items.rows);
});

module.exports = router;
