CREATE TABLE products (
  id_juego SERIAL PRIMARY KEY,
  nombre_juego VARCHAR(255) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10, 2) NOT NULL,
  fecha_lanzamiento DATE NOT NULL
);

CREATE TABLE plataformas (
  id_plataforma SERIAL PRIMARY KEY,
  nombre_plataforma VARCHAR(100) NOT NULL,
  usado BOOLEAN NOT NULL
);

CREATE TABLE juegos_plataformas (
  id_juego INTEGER REFERENCES products(id_juego),
  id_plataforma INTEGER REFERENCES plataformas(id_plataforma),
  PRIMARY KEY (id_juego, id_plataforma)
);

ALTER TABLE plataformas DROP COLUMN usado;
ALTER TABLE juegos_plataformas ADD COLUMN usado BOOLEAN DEFAULT false;

SELECT * FROM users;
SELECT * FROM products;
SELECT * FROM plataformas;
SELECT * FROM juegos_plataformas;
SELECT p.id_juego, p.nombre_juego, pl.nombre_plataforma, jp.usado
FROM products p
JOIN juegos_plataformas jp ON p.id_juego = jp.id_juego
JOIN plataformas pl ON jp.id_plataforma = pl.id_plataforma;

INSERT INTO products (nombre_juego, descripcion, precio, fecha_lanzamiento) VALUES
('Sekiro', 'Juego de acción y aventura desarrollado por FromSoftware', 59.99, '2019-03-22'),
('Outriders', 'RPG de disparos cooperativo', 59.99, '2021-04-01'),
('Donkey Kong Country', 'Juego de plataformas con Donkey Kong', 59.99, '2018-05-04'),
('Mortal Kombat', 'Juego de lucha con gráficos mejorados', 59.99, '2019-04-23'),
('Cyberpunk 2077', 'RPG en un mundo distópico futurista', 59.99, '2020-12-10');
('Zelda: Breath of the Wild', 'Juego de aventura y exploración en un vasto mundo abierto', 59.99, '2017-03-03');

INSERT INTO plataformas (nombre_plataforma, usado) VALUES 
('PS4', false),
('Nintendo Switch', false),
('Xbox One', false);

INSERT INTO juegos_plataformas (id_juego, id_plataforma, usado)
SELECT p.id_juego, pl.id_plataforma, CASE 
    WHEN p.nombre_juego IN ('Sekiro', 'Outriders', 'Donkey Kong Country') THEN true 
    ELSE false 
END
FROM products p 
JOIN plataformas pl ON 
    (p.nombre_juego = 'Sekiro' AND pl.nombre_plataforma = 'PS4') OR 
    (p.nombre_juego = 'Outriders' AND pl.nombre_plataforma = 'PS4') OR 
    (p.nombre_juego = 'Donkey Kong Country' AND pl.nombre_plataforma = 'Nintendo Switch') OR 
    (p.nombre_juego = 'Mortal Kombat' AND pl.nombre_plataforma = 'Xbox One') OR 
    (p.nombre_juego = 'Cyberpunk 2077' AND pl.nombre_plataforma = 'Xbox One') OR 
    (p.nombre_juego = 'Zelda: Breath of the Wild' AND pl.nombre_plataforma = 'Nintendo Switch');