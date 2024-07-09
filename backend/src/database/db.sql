-- Crear la base de datos
CREATE DATABASE projectgastos;

-- Usar la base de datos recién creada
USE projectgastos;

-- Crear la tabla 'divisas'
CREATE TABLE divisas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(50) NOT NULL
);

-- Crear la tabla 'tipostransaccion'
CREATE TABLE tipostransaccion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(50) NOT NULL
);

-- Crear la tabla 'metodospago'
CREATE TABLE metodospago (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(50) NOT NULL
);

-- Crear la tabla 'categorias'
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(50) NOT NULL
);

-- Crear la tabla 'gastos' con todas las foreign keys
CREATE TABLE gastos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255),
    monto DECIMAL(10, 2) NOT NULL,
    fecha DATE NOT NULL,
    divisa_id INT,
    tipostransaccion_id INT,
    metodopago_id INT,
    categoria_id INT,
    FOREIGN KEY (divisa_id) REFERENCES divisas(id),
    FOREIGN KEY (tipostransaccion_id) REFERENCES tipostransaccion(id),
    FOREIGN KEY (metodopago_id) REFERENCES metodospago(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);
