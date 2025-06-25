USE tienda_accesorios;
DROP TABLE users;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    correo VARCHAR(100) NOT NULL,
    password TEXT(100) NOT NULL
);