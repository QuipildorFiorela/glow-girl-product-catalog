USE tienda_accesorios;
DROP TABLE users;

CREATE TABLE IF NOT EXISTS users (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	mail VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(10) NOT NULL,
    password TEXT(100) NOT NULL
);

/*
{
    "name": "Bianca",
    "mail": "bianca@gmail.com",
    "password": "1234"
}
{
    "name": "Fiore",
    "mail": "fiorela@gmail.com",
    "password": "5678"
}
*/