CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);
select * from products;
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Beauty Blender", "Beauty", 19.99, 100),
  ("Essie Nail Polish Cocktail Bling", "Beauty", 8.99, 125),
  ("MacBook Air 13inch", "Technology", 799.99, 3),
  ("iPad Air", "Technology", 475.00, 5),
  ("The Sign - Ace of Base", "Music", 14.99, 15),
  ("Apple SmartMouse", "Technology", 79.99, 20),
  ("Beauty and the Beast","Movies", 15.00, 20),
  ("Spice Girls - Spice","Music", 15.99, 30),
  ("iPhone 7s Plus 64GB","Technology", 799.99, 2),
  ("NSYNC - No Strings Attached", "Music", 19.95, 15);
