DROP DATABASE IF EXISTS product_db;

CREATE DATABASE product_db;

\c product_db;

CREATE FUNCTION random_between(low INT, high INT) RETURNS 
INT AS 
	$$ BEGIN RETURN FLOOR(RANDOM() * (high - low + 1) + low);
END; 

$$ LANGUAGE plpgsql;

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    icon CHAR(1)
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(6, 2) NOT NULL,
    quantity INTEGER NOT NULL,
    product_date TIMESTAMP NOT NULL DEFAULT NOW(),
    category_id INTEGER REFERENCES categories(id) ON delete
    set
        NULL
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    review_text TEXT NOT NULL,
    rating SMALLINT CHECK (
        rating BETWEEN 1
        AND 5
    ),
    review_date TIMESTAMP NOT NULL DEFAULT NOW(),
    helpful_votes INTEGER NOT NULL DEFAULT 0,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE
);