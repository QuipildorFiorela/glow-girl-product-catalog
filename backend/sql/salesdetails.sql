USE tienda_accesorios;
DROP TABLE salesdetails;

CREATE TABLE IF NOT EXISTS salesdsetails (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    sale_id INT NOT NULL,
    product_id INT NOT NULL,
    count INT NOT NULL,

    FOREIGN KEY (sale_id) REFERENCES sales(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);