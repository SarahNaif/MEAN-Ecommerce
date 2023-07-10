CREATE TABLE orders_products (
    id SERIAL PRIMARY KEY,
    order_Id BIGINT REFERENCES orders(id)  ,
    product_Id BIGINT REFERENCES products(id),
    quantity INTEGER NOT NULL
    );
    