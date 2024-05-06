
CREATE TABLE "user" (
	id SERIAL PRIMARY key,
    "name" VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    gender CHAR(1) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    dni VARCHAR(15)  NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    id_profile INT 
);

CREATE TABLE profile (
id SERIAL PRIMARY KEY,
code varchar(3)
);

CREATE TABLE platillo (
   id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255),
    imagen VARCHAR(500),
    precio DECIMAL(10, 2) NOT NULL,
    id_categoria int 
);


CREATE TABLE category (
  id SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    image_url VARCHAR(500)  NOT NULL
);

CREATE TABLE factura (
   id SERIAL PRIMARY KEY,
    total DECIMAL(10, 2) NOT NULL,
    fecha VARCHAR(255) NOT NULL,
    id_usuario int 
);

CREATE TABLE pedido (
   id SERIAL PRIMARY KEY,
   cantidad int NOT null,
   subtotal DECIMAL(10, 2) NOT NULL,
   id_platillo int ,
   id_factura int
);

ALTER TABLE "user"
ADD CONSTRAINT id_profile FOREIGN KEY (id_profile) REFERENCES profile(id);

ALTER TABLE platillo
ADD CONSTRAINT id_categoria FOREIGN KEY (id_categoria) REFERENCES category(id);

ALTER TABLE factura
ADD CONSTRAINT id_usuario FOREIGN KEY (id_usuario) REFERENCES "user"(id);

ALTER TABLE pedido
ADD CONSTRAINT id_factura FOREIGN KEY (id_factura) REFERENCES factura(id);

ALTER TABLE pedido
ADD CONSTRAINT id_platillo FOREIGN KEY (id_platillo) REFERENCES platillo(id);


INSERT INTO profile (code) VALUES ('ADM');
INSERT INTO profile (code) VALUES ('CLI');

INSERT INTO "user" (name,lastname,gender,email,dni,phone_number,password,id_profile) VALUES ('Diego', 'Mateo', 'M', 'diegoa@gmail.com', '75401389', '974656889', '123456789', 1);

INSERT INTO category ("name", "description", image_url) VALUES ('Postres fríos', 'Deliciosos postres ideales para el verano', 'https://ejemplo.com/postres_frios.jpg');


INSERT INTO platillo (nombre, descripcion, imagen, precio, id_categoria) VALUES ('Cheesecake de Oreo', 'Cheesecake con base de galletas Oreo trituradas y crema de queso suave', 'https://example.com/cheesecake_oreo.jpg', 18.75, 2);

INSERT INTO factura (total, fecha, id_usuario) VALUES (50.00, '2024-05-01', 3);

INSERT INTO pedido (cantidad, subtotal, id_platillo, id_factura) VALUES (2, 30.00, 2, 2);




--DROP SCHEMA public CASCADE;
--CREATE SCHEMA public;




