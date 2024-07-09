// backend/src/routes/metodoPago.js

const express = require("express");
const router = express.Router();
const { MetodosPago } = require("../models"); // Esto importará el objeto db que contiene todos los modelos

// O puedes importar específicamente el modelo MetodosPago de esta manera:
// const MetodosPago = db.MetodosPago;

// GET: Obtener todos los medios de pago
router.get("/", async (req, res) => {
  try {
    let where = {};
    // Agregar filtros según sea necesario, aquí hay un ejemplo para descripción
    if (req.query.descripcion != undefined && req.query.descripcion !== "") {
      where.descripcion = {
        [Op.like]: "%" + req.query.descripcion + "%",
      };
    }

    let items = await MetodosPago.findAndCountAll({
      order: [["descripcion", "ASC"]],
      where,
    });

    res.json(items.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// GET: Obtener una categoría por ID
router.get('/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let medioPago = await MetodosPago.findByPk(id);
    if (!medioPago) {
      return res.status(404).json({ error: 'Medio de pago no encontrada' });
    }
    res.json(medioPago);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Crear un nuevo gasto
router.post("/", async (req, res) => {
  try {
    let nuevoMedioPago = await MetodosPago.create(req.body);
    res.status(201).json(nuevoMedioPago);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.errors.map(e => e.message) });
    }
    res.status(500).json({ error: error.message });
  }
});

// PUT: Actualizar un gasto existente por ID
router.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let medioPago = await MetodosPago.findByPk(id);
    if (!medioPago) {
      return res.status(404).json({ error: "Medio de pago no encontrado" });
    }

    let updateMedioPago = await divisa.update(req.body);
    res.json(updateMedioPago);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.errors.map(e => e.message) });
    }
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Eliminar un gasto existente por ID
router.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let medioPago = await MetodosPago.findByPk(id);
    if (!medioPago) {
      return res.status(404).json({ error: "Medio de pago no encontrado" });
    }

    await medioPago.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
