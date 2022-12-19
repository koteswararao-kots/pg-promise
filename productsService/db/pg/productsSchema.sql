--DROP DATABASE IF EXISTS users_pets;
--CREATE DATABASE users_pets;

--\c grovers_groomers;

DROP SCHEMA IF EXISTS productsSchema CASCADE;

CREATE SCHEMA IF NOT EXISTS productsSchema AUTHORIZATION user_1;

SET search_path = productsSchema, "$user", public; -- For current session only

DROP TABLE IF EXISTS productsList;

CREATE TABLE productsList
(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    imageUrl TEXT NOT NULL UNIQUE,
    price INTEGER
);



INSERT INTO productsList
    (name, imageUrl, price)
VALUES
    ('Shirt','https://imagescdn.allensolly.com/img/app/product/7/775759-8956489.jpg?auto=format&w=206', 600),
    ('Formalpant','https://5.imimg.com/data5/DE/KR/MY-61376355/mens-cotton-formal-pant-500x500.jpg', 600),
    ('Trackpant', 'https://m.media-amazon.com/images/I/41TAduOrxLL._UX425_.jpg',500),
    ('T-shirt','https://cdn.pixabay.com/photo/2016/12/06/09/31/blank-1886008__340.png', 450),
    ('vest','https://m.media-amazon.com/images/I/81RJMophRlL._UL1500_.jpg', 250);

