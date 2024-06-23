const express = require("express");
const router = express.Router();
const { Gastos, MediosDePago, Divisas, TiposTransaccion, Categorias } = require("../models");

// GET: Obtener todos los gastos con filtros opcionales
router.get("/api/tiposTransaccion", async (req, res) => {
  try {
    let where = {};
    // Agregar filtros según sea necesario, aquí hay un ejemplo para descripción
    if (req.query.descripcion != undefined && req.query.descripcion !== "") {
      where.descripcion = {
        [Op.like]: "%" + req.query.descripcion + "%",
      };
    }

    let items = await TiposTransaccion.findAndCountAll({
      order: [["descripcion", "ASC"]],
      where,
    });

    res.json(items.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// GET: Obtener un gasto por ID
router.get('/api/tiposTransaccion/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let tiposTransaccion = await TiposTransaccion.findByPk(id);
    if (!tiposTransaccion) {
      return res.status(404).json({ error: 'Medio de pago no encontrada' });
    }
    res.json(tiposTransaccion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Crear un nuevo gasto
router.post("/api/tiposTransaccion", async (req, res) => {
  try {
    let nuevaTransaccion = await TiposTransaccion.create(req.body);
    res.status(201).json(nuevaTransaccion);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.errors.map(e => e.message) });
    }
    res.status(500).json({ error: error.message });
  }
});

// PUT: Actualizar un gasto existente por ID
router.put("/api/tiposTransaccion/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let transaccion = await TiposTransaccion.findByPk(id);
    if (!transaccion) {
      return res.status(404).json({ error: "Tipo transaccion no encontrado" });
    }

    let updateTransaccion = await transaccion.update(req.body);
    res.json(updateTransaccion);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.errors.map(e => e.message) });
    }
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Eliminar un gasto existente por ID
router.delete("/api/tiposTransaccion/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let transaccion = await TiposTransaccion.findByPk(id);
    if (!transaccion) {
      return res.status(404).json({ error: "Tipo transaccion no encontrado" });
    }

    await transaccion.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
