const express = require("express");
const router = express.Router();
const { Categorias } = require("../models");

// GET: Obtener todos los gastos con filtros opcionales
router.get("/api/categorias", async (req, res) => {
  try {
    let where = {};
    // Agregar filtros según sea necesario, aquí hay un ejemplo para descripción
    if (req.query.descripcion != undefined && req.query.descripcion !== "") {
      where.descripcion = {
        [Op.like]: "%" + req.query.descripcion + "%",
      };
    }

    let items = await Categorias.findAndCountAll({
      order: [["descripcion", "ASC"]],
      where,
    });

    res.json(items.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Crear un nuevo gasto
router.post("/api/categorias", async (req, res) => {
  try {
    let nuevaCategoria = await Categorias.create(req.body);
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.errors.map(e => e.message) });
    }
    res.status(500).json({ error: error.message });
  }
});

// PUT: Actualizar un gasto existente por ID
router.put("/api/categorias/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let categoria = await Categorias.findByPk(id);
    if (!categoria) {
      return res.status(404).json({ error: "Categoria no encontrado" });
    }

    let updatedCategoria = await categoria.update(req.body);
    res.json(updatedCategoria);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.errors.map(e => e.message) });
    }
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Eliminar un gasto existente por ID
router.delete("/api/categorias/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let categoria = await Categorias.findByPk(id);
    if (!categoria) {
      return res.status(404).json({ error: "Categoria no encontrado" });
    }

    await categoria.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
