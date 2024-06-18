// sqlite-init.js
const db = require("aa-sqlite");
const { sequelize, User, Category, Expense } = require("./sequelize-init"); // Importar los modelos y la conexión Sequelize

async function CrearBaseSiNoExiste() {
  let connection;

  try {
    // Abrir la base de datos, creándola si no existe
    connection = await db.open(process.env.base);

    // Verificar si la tabla de gastos ya existe
    let existeTabla = await connection.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'expenses'"
    );

    if (existeTabla.contar === 0) {
      // Crear la tabla de gastos si no existe
      await connection.run(`CREATE TABLE expenses (
          expense_id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          category_id INTEGER,
          amount DECIMAL(10, 2) NOT NULL,
          description TEXT,
          date TEXT NOT NULL
      )`);
      console.log("Tabla 'expenses' creada.");
    }

    // Generar algunos datos ficticios de gastos
    const gastos = [
      { user_id: 1, category_id: 1, amount: 50.25, description: "Compras en supermercado", date: "2024-06-15" },
      { user_id: 1, category_id: 2, amount: 20.50, description: "Gasolina", date: "2024-06-14" },
      { user_id: 2, category_id: 3, amount: 100.00, description: "Cena en restaurante", date: "2024-06-13" },
      { user_id: 2, category_id: 1, amount: 35.75, description: "Farmacia", date: "2024-06-12" },
      { user_id: 1, category_id: 2, amount: 15.00, description: "Estacionamiento", date: "2024-06-11" },
      { user_id: 3, category_id: 3, amount: 75.60, description: "Cine con amigos", date: "2024-06-10" },
      { user_id: 2, category_id: 1, amount: 42.30, description: "Compra de libros", date: "2024-06-09" },
      { user_id: 3, category_id: 2, amount: 18.90, description: "Merienda en cafetería", date: "2024-06-08" },
      { user_id: 1, category_id: 3, amount: 60.00, description: "Concierto de música", date: "2024-06-07" },
      { user_id: 3, category_id: 1, amount: 28.50, description: "Ropa nueva", date: "2024-06-06" }
    ];

    // Insertar los gastos ficticios en la tabla
    for (let gasto of gastos) {
      await connection.run(`INSERT INTO expenses (user_id, category_id, amount, description, date) 
                   VALUES (?, ?, ?, ?, ?)`, [gasto.user_id, gasto.category_id, gasto.amount, gasto.description, gasto.date]);
    }

    console.log("Datos de gastos ficticios insertados correctamente.");

  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
  } finally {
    // Cerrar la conexión con la base de datos al finalizar
    try {
      if (connection) await connection.close();
      console.log("Conexión cerrada correctamente");
    } catch (error) {
      console.error("Error al cerrar la conexión:", error);
    }
  }
}

CrearBaseSiNoExiste();

module.exports = CrearBaseSiNoExiste;
