DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NULL,
    department_name VARCHAR(45) NULL,
    price INT NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Macbook Pro", "Apple", 2799.99, 10 );

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Macbook", "Apple", 1499.00, 10);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Macbook Air", "Apple", 1399.00, 5);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Mac Mini", "Apple",899.00, 30);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("iMac", "Apple", 2599.00, 15);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("iMac Pro", "Apple", 7999.00, 10);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Mac Pro", "Apple", 9999.00, 5);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Acer 27 inch Monitor", "Monitors", 160.00, 20);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Bose Headphones", "Audio", 300.00, 10);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Coffee Mug", "Home Items", 20.00, 10);

SELECT * FROM products;
