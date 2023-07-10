
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(100) NOT NULL DEFAULT 'active',
    user_Id BIGINT REFERENCES users(id) NOT NULL
    );