const express = require("express");
const router = express.Router();
const { Divisas } = require("../models");

// GET: Obtener todos los gastos con filtros opcionales
router.get("/api/divisas", async (req, res) => {
  try {
    let where = {};
    // Agregar filtros según sea necesario, aquí hay un ejemplo para descripción
    if (req.query.descripcion != undefined && req.query.descripcion !== "") {
      where.descripcion = {
        [Op.like]: "%" + req.query.descripcion + "%",
      };
    }

    let items = await Divisas.findAndCountAll({
      order: [["descripcion", "ASC"]],
      where,
    });

    res.json(items.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Obtener un gasto por ID
// GET: Obtener un gasto por ID
router.get('/api/divisas/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let divisas = await Divisas.findByPk(id);
    if (!divisas) {
      return res.status(404).json({ error: 'Medio de pago no encontrada' });
    }
    res.json(divisas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Crear un nuevo gasto
router.post("/api/divisas", async (req, res) => {
  try {
    let nuevoGasto = await Divisas.create(req.body);
    res.status(201).json(nuevoGasto);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.errors.map(e => e.message) });
    }
    res.status(500).json({ error: error.message });
  }
});

// PUT: Actualizar un gasto existente por ID
router.put("/api/divisas/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let divisa = await Divisas.findByPk(id);
    if (!divisa) {
      return res.status(404).json({ error: "Divisa no encontrada" });
    }

    let updatedDivisa = await divisa.update(req.body);
    res.json(updatedDivisa);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.errors.map(e => e.message) });
    }
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Eliminar un gasto existente por ID
router.delete("/api/divisas/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let divisa = await Divisas.findByPk(id);
    if (!divisa) {
      return res.status(404).json({ error: "Divisa no encontrada" });
    }

    await divisa.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
