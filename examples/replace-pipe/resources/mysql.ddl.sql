CREATE TABLE categories(
    categoryId INT AUTO_INCREMENT PRIMARY KEY,
    categoryName VARCHAR(100) NOT NULL
) ENGINE=INNODB;

CREATE TABLE products(
    productId INT AUTO_INCREMENT PRIMARY KEY,
    productName varchar(100) not null,
    categoryId INT,
    categoryId2 INT,
    KEY fk_category categoryId,
    KEY fk_category2 categoryId2
) ENGINE=INNODB;

ALTER TABLE products 
    ADD CONSTRAINT fk_category FOREIGN KEY (categoryId) REFERENCES categories(categoryId),
    ADD CONSTRAINT fk_category2 FOREIGN KEY (categoryId2) REFERENCES categories(categoryId2);