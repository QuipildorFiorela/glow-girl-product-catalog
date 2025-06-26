USE tienda_accesorios;
DROP TABLE users;

CREATE TABLE IF NOT EXISTS users (
    id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
    correo VARCHAR(100) NOT NULL,
    password TEXT(100) NOT NULL
);