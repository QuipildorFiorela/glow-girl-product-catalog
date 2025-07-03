USE tienda_accesorios;
DROP TABLE salesdetails;
DROP TABLE sales;
DROP TABLE products;

CREATE TABLE IF NOT EXISTS products (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    price DOUBLE NOT NULL,
    img VARCHAR(100),
    category TEXT,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO products (id, name, description, price, img, category, active) VALUES
(1, 'Gorra bordada Hello Kitty', 'Gorra canvas con bordado de Hello Kitty y regulador metálico trasero.', 20000.00, 'img/products/gorra_hello_kitty.webp', 'accessory', TRUE),
(2, 'Llavero y charm Hello Kitty', 'Llavero y charm metálico de Hello Kitty con moño de perlas y mosquetón en forma de corazón.', 15900.00, 'img/products/charm_hello_kitty.webp', 'accessory', TRUE),
(3, 'Llavero y charm metálico de perrito', 'Llavero y charm metálico en forma de perrito, moño y frase, con mosquetón metálico para colgar.', 8900.00, 'img/products/charm_perrito.webp', 'accessory', TRUE),
(4, 'Collar dorado trébol', 'Collar corto multicadena premium con dije de trébol y strass.', 13000.00, 'img/products/collar_trebol.webp', 'accessory', TRUE),
(5, 'Collar relicario de manzana', 'Cadena corta con relicario de manzana esmaltado.', 8900.00, 'img/products/collar_relicario.webp', 'accessory', TRUE),
(6, 'Set de aros mixplating', 'Set de 6 pares de aros en metal mixplating con diferentes formatos.', 8900.00, 'img/products/set_aros.webp', 'accessory', TRUE),
(7, 'Aros cortos frutillas', 'Aros cortos con cabezal de strass y dije frutilla de vidrio.', 9200.00, 'img/products/aros_frutilla.webp', 'accessory', TRUE),
(8, 'Set de dijes para cordones', 'Set de 4 dijes con mosquetón y en forma de corazón para customizar los cordones de las zapatillas.', 9200.00, 'img/products/set_dijes_cordones.webp', 'accessory', TRUE),
(9, 'Collar premium multidijes', 'Collar corto premium con multidijes con strass.', 10500.00, 'img/products/collar_multidijes.webp', 'accessory', TRUE),
(10, 'Set de broches mixplating', 'Set que incluye 3 broches de flores en mixplating.', 8900.00, 'img/products/set_broches.webp', 'accessory', TRUE),
(11, 'Collar de perlas con corazón', 'Collar corto de perlas y dije de corazón con forma de candado.', 8900.00, 'img/products/collar_perlas_corazon.webp', 'accessory', TRUE),
(12, 'Aros colgantes con corazón', 'Aros colgantes cortos con corazones de glitter.', 5200.00, 'img/products/aros_corazon.webp', 'accessory', TRUE),
(13, 'Collar Bianca', 'Edición especial dedicada a Bianca Monteleone.', 10000.00, 'img/products/collar_bianca.webp', 'accessory', TRUE),
(14, 'Collar Fiore', 'Edición especial dedicada a Fiorela Quipildor.', 10000.00, 'img/products/collar_fiore.webp', 'accessory', TRUE),
(15, 'Set de collares zodiaco Tauro', 'Collar compuesto de cadena de eslabones con dije de zodiaco y otra de piedras naturales.', 8900.00, 'img/products/set_collares_tauro.webp', 'accessory', TRUE),
(16, 'Set de collares zodiaco Virgo', 'Collar compuesto de cadena de eslabones con dije de zodiaco y otra de piedras naturales.', 8900.00, 'img/products/set_collares_virgo.webp', 'accessory', TRUE),
(17, 'Choker rosa mariposa', 'Choker con doble cinta y dije de mariposa de metal con cierre de mosquetón.', 6900.00, 'img/products/choker_mariposa.webp', 'accessory', TRUE),
(18, 'Set pulseras BFF', 'Set por 2 pulseras de la amistad con dije de piedra en forma de corazón que cambia con el estado de ánimo.', 6900.00, 'img/products/set_pulseras.webp', 'accessory', TRUE),
(19, 'Llavero y charm de zorrito', 'Llavero y Charm en forma de zorrito que mueve la cola. Personalizá tus carteras, mochilas o bolsos con Bag Charms!', 13000.00, 'img/products/charm_zorro.webp', 'accessory', TRUE),
(20, 'Collar corazón amatista', 'Cadena corta de cadena torzada y dije de corazón en piedra amatista, con cierre de mosquetón.', 8900.00, 'img/products/collar_corazon_piedra.webp', 'accessory', TRUE),
(21, 'Cartera city con broche', 'Cartera mini city de cuerina con broche metálico de corazón y doble asa corta de mano', 39000.00, 'img/products/cartera_city.webp', 'bag', TRUE),
(22, 'Bandolera Rosa Floreada', 'Bandolera de cuerina con bolsillo frontal con cierre. Correa regulable. Cierre superior y puller de material principal. Tag de metal', 35000.00, 'img/products/bandolera_flores.webp', 'bag', TRUE),
(23, 'Cartera bowling white', 'Cartera bowling de doble asa corta con bolsillos frontales y moño decorativo con charm colgante', 45000.00, 'img/products/cartera_bowling_white.webp', 'bag', TRUE),
(24, 'Cartera bowling brown con arandelas', 'Cartera bowling de cuerina con doble asa corta de mano, cierre superior, asa larga regulable y desmontable', 39000.00, 'img/products/cartera_bowling_brown.webp', 'bag', TRUE),
(25, 'Tote Bag Red Croissant', 'Bolsa reutilizable 38x43 estampa croissant', 18000.00, 'img/products/tote_croissant.webp', 'bag', TRUE),
(26, 'Bandolera Y2K white', 'Cartera baguette de cuerina con hebilla. Correa regulable. Cierre superior. Hebilla frontal con broche con botón para cerrado', 45000.00, 'img/products/bandolera_y2k.webp', 'bag', TRUE),
(27, 'Mini bag baby blue', 'Bandolera tipo baguette con charm decorativo y doble asa corta de mano', 35000.00, 'img/products/mini_bag_blue.webp', 'bag', TRUE),
(28, 'Cartera Bowling Aqua', 'Cartera bowling de cuerina. Correa regulable desmontable. Manijas superiores. Doble cierre superior y pullers de material principal. Tag de metal', 39000.00, 'img/products/cartera_bowling_aqua.webp', 'bag', TRUE),
(29, 'Bandolera Hobo White', 'Bandolera formato hobo con monedero de corazón y asa de hombro regulable. Cierre y puller de material principal', 45000.00, 'img/products/bandolera_hobo.webp', 'bag', TRUE),
(30, 'Cartera Bowling B&W', 'Cartera bowling de cuerina con doble asa corta de mano. Cierre superior con pullers de material principal y tag metálico', 39000.00, 'img/products/cartera_bowling_bw.webp', 'bag', TRUE),
(31, 'Cartera bowling black', 'Cartera bowling de doble asa corta con bolsillos frontales y moño decorativo con charm colgante', 45000.00, 'img/products/cartera_bowling_black.webp', 'bag', TRUE),
(32, 'Bandolera baguette denim', 'Bandolera baguette de denim con hebilla frontal para cerrado y asa de hombro regulable. Cierre superior. Tiras laterales decorativas', 45000.00, 'img/products/bandolera_baguette.webp', 'bag', TRUE),
(33, 'Cartera bowling chocolate', 'Cartera bowling de cuerina con doble asa de hombro con hebillas regulables y charms decorativos. Cierre superior. Bolsillo frontal con cierre', 39000.00, 'img/products/cartera_bowling_chocolate.webp', 'bag', TRUE),
(34, 'Bandolera baguette coquette', 'Bandolera baguette de cuerina con asa de corta de hombro. Cierre superior y puller de material principal. Tag de metal', 32000.00, 'img/products/bandolera_baguette_coquette.webp', 'bag', TRUE),
(35, 'Cartera Bowling Camel', 'Cartera bowling de cuerina con doble asa corta de mano con charms decorativos. Cierre superior. Correa regulable y desmontable. Forrería interior', 39000.00, 'img/products/cartera_bowling_camel.webp', 'bag', TRUE),
(36, 'Cartera shopper wine', 'Cartera shopper de cuerina con asa de hombro regulable y detalle lateral de arandelas. Cierre superior', 49000.00, 'img/products/cartera_shopper_wine.webp', 'bag', TRUE),
(37, 'Tote bag canvas ositos', 'Tote bag canvas en color crudo con estampa de ositos y doble asa de hombro', 18000.00, 'img/products/tote_ositos.webp', 'bag', TRUE),
(38, 'Carteras bowling con hebillas', 'Cartera bowling de cuerina con hebillas. Manijas superiores. Cierre superior. Bolsillos frontales con hebillas.', 45000.00, 'img/products/cartera_bowling_hebillas.webp', 'bag', TRUE),
(39, 'Bandolera multipocket', 'Bandolera de cuerina con bolsillo frontal con cierre y asa de hombro', 45000.00, 'img/products/bandolera_multipocket.webp', 'bag', TRUE),
(40, 'Tote cow lucky you', 'Tote bag mediana con estampa cow, forreria, vista y cierre', 23000.00, 'img/products/tote_cow.webp', 'bag', TRUE);
